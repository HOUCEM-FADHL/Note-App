import React from 'react'
import { Button } from'react-bootstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate();
  const logoutUser = () => {
    axios.post('http://localhost:8000/api/logoutUser',{}, {withCredentials: true})
    .then((res) => {
      console.log(res);
      window.localStorage.removeItem('userId');
      navigate('/');
     })
     .catch((err) => {
      console.log(err);
     })
  }
  return (
    <div className=" text-center border-bottom border-2 border-dark pb-2 mb-4" >
        <div className="d-flex justify-content-center align-items-center gap-5">
        <p>You logged In</p>
        <Button variant='warning' onClick={logoutUser} >Logout</Button>
        </div>
        <h1>Notes</h1>
        <div className="d-flex justify-content-center align-items-center gap-5">
        <Link to="/notes">Home</Link>
        <Link to="/notes/create">Create</Link>
        </div>
    </div>
  )
}

export default Nav