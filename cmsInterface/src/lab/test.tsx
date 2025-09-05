import { useCallback, useContext, useEffect, useRef } from "react"
import { useDebugValue } from "react"
import { useId } from "react"
import { useState } from "react"
import { useAsyncError } from "react-router-dom"
import { UseDispatch } from "react-redux"
import { fetchPages } from "../Pages/pageService"
import { useDispatch } from "react-redux"
import { loadPages } from "../Editor/editorSlice"
import { useAppSelector } from "../hooks"
import { Button, FormControl } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { createContext } from "react";
import Pagination from 'react-bootstrap/Pagination';

import PMASearch from "../util/pmaSearch"


const UserContext = createContext()
const Test  = () =>  {
    const [c, setC] = useState(0)
    const id = useId()
    const id2 = useId()
    const id3 = useId()
    const [show,  setShow] = useState(false)
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    let t = 0
    const pages = (state=> state.pages)
    
    const [user, setUser] = useState("Jesse Hall");
    const clicks = useRef(0)
    const dispatch = useDispatch()
    useCallback(()=>{dispatch(loadPages())}, [c])

    const [n, setN] = useState(1)
    const [val, setVal] = useState ("")

    const handle = (v : number) => {setN(v); console.log(v)}
    const handleChange = (e) => setVal(e.target.value)
    return (
<>

<input type="date">
</input>

<input type="time">
</input>

<input type="datetime-local">
</input>


<input type="search">
</input>

<PMASearch value={val} onChange={handleChange} ></PMASearch>


<label>
  Password:
  <input
    type="password"
    aria-describedby={id}
  />
</label>
<p id={id}>
  The password should contain at least 18 characters
</p>
<button onClick= {()=> setC(Math.round(Math.random()* 100))}>change c </button>
<button onClick= {()=> {clicks.current = clicks.current + 1; t +=1} }>
    click here
</button>

<button onClick = {()=> {setA(clicks.current); setB(t) }} >
    result 
</button>
<br/>
number of clicks {clicks.current} <br></br>
numbe of clicks {a} <br></br>
number of clicks since render {b} <br></br>

random number {c}<br></br>

<button onClick ={()=>{setShow(true); setTimeout(()=> setShow(false), 2000)}} >show temp text</button>
{ show ?
<p>
    temp text that show for 2 secs
</p>

:
""
}

<FormControl type="date" ></FormControl>
<FormControl type="color"></FormControl>
<FormControl type="time"></FormControl>
<FormControl.Feedback type="valid">uno dos tre</FormControl.Feedback>
aqui!!!!!
<FormControl type="date" ></FormControl>


{Date().toString()}


<UserContext.Provider value={user}>
<A></A>
</UserContext.Provider>
<div style={{width:"100px", height:"100px", backgroundColor:"red", borderRadius:"40%" }}></div>

<PMAPagination handleClick={handle} number={n} numberOfItems= {100}  block={10}></PMAPagination>

<PMAPagination handleClick={()=> {}} number={n} numberOfItems= {100}  block={10}></PMAPagination>
<PMAPagination handleClick={()=> {}} number={n} numberOfItems= {0}  block={10}></PMAPagination>
    </>

    )
}


function A(){

    const user = useContext(UserContext);
    return (
    
    <h1>{user}</h1>)
}


function PMAPagination (props){

    const numPage = props.numberOfItems % props.block == 0 ?  (props.numberOfItems / props.block) : Math.floor(props.numberOfItems / props.block ) + 1
    return (
<>

        {numPage} /  {props.numberOfItems}
        <br/>
    page: {props.number} ...    
    <Pagination>
      <Pagination.First disabled={props.number==1} onClick={()=>props.handleClick(1)}/>
      <Pagination.Prev disabled={props.number==1} onClick={()=>props.handleClick(props.number - 1)} />

        { props.number == numPage && numPage > 2 ? <Pagination.Item onClick={()=> props.handleClick(numPage-2)}>{numPage -2}</Pagination.Item> : "" }
        { props.number > 1 ? <Pagination.Item onClick={()=> props.handleClick(props.number -1)}>{props.number -1 }</Pagination.Item> : "" }
        { props.number !=  0 ? <Pagination.Item active>{props.number}</Pagination.Item> : <Pagination.Item disabled >1 </Pagination.Item> }
        { props.number < numPage ? <Pagination.Item onClick={()=>props.handleClick(props.number +1)}>{props.number + 1 }</Pagination.Item> : "" }
        { props.number == 1  && numPage > 2 ? <Pagination.Item onClick={()=>props.handleClick(3)}>3</Pagination.Item> : "" }

      <Pagination.Next  disabled={props.number==numPage} onClick={()=>props.handleClick(props.number + 1)}/>
      <Pagination.Last  disabled={props.number==numPage} onClick={()=>props.handleClick(numPage)} />
    </Pagination>




</>
);
}


export default Test