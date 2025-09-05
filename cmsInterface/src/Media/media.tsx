import { Tab, Tabs, Button, Row, Col, Modal, ModalTitle, FormControl, Form, Stack} from "react-bootstrap"
import { useState } from "react" 
import { FormCheck } from "react-bootstrap"
import img from '../assets/big.png'

function Media (){

    const [group, setGroup] = useState (["a","b","c","d","e","f","g", "h","i","j"]) 
    const [showAdding, setShowAdding ] = useState(false)
    const [file, setFile] = useState()
    const [type, setType] = useState("")
    const [name, setName] = useState()



    const fileAccept = () => {
        let value : string = "" 
      switch (type){
        case "image":
           value = ".jpg,.jpeg,.png,.svg,.webp "
            break
          case "document":
            value = ".doc,.docx,.pdf"
            break
          case "video":
            value = ".mp4,.ogg"
            break
          case "audio":
            value = ".mp3,.ogg"
            break
          
      }
          return value
    }


    return (<><div style={{background:"linear-gradient(90deg, rgba(7,64,241,1) 0%, rgba(65,105,225,1) 35%, rgba(117,145,227,1) 80%, rgba(223,228,242,1) 100%)", width:"120px", borderRadius:"10px"}}  ><h3 style={{color:"white"}}>Media</h3></div>
    <Tabs className="mb-3" defaultActiveKey="Image">
        <Tab eventKey="Image" title="Image">
            <Button onClick={()=>{setType("image");setShowAdding(true)}} size="sm" >New Document</Button> 

            <div style={{border:"1px black solid", height:"45vh", overflowY:"scroll", overflowX:"hidden", margin:"10px 0px 0px 0px"}}>
                <Row>
            {group.map((i,ind)=> <Col><div style={{width:"24vw", minWidth:"200px", margin:"10px", padding:"10px", border:'1px black solid'}}><FormCheck></FormCheck>
            <img style={{width:"80%"}} src={img}></img>
             <div>{i}</div></div></Col>)}
            </Row>
            </div>  
                   
        </Tab>
        <Tab eventKey="Video" title="Video">
            Video
        </Tab>
        <Tab eventKey="Audio" title="Audio">
            Audios
        </Tab>
        <Tab eventKey="Documents" title="Documents">
            Documents
        </Tab>

    </Tabs>


    <Modal show={showAdding}>
        <Modal.Header>
            <ModalTitle>Adding a {type}</ModalTitle>
        </Modal.Header>
        <Modal.Body>

            <Form>
                <Stack gap={3}>
            Name: <FormControl type="text" ></FormControl>
            <FormControl type="file" accept={fileAccept()}></FormControl>
                 </Stack>
            </Form>

        </Modal.Body>
        <Modal.Footer>
            <Button onClick={()=> setShowAdding(false)}>Cancel</Button><Button>Save</Button>
        </Modal.Footer>

    </Modal>
    </>)
}


export default Media