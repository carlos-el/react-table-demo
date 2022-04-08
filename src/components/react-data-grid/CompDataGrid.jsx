import React, { useState, useMemo } from 'react'
import styled, { css } from "styled-components";
import { OverlayTrigger, ListGroup } from 'react-bootstrap';
import DataGrid, { SelectColumn } from 'react-data-grid';

import makeData from '../../makeData';
import Status from '../generic/Status';
import Icon from '../generic/Icon'

import dots from '../../assets/three_dots.png'
import eye from '../../assets/eye.png'
import download from '../../assets/download.png'


const DataGridStyled = styled(DataGrid)` 
  /* .rdg-header-row {
    color: white;
    background-color: #333333;
  }
  .rdg-row {
    background-color: white;
    color: #212529;
  } */
  .rdg-checkbox {
    background-color:initial;
    appearance: auto;
  }
`;

const OverElement = styled.div`
  background-color: white;
`

function alertData(data) {
  console.log(data)
  alert(JSON.stringify(data))
}

// function alertData(data) {
//     console.log(data)
//     alert(JSON.stringify(data))
// }

function renderIcons(data) {
  // TODO IconMenu component to replace dropdown (Items inside menu should be passed as children)
  return <>
    <OverlayTrigger
      trigger="click"
      key={"bottom"}

      overlay={
        <OverElement>
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </OverElement>
      }
    >
      <Icon src={dots} />
    </OverlayTrigger>
    <Icon className='ml-2' onClick={() => { alertData(data) }} src={download} />
    <Icon className='ml-2' onClick={() => { alertData(data) }} src={eye} />
  </>
}

function rowKeyGetter(row) {
  return row.id;
}

function CompDataGrid() {
  const [selectedRows, setSelectedRows] = useState(() => new Set());

  const columns = useMemo(
    () => [
      {
        ...SelectColumn,
      },
      {
        name: <span>First name</span>,
        key: 'firstName',
      },
      {
        name: 'Last Name',
        key: 'lastName',
      },
      {
        name: 'Age',
        key: 'age',
      },
      {
        name: 'Visits',
        key: 'visits',
      },
      {
        name: 'Status',
        key: 'status',
      },
      {
        name: 'Profile Progress',
        key: 'progress',
      },
      {
        name: 'Status',
        formatter(props) {
          return (
            <Status progress={props.row.progress} />
          );
        },
      },
      {
        name: '',
        formatter(props) {
          return renderIcons(props.row);
        },
      },
      // {
      //     name: ' ',
      //     Cell: (cell) => renderIcons(cell.data[cell.row.id])
      // },
    ],
    []
  )

  const data = useMemo(() => makeData(100), [])
  return <DataGridStyled className='rdg-light fill-grid'
    columns={columns}
    rows={data}
    rowKeyGetter={rowKeyGetter}
    headerRowHeight={50}
    selectedRows={selectedRows}
    onSelectedRowsChange={setSelectedRows}
  />;
}

export default CompDataGrid;