/* eslint-disable no-new-object */
// import React from 'react';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import validate from 'validate.js';
import "../component/Form.css";

const Form = () => {

const[emailError,setEmailError] = useState(null);
const[passwordError,setPasswordError] = useState(null);


  const constraints = {
    email: {
      presence: {
        message: "Cannot be blank."
      },
      email: {
        message: 'Please enter a valid email address'
      }
    },
    password: {
      presence: {
        message: "Cannot be blank."
      },
      length: {
        minimum: 5,
        message: 'Your password must be at least 5 characters'
      }
    }
  }
  
  


const validator = (field, value) => {

   
      // e.g. let object = {email: 'email@example.com'}
      let object = new Object()
      object[field] = value

      let constraint = new Object()
      constraint[field] = constraints[field]
      console.log(object, constraint)

      let result = validate({}, constraint)//
      if (value !== '' && value !== null) {//if null value it will return with the presence validation
         result = validate(object, constraint)
      }

    
      if (result) {
        // Return only the field error message if there are multiple
        return result[field][0]
      }

      return null
    }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
  let   errorEmail = validator('email', values.email);
    let  errorPassword = validator('password', values.password);
    console.log(errorEmail);
    console.log( errorPassword );
     setEmailError( errorEmail );
     setPasswordError( errorPassword  );
    },
  });

  return (
    <>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="form-control">
        <label htmlFor="email">Enter your Email: </label>
        <input
          type="email"
          id="email"
          // onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {emailError? <div className='error'>{emailError}</div> : null}
        </div>
        <div className="form-control">
        <label htmlFor="password">Enter your password:</label>
        <input
          type="password"
          id="password"
          onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          value={formik.values.password}
        />
          {passwordError ? <div className='error'>{ passwordError}</div> : null}
          </div>
          <div> 
        <input className='action' type="submit" />
        </div>
      </form>
    </>
  );
};

export default Form;
