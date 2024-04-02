import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";
    const alt =  method === "login" ? "Register" : "Login";
    const stuff = method == "login"?"Don't have an account? ":"Already have an account? ";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        // <form onSubmit={handleSubmit} className="form-container">
        //     <h1>{name}</h1>
        //     <input
        //         className="form-input"
        //         type="text"
        //         value={username}
        //         onChange={(e) => setUsername(e.target.value)}
        //         placeholder="Username"
        //     />
        //     <input
        //         className="form-input"
        //         type="password"
        //         value={password}
        //         onChange={(e) => setPassword(e.target.value)}
        //         placeholder="Password"
        //     />
        //     {loading && <LoadingIndicator />}
        //     <button className="form-button" type="submit">
        //         {name}
        //     </button>
        // </form>

        <>

<MDBContainer fluid >

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol col='12'>

    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
      <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

        <h2 className="fw-bold mb-2 text-uppercase">{name}</h2>
        <p className="text-white-50 mb-5">Please enter your login and password!</p>

        <MDBInput  onChange={(e) => setUsername(e.target.value)} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg"/>
        <MDBInput  onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"/>

        <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
        {loading && <LoadingIndicator />}
        <MDBBtn onClick={handleSubmit} type="submit" outline className='mx-2 px-5' color='white' size='lg'>
          {name}
        </MDBBtn>

        
      

        <div className='d-flex flex-row mt-3 mb-5'>
          <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="lg"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='twitter' size="lg"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='google' size="lg"/>
          </MDBBtn>
        </div>

        <div>
          <p className="mb-0">{stuff}<a href={method=="login"?"/register":"/login"}  class="text-white-50 fw-bold">{alt}</a></p>

        </div>
      </MDBCardBody>
    </MDBCard>

  </MDBCol>
</MDBRow>

</MDBContainer>
        </>
    

    );
}

export default Form;