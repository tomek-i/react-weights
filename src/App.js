import React,{useEffect,useState} from 'react';
import './css/App.css';
import WeightInputForm from './components/form'
import Graph from './components/graph'



function App() {

    const [data,setData] = useState([])

    useEffect(()=>{
       console.log('get local storage')
       const items = localStorage.getItem('data');
       if (items){
         console.log('set data from local storage')
         setData(JSON.parse(items))
       }

      return ()=>{
        localStorage.clear();
        console.log('clear local storage')
      }
    },[])

    function appendData(item){
      console.log('append data')
      setData(data.concat(item))

  }
  useEffect(()=>{

    if(data.length>0)
      {

        const j = JSON.stringify(data)
        console.log("stringify data",j);
        console.log('save data to local storage')
        localStorage.setItem("data",j)
      }


  },[data])

  return (
    <div className="App">
      <header className="App-header">

        <WeightInputForm  onSubmit={appendData}/>
        <Graph data={data} />
      </header>
    </div>
  );
}

export default App;
