import React from 'react'
import styled from "styled-components";
import Table from 'react-bootstrap/Table';
import { useTable } from 'react-table'

const BTableStyled = styled(Table)`
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
  // Render the UI for your table
  return (
    <BTableStyled striped hover size="sm">
      <thead>
        <tr>
          <th style={{ width: "40px" }}>ID</th>
          <th style={{width: "50%"}}>First name</th>
          <th style={{width: "50%"}}>Last name</th>
          <th style={{width: "50%"}}>Age</th>
          <th>Visits</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td><td>Carla</td><td>Molina</td><td>60</td><td>14</td>
        </tr>
        <tr>
          <td>2</td><td>Carlw</td><td>Molinw</td><td>60</td><td>13</td>
        </tr>
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