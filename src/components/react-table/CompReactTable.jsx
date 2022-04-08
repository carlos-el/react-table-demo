import React from 'react'
import styled from "styled-components";
import Icon from '../generic/Icon'
import Status from '../generic/Status'

import { Dropdown } from 'react-bootstrap';

import dots from '../../assets/three_dots.png'
import eye from '../../assets/eye.png'
import download from '../../assets/download.png'


import RTable from './RTable';
import makeData from '../../makeData'


const TableContainer = styled.div`
  max-height: 400px;
  min-height: auto;

  overflow-x: auto;
  overflow-y: auto;
`;

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
        <Dropdown as="span">
            <Dropdown.Toggle className="d-inline" as="span" bsPrefix="p-0" >
                <Icon src={dots} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={() => { alertData(data) }}>Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={() => { alertData(data) }}>Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={() => { alertData(data) }}>Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <Icon className='ml-2' onClick={() => { alertData(data) }} src={download} />
        <Icon className='ml-2' onClick={() => { alertData(data) }} src={eye} />
    </>
}

function CompReactTable() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'First Name',
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
            },
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Visits',
                accessor: 'visits',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Profile Progress',
                accessor: 'progress',
            },
            {
                Header: 'Status',
                Cell: (cell) => <Status progress={cell.data[cell.row.id].progress} />
            },
            {
                Header: ' ',
                Cell: (cell) => renderIcons(cell.data[cell.row.id])
            },
        ],
        []
    )

    const data = React.useMemo(() => makeData(1000), [])

    return (
        <TableContainer>
            <RTable columns={columns} data={data} striped hover size="sm" />
        </TableContainer>
    )
}

export default CompReactTable
