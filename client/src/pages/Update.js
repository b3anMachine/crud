import React, { useState, useEffect,  } from 'react';
import { useHistory, useParams, Link, useNavigate } from "react-router-dom";
import "./Update.css";
import Axios from "axios";
import { toast } from "react-toastify";
import axios from 'axios';

const initialState = {
    name: "",
    age: 0,
    country: ""
}

const Update = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { name, age, country } = state;

    //const history = useHistory();

    var backend = "https://crud.api.webnunez.com";
    if (process.env.NODE_ENV == "development") {
        backend += ".localhost"
    }

    var { id } = useParams();

    useEffect(() => {
        axios.get(backend + `/employee/${id}`)
            .then((resp) => setState({ ...resp.data[0] }))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !age || !country) {
            toast.error("Please provide values");
        } else {
            axios.put(backend + `/update/${id}`, { name, age, country })
                .then(() => {
                  
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Contact Updated Successfully");
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div className="Form">
            <h3>Employee 23 </h3>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center"
                }}

                onSubmit={handleSubmit} >
                <label htmlFor="name">Name: </label>
                <br/>

                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name || ""}
                    onChange={handleInputChange}></input>
                <br/>
                <label htmlFor="age">Age: </label>
                <br/>

                <input
                    type="number"
                    id="age"
                    name="age"
                    value={age || ""}
                    onChange={handleInputChange}></input>
                <br/>
                <label htmlFor="country">Country: </label>
                <br/>

                <input
                    type="text"
                    id="country"
                    name="country"
                    value={country || ""}
                    onChange={handleInputChange}></input>

                <div>
                <input className="btn btn-edit" type="submit" value="Update" />
                <Link to={`/`}>
                    <input className="btn btn-edit" type="button" value="Return" onClick={() => navigate(-1)}/>
                </Link>
                </div>
            </form>

        </div>
    )
}

export default Update