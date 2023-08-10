import Navbar from "./Components/Navbar";
import {FiSearch} from "react-icons/fi"
import {AiOutlinePlusCircle} from "react-icons/ai"
import { useEffect, useState } from "react";
import {collection, getDoc, getDocs, onSnapshot} from 'firebase/firestore';
import {db} from './config/Firebase';
import ContactCard from "./Components/ContactCard";
import AddUpdate from "./Components/AddUpdate";
import UseDisclose from "./Hooks/UseDisclose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactFound from "./Components/ContactFound";


function App() {
  
const [contacts,setcontacts]=useState([]);

const {isOpen,onOpen,OnClose}=UseDisclose();


useEffect(()=>{
const getcontacts=async()=>{
  try {
    const contctscollection=collection(db, "contacts");
    

    onSnapshot(contctscollection,(snapshot)=>{
      const contactslist=snapshot.docs.map((doc)=>{
        return{
          id:doc.id,
          ...doc.data(),
        }
      });
      setcontacts(contactslist);
      return contactslist;
    })

    
  } catch (error) {
    
  }
}
getcontacts();
},[])

const filter=(e)=>{
  const value=e.target.value;
  const contctscollection=collection(db, "contacts");
    

  onSnapshot(contctscollection,(snapshot)=>{
    const contactslist=snapshot.docs.map((doc)=>{
      return{
        id:doc.id,
        ...doc.data(),
      }
    });
    const filtered=contactslist.filter(contact =>contact.name.toLowerCase().includes(value.toLowerCase()))

    setcontacts(filtered);
    return filtered;
})
}

  return (
    <>
    <div className="max-w-[370px] mx-auto px-4">
 <Navbar></Navbar>
<div className="flex gap-2">
<div className="relative flex items-center flex-grow">
 <FiSearch className="ml-1 absolute text-2xl text-white"></FiSearch>
  <input onChange={filter} type="text" className="text-white pl-10 h-10 flex-grow border-white rounded-md border bg-transparent"></input>
 </div>
  <AiOutlinePlusCircle onClick={onOpen} className="text-white text-5xl cursor-pointer">Add</AiOutlinePlusCircle>
 
</div>
<div className="mt-4 gap-3 flex flex-col">
  {contacts.length <= 0? (<ContactFound></ContactFound>):
  (contacts.map((contact)=>(
    <ContactCard key={contact.id} contact={contact}></ContactCard>
  )))}
</div>
    </div>
    <div>
      <AddUpdate isOpen={isOpen} OnClose={OnClose}></AddUpdate>
      <ToastContainer
      position="bottom-center"
      ></ToastContainer>
    </div>
    </>
  );
}

export default App;
