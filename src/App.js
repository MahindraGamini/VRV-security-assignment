import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/forms/Login";
import ProtectedRoute from "./protectedRoute";
import DashBoard from "./pages/DashBoard";
import Unauthorized from "./pages/Unauthorized";
import UserDashBoard from "./pages/UserDashBoard";
import Following from "./pages/Following";
import WriteBlog from "./pages/Write";
import PastBlogs from "./pages/PastBLogs";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<Login />} />

          <Route path="/unathorized" element={<Unauthorized/>}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={'admin'}>
                <DashBoard />
              </ProtectedRoute>
            }
          />

          <Route path="/user" element={
            <ProtectedRoute allowedRoles={'user'}><UserDashBoard/></ProtectedRoute>
          }></Route>
              <Route path="/user/following" element={<ProtectedRoute allowedRoles={'user'} ><Following/></ProtectedRoute>}></Route>



              <Route path="/creator" element={
                <ProtectedRoute allowedRoles={'vendor'}> <PastBlogs/> </ProtectedRoute>  
              }/>
               <Route path="/creator/write" element={
                <ProtectedRoute allowedRoles={'vendor'}> <WriteBlog/> </ProtectedRoute>  
              }/>
           
        </Routes>


      </BrowserRouter>
    </div>
  );
};

export default App;
