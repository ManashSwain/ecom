import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoCloseSharp } from "react-icons/io5";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

const Navbar = () => {
  const togglecart = ()=>{
    if(ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove("translate-x-full");
       ref.current.classList.add("translate-x-0");
    }
    else if (!ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  }
  const ref = useRef();
  return (
    <>
    <header className="text-gray-600 body-font px-3 shadow-lg">
  <div className="container  mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-3 text-xl">Tailblocks</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link href={'/tshirts'}><p className="mr-5 text-xl hover:text-gray-900">Tshirts</p></Link>
      <Link href={'/hoodies'}><p className="mr-5 text-xl hover:text-gray-900">Hoodies</p></Link>
      <Link href={'/mugs'}><p className="mr-5 text-xl hover:text-gray-900">Mug</p></Link>
      <Link href={'/cap'}><p className="mr-5 text-xl hover:text-gray-900">Caps</p></Link>
      <Link href={'/mousepad'}><p className="mr-5 text-xl hover:text-gray-900">Mousepad</p></Link>
      <Link href={'/stickers'}><p className="mr-5 text-xl hover:text-gray-900">Stickers</p></Link>
    </nav>
    <Image  onClick={togglecart}   className="object-cover object-center rounded cursor-pointer" alt="cart" src={'/cart.png'} width={20} height={20} />

    {/* side cart bar  */}

    <div ref={ref} className='sidebar absolute top-0 right-0   h-[100vh] w-[30vw] md:w-[40vw]  sm:w-[70vw]  bg-yellow-50 z-10 transition-transform translate-x-full'>
      <IoCloseSharp onClick={togglecart} className='close items-end text-4xl m-5 cursor-pointer' />
    <h3 className='text-center text-2xl font-bold'>My Cart</h3>
    <div className="items flex px-8 py-4 justify-between items-center  rounded-sm bg-orange-100 mt-4 m-2">
       <div className="itemImage">
       <Image 
                className=" mini-image object-cover object-center w-full h-full cursor-pointer"
                height={50} 
                width={50} 
                alt="category" 
                src={'/tshirt.jpg'} 
              />
       </div>
       <div className="itemDescription font-bold text-xl">t-shirt Men</div>
       <div className="quantity flex">
       <FiMinusCircle className='text-2xl cursor-pointer m-1' />
        <span className='my-1'>{687}</span>
        <FiPlusCircle className='text-2xl cursor-pointer m-1'  />
       </div>
    </div>
    <div className="subtotal p-5 text-2xl">
      <p className='font-bold'>Subtotal<span className='mx-2'>₹{4564}</span></p>
    </div>
    <div className='text-center'>
    <button className='p-2 text-lg font-bold rounded-lg text-white bg-blue-600 m-2 hover:bg-blue-500'>Checkout</button>
    <button className='p-2 text-lg font-bold rounded-lg text-white bg-blue-600 m-2 hover:bg-blue-500'>Clear Cart</button>
    </div>
    </div>
  </div>
</header>
    </>
  )
}

export default Navbar
