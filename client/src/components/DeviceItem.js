import React from "react";
import {Card, Col, Image} from "react-bootstrap";
import Star from "../assets/img/star.png";
import { DEVICE_ROUTE } from "../utils/constants";

// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const DeviceItem = ({device}) => {

    // const {history} = useHistory();
    const navigate = useNavigate();
 
    return (
        <Col md={3} onClick={()=>navigate(`${DEVICE_ROUTE}/${device.id}`)}>
            <Card
                style={{width: 150, cursor:"pointer"}}
                border="light"
                className=""
                key={device.id}>
                    <Image 
                        width={150} height={150}
                        alt={device.name} 
                        src={`${process.env.REACT_APP_API_URL}${device.img}`} />
                <div 
                className="d-flex w-auto justify-content-between mt-2">
                    <div className="text-black-50">Samsung</div>
                    <div  className="d-flex align-items-center">
                        <div className="">{device.rating}</div>
                        <Image style={{marginLeft: "3px" ,width: "17px", height:"17px"}} src={Star} alt={device.rating} />
                    </div>
                </div>
                <div>
                    {device.name}
                </div>
                <div>Price:{device.price}</div>
            </Card>
        </Col> 
      
     );
}
 
export default DeviceItem;