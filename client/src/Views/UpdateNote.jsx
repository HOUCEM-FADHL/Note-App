import React, {useState, useEffect} from 'react'
import Nav from '../Components/Nav'
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';
import { Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";


const UpdateNote = () => {
    // Extracting the 'id' parameter from the route
    const { id } = useParams();

    // State for managing the product details, errors, and loading status
    const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isImportant, setIsImportant] = useState(false);
    const [error, setError] = useState({});

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // useEffect hook to fetch details of the product when the component mounts
    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/note/${id}`, { withCredentials: true })
        .then((res) => {
            // Successful response from the server
            setTitle(res.data.title);
            setContent(res.data.content);
            setIsImportant(res.data.isImportant);
            // setLoaded(true);
        })
        .catch((err) => console.log(err));
    }, [id]); // Dependency array to run the effect only when 'id' changes

    // Function to update a Note
    const onSubmitHandler = (e) => {
      e.preventDefault();
        axios
        .patch(`http://localhost:8000/api/note/${id}/edit`, {
          title,
          content,
          isImportant
        }, { withCredentials: true })
        .then((res) => {
            console.log("updated data: ", res.data);
            navigate("/notes");
            setError({});
        })
        .catch((err) => {
            console.log(err);
            setError(err.response.data.errors);
        });
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
          <Button type="submit">Edit</Button>
        </form>
        </div>
    </div>
  )
}

export default UpdateNote

