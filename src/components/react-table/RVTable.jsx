import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout } from 'react-table'
import { FixedSizeList } from 'react-window'
import BTable from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const DivTableStyled = styled.div`
  /* display: inline-block;
  border-spacing: 0; */
  border: 1px solid black;
  overflow-x: auto;
  width: 100%;

  .tr {
    /* :last-child {
      .td {
        border-bottom: 0;
      }
    } */
    :nth-child(even) {
      background-color: #f2f2f2;
    }
  }

  .th,
  .td {
    margin: 0;
    padding: 0.5rem;
  }

  .th{
    background-color: #333;
    font-weight: bold;
    color: white;
  }
`

function RVTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI

  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
    }),
    []
  )

  const scrollbarWidth = () => {
    // thanks too https://davidwalsh.name/detect-scrollbar-width
    const scrollDiv = document.createElement('div')
    scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
    document.body.appendChild(scrollDiv)
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    return scrollbarWidth
  }


  const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])

  const { getTableProps, getTableBodyProps, headerGroups, rows, totalColumnsWidth, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout
  )

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
              <div {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      )
    },
    [prepareRow, rows]
  )

  // Render the UI for your table
  return (
    <DivTableStyled {...getTableProps()} className="table">
      <div>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps()} className="th">
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        <FixedSizeList
          height={400}
          itemCount={rows.length}
          itemSize={35}
          width={totalColumnsWidth + scrollBarSize}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </DivTableStyled>
  )
}



export default RVTable
