import React, { useEffect, useState } from 'react';
import './css/App.css';
import WeightInputForm from './components/form'
import Graph from './components/graph'
import Stats from './components/stats'
import axios from 'axios';

function App() {

  const [data, setData] = useState([])

  useEffect(() => {

    //TODO: get data from BACKEND

    axios.get('localhost:5000/api/data').then(result => {
      console.log("GET", result);
    });


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
      "date": date,//.toLocaleDateString(),
      "value": item
    }

    //TODO: POST data to backend
    axios.post('localhost:5000/api/data', { value: item }).then(result => console.log(result));


    setData(data.concat(datapoint))

  }


  useEffect(() => {
    //TODO: probably not required anymore?
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
