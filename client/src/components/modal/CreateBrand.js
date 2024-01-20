import React, {useState}  from "react";
import { Button, Modal , Form} from "react-bootstrap";
import { createBrand } from "../../http/deviceApi";


const CreateBrand = ({show, onHide}) => {

    const [value , setValue] = useState('');

    const addBrand = ()=>{
        createBrand({name: value}).then( (data)=>{
            // console.log(data);
            setValue('');
            onHide();
        } )
    }

    return (
       
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить новый Брэнд</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control 
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                        placeholder="Введите названия Брэнда"/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  variant="outline-danger" onClick={onHide}>
                        Закрыть
                    </Button>
                    <Button variant="outline-success" onClick={addBrand}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>

     );

}
 
export default CreateBrand;