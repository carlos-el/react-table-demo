import React from 'react'
import styled from "styled-components";
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'

const BTableStyled = styled(BTable)`
  position: relative;
  border-collapse: collapse;

  & th {
    position: sticky;
    top: 0px;
    z-index: 1;
    background-color: #333;
    color: white;
    border-top: none;
    // border-right: 1px solid #000000;
  }


  /* & td {
    border-right: 1px solid #dee2e6;
  } */
`;

function RTable({ columns, data, ...props }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, /* footerGroups, */ rows, prepareRow } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <BTableStyled {...props} {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
      {/* No footer for now */}
      {/* <tfoot>
        {footerGroups.map((group) => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map((column) => (
              <td {...column.getFooterProps()}>{column.render('Footer')}</td>
            ))}
          </tr>
        ))}
      </tfoot> */}
    </BTableStyled>
  )
}

export default RTable
