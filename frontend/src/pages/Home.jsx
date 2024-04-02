import { useEffect, useState } from "react";
import "../styles/Home.css"
import api from "../api";
import Note from "../components/Note";
import Navbar from "../components/Navbar";
import React from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBNavbar,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBBtn
} from "mdb-react-ui-kit"

const Home = () => {


    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [notes,setNotes] = useState([])

    useEffect(() => {
        getNotes();
    },[]);

    const getNotes= () => {

        api.get("/api/notes/")
        .then((res) => res.data)
        .then((data) => {
            setNotes(data)
            console.log(data)
        })
        .catch(e => alert(e))

    }

    const deleteNote =  (id) => {

        api.delete(`/api/notes/delete/${id}`)
        .then((res) => {
            if(res.status === 204){
                alert("Note Deleted")
                getNotes()
            }
            else{
                alert("Note Deletion Not Done!")
            }
        })
        .catch((e) => {alert(e)})
    }

    const createNote = () => {
        api.post("/api/notes/",{title,content})
        .then((res) => {
            if(res.status === 201){
                alert("Note Created")
                getNotes()
            }
            else{
                alert("Note Creation Not Done!")
            }
        })
        .catch(e => alert(e))
    }

    return ( <>
             
            {/* <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Title"
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form> */}

<Navbar />

<MDBContainer className="mt-5" style={{ minWidth: 2500 }}>
    
      <MDBRow className="justify-content-center">
        <MDBCol md="8" lg="6">
            
            <div className="badge text-center" style={{width: "80vw"}}><h1>Your own OneNotes App...</h1></div>
          <MDBCard
            className="shadow-0 border"
            style={{ backgroundColor: "#f0f2f5" }}
          >
            <MDBCardBody>
                <MDBInput onChange={e => setTitle(e.target.value)} wrapperClass="mb-4" placeholder="Type comment..." label="+ Add a Title" />
              <MDBInput onChange={e => setContent(e.target.value)} wrapperClass="mb-4" placeholder="Type comment..." label="+ Content" />

              <MDBBtn onClick={createNote} type="submit" outline className='mx-2 my-4 px-5' color='green' size='lg'>
            Create
            </MDBBtn>
            
            <div>
                
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>


              

              
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer> 

            
        
    </> 
    
    
    
    );
}
 
export default Home;