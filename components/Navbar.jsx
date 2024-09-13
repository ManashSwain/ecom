import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
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
    <Image className="object-cover object-center rounded cursor-pointer" alt="cart" src={'/cart.png'} width={20} height={20} />
    <div className='sidebar absolute top-0 right-0 h-[100vh] w-[30vw] bg-blue-400 z-10'>
    <IoCloseSharp />
    </div>
  </div>
</header>
    </>
  )
}

export default Navbar
