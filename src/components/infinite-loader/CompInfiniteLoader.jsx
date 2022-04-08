import React, { useState, PureComponent } from "react";
import makeData from "../../makeData";
import InfiniteLoaderList from "./InfiniteLoaderList";

const CompInfiniteLoader = () => {
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isNextPageLoading, setIsNextPageLoading] = useState(false)
  const [data, setData] = useState([])

  const loadNextPage = (...args) => {
    console.log("loadingNextPage", ...args);
    setIsNextPageLoading(true)
    setTimeout(() => {
      setHasNextPage(data.length < 100)
      setIsNextPageLoading(false)
      setData([...data, ...makeData(10)])
    }, 2500);
  };

  return (
    <InfiniteLoaderList
      hasNextPage={hasNextPage}
      isNextPageLoading={isNextPageLoading}
      items={data}
      loadNextPage={loadNextPage}
    />

  );
}

export default CompInfiniteLoader;
