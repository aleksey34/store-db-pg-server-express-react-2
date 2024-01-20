import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './http/userApi';
import { Spinner } from 'react-bootstrap';

const App = observer( () => {

  const {user} = useContext(Context);
  const [loading , setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    check().then( (data)=>{
      if(data !== undefined && data && data.id){
        user.setUser(data);
        user.setIsAuth(true);
        
      }
   }).finally( ()=> setTimeout(function(){setLoading(false)}, 300) );
  
  } , []  );


  if(loading){
    return (
      <div
        style={{width: "100vw" , height: "100vh"}} 
      
        className='position-fixed  d-flex justify-content-center align-items-center'>
        <Spinner style={{width: "5rem", height: "5rem"}} variant='primary' animation='grow' />
      </div>
    ) 
  }
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <AppRouter/>          
      </div>
    </BrowserRouter>
  );
})

export default App;
