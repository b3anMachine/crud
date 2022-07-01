import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import Axios from "axios";
import logo from '.././logo.svg';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");

    const [employeeList, setEmployeeList] = useState([]);
    const [newAge, setNewAge] = useState(0);

    var backend = "https://crud.api.webnunez.com";
    if (process.env.NODE_ENV == "development") {
        backend += ".localhost"
    }

    const loadData = async () => {
        const responce = await Axios.get(backend + "/employees");
        getEmployees(responce.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    const addEmployee = () => {
        Axios.post(backend + "/create", {
            name: name,
            age: age,
            country: country
        }).then((response) => {
            toast.success("Employee added with ID " + response.data.insertId);
            setEmployeeList([...employeeList, {
                id: response.data.insertId,
                name: name,
                age: age,
                country: country,
            },
            ]);
        }
        ).catch((err) => toast.error(err.response.data));
    }

    const getEmployees = () => {
        Axios.get(backend + "/employees")
            .then((response) => {
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
        if (window.confirm("Are you sure?")) {
            Axios.delete(backend + `/delete/${id}`).then((responce) =>
                setEmployeeList(employeeList.filter((val) => {
                    return val.id != id;
                })))
        }
    }


    return (
        <div className="Home">
            <h1>CRUD</h1>

            <div className="Inputs">
                <label>Name:</label>
                <input type="text" onChange={(event) => { setName(event.target.value); }} />

                <label>Age:</label>
                <input type="number" onChange={(event) => { setAge(event.target.value); }} />

                <label>Country:</label>
                <input type="text" onChange={(event) => { setCountry(event.target.value); }} />

                <div>
                    <button onClick={addEmployee} className="btn btn-edit"> Add Employee </button>
                </div>
            </div>

            <p />

            {/* 
            <div>
                <button onClick={getEmployees} className="btn btn-edit"> Show Employees </button>
                <button onClick={getEmployees} className="btn btn-edit"> Hide Employees </button>
            </div>
            */}

            <div className="styled-table">
                <table >
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}> ID </th>
                            <th style={{ textAlign: "center" }}> Name </th>
                            <th style={{ textAlign: "center" }}> Age </th>
                            <th style={{ textAlign: "center" }}> Country </th>
                            <th style={{ textAlign: "center" }}> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeList.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    {/* <td scope="row">{index + 1}</td> */}
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.country}</td>
                                    <td>
                                        <Link to={`/update/${item.id}`}>
                                            <button className="btn btn-edit">Edit</button>
                                        </Link>

                                        <button className="btn btn-delete"
                                            onClick={() => {deleteEmployee(item.id) }}>
                                            Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>



            {/*
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
             */}

        </div>
    )
}

export default Home;