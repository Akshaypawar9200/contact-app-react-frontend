import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'
import React, { useState } from 'react'
import{logout as logout} from '../../services/User/Logout'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import{resetPasswordDashboard as resetPasswordDashboard}from '../../services/User/ResetPassword'
import { enqueueSnackbar, SnackbarProvider } from "notistack";

const NavbarComponent = () => {
  const[oldpassword,setOldpassword]=useState("")
  const[newpassword,setNewpassword]=useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const navigate=new useNavigate()
  let username=localStorage.getItem("username")

    
    const handleLogout=async()=>{
      const response=await logout()
      console.log("logout sucessfully");
      localStorage.clear()
      navigate(`/`)
    }
    const getOldPassword=(e)=>{
    
      setOldpassword(e.target.value)
    }
    const getNewPassword=(e)=>{
      setNewpassword(e.target.value)
    }
const resetPassword=async(e)=>{
e.preventDefault()
  try {
    setShow(prev=>true)

    
    if(oldpassword==""){

      enqueueSnackbar("plz enter old password", { variant: "error" })
      return
    }
   
    if(newpassword==""){
      enqueueSnackbar("plz enter new password", { variant: "error" })
      return
    }
    
    const res=await resetPasswordDashboard(username,oldpassword,newpassword)
   
    enqueueSnackbar('password reset sucessfully', { variant: "success" })
    setShow(prev=>false)
  } catch (error) {

    enqueueSnackbar("invalid old password", { variant: "error" })
  }
}
const resetModel=(e)=>{
  e.preventDefault()

    setShow(prev=>true)
  
} 
  return (
  <>
      <SnackbarProvider autoHideDuration={3000} />
  <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="main">
        <Navbar.Brand href="#">ContactApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <div className="navbar">
            <Nav.Link href="#action1" className="custom-link">Home</Nav.Link>
            <Nav.Link href="#action2"className="custom-link">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
            </div>
          </Nav>
    <div className="parts">
        <div>
        <label htmlFor="username"className='user'>Hey!{username}</label>
        </div>
          <div>
          <button type="button" class="btn btn-primary" onClick={resetModel}>reset</button>
          </div>
           <div>
           <Button variant="outline-success"className="btn-logout" onClick={handleLogout}>Logout</Button>
           </div>
          
</div>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
      <form action="#">
        <label htmlFor="old-Password">Old Password</label><br/>
        <input type="text" onChange={getOldPassword}/><br/>
        <label htmlFor="new-Password">New Password</label><br/>
        <input type="text" onChange={getNewPassword}/><br/>
        <Button variant="primary" onClick={resetPassword}>
          Reset Password
          </Button>
      </form>
     
      </Modal>
  </>
  )
}

export default NavbarComponent




