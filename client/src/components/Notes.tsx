"use client"
import React, { useState } from 'react';
import { BASE_URL } from "@/Secrets";
import { useRouter } from "next/navigation";
import MyNotes from './MyNotes';
interface FormData {
  title: string;
  description: string;
}

const Notes: React.FC = () => {
  const [toggle, setToggle]= useState(false);
  console.log(toggle);
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
  });

  const router= useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fun = async()=> {
        const res= await fetch(`${BASE_URL}/notes`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                 'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData)
        });
        if(!res.ok){
            throw new Error("Network Problem!");
        }
        const data= await res.json();
        console.log(data);
        
        setToggle((prev)=> {
            const r= !prev
            return r
        });
        setFormData({
            title:'',
            description:''
        })
    }
    if(localStorage.getItem('token')){
        fun();
    }else{
        router.push('/signin')
    }
  };

  return (
    <div className=' flex flex-col gap-5'>
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title" className="block mb-2 font-semibold text-gray-600">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter title"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="description" className="block mb-2 font-semibold text-gray-600">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter description"
          rows={4}
          required
        />
      </div>
      <div className="mt-6">
        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Submit
        </button>
      </div>
    </form>
    <MyNotes toggle= {toggle} />
    </div>
  );
};

export default Notes;
