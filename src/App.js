import React, { useState, useEffect } from "react";
import json from './data.json';
import Table from './components/Table';
import Chart from "./components/Chart";
import cx from 'classnames';

function App() {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setData(json);
  }, []);

  return (
    <div className="App">
      <h1>Department Wise Sales</h1>
      <div className="container">
        <div className="tab-btns">
          <button className={cx("btn", { "btn-selected": tab === 0 })} onClick={() => setTab(0)}>
            TABLE
          </button>
          <button className={cx("btn", { "btn-selected": tab === 1 })} onClick={() => setTab(1)}>
            CHART
          </button>
        </div>
        {!tab ? <Table data={data}/> : <Chart data={data}/>}
      </div>
    </div>
  );
}

export default App;
