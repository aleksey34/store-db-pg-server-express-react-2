import React, { useContext, useState }  from 'react';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink , useLocation} from 'react-router-dom';
import { LOGIN_ROUTE, REGISTER_ROUTE, SHOP_ROUTE } from '../utils/constants';
import { login, registration } from '../http/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const Auth = observer( () => {
   const location = useLocation();
   const isLogin = location.pathname === LOGIN_ROUTE ;


   const [email , setEmail] = useState('');
   const [password , setPassword] = useState('');
   const [error , setError] = useState('');


   const {user} = useContext(Context);

   
    const navigate = useNavigate();

    const click = async (e)=>{
        e.preventDefault();
        setError('');
        
        try {
            
            let data;

            if(isLogin){
                data = login(email , password);         
                
            }else{
                data = registration(email , password);   
            }
            data.then( (u)=>{
                if(u && u.id !== undefined && u.id){
                    setError('');
                    user.setUser(u);
                    user.setIsAuth(true);
                    navigate(SHOP_ROUTE);

                }else{
                
                    setError(u);
                }

            })
           

        } catch (error) {
            setError( error.response.data.message);
        }


    }


   
    return (
         <Container 
         className='d-flex justify-content-center align-items-center'
         style={{height: window.innerHeight - 54}}>
            <Card  style={{width: 600}}
            className='p-5'>
                <h2>{ isLogin ?  "Авторизация" :  "Регистрация"}</h2>
                <Form 
                className='d-flex flex-column' 
                >
                    
                    <Form.Control 
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value);
                            setError('');
                        }}
                        placeholder="Введите email"
                        className='mt-3'
                        type="email" />
                    <Form.Control 
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value);
                            setError('');

                        } }
                        placeholder="Введите пароль"
                        className='mt-3' 
                        type="password"/>
                    {
                    error ?                  
                      <Row className='text-danger pt-3 '>
                        <Alert variant='danger'>{error}</Alert>  
                      </Row> : ''
                    }
                      
                    <Row className='d-flex flex-row mt-3 justify-content-between'>
                       <div className='w-auto'>
                        {
                            isLogin  ?
                                <>
                                    <span>Нет аккауната? </span>
                                    <NavLink to={REGISTER_ROUTE} className="ms-3" >
                                        Зарегистрируйтесь!
                                    </NavLink>
                                </>
                            : 
                                <>
                                    <span>Есть аккаунт? </span>
                                    <NavLink to={LOGIN_ROUTE} className="ms-3" >
                                        Войдите!
                                    </NavLink>
                                </>   
                        }
                        </div>
                        <Button
                            variant="outline-dark"
                            className='w-auto' type="submit"
                            onClick={e=>click(e)}
                            >
                            
                                {
                                    isLogin ? "Войти" : "Регистрация"
                                }
                        </Button>
                    </Row>                 
                </Form>
            </Card>
        </Container> 
        );
} );

export default Auth;