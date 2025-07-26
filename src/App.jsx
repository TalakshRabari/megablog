import { useState, useEffect } from 'react';
import './App.css'  
import { useDispatch } from 'react-redux';
import authService, { AuthService } from "./appwrite/auth/auth"
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
      
 useEffect(()=> {
      console.log("App component loaded!");
    
     authService.getCurrentUser()
     .then((userData)=> {
        // console.log(userData);
         if(userData){
              dispatch(login({userData}))
         }
         else{
          dispatch(logout())
         }
     })
     .finally(() => setLoading(false))
 }, [])

  return  !loading ? (
    <div className="min-h-screen flex flex-wrap content-betweem bg-green-400"> 
      <div className='w-full block'>
        <Header/>
        <main>
              <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
