import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Route,RouterProvider,createRoutesFromElements} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import Store from './store/Store.tsx';
import Login from './pages/Auth/Login.tsx';
import Register from './pages/Auth/Register.tsx';
//private route;
import PrivateRoute from './components/PrivateRoute.tsx';
import Profile from './pages/User/Profile.tsx';
import AdminRoute from './pages/Admin/AdminRoute.tsx';
import UserList from './pages/Admin/UserList.tsx';

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
      </Route>

      {/**Admin Routes */}
      <Route path='/admin' element={<AdminRoute/>}>
        <Route path='/admin/userlist' element={<UserList/>}/>
      </Route>
      
    </Route>
  )
);
createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <Provider store={Store}>
     <RouterProvider router={AppRouter}/>
    </Provider>
   </StrictMode>
)
