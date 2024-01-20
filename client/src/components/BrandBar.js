import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Card, Row } from "react-bootstrap";



const BrandBar = observer( () => {
    const {devices} = useContext(Context);

    return (
        <Row className="d-flex ">
            {
                devices.brands ? 
                devices.brands.map((brand)=><Card
                style={{
                    backgroundColor: brand.id === devices.selectedBrand.id ?
                    "#ddd" :"inherit" , 
                    cursor:  "pointer" ,
                    transition: "all 0.3s ease-in-out"  }}
                border={ 
                    brand.id === devices.selectedBrand.id ?
                     "danger" : "" }    
                onClick={()=>devices.setSelectedBrand(brand)} 
                className="p-3 w-auto me-2 mb-2"
                key={brand.id}
                >
                    {brand.name}
                </Card>) :
                <Card>список брендов не получен</Card>
            }
        </Row>
          );
    }
)
export default BrandBar;