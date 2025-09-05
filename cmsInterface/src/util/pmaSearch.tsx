import magnifier from "../assets/magnifier2.png"
import { Form } from "react-bootstrap";


const PMASearch = (props) =>


{
    return (

<div style={{position:"relative"}}>
                    <img src={magnifier} style={{position:"absolute", margin:"5px 0px 0px 7px"}}></img>
                    <Form.Control type="search" placeholder="Search..." value={props.value} onChange={(e)=>props.onChange(e)} style={{paddingLeft: "37px", marginLeft: "4px"}}></Form.Control>
                    </div>

    )
}

export default PMASearch;