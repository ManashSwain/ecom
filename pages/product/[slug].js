import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import Product from '@/Models/Product';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Slug = ({addToCart , product , variants , buyNow}) => {
  console.log('product is :' , product);
  console.log(variants);
    const router = useRouter();
    const {slug} = router.query ;
    
    const [pin , setPin] = useState();
    const [pinService , setpinService] = useState();

    const checkPincode = async()=>{
      let pinvalue = await fetch("http://localhost:3000/api/pincode");
      let pincheck = await pinvalue.json();
      if(pincheck.includes(parseInt(pin))){
         setpinService(true);
         toast.success('We deliver to this pincode', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          });
      }
      else{
        setpinService(false);
        toast.error('We do not deliver to this pincode', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    }

    const handleChange = (e)=>{
      setPin(e.target.value);
    }

    const [color , setColor] = useState(product.color);
    const [size , setSize] = useState(product.size);


    const refreshVaraint = (newsize,newcolor) => {
      
      let url = `http://localhost:3000/product/${variants[newcolor][newsize]['slug']}` ;
      window.location = url ;
    }
    
  return (
    <>
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
    
      <Image
      className=' cursor-pointer feature-image lg:w-1/3 h-1/3 w-full lg:h-1/3 object-cover object-center rounded'
      width={400}
      height={300}
      alt='ecommerce'
      src={'/hoodies.jpg'}
      />
      
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">thecomfywear.com</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
        <p className="leading-relaxed">{product.description}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex">
            <span className="mr-3">Color</span>
           {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={()=>{refreshVaraint(size , 'white')}} className={`border-2  rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'}`} ></button>}
           {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size)  && <button
      onClick={() => refreshVaraint(size, 'green')}
      className={`border-2 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${
        color === 'green' ? 'border-black' : 'border-gray-300'
      }`}
    ></button> }
           {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size)  && <button onClick={()=> refreshVaraint(size , 'blue')} className={`border-2  bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`} ></button>}
           {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size)  && <button className={`border-2  bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'black' ? 'border-black' : 'border-gray-300'}`} onClick={()=>refreshVaraint(size , 'black')}></button>}
           {Object.keys(variants).includes('orange') && Object.keys(variants['orange']).includes(size)  && <button onClick={()=>{refreshVaraint(size , 'orange')}} className={`border-2  bg-orange-500 rounded-full w-6 h-6 focus:outline-none ${color === 'orange' ? 'border-black' : 'border-gray-300'}`} ></button>}
         
          </div>

  

          <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select value={size} onChange={(e)=>{refreshVaraint(e.target.value , color)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                {Object.keys(variants[color]).includes('s') && <option value={'s'}>S</option>}
                {Object.keys(variants[color]).includes('m') && <option value={'m'}>M</option>}
                {Object.keys(variants[color]).includes('l') && <option value={'l'}>L</option>}
                {Object.keys(variants[color]).includes('xl') && <option value={'xl'}>XL</option>}
                {Object.keys(variants[color]).includes('xxl') && <option value={'xxl'}>XXl</option>}
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex">
          <span className="title-font mx-4 font-medium text-2xl text-gray-900">$58.00</span>

          <div className='flex'>
            
          <button className="flex ml-auto mx-4 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded" onClick={()=>{addToCart(slug, 1,  product.title ,476, size , color)}}>Add to Cart</button>
          <ToastContainer/>
          <button onClick={()=>{buyNow(slug, 1,  product.title ,476, size , color)}} className="flex ml-auto mx-4 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
          </div>  
        </div>
        <div className="pincode  my-5 p-3 flex">
            <input className='p-1 border-2 rounded-md border-blue-500 outline-none' type="text" onChange={handleChange}  placeholder='Enter your pincode' />
            <button  onClick={checkPincode}  className=" flex  mx-4 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check</button>
          </div>
          <div>
            {(!pinService && pinService != null  ) && <p className='text-red-600'>Sorry! We do not deliver to this pincode</p>}
            {(pinService && pinService != null  ) && <p className='text-green-600'>yay! This pincode is serviceable</p>}  
          </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
  }
    let product =  await Product.findOne({ slug : context.query.slug});
    let variants = await Product.find({ title : product.title});
     let colorsizeslug = {};
    //  sample object : {red: {xl : {slug : tshirt-xl}}}
    for(let item of variants){
      if(Object.keys(colorsizeslug).includes(item.color)){
        colorsizeslug[item.color][item.size] = {slug : item.slug};
      }
      else {
        colorsizeslug[item.color] = {};
        colorsizeslug[item.color][item.size] = {slug : item.slug};
      }
    }
  return { props: {product :JSON.parse(JSON.stringify(product)), variants : JSON.parse(JSON.stringify(colorsizeslug)) } }
}

export default Slug


