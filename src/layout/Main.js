import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Main = () => {
     return (
          <div>
               <nav className='text-center'>
                    <Link className='me-4' to='/login'>Log in</Link>
                    <Link className='me-2' to='/register'>Register</Link>
               </nav>
               <Outlet></Outlet>
          </div>
     );
};

export default Main;