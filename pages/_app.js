import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import  { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import LoadingBar from 'react-top-loading-bar'


export default function App({ Component, pageProps }) {

  const router = useRouter();
  const [progress, setProgress] = useState(0)

  // cart features 
  const [cart,setCart] = useState({});
  const [subtotal,setSubTotal] = useState(0);
  // for navbar refreshing 
  const [key , setkey] = useState(0);

  const [user,setUser] = useState({value : null});

  // getting cart details initially 

  useEffect(()=>{
    router.events.on('routeChangeStart',()=>{
      setProgress(40);
    })
    router.events.on('routeChangeComplete',()=>{
      setProgress(100);
    })
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
    let token = localStorage.getItem("token");
    console.log(token);
    console.log(key);
    if(token){
      setUser({value : token});
      setkey(Math.random());
    }
    
  },[router.query]);
  
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
    toast.success('Item added to cart!', {
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
     if (cart[itemCode].qty <= 0){
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  }

  // buy now 

  const buyNow = (itemCode, qty, name, price ,size, variant)=>{
    let cart = {itemCode : {qty : 1 , name, price ,size, variant}}
    setCart(cart);
    saveCart(cart);
    router.push('/checkout');
  }

//  logout 

const logout = ()=>{
  localStorage.removeItem("token");
  setkey(Math.random());
  setUser({value:null});
  router.push('/'); 
}

  

  return <>
   <LoadingBar
        color='#3498db'
        progress={progress}
        waitingTime = {400}
        height = {3}
        onLoaderFinished={() => setProgress(100)}
      />
  <Navbar key={key} logout={logout}  user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal}/>
  <Component  buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
  <Footer/>
  </>
  
}
