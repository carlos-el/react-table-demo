import React, { useState, useEffect } from 'react'
// import styled from "styled-components";
import Icon from '../generic/Icon'
import Status from '../generic/Status'

import { Dropdown } from 'react-bootstrap';

import dots from '../../assets/three_dots.png'
import eye from '../../assets/eye.png'
import download from '../../assets/download.png'

import FTable from './FTable';
import makeData from '../../makeData'
import CustomSpinner from '../generic/Spinner';

const alertData = (data) => {
  console.log(data)
  alert(JSON.stringify(data))
}

const renderIcons = (data) => {
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



const CompFinalTable = () => {
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isNextPageLoading, setIsNextPageLoading] = useState(false)
  const [data, setData] = useState([]) // TODO itentar memoizar data? tener en cuenta los fetch del infiniteScrolling
  const [selectedRows, setSelectedRows] = useState([])
  const [isWholeCollectionSelected, setIsWholeCollectionSelected] = useState(false)
  const onChangeSelectedRows = (selectedRows) => {
    setSelectedRows(selectedRows)
  };
  const onChangeIsWholeCollectionSelected = (wholeCollectionSelected) => {
    setIsWholeCollectionSelected(wholeCollectionSelected)
  };

  useEffect(() => {
    initialLoad()
  }, [])


  // Columnas de la tabla
  const columns = React.useMemo(
    () => [
      // {
      //   Header: 'ID',
      //   accessor: 'id',
      //   myWidth: 50,
      //   // style: { textAlign: "center" }
      // },
      {
        Header: 'First Name',
        accessor: 'firstName',
        style: {
          flex: "3 0 auto" // por ahora para que funcione flexgrow hay que ponerlo en todos
        }
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        style: {
          flex: "1 0 auto"
        }
      },
      {
        Header: 'Age',
        accessor: 'age',
        myWidth: 70,
        style: { textAlign: "center" }
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        myWidth: 70,
        style: { textAlign: "center" }
      },
      {
        Header: 'Status1',
        accessor: 'status',
        style: {
          flex: "1 0 auto"
        }
      },
      // {
      //     Header: 'Profile Progress',
      //     accessor: 'progress',
      // },
      {
        Header: 'Status2',
        Cell: (cell) => <Status className={"text-center"} progress={cell.data[cell.row.id].progress} />,
        myWidth: 60,
        style: { textAlign: "center" }
      },
      {
        Header: ' ',
        Cell: (cell) => renderIcons(cell.data[cell.row.id]),
        myWidth: 140,
        style: { textAlign: "center", overflow: "visible" }
      },
    ],
    []
  )

  const loadMoreData = (...args) => {
    //console.log("loadingNextPage", ...args);
    setIsNextPageLoading(true)
    setTimeout(() => {
      setHasNextPage((data.length + 20) < 100)
      setIsNextPageLoading(false)
      setData([...data, ...makeData(20)]);
    }, 1000);
  };

  const initialLoad = (...args) => {
    //console.log("Loading Initial", ...args);
    setIsNextPageLoading(true)
    setTimeout(() => {
      setHasNextPage((data.length + 20) < 100)
      setIsNextPageLoading(false)
      setData([...makeData(5)]);
    }, 1000);
  };

  // const data = React.useMemo(() => makeData(80), [])
  return (
    <div className='position-relative'>
      <CustomSpinner loading={isNextPageLoading} />
      <FTable
        data={data}
        columns={columns}
        loadNextPage={loadMoreData}
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        useSelectorColumn={true}
        onChangeSelectedRows={onChangeSelectedRows}
        onChangeIsWholeCollectionSelected={onChangeIsWholeCollectionSelected}
      />
      {/* <div>{selectedRows.map((k) => {
        return `${k}, `
      })}</div> */}
    </div>
  )
}

export default CompFinalTable
