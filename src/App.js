import React from 'react'
// import CompRsuiteTable from './components/rsuite-table/CompRsuiteTable';
// import CompTable from './components/boostrap-table/CompTable';
// import CompReactTable from './components/react-table/CompReactTable';
import CompFinalTable from './components/final-table/CompFinalTable';
// import CompInfiniteLoader from './components/infinite-loader/CompInfiniteLoader';
// import CompReactVirtualizedTable from './components/react-table/CompReactVirtualizedTable';
// import CompDataGrid from './components/react-data-grid/CompDataGrid';
// import CompBaseTable from './components/react-base-table/CompBaseTable';


function App() {
  return (
    <div className='mx-5'>
      <h2>react-table:</h2>
      {/* <CompInfiniteLoader /> */}
      <CompFinalTable />
    </div>

  )
}

export default App
