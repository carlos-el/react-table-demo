import React, { useState, useMemo } from 'react'
import BaseTable, { Column, AutoResizer } from 'react-base-table'
import 'react-base-table/styles.css'

import styled from "styled-components";
import { OverlayTrigger, ListGroup } from 'react-bootstrap';

import makeData from '../../makeData';
import Status from '../generic/Status';
import Icon from '../generic/Icon'

import dots from '../../assets/three_dots.png'
import eye from '../../assets/eye.png'
import download from '../../assets/download.png'

const Container = styled.div`
  //width: calc(50vw + 220px);
  height: 50vh;
`
const OverElement = styled.div`
  background-color: white;
`

function alertData(data) {
  console.log(data)
  alert(JSON.stringify(data))
}

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


function CompBaseTable() {


  const data = useMemo(() => makeData(100), [])
  return (
    <Container>
      <AutoResizer>
        {({ width, height }) => (
          <BaseTable data={data} width={width} height={height}>
            {[
              <Column key="id" dataKey="firstName" title={<span>First Name <Icon src={download} /></span>} width={50} flexGrow={2} flexShrink={0}/>,
              <Column key="id" dataKey="lastName" title="Last Name" width={0} flexGrow={2}/>,
              <Column key="id" dataKey="age" title="Age" width={0} flexGrow={2}/>,
              <Column key="id" dataKey="visits" title="Visits" width={0} flexGrow={2}/>,
              <Column key="id" dataKey="status" title="Status" width={0} flexGrow={1}/>,
              <Column key="id" dataKey="progress" title="Profile Progress" width={0} flexGrow={1}/>,
              <Column key="id" dataKey="progress" title="Status" cellRenderer={(cell) => <Status progress={cell.cellData} />} width={0} flexGrow={1}/>,
              <Column key="id" dataKey="progress" cellRenderer={(cell) => renderIcons(cell.rowData)} width={0} flexGrow={1}/>,
            ]}
          </BaseTable>
        )}
      </AutoResizer>

    </Container>
  );
}

export default CompBaseTable;
