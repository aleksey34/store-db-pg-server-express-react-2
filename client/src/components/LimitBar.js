import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { ListGroup, Form } from "react-bootstrap";


const LimitBar = observer( () => {
    
    const {devices} = useContext(Context);

    const maxLimit = process.env.REACT_APP_MAX_LIMIT_PRODUCT_PER_PAGE;

    const limitArray = [];
    for(let i = 1 ; i <= maxLimit; i++){     
        if(devices.limit !== i){
             limitArray[i]=i;
        }  
    }

      return ( 
      <ListGroup className="my-3">
        <Form.Text>
            Товаров на странице
        </Form.Text>
        <Form.Select 
        onChange={(e)=>devices.setLimit(Number(e.target.value))} 
        aria-label="Default select example">
            <option value={devices.limit} >{devices.limit}</option>
            {
            limitArray.map( (l)=>{    
                return (
                        <option key={l} value={l}>{l}</option>
                    ) 
            })
            }
        </Form.Select>
      </ListGroup>
        );
    }
)
 
export default LimitBar;