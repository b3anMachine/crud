import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Axios from 'axios';

function App() { 
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");

  const [employeeList, setEmployeeList] = useState([]);
  const [newAge, setNewAge] = useState(0);

  var backend = "https://crud.api.webnunez.com";
  if  (process.env.NODE_ENV == "development"){
    backend += ".localhost"
  } 

  const addEmployee = () => {
    Axios.post(backend + "/create", {
      name: name,
      age: age,
      country: country
    }).then(() => {
      getEmployees()
      setEmployeeList([...employeeList, {
        name: name,
        age: age,
        country: country,
      },
      ]);
    }
    );
  }


  const getEmployees = () => {
    Axios.get(backend + "/employees").then((response) => {
      setEmployeeList(response.data);
    })
  }

  const updateEmployeeAge = (id) => {
    Axios.put(backend + "/update", {
      age: newAge,
      id: id,
    }).then((response) => {
      setEmployeeList(employeeList.map((val) => {
        return val.id === id ? { id: val.id, name: val.name, age: newAge, country: val.country } : val
      }))
    })
  }

  const displayInfo = () => {
    console.log(name + age + country)
  }

  const deleteEmployee = (id) => {
    Axios.delete(backend + `/delete/${id}`).then((responce) => 
      setEmployeeList(employeeList.filter((val) => {
        return val.id != id;
      }))
    )
  }

  return (
    <div className="App-header">

      <img src={logo} className="App-logo" alt="logo" />

      <label>Name:</label>
      <input type="text" onChange={(event) => { setName(event.target.value); }} />

      <label>Age:</label>
      <input type="number" onChange={(event) => { setAge(event.target.value); }} />

      <label>Country:</label>
      <input type="text" onChange={(event) => { setCountry(event.target.value); }} />
      <p />

      <button onClick={addEmployee} > Add employee </button>
      <p />

      <button onClick={getEmployees} > Show Employees </button>


      {employeeList.map((val, key) => {
        return (<div> {val.name}, {val.age}, {val.country}
          <div> <input
            type="text" placeholder="" onChange={(event) => {
              setNewAge(event.target.value);
            }} />
            <button onClick={() => {
              updateEmployeeAge(val.id)
            }} >Update </button>


            <button onClick={() => {
              deleteEmployee(val.id)
            }}> Delete </button>

          </div>

        </div>)
      })}
    </div>
  );
}

export default App;
