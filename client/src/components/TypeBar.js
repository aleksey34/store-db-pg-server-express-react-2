import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { ListGroup } from "react-bootstrap";


const TypeBar = observer( () => {
    const {devices} = useContext(Context);
        return ( 
      <ListGroup>
        {
            devices.types ? devices.types.map( (type)=>{
                
                return <ListGroup.Item 
                style={
                    {cursor: "pointer" ,
                     transition:"all 0.3s ease-in-out"}}
                active={devices.selectedType.id === type.id}
                onClick={()=>devices.setSelectedType(type)} 
                key={type.id} 
                >
                    {type.name}
                    </ListGroup.Item>
            }) : <ListGroup.Item>Нет типов</ListGroup.Item>
        }
      </ListGroup>
        );
    }
)
 
export default TypeBar;