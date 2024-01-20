import React , {useContext, useEffect, useState} from "react";
import { Button, Modal , Form, Dropdown, Row, Col } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { createDevice } from "../../http/deviceApi";


const CreateDevice =  ({show , onHide}) => {
    const {devices} = useContext(Context);
    
    const [info , setInfo] = useState([]);
    const [name , setName] = useState('');
    const [price , setPrice] = useState(0);
    const [file , setFile] = useState( null);

    const [selectedType , setSelectedType] = useState({});
    const [selectedBrand , setSelectedBrand] = useState({});
    


    const addInfo = ()=>{
        setInfo([...info , {title:"", description:"" , number: Date.now()} ]);
    }

    const removeInfo = (number)=>{
        setInfo(info.filter((i)=>i.number !== number) );
    }

    const selectFile = (e)=>{
        setFile(e.target.files[0]);
    }

    const changeInfo = (key, value , number)=>{
        setInfo(info.map( (i)=> i.number === number ? { ...i , [key]: value }  : i   ));
   
    }

    const addDevice = ()=>{
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', selectedBrand.id);
        formData.append('typeId', selectedType.id);
        formData.append('info', JSON.stringify(info));
       
        // createDevice(formData).then((data)=>console.log(2222)) ;
        createDevice(formData).then((data)=>onHide()) ;
    }
 
    return ( 
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый устройство</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="my-2" >
                        <Dropdown.Toggle variant="outline-success">
                            {selectedType.name  ||
                             'Выберите тип'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            {devices.types.map((type)=>(
                                 <Dropdown.Item 
                                    onClick={()=>setSelectedType(type)} 
                                    active={type.id === selectedType.id}
                                    key={type.id}>
                                    {type.name}
                                </Dropdown.Item>
                            ))} 
                        </Dropdown.Menu>

                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-success">
                            { selectedBrand.name || 'Выберите Брэнд'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {devices.brands.map((brand)=>(
                                <Dropdown.Item
                                    active={brand.id === selectedBrand.id}
                                    onClick={()=> setSelectedBrand(brand)}
                                    key={brand.id}>
                                    {brand.name}
                                </Dropdown.Item>
                            ))} 
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="my-2"
                        placeholder="Введите названия  устройство"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <Form.Control
                        type="number"
                        className="my-2"
                        placeholder="Введите стоимость устройства"
                        value={price}
                        onChange={(e)=>setPrice(Number(e.target.value))}
                        
                    />
                    <Form.Control
                        type="file"
                        className="my-2"
                        onChange={selectFile}
                        
                    />
                    <hr /> 
                    <Button 
                        variant="outline-dark"
                        onClick={addInfo}
                        >
                        Добавить новое свойство
                    </Button>
                    {
                        info && info.map((i)=>(
                            <Row className="mt-4" key={i.number} >
                                <Col md="4">
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e)=>{
                                            changeInfo('title', e.target.value , i.number);
                                        }}
                                        placeholder="Введите название свойства"
                                    />
                                </Col>
                                <Col md="4">
                                    <Form.Control 
                                        value={i.description}
                                        onChange={(e)=>{
                                            changeInfo('description', e.target.value, i.number);
                                        }} 
                                        placeholder="Введите описание свойства"
                                    />
                                </Col>
                                <Col md="4">
                                    <Button
                                        onClick={()=>{
                                            removeInfo(i.number);
                                        }}
                                        variant="outline-danger"
                                        >                                      
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        ))
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button  variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-sucsess" onClick={addDevice}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>  
     );
} 
 
export default CreateDevice;