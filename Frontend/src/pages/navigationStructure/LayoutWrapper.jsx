import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AsideBar from './asideBar/AsideBar';
import HeaderMain from '../../components/header/HeaderMain';
// import Cookies from 'js-cookie'; // Import js-cookie

const LayoutWrapper = () => {
  const location = useLocation();
  const token = localStorage.getItem('adminId');

  // const a_token = Cookies.get('token'); // Get the token from the cookie
  // console.log("Layout Screen token", a_token);

  const hideAsideAndHeaderRoutes = [
    '/',
    '/forgotPassword',
    '/changeOtp',
    '/resetPassword',
    '/registration',
  ];

  const shouldHideAsideAndHeader = hideAsideAndHeaderRoutes.includes(location.pathname) || !token;

  if (shouldHideAsideAndHeader) {
    return <Outlet />;
  }

  return (
    <>
      <AsideBar />
      <HeaderMain />
      <div style={{ marginLeft: "280px", padding: "130px 25px 30px 30px", backgroundColor: "#f0f5fb", height: "1064px", boxSizing: "border-box"}} className='responsive-layout'>
        <Outlet />
      </div>
    </>
  );
};

export default LayoutWrapper;