import React, { useContext, useEffect } from "react";
import {Container , Row , Col} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import LimitBar from "../components/LimitBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceApi";
import Pages from "../components/Pages";


const Shop = observer( () => {
    const {devices} = useContext(Context);
   

    // useEffect(()=>{

        // fetchTypes(devices.selectedType.id , devices.selectedBrand.id , devices.page , devices.limit).then( (data)=> devices.setTypes(data));
        // fetchBrands().then((data)=> devices.setBrands(data)  );
    // }, []);

    // useEffect(()=>{
    //     fetchDevices(devices.selectedType.id , devices.selectedBrand.id , devices.page , devices.limit).then((data)=>{
    //     devices.setDevices(data.rows);
    //     devices.setTotalCount(data.count);
    //     } );
    // }, [devices.page]);
    
    useEffect(()=>{
        fetchTypes(devices.selectedType.id , devices.selectedBrand.id , devices.page , devices.limit).then( (data)=> devices.setTypes(data));
        fetchBrands().then((data)=> devices.setBrands(data)  );
        fetchDevices(devices.selectedType.id , devices.selectedBrand.id , devices.page , devices.limit).then((data)=>{
        devices.setDevices(data.rows);
        devices.setTotalCount(data.count);
        } );
    }, [ devices.page , devices.selectedType , devices.selectedBrand , devices.limit]);
    



    return ( 
    <Container>
        <Row className="mt-3">
            <Col md={3}>
                <TypeBar />
                <LimitBar/>
            </Col>
            <Col md={9}>
                <BrandBar />
                <DeviceList/>
            </Col>
        </Row>
            {
                devices.totalCount > devices.limit &&
        <Row> 
            <Col className="p-5 justify-content-center d-flex">
                <Pages/>
            </Col>
        </Row>
            }         
    </Container> 
    );
} )
 
export default Shop;