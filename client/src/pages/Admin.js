import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";

import CreateBrand from "../components/modal/CreateBrand";
import CreateDevice from "../components/modal/CreateDevice";
import CreateType from "../components/modal/CreateType";
import { fetchBrands, fetchTypes, fetchDevices } from "../http/deviceApi";
import { Context } from "..";


const Admin =  () => {
    const {devices} = useContext(Context);

    const [brandVisible , setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [typeVisible , setTypeVisible] = useState(false);

   useEffect(()=>{

    fetchTypes().then( (data)=> devices.setTypes(data));
    fetchBrands().then((data)=> devices.setBrands(data)  );
    fetchDevices().then((data)=> devices.setDevices(data.rows));
   
   }, [] );


    return (
        <Container> 
            <Row>
                <h1>Admin panel</h1>
            </Row>
            <Row className="d-flex justify-content-center">
                <Button onClick={setTypeVisible} variant="outline-dark" className=" mt-4 py-3" >Добавить тип</Button>
                <Button onClick={setBrandVisible} variant="outline-dark" className=" mt-4 py-3" >Добавить брэнд</Button>
                <Button onClick={setDeviceVisible} variant="outline-dark" className=" mt-4 py-3" >Добавить устройство</Button>
            </Row>
            <CreateBrand show={brandVisible} onHide={()=>setBrandVisible(false)}  />
            <CreateType  show={typeVisible} onHide={()=>setTypeVisible(false)}  />
            <CreateDevice show={deviceVisible} onHide={()=>setDeviceVisible(false)}  />
        </Container>
             );
} 
 
export default Admin;