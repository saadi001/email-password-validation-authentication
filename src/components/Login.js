import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase.init';

const auth = getAuth(app);

const Login = () => {
     const [success, setSuccess] = useState(false);
     const [userEmail, setUserEmail] = useState('');

     const handleSubmit = (event) =>{
          event.preventDefault();
          setSuccess(false);
          const form = event.target;
          const email = form.email.value;
          const password = form.password.value;

          signInWithEmailAndPassword(auth, email, password)
          .then(result =>{
               const user = result.user;
               setSuccess(true);
               console.log(user);
          })
          .catch(error =>{
               console.error('error:', error);
          })
     }

     const handleEmailBlur = (event) =>{
          const email = event.target.value;
          setUserEmail(email);
          console.log(email);

     }

     const handleForgetPassword = () =>{
          if(!userEmail){
               alert('please enter your email first.')
          }
          sendPasswordResetEmail(auth, userEmail)
          .then(() =>{
               alert('password reset email sent. Please check your email')
          })
          .catch(error =>{
               console.log(error);
          })
     }

     return (
          <div className='w-50 mx-auto mt-5'>
               <h3 className='text-primary'>Please Log in!</h3>
               <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                         <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                         <input onBlur={handleEmailBlur} type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Write your email' required/>
                         
                    </div>
                    <div className="mb-3">
                         <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                         <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder='write your password' required/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Log in</button>
                    {success && <p>Successfully login!!</p>}
                    <p><small>New here? Please <Link to='/register'>register.</Link></small></p>
                    <p>Forget password?<button onClick={handleForgetPassword} type="button" className="btn btn-link">Reset</button> </p>
               </form>
          </div>
     );
};

export default Login;