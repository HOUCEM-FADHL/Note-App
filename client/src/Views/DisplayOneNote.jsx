import React,{useState,useEffect} from 'react'
import Nav from '../Components/Nav'
import axios from 'axios';
import {Card} from "react-bootstrap";
import { useParams} from 'react-router-dom';


const DisplayOneNote = () => {
  const [note, setNote] = useState({});
  const { id } = useParams();

    // useEffect hook to fetch details of the product when the component mounts
    useEffect(() => {
        console.log("id-details:", id);
        axios
        .get(`http://localhost:8000/api/note/${id}`, { withCredentials: true })
        .then((res) => {
            // Successful response from the server
            console.log("res.data one product:", res.data);
            // Set the product details to the state variable
            setNote(res.data);
        })
        .catch((err) => console.log(err));
    }, [id]);
  return (
    <div>
      <Nav />
      <div className="container w-50 mx-auto">
          <Card className="mb-2" bg="warning" text="dark">
            <Card.Body>
              <Card.Title>
                <span>{note.isImportant ? "📌" : ""}</span>
                {note.title}
              </Card.Title>
              <Card.Text>{note.content}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted d-flex align-items-center justify-content-between">
              {/* <p>{note.createdAt}</p> */}
              {new Date(note.createdAt).toLocaleDateString()}
              
            </Card.Footer>
          </Card>
        
      </div>
    </div>
  )
}

export default DisplayOneNote