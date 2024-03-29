import React, { useState }  from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createType } from "../../http/deviceApi";


const CreateType = ({show , onHide}) => {

    const [value , setValue] = useState('');

    const addType = ()=>{
        createType({name: value}).then( (data)=>{
            // console.log(data);
            setValue('');
            onHide();
        } )
    }



    return ( 

        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    placeholder="Введите названия типа"/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button  variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addType}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    
     );
}
 
export default CreateType;