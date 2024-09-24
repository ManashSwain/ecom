import React , {useState} from 'react';
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';



const Checkout = ({ cart , addToCart , removeFromCart , subtotal}) => {

  const initiatePayment = async ()=>{
    let oid = Math.floor(Math.random()* Date.now()) ;
    const data = {cart , subtotal,oid , email : "email"};
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(data),
    })
    let txnres = await a.json();
    let txntoken = txnres.txntoken ;
    console.log(txntoken);
    var config = {
       "root": "",
       "flow": "DEFAULT",
       "data": {
       "orderId": oid,
       "token": txntoken,
       "tokenType": "TXN_TOKEN",
       "amount": subtotal,
     },
     "handler": {
      "notifyMerchant" : function(eventName, data){
        console.log("notifyMerchant handler function called");
        console.log("eventName =>" , eventName); 
        console.log("data =>" , data); 
      }
     }
      }; 
   window.Paytm.CheckoutJS.init(config).then(function onSuccess(){
     window.Paytm.CheckoutJS.invoke();
   }).catch(function onError(error){
    console.log("error =>" , error);
   })
     
  }
 
  return (
    <>
   <div className="container mx-auto  p-10">
    <Head> <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
    <Script type='application/javascript' crossOrigin='anonymous' src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}></Script>
     <h2 className='text-2xl font-bold text-center mb-12'>Checkout</h2>
     <div>
      <h2 className='text-2xl font-bold mb-6'>1.Delivery details</h2>
       <div className='flex justify-between gap-16'>
       <div className="relative mb-4 w-1/2">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4 w-1/2">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
       </div>
       <div>
       <div className="relative mb-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
       </div>
       <div className='flex justify-between gap-16'>
       <div className="relative mb-4 w-1/2">
        <label htmlFor="phonenumber" className="leading-7 text-sm text-gray-600">Phone Number</label>
        <input type="text" id="phonenumber" name="phonenumber" placeholder='Your 10 Digit Phone Number' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4 w-1/2">
        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pin Code</label>
        <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
       </div>
       <div className='flex justify-between gap-16'>
       <div className="relative mb-4 w-1/2">
        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
        <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4 w-1/2">
        <label htmlFor="district" className="leading-7 text-sm text-gray-600">District</label>
        <input type="text" id="district" name="district" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
       </div>
       </div>
       <div>
       <h2 className='text-2xl font-bold mb-6'>1.Review cart Items and Pay</h2>
         <div className="cartOverview">
          {/* start */}
          {Object.keys(cart).map((item)=>{
     return <div key={item} className="items flex px-8 py-4 justify-between items-center  rounded-sm bg-orange-100 mt-4 m-2">
     <div className="itemImage">
     <Image 
              className=" mini-image object-cover object-center w-full h-full cursor-pointer"
              height={50} 
              width={50} 
              alt="category" 
              src={'/tshirt.jpg'} 
            />
     </div>
     <div className="itemDescription font-bold text-xl">{cart[item].name}</div>
     <div className="quantity flex">
     <FiMinusCircle className='text-2xl cursor-pointer m-1' onClick={()=>{removeFromCart(item,1,cart[item].name, cart[item].price,cart[item].size,cart[item].variant)}}/>
      <span className='my-1'>{cart[item].qty}</span>
      <FiPlusCircle className='text-2xl cursor-pointer m-1' onClick={()=>{addToCart(item,1,cart[item].name, cart[item].price,cart[item].size,cart[item].variant)}}  />
     </div>
     <div className='qty'>{cart[item].price}</div>
  </div>
   })}
   {
     <div className="subtotal p-5 text-2xl">
     <p className='font-bold'>Total<span className='mx-2'>₹{subtotal}</span></p>
   </div>
   }
          {/* end */}

          {/* Payment  */}
          <div className="payment">
          <button onClick={initiatePayment} className='p-2 text-lg font-bold rounded-lg text-white bg-blue-600 m-2 hover:bg-blue-500'>Pay ₹ {subtotal} </button>

          </div>
         </div>
       </div>
   </div>
    </>
  )
}

export default Checkout


