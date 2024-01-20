import React, { useEffect, useState } from "react";
import { Container , Col, Row, Image, Card, Button } from "react-bootstrap";

import { useParams  } from "react-router-dom";
import { observer } from "mobx-react-lite";

import bigStar from "../assets/img/bigstar.png" ;
import { fetchOneDevice } from "../http/deviceApi";

const DevicePage = observer( () => {
    
    const [device , setDevice] = useState({info:[]});
    const {id} = useParams();

    useEffect(()=>{
       fetchOneDevice(id).then( (data)=>{
        setDevice(data);
       } );
       
    }, [])


    return ( 
    <Container className="mt-3">
        <Row className="d-flex">
            <Col md={4}>
            {
                process.env.REACT_APP_API_URL && device.img ? 
                <Image width={300} height={300} src={`${process.env.REACT_APP_API_URL}${device.img}`} />
                : ''
            }        
            </Col>
            <Col md={4}>
                <Row>
                    <h2>
                        {device.name}
                    </h2>
                    <div 
                        style={{ fontSize: 64,width: 240 , height: 240  ,
                            background: `url(${bigStar}) center center / cover    no-repeat`}}
                        className="d-flex align-items-center justify-content-center"
                        >
                        {device.rating}
                    </div>
                </Row>         
            </Col>
            <Col md={4}>
                <Card
                style={{widht: 300 , height: 300 , fontSize: 32,border:"5px solid lightgrey"}}
                className="d-flex p-2 flex-column align-items-center justify-content-center">
                    <h3>
                        {
                        `От: ${device.price} руб.`
                        }   
                    </h3>
                    <Button variant="outline-dark" className="">
                        Добавить в корзину.
                    </Button>
                </Card>
            </Col>
        </Row>
        <Row className="d-flex flex-column m-3">
            <h2>Характиристики</h2>
            {
                device.info.map( (info, index)=>{
                    return(
                        <Row
                            className="d-flex p-2 justify-content-between flex-row w-100" 
                            style={{backgroundColor: index % 2===0 ? 'lightgrey' : 'transparent'}}
                            key={info.id}
                            >
                            <span className="w-50 ">{info.title}</span>
                            <span className="w-50 ">{info.description}</span>
                        </Row>
                    )
                })
            }
        </Row>
    </Container>
    )
} );
 
export default DevicePage;