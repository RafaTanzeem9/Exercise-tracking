import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProtectedRoute from "./components/ProtectedRoute";

import ProfileScreen from "./screens/ProfileScreen";
import ForrgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import UserTasks from "./screens/UserTasks";
function App() {
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return (
    <>
      <Toaster></Toaster>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedRoute redirectPath="/profile" userInfo={userInfo}>
                  <LoginScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute redirectPath="/login" userInfo={userInfo}>
                  <RegisterScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute redirectPath="/login" userInfo={!userInfo}>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/forgotPassword" element={<ForrgotPassword />}></Route>
            <Route
              path="/resetPassword/:token"
              element={<ResetPassword />}
            ></Route>
            <Route path="/task" element={<UserTasks />}></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
