import React from 'react';
import {
  MDBNavbar,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
export default function Navbar() {

    const nav = useNavigate();
  return (
    <MDBNavbar light bgColor='light'>
      <MDBContainer tag="form" fluid className='justify-content-start'>
        <MDBBtn outline onClick={()=> nav('')} color="success" className='me-2' size='lg' type='button'>
          Home
        </MDBBtn>
        <MDBBtn outline onClick={()=> nav('/logout')} color="secondary" size="lg" type='button'>
          Logout
        </MDBBtn>
      </MDBContainer>
    </MDBNavbar>
  );
}

