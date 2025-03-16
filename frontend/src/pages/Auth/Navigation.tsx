import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoMdLogOut } from "react-icons/io";
import { FiMenu } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../store/api/UserApiSlice';
import { logout } from '../../store/slices/AuthSlice';
import { RootState } from '../../store/Store';

const Navigation: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl bg-gradient-to-l from-yellow-500 via-blue-500 to-indigo-500 text-transparent bg-clip-text font-bold">Auth</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          {userInfo && (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center">
                {userInfo.username} {isDropdownOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded shadow-lg p-2">
                  {userInfo?.isAdmin && (
                    <>
                      <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-600">Dashboard</Link>
                      <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-600">Users</Link>
                    </>
                  )}
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-600">Profile</Link>
                  <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 hover:bg-gray-600 flex items-center">
                    Logout <IoMdLogOut className="ml-2" />
                  </button>
                </div>
              )}
            </div>
          )}
          {!userInfo && (
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/register" className="hover:text-gray-400">Register</Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden focus:outline-none">
          <FiMenu size={24} />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 p-4 space-y-3">
          <Link to="/" className="block hover:text-gray-400">Home</Link>
          {userInfo && (
            <>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="block w-full text-left">
                {userInfo.username} {isDropdownOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
              </button>
              {isDropdownOpen && (
                <div className="pl-4 space-y-2">
                  {userInfo?.isAdmin && (
                    <>
                      <Link to="/admin/dashboard" className="block hover:text-gray-400">Dashboard</Link>
                      <Link to="/admin/userlist" className="block hover:text-gray-400">Users</Link>
                    </>
                  )}
                  <Link to="/profile" className="block hover:text-gray-400">Profile</Link>
                  <button onClick={logoutHandler} className="block w-full text-left hover:text-gray-400 flex items-center">
                    Logout <IoMdLogOut className="ml-2" />
                  </button>
                </div>
              )}
            </>
          )}
          {!userInfo && (
            <>
              <Link to="/login" className="block hover:text-gray-400">Login</Link>
              <Link to="/register" className="block hover:text-gray-400">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
