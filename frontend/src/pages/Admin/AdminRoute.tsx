import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute:React.FC = () => {
    const {userInfo} = useSelector((state:RootState)=>state.auth);
  return userInfo && userInfo.isAdmin ? (
    <Outlet/>
  ) : (
    <Navigate to="/login" replace/>
  )
}

export default AdminRoute;