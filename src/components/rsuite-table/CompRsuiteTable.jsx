import React, { useState, useMemo } from 'react'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';

import styled from "styled-components";
import { OverlayTrigger, ListGroup } from 'react-bootstrap';

import makeData from '../../makeData';
import Status from '../generic/Status';
import Icon from '../generic/Icon'

import dots from '../../assets/three_dots.png'
import eye from '../../assets/eye.png'
import download from '../../assets/download.png'

const RTable = styled(Table)`
  & .rs-table-row-header{
    background-color: red !important;
    color: blue;
    font-weight: bold;
  }
`
const OverElement = styled.div`
  background-color: white;
`

function alertData(data) {
  console.log(data)
  alert(JSON.stringify(data))
}


const BaseCell = React.forwardRef((props, ref) => {
  const { children, rowData, ...rest } = props;
  return (
    <Cell
      ref={ref}
      rowData={rowData}
      onDoubleClick={() => {
        console.log(rowData);
      }}
      {...rest}
    >
      {children}
    </Cell>
  );
});

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => {
  return (
    <BaseCell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: '46px' }}>
        <input
          type="checkbox"
          value={rowData[dataKey]}
          onChange={onChange}
          checked={checkedKeys.some(item => item === rowData[dataKey])}
        />
      </div>
    </BaseCell>
  );
};

const NameCell = ({ rowData, dataKey, ...props }) => {
  return (
    <BaseCell rowData={rowData} {...props}>
      <span>{rowData[dataKey]}</span>
    </BaseCell>
  );
};

const StatusCell = ({ rowData, dataKey, ...props }) => {
  return (
    <BaseCell rowData={rowData} {...props}>
      <Status progress={rowData[dataKey]} />
    </BaseCell>
  );
};

const IconsCell = ({ rowData, dataKey, ...props }) => {
  return (
    <BaseCell rowData={rowData} {...props}>
      <>
        <OverlayTrigger
          trigger="click"
          key={"bottom"}

          overlay={
            <OverElement>
              <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in in in i nn</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </OverElement>
          }
        >
          <Icon src={dots} />
        </OverlayTrigger>
        <Icon className='ml-2' onClick={() => { alertData(rowData) }} src={download} />
        <Icon className='ml-2' onClick={() => { alertData(rowData) }} src={eye} />
      </>
    </BaseCell>
  );
};


function CompRsuiteTable() {
  const data = useMemo(() => makeData(100), [])

  const [checkedKeys, setCheckedKeys] = React.useState([]);

  const handleCheckAll = React.useCallback(event => {
    const checked = event.target.checked;
    const keys = checked ? data.map(item => item.id) : [];
    setCheckedKeys(keys);
  }, []);

  const handleCheck = React.useCallback(
    event => {
      const checked = event.target.checked;
      const value = +event.target.value;
      const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);

      setCheckedKeys(keys);
    },
    [checkedKeys]
  );



  return (
    <RTable height={600} bordered={true} data={data} headerHeight={40} virtualized rowKey={"id"}>
      <Column width={50} align="center">
        <HeaderCell style={{ padding: 0 }}>
          <div style={{ lineHeight: '40px' }}>
            <input
              type="checkbox"
              onChange={handleCheckAll}
              checked={checkedKeys.length === data.length}
            />
          </div>
        </HeaderCell>
        <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
      </Column>

      <Column flexGrow={2}>
        <HeaderCell>Id</HeaderCell>
        <NameCell dataKey="id" />
      </Column>
      <Column flexGrow={1}>
        <HeaderCell>First Name</HeaderCell>
        <NameCell dataKey="firstName" />
      </Column>
      <Column flexGrow={1}>
        <HeaderCell>Last Name</HeaderCell>
        <BaseCell dataKey="lastName" />
      </Column>

      <Column width={70}>
        <HeaderCell>Age</HeaderCell>
        <BaseCell dataKey="age" />
      </Column>

      <Column width={70}>
        <HeaderCell>Visits</HeaderCell>
        <BaseCell dataKey="visits" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Status</HeaderCell>
        <BaseCell dataKey="status" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Profile Progress</HeaderCell>
        <BaseCell dataKey="progress" />
      </Column>

      <Column width={70} align={"center"}>
        <HeaderCell>Status</HeaderCell>
        <StatusCell dataKey="progress" />
      </Column>

      <Column width={130} align={"center"}>
        <HeaderCell></HeaderCell>
        <IconsCell dataKey="progress" />
      </Column>
    </RTable>
  );
}

export default CompRsuiteTable;
