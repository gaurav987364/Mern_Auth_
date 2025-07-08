import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { useProfileMutation } from '../../store/api/UserApiSlice';
import { FaRegEye, FaSpinner } from 'react-icons/fa';
import { IoIosEyeOff } from 'react-icons/io';
import { toast } from 'react-toastify';
import { setCredentials } from '../../store/slices/AuthSlice';

const Profile = () => {
  const [username,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {userInfo} = useSelector((state:RootState)=>state.auth);

  const dispatch = useDispatch();
  const [updateProfile,{isLoading:loadingUpdateProfile}] = useProfileMutation();

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password does not match.")
      return;
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password
        }).unwrap();
        toast.success("User Updated Successfully.");
        dispatch(setCredentials({...res}));
      } catch (error) {
        toast.error("User Not Updated.")
        console.error(error);
      }
    }
  };

  useEffect(()=>{
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  },[userInfo.username,userInfo.email]);
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md shadow-lg rounded-2xl bg-white p-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Update User Info</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye size={20} /> : <IoIosEyeOff size={20}/>}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye size={20} /> : <IoIosEyeOff size={20}/>}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loadingUpdateProfile}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg"
          >
             {loadingUpdateProfile ? (
                  <FaSpinner size={20} className=" animate-spin"/>
              ) : (
                  <span>Update Info</span>
              )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile;