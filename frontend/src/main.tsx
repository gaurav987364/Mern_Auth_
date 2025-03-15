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

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
    
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
      </Route>
      
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
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
