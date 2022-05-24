import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ModalWrapper from '../components/Modals/Modal';
import NavBar from '../components/Navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <ModalWrapper />
      <ToastContainer />
    </>
  );
}

export default MainLayout;
