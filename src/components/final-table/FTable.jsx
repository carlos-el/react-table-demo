import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components'
import { useTable, useFlexLayout, useRowSelect } from 'react-table'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from "react-window-infinite-loader";
import scrollbarWidth from '../generic/ScrollBarWidth'
import Status from '../generic/Status';

const DivTableStyled = styled.div`
  // border: 1px solid black;
  overflow-x: auto;
  width: 100%;

  .tr {
    :nth-child(even) {
      background-color: #f2f2f2;
    }
  }

  .th,
  .td {
    margin: 0;
    padding: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // border-right: 1px solid black;
  } 

  .th{
    background-color: #333;
    font-weight: bold;
    color: white;
    :last-child {
      border-radius: 0 0.25rem 0 0;
    }
    :first-child {
      border-radius: 0.25rem 0 0 0;
    }
  }

  .td{
    margin: auto;
  }
`

const defaultPropGetter = (column) => {
  let style = column.style || {}

  if (column.myMinWidth) {
    style.width = column.myMinWidth + "px"
  }
  if (column.myMaxWidth) {
    style.maxWidth = column.myMaxWidth + "px"
  }
  if (column.myWidth) {
    style.flex = "0 0 " + column.myWidth + "px"
  }

  return {
    style: style,
    className: column.className
  }
}

const computeListMinWidth = (cols, added, defaultColumnWidth) => {
  let value = 0
  for (let col of cols) {
    value += col.myWidth || defaultColumnWidth
  }
  return value + added
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])
    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const FTable = ({
  // Props
  data,
  columns,
  // General style props
  bodyHeight = 400, // Altura del cuerpo de la tabla
  itemSize = 50, // Altura de los items de la tabla
  defaultColumnWidth = 100, // Anchura por minima por defecto de las columnas de la tabla
  getColumnProps = defaultPropGetter,
  // Infinite loader props
  loadNextPage = () => { },
  hasNextPage = false,
  isNextPageLoading = false,
  // Selector column props
  useSelectorColumn = false,
  selectorColumnWidth = 40,
  onChangeSelectedRows = () => { },
  onChangeIsWholeCollectionSelected = () => { }
}) => {
  const defaultColumn = React.useMemo(() => ({ width: defaultColumnWidth, }), [defaultColumnWidth])
  const [isWholeCollectionSelected, setIsWholeCollectionSelected] = useState(false)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    // totalColumnsWidth,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // Pasamos esta varaible a false para que las selectedRows no se reseteen al refrescar el data (por ejemplo al hacer scroll infinito o recargar por un filtro)
      // Es posible que haya que controlar que el algun momento se ponga a true
      autoResetSelectedRows: false,
      // Pasamos esta variable de estado a la tabla para que le llegue su valor actual a las columnas 
      isWholeCollectionSelected,
    },
    useFlexLayout,
    useRowSelect,
    hooks => {
      // Incluir la columna de seleccion solo si se requiere
      if (useSelectorColumn) {
        hooks.visibleColumns.push(columns => {
          return ([
            // Column for selection
            {
              id: 'id',
              // The header can use the table's getToggleAllRowsSelectedProps method to render a checkbox
              Header: ({ getToggleAllRowsSelectedProps, isWholeCollectionSelected }) => (
                <div>
                  <IndeterminateCheckbox
                    {...getToggleAllRowsSelectedProps()} title="Select all visible rows"
                    // Para que los checkboxes normales se marquen cuando 'isWholeCollectionSelected' a true y dejen se ser clickables
                    // De lo contrario que se comporten de manera normal
                    {...(isWholeCollectionSelected ? { checked: true, indeterminate: false, disabled: true } : {})}
                  />
                  <input type="checkbox"
                    checked={isWholeCollectionSelected}
                    title="Select whole collection"
                    onChange={(e) => {
                      setIsWholeCollectionSelected(e.target.checked)
                    }} />
                </div>
              ),
              // The cell can use the individual row's getToggleRowSelectedProps method to the render a checkbox
              Cell: ({ row, isWholeCollectionSelected }) => (
                <div>
                  <IndeterminateCheckbox
                    {...row.getToggleRowSelectedProps()}
                    // Para que los checkboxes normales se marquen cuando 'isWholeCollectionSelected' a true y dejen se ser clickables
                    // De lo contrario que se comporten de manera normal
                    {...(isWholeCollectionSelected ? { checked: true, disabled: true } : {})}
                  />
                </div>
              ),
              // Dar anchura fixed a la columna selectora 
              myWidth: selectorColumnWidth,
              style: { textAlign: "center" }
            },
            ...columns,
          ])
        })
      }
    }
  )

  useEffect(() => {
    onChangeSelectedRows(selectedFlatRows.map((row) => { return row.original.id }))
  }, [selectedFlatRows])

  useEffect(() => {
    onChangeIsWholeCollectionSelected(isWholeCollectionSelected)
  }, [isWholeCollectionSelected])

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map(cell => {
            return (
              <div {...cell.getCellProps([getColumnProps(cell.column)])} className="td">
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      )
    },
    [prepareRow, rows]
  )

  // Varaibles para el tamaño y estilo de la tabla
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])
  const headerPadding = (itemSize * rows.length) > bodyHeight ? scrollBarSize : 0
  const widthForSelectorColumn = useSelectorColumn ? selectorColumnWidth : 0
  const listMinWidth = React.useMemo(() => computeListMinWidth(columns, (headerPadding + widthForSelectorColumn), defaultColumnWidth), [columns, headerPadding, defaultColumnWidth]);

  // Infinite loader vars
  const itemCount = hasNextPage ? data.length + 1 : data.length;
  const loadMoreItems = isNextPageLoading ? () => { } : loadNextPage;
  const isItemLoaded = index => !hasNextPage || index < data.length;

  // Render the UI for your table
  return (
    <>
      <DivTableStyled {...getTableProps()} className="table">
        <div style={{ width: `calc(100% - ${headerPadding}px)` }}>
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps([getColumnProps(column)])} className="th">
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>


        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          loadMoreItems={loadMoreItems}
          itemCount={itemCount}
          threshold={5}
        >
          {({ onItemsRendered, ref }) => {
            return (
              <FixedSizeList {...getTableBodyProps()}
                style={{ minWidth: listMinWidth }}
                height={bodyHeight}
                itemCount={rows.length}
                itemSize={itemSize}
                width={"100%"}
                ref={ref}
                onItemsRendered={onItemsRendered}
              >
                {RenderRow}
              </FixedSizeList>
            )
          }}
        </InfiniteLoader>
      </DivTableStyled>
      {/* <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map(
                  d => d.original
                ),
              },
              null,
              2
            )}
          </code>
        </pre> */}
    </>
  )
}



export default FTable
