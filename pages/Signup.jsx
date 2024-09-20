import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useRouter } from 'next/router'

const Signup = () => {
   
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const router = useRouter();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push(`${process.env.NEXT_PUBLIC_HOST}/`);
    }
  },[router])

  const handleChange = (e)=>{
    if(e.target.name == 'name'){
     setName(e.target.value);
    }
    else if(e.target.name == 'email'){
      setEmail(e.target.value);
    }
    else if(e.target.name == 'password'){
      setPassword(e.target.value);
    }
  }

  const handleSubmit =async (e)=>{
    console.log("Name: ", name);
    console.log("email: ", email);
    console.log("password: ", password);
    
    e.preventDefault();
    const formBody = {name , email , password };
  
    let request =  await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers : { 'Content-Type' : 'application/json'},
      body: JSON.stringify(formBody),
    });
    console.log(formBody);
    let response = await request.json();
    console.log(response);
    setName('');
    setEmail('');
    setPassword('');
    console.log("form submitted successfully")
    toast.success('User Created Successfully', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image className="mx-auto h-10 w-auto" alt="logo" src={'/tshirt.jpg'} width={20} height={20} />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>
        <div><p className="mt-4 text-center text-lg text-gray-500">
            or{' '}
            <Link href={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Login
            </Link>
          </p></div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST" onSubmit={handleSubmit} className="space-y-6">
          <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Enter your name
              </label>
              <div className="mt-2">
                <input   
                value={name}
                  onChange={handleChange}          
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="email"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input    
                value={email}
                   onChange={handleChange}             
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input  
                value={password}
                  onChange={handleChange}        
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default Signup
