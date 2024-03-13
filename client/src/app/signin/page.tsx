"use client"
import Signin from "@/components/Signin";
import { FunctionComponent } from "react";

interface pageProps {
    
}
 
const page: FunctionComponent<pageProps> = () => {
    return ( 
      <div >
         <Signin />    
        </div>
     );
}
 
export default page;