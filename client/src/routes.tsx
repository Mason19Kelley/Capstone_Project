import React from 'react';
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/Login/LoginPage'
import CreateOrg from './pages/CreateOrg/CreateOrg'
import NotFound from './pages/NotFound/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import ForgetPass from './pages/ForgetPass/ForgetPass';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import EditCourse from './pages/EditPage/Editcourse';
import CoursePage from './pages/CoursePage/CoursePage';
import CourseModule from './pages/CourseModule/CourseModule';
import CourseCompletion from './pages/CourseCompletion/CourseCompletion';



const AppRoutes: React.FC = () => {
  return (
    <Routes>


      <Route index element={<LoginPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/forget" element={<ForgetPass/>} />
      <Route path="/createorg" element={<CreateOrg />} />
      <Route path="/passwordReset" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      }/>
      <Route path="/courses/:id" element={
        <ProtectedRoute>
          <CoursePage />
        </ProtectedRoute>
      }/>
      <Route path="/editCourse/:id" element={
        <ProtectedRoute>
          <EditCourse />
        </ProtectedRoute>
      } />
      <Route path="/coursemodule/:courseId" element={
        <ProtectedRoute>
          <CourseModule />
        </ProtectedRoute>
      
      } />
      <Route path="/courseCompletion/:courseName/:id" element={
        <ProtectedRoute>
          <CourseCompletion />
        </ProtectedRoute>
      } />

    </Routes>
  );
};

export default AppRoutes;