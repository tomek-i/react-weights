import React, { useEffect, useState } from 'react';
import './css/App.css';
import WeightInputForm from './components/form'
import Graph from './components/graph'
import Stats from './components/stats'
import axios from 'axios';

function App() {

  const [data, setData] = useState([])

  useEffect(() => {

    axios.get('/api/data').then(result => {

      setData(result.data);
    });

    //    return () => {
    //    }
  }, [])

  function appendData(item) {

    axios.post('/api/data', { value: item })
      .then(result => {
        const { value, date } = result.data;
        setData(data.concat({ value: value, date: date }));
      });


    //setData(data.concat(datapoint))

  }


  useEffect(() => {
    //TODO: probably not required anymore?
    if (data.length > 0) {
      //const j = JSON.stringify(data)
      //localStorage.setItem("data", j)
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
