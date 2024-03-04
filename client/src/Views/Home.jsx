import React, { useState, useEffect } from "react";
import Nav from "../Components/Nav";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import {Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const idx = window.localStorage.getItem("userId");
  useEffect(() => {
    console.log("idx", idx);
    axios
      .get(`http://localhost:8000/api/notes/${idx}`, { withCredentials: true })
      .then((res) => {
        console.log("res List", res);
        console.log("res.data List", res.data);
        // setNotes(res.data);
        const sortedNotes = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotes(sortedNotes);
      })
      .catch((err) => console.log(err));
  }, [idx]);

  const editNote = (id) => {
    console.log("id", id);
    navigate(`/notes/${id}/edit`);
  };

  const deleteNote = (id) => {
    axios
    .delete(`http://localhost:8000/api/note/${id}`, { withCredentials: true })
    .then((res) => {
      console.log("res Delete", res);
       console.log("res.data Delete", res.data);
       setNotes(notes.filter((note) => note._id!== id));
    })
    .catch((err) => console.log(err));

  };

  return (
    <div>
      <Nav />
      <div className="container w-50 mx-auto">
        {notes.map((note) => (
          <Card key={note._id} className="mb-2" bg="warning" text="dark">
            <Card.Body>
              <Card.Title>
                <span>{note.isImportant ? "📌" : ""}</span>
                <Link to={`/notes/${note._id}`}>
                {note.title}
                </Link>
              </Card.Title>
              <Card.Text>{note.content}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted d-flex align-items-center justify-content-between">
              {new Date(note.createdAt).toLocaleDateString()}
              <div className="d-flex justify-content-center gap-2">
                <Button variant="light" onClick={()=>editNote(note._id)}>
                  Edit
                </Button>
                <Button variant="light" onClick={()=> deleteNote(note._id)}>
                  Delete
                </Button>
              </div>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
