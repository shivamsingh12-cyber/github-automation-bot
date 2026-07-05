import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { use } from 'react';
import { useEffect } from 'react';


const User = () => {
  
    const [users,setUser]=useState("");
    useEffect(()=>{
        const fetchuser=async()=>{
            const res= await axios.get("http://localhost:5000/");
            setUser(res.data);
        }
        fetchuser();
    },[])
  return (
    <div>
      show {users};
    </div>
  )
}

export default User
