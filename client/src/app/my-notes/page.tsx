"use client"
import { BASE_URL } from "@/Secrets";
import MyNotes from "@/components/MyNotes";
import Notes from "@/components/Notes";
import { useRouter } from "next/navigation";
// import { FunctionComponent, useEffect, useState } from "react";

// interface pageProps {
    
// }
 
// const page: FunctionComponent<pageProps> = () => {
//     const router= useRouter();
//     const [notes, setNotes]= useState([])

//     useEffect(()=> {
//         const fun = async()=> {
//             const res= await fetch(`${BASE_URL}/notes/${localStorage.getItem('userId')}`,{
//                 method:"GET",
//                 headers:{
//                     'Content-Type': 'application/json'
//                 }
//             });
//             if(!res.ok){
//                 throw new Error("Network problem!")
//             }
//             const data= await res.json();
//             //console.log(data);
//             setNotes(data);
//         }
//         if(localStorage.getItem('token')){
//             fun()
//         } else{
//             alert('No/Expired token, Login again!')
//             router.push('/signin')
//         }
            
//     },[])

//     return ( 
//       <div>
             
//     </div>
//      );
// }
 
// export default page;

import React, { useState } from 'react'

const page = () => {
   

  return (
    <div>
      <Notes  />
      {/* <MyNotes toggle= {toggle} /> */}
    </div>
  )
}

export default page
