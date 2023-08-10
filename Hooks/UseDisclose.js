import { useState } from "react";
function UseDisclose(){

    const [isOpen,setOpen]=useState(false);

const onOpen=()=>{
   setOpen(true)
}

const OnClose=()=>{
  setOpen(false)
}

  return{OnClose,onOpen,isOpen}
}
export default UseDisclose;