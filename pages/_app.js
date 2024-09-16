import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";


export default function App({ Component, pageProps }) {

  // cart features 
  const [cart,setCart] = useState({});
  const [subtotal,setSubTotal] = useState(0);

  // getting cart details initially 

  useEffect(()=>{
    try{
     if(localStorage.getItem('cart')) {
       setCart(JSON.parse(localStorage.getItem('cart')));
       saveCart(JSON.parse(localStorage.getItem('cart')));
     }
    }
    catch(error){
      console.error(error);
      localStorage.clear();
    }
  },[])
  
  // Save to localstorage 

  const saveCart = (mycart) =>{
    localStorage.setItem('cart' , JSON.stringify(mycart));
    // calculating subtotal 
    let subtotal = 0 ;
    for(let i = 0 ; i < Object.keys(mycart).length ; i++){
     subtotal += mycart[Object.keys(mycart)[i]].price * mycart[Object.keys(mycart)[i]].qty ;
    }
    if(Object.keys(mycart).length==0){
      setSubTotal(0);
    }
    setSubTotal(subtotal);
  }

  // addToCart 
  
  const addToCart = (itemCode, qty, name, price ,size, variant) => {
    let newCart = {...cart}  ;
    if(itemCode in cart){
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    }
    else {
     newCart[itemCode] = {qty : 1 , price, name ,size, variant}
    }
    setCart(newCart);
    saveCart(newCart);
  }

  // clear cart 

  const clearCart = () => {
    setCart({});
    saveCart({});
  }

  // remove from cart 

  const removeFromCart = (itemCode, qty, name, price ,size, variant) => {
    let newCart = {...cart} ;
    if(itemCode in cart){
     newCart[itemCode].qty = newCart[itemCode].qty - qty ;
    }
    console.log(newCart);
    console.log(newCart[itemCode]);
    console.log(itemCode);
     if (cart[itemCode].qty <= 0){
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  }

  return <>
  <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal}/>
  <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
  <Footer/>
  </>
  
}
