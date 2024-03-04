import React, { useState } from "react";
import Nav from "../Components/Nav";
import { Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
        .post("http://localhost:8000/api/notes", {
            title,
            content,
            isImportant,
        }, {withCredentials: true})
        .then((res) => {
            console.log("res form", res);
            console.log("res.data form", res.data);
            navigate("/notes/" + res.data._id);
            setError({});
        })
        .catch((err) => {
            // Log and set an error message if the request fails
            console.log(err.response.data.errors);
            setError(err.response.data.errors);
        });

    // Clear the form input values after submission
    setTitle("");
    setContent("");
    setIsImportant(false);
};

  return (
    <div>
      <Nav />
      <div className="container w-50 mx-auto">
        <form onSubmit={onSubmitHandler}>
          {/* Title input field */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Title:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
          </Form.Group>
          {/* Display an error message if there is an error for the title */}
          {error.title ? (
            <p className="text-danger">{error.title.message}</p>
          ) : null}
          <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
              Content:
            </Form.Label>
            <Col sm="10">
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              value={content}
              type="text"
              onChange={(e) => setContent(e.target.value)}
            />
          </FloatingLabel>
          </Col>
          </Form.Group>
          {error.content ? (
            <p className="text-danger">{error.content.message}</p>
          ) : null}
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="important?"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
            />
          </Form.Group>

          {/* Submit button with dynamic text based on form mode */}
          <Button type="submit">Create</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
