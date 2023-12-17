import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const RegisterEmployee = () => {

  const [data, setdata] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    salary: '',
  });

  const navigate=useNavigate();

  const handleSubmit = async (e) => {

    {/*to prevent default behaviour of form */}
    e.preventDefault();
     

    {/*checking if any of the field is empty, then return */}
    const isFormFilled = Object.values(data).every((field) => field !== '');
    if (!isFormFilled) {
      toast.error('Please fill in all fields.');
      return;
    }


    {/*Here, I am handling update of employee through add employee page, so if there is any employee stored in local storage, then just update its detials and, reset local storage */}
    const updateEmployee = localStorage.getItem('updateEmployee');

    if (updateEmployee) {
        {/*hit update employee API */}
      const id = data._id;
      const response = await axios.put(
        `https://panicletech.onrender.com/api/employee/update/${id}`,
        data
      );

      if (response.status === 422) {
        navigate("/Allemployees");
      }

      toast.success('Employee data edit successfully');
      localStorage.removeItem('updateEmployee');
       navigate("/Allemployees")
     
    } 
    else {
      {/*if there is no employee in local storage, then, there is request for adding new employee, then , hit add employee API  */}
      const response = await axios.post(
        'https://panicletech.onrender.com/api/employee/register',
        data
      );
      
      if (response.status === 422) {
        navigate("/register");
        toast.error("User already exist");
      }
      toast.success('Employee added successfully 👍');
    }
    setdata({
      name: '',
      email: '',
      department: '',
      position: '',
      salary: '',
    });
  };

  useEffect(() => {
    
  {/*getting employee data from local storag, and if it is exist , then set it to form data for updatation */}
    const updateEmployee = localStorage.getItem('updateEmployee');
    if (updateEmployee) {
      const employeeData = JSON.parse(updateEmployee);
      setdata(employeeData);
    }
  }, []);


  {/*handle on change of all the fields */}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-content-center">
      <Form
        onSubmit={handleSubmit}
        className="p-4 rounded-4 shadow-sm w-75 bg-white"
      >
        <h2 className=" mx-auto w-100">Employee Form</h2>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Department"
            name="department"
            value={data.department}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPosition">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Position"
            name="position"
            value={data.position}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSalary">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Salary"
            name="salary"
            value={data.salary}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default RegisterEmployee;