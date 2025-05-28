// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SecurityGuardProvider } from './contexts/SecurityGuardProvider';
import LayoutWrapper from './pages/navigationStructure/LayoutWrapper';
import Login from './pages/authPages/loginScreen/Login';
import Forgotpassword from "./pages/authPages/forgotPasswordScreen/Forgotpassword";
import ChangeOTP from "./pages/authPages/otpScreen/ChangeOTP";
import ResetPassword from "./pages/authPages/resetPasswordScreen/ResetPassword";
import Registration from './pages/authPages/registationScreen/Registration';
import NavigationLayout from './pages/navigationStructure/NavigationLayout';
import PageNotFound from './pages/navigationStructure/PageNotFound';

const App = () => (
  <SecurityGuardProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<Forgotpassword />} />
        <Route path="/changeOtp" element={<ChangeOTP />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/registration" element={<Registration />} />

        <Route element={<LayoutWrapper />}>
          <Route path="/*" element={<NavigationLayout />} />
        </Route>

        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  </SecurityGuardProvider>
);

export default App;