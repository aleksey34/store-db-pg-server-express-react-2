import React, { useContext } from "react";
import { observer} from "mobx-react-lite";
import {  Row } from "react-bootstrap";
import { Context } from "..";
import DeviceItem from "./DeviceItem";


const DeviceList = observer( () => {
const {devices} = useContext(Context);

    return (
         <Row className="d-flex mt-4">
            {
                devices.devices ? 
                devices.devices.map( (device) =><DeviceItem
                    key={device.id} device={device}/> ) :
                <div>There are no devices yet</div> 
            }
         </Row> 
          );
});
 
export default DeviceList;