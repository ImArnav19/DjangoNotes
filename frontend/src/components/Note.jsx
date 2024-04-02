import React from "react";
import "../styles/Note.css"

import {
  MDBCard,
  MDBCardBody,
    MDBBtn,
  MDBIcon,

} from "mdb-react-ui-kit"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (

        <>

            <MDBCard className="mb-4">
                <MDBCardBody>
                    <h4>{note.title}</h4>
                  <p>{note.content}</p>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      
                      <p className="small mb-0 ms-2">{formattedDate}</p>
                    </div>
                    <div className="d-flex flex-row align-items-center">

                    <MDBIcon
                        far
                        icon="thumbs-down mx-2 fa-xs text-black"
                        style={{ marginTop: "-0.16rem" }}
                      />
                    <MDBBtn onClick={() => onDelete(note.id)}  outline className='mx-2 my-4 px-5 me-1' color='danger' size='lg'>
                        
                        Delete
                    </MDBBtn>

                      
                      
                      
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
        
        </>
        // <div className="note-container">
        //     <p className="note-title">{note.title}</p>
        //     <p className="note-content">{note.content}</p>
        //     <p className="note-date">{formattedDate}</p>
        //     <button className="delete-button" onClick={() => onDelete(note.id)}>
        //         Delete
        //     </button>
        // </div>

        



    );
}

export default Note