import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


// server side logics 
import Product from "@/Models/Product.js";
const mongoose = require('mongoose');


const Tshirts = ({products}) => {
  console.log(products);
  console.log(Object.keys(products));
  return (
    <>
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto ">
    <div className="flex flex-wrap px-10 -m-4 mt-2">
    {Object.keys(products).map((item)=>{
return<Link key={products[item]._id} href={`./product/${item.slug}`} className="block m-auto my-2 ">
<div className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
  <div className="block relative rounded overflow-hidden">
    <Image 
      className="object-cover object-center w-full h-full"
      height={300} 
      width={400} 
      alt="category" 
      src={'/tshirt.jpg'} 
    />
  </div>
  <div className="p-4">
    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
    <p className="mt-1">{products[item].price}</p>
    <div className="flex flex-wrap justify-start my-2 space-x-1">
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">{products[item].size.includes('s') && <span>S</span>}</button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">{products[item].size.includes('m') && <span>M</span>}</button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">{products[item].size.includes('l') && <span>L</span>}</button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">{products[item].size.includes('xl') && <span>XL</span>}</button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">{products[item].size.includes('xxl') && <span>XXL</span>}</button>
    </div>
    <div className="flex flex-wrap justify-start my-2 space-x-1">
    <div className="flex">
          {products[item].color.includes('green') && <button className=" bg-green-500 border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes('blue') && <button className=" bg-blue-500 border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes('black') && <button className=" bg-black border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes('red') && <button className=" bg-red-500 border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>}
          {products[item].color.includes('orange') && <button className=" bg-orange-500 border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>}
          </div>
    </div>
  </div>
</div>
</Link>

    })}
    </div>
  </div>
</section>
    </>
  )
}

// server side rendering 

export async function getServerSideProps() {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
  }
    let products =  await Product.find({category : 'tshirt' });
    let tshirt = {};
     for(let item of products){
        if(item.title in tshirt){
          if(!tshirt[item.title].color.includes(item.color) && item.availableQuantity > 0 ){
             tshirt[item.title].color.push(item.color);
          }
          if(!tshirt[item.title].size.includes(item.size) && item.availableQuantity > 0){
            tshirt[item.title].size.push(item.size);
          }
        }
        else {
          tshirt[item.title] = JSON.parse(JSON.stringify(item));
          if(item.availableQuantity > 0){
             tshirt[item.title].color = [item.color];
             tshirt[item.title].size = [item.size];
          }
        }
     }
  return {
    props: {products: JSON.parse(JSON.stringify(tshirt)) }
  }
  
}

export default Tshirts
