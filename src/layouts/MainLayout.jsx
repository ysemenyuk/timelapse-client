import React from 'react';
import { Outlet } from 'react-router-dom';
import ModalWrapper from '../components/Modals/Modal';
import NavBar from '../components/Navbar/Navbar';

function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <ModalWrapper />
    </>
  );
}

export default MainLayout;
