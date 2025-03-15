import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuPanelLeftClose } from 'react-icons/lu';
import { FaHome, FaShoppingBag, FaHeart, FaCartPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { AiOutlineLogin } from 'react-icons/ai';
import { IoMdLogOut } from "react-icons/io";
import { IoPersonAddSharp } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../store/api/UserApiSlice';
import { logout } from '../../store/slices/AuthSlice';
import { RootState } from '../../store/Store';


const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const {userInfo} = useSelector((state : RootState)=> state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async ()=>{
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className='sidebar' style={{zIndex:999}}>
      {/* Mobile Menu Button */}
      <button onClick={toggleSidebar} className="md:hidden p-3 fixed top-4 right-4 bg-gray-800 text-white rounded-full shadow-lg">
        {isOpen ? <LuPanelLeftClose size={18} /> : <FiMenu size={18} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-60 bg-gray-700 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:static md:w-60 md:h-screen p-5 shadow-lg`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Navigate</h2>
          <button onClick={toggleSidebar} className="md:hidden">
            <LuPanelLeftClose size={22} />
          </button>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-3 text-lg font-semibold hover:text-gray-400">
            <FaHome size={20} /> Home
          </Link>
          <Link to="/shop" className="flex items-center gap-3 text-lg font-semibold hover:text-gray-400">
            <FaShoppingBag size={20} /> Shop
          </Link>
          <Link to="/cart" className="flex items-center gap-3 text-lg font-semibold hover:text-gray-400">
            <FaCartPlus size={20} /> Cart
          </Link>
          <Link to="/favourite" className="flex items-center gap-3 text-lg font-semibold hover:text-gray-400">
            <FaHeart size={20} /> Favourite
          </Link>
          <div className="w-full h-px bg-gray-400" />

          {userInfo && (
            <>
            <div onClick={toggleDropdown} className=' relative flex items-center justify-between mt-2 border p-2 rounded-lg cursor-pointer'>
              <button className=' flex items-center text-gray-800 focus:outline-none'>
                {userInfo ? <span className=' text-white'>{userInfo.username}</span> : <span></span> }
              </button>
              {isDropdownOpen ? <FaChevronUp size={14}/> : <FaChevronDown size={14}/>}
            </div>
            {isDropdownOpen && userInfo && (
              <div className=' bg-gray-600 rounded-lg p-2 space-y-3 transform'>
                {userInfo?.isAdmin && (
                  <ul className=' flex flex-col text-md font-mono border-b gap-y-2 text-gray-200'>
                  <Link to="/admin/dashboard">DashBoard</Link>
                  <Link to="/admin/productlist">Products</Link>
                  <Link to="/admin/orderlist">Orders</Link>
                  <Link to="/admin/category">Category</Link>
                  <Link to="/admin/categorylist">Items List</Link>
                  <Link to="/admin/userlist">Users</Link>
                  </ul>
                )}
                <Link className=' font-mono' to="/profile">Profile</Link>
                <button onClick={logoutHandler} className='flex items-center gap-2 cursor-pointer font-mono mt-1 '>
                  Logout <IoMdLogOut fill='silver'/>
                </button>
              </div>
            )}
            </>
          )}
          
          {!userInfo && (
            <div className=' mt-[22rem] space-y-4'>
                <Link to="/login" className="flex items-center gap-3 text-lg font-semibold hover:text-gray-400">
                  <AiOutlineLogin size={20} /> Login
                </Link>
                <Link to="/register" className="flex items-center gap-3 text-lg font-semibold hover:text-gray-400">
                  <IoPersonAddSharp size={20} /> Register
                </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
