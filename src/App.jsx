import React, { useEffect, useState } from 'react';
import './css/App.css';
import WeightInputForm from './components/form'
import Graph from './components/graph'
import Stats from './components/stats'


function App() {

  const [data, setData] = useState([])

  useEffect(() => {

    const items = localStorage.getItem('data');
    if (items) {
      setData(JSON.parse(items))
    }

    return () => {
      localStorage.clear();
    }
  }, [])

  function appendData(item) {
    const date = new Date()
    const datapoint = {
      "date": date.toLocaleDateString(),
      "value": item
    }

    setData(data.concat(datapoint))

  }
  useEffect(() => {

    if (data.length > 0) {

      const j = JSON.stringify(data)
      localStorage.setItem("data", j)
    }


  }, [data])

  return (
    <div className="App">
      <header className="App-header">
        <WeightInputForm onSubmit={appendData} />
      </header>
      <Graph data={data} />
      <Stats data={data} />
    </div>
  );
}

export default App;
