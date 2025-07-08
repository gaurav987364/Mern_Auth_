import { useEffect, useState } from "react";
import { FaRegEye, FaSpinner } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../../store/api/UserApiSlice";
import { RootState } from "../../store/Store";
import { toast } from "react-toastify";
import { setCredentials } from "../../store/slices/AuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {userInfo} = useSelector((state:RootState)=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login,{isLoading}] = useLoginMutation();

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    try {
        const res = await login({email, password}).unwrap();
        console.log(res);
        dispatch(setCredentials({...res}));
        toast.success("Logged in successfully");
    } catch (error) {
        toast.error("Failed to login");
        console.error(error);
    }
  };

  useEffect(()=>{
    if(userInfo){
        navigate(redirect);
    }
  },[navigate,redirect,userInfo]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md shadow-lg rounded-2xl bg-white p-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg"
          >
            {isLoading ? (
                <FaSpinner size={20} className=" animate-spin"/>
            ) : (
                <span>Login🔐</span>
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <Link className="text-blue-500 hover:underline" to={redirect ? `/register?redirect=${redirect}` : `/register`}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
