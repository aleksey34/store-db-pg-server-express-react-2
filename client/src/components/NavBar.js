import React, { useContext } from "react";
import { Context } from "..";


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/constants";
import {observer} from "mobx-react-lite";

// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const NavBar = observer( 
    () => {
    const {user} = useContext(Context);
       
    // const {history} = useHistory();
    const navigate = useNavigate();

    const logOut = ()=>{
        user.setIsAuth(false);
        user.setUser({});
        localStorage.setItem('token', '');
        // navigate(LOGIN_ROUTE);
    }
 
    return ( 
        <Navbar  expand="lg"  data-bs-theme="dark"
         className="bg-body-tertiary ml-auto" >
            <Container >
                <NavLink className={`nav-link text-white`} to={`${SHOP_ROUTE}`} >BuyDevice</NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="justify-content-end" >                
                <Nav
                className="my-2 my-lg-0 justify-content-end"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                    <NavLink className={`nav-link me-3`} to={`${SHOP_ROUTE}`}>Shop</NavLink>
                    {
                        user.isAuth ?
                        <> 
                            <Button 
                                onClick={()=>navigate(ADMIN_ROUTE)} 
                                className="me-lg-2" 
                                variant={"outline-light"}>
                                Админ Панель
                            </Button>
                            <Button  
                                className="me-lg-2 ms-auto d-flex align-items-center" 
                                variant={"outline-light"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                    </svg>
                                    <span>&nbsp; &nbsp;{user.user.email}</span>
                            </Button>
                            <Button onClick={logOut} 
                                className="me-lg-2" 
                                variant={"outline-light"}>
                            Выйти
                            </Button>  
                        </>   
                        :
                        <>
                            <Button onClick={()=>{navigate(LOGIN_ROUTE);}} className="me-lg-2" variant={"outline-light"}>
                                Авторизация
                            </Button>
                        </>                     
                    }           
                </Nav>       
                </Navbar.Collapse>
            </Container>
        </Navbar>
        );
    } 
)
 
export default NavBar;