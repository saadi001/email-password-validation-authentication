import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase.init';

const auth = getAuth(app);

const RegisterReactBoostrap = () => {
     const [error, setError] = useState('');
     const [success, setSuccess] = useState(false);

     const handleRegister = event => {
          event.preventDefault();
          setSuccess(false)

          const form = event.target;

          const email = form.email.value;
          const password = form.password.value;
          console.log(email, password);
          //     password validation 
          if (!/.{6}/.test(password)) {
               setError('password should be at least 6 character.');
               return;
          }
          if (!/(?=.*[A-Z])/.test(password)) {
               setError('please provide at least one uppercase.');
               return;
          }

          if (!/(?=.*[!@#$%&*])/.test(password)) {
               setError('password should contain one special character.');
               return;
          }
          setError('');

          createUserWithEmailAndPassword(auth, email, password)
               .then(result => {
                    const user = result.user;
                    setSuccess(true);
                    form.reset();
                    verifyEmail();
                    console.log(user);
               })
               .catch(error => {
                    console.error('error', error);
                    setError(error.message)
               })
     }

     const verifyEmail = () =>{
          sendEmailVerification(auth.currentUser)
          .then(() =>{
               alert('please check your email and verify')
          })
     }

     return (
          <div className='w-50 mx-auto mt-5'>
               <Form onSubmit={handleRegister}>
                    <h3 className='text-primary'>Please register!!</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                         <Form.Label>Email address</Form.Label>
                         <Form.Control type="email" name='email' placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                         <Form.Label>Password</Form.Label>
                         <Form.Control type="password" name='password' placeholder="Password" required />
                    </Form.Group>

                    <p><small className='text-danger text-center'>{error}</small></p>
                    {success && <p className='text-success'>user created successfully. </p>}
                    <Button variant="primary" type="submit">Register</Button>
                    <p><small>already have an account? Please <Link to='/login'>log in.</Link></small></p>
               </Form>
          </div>
     );
};

export default RegisterReactBoostrap;