import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const Main = () => {
      return (
            <div>
                  <div className='w-full'>
                        <Navbar></Navbar>
                  </div>
                  <div className='min-h-screen mt-20'>
                        <Outlet></Outlet>
                  </div>
                  <Footer></Footer>
            </div>
      );
};

export default Main;