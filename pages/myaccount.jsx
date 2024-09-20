import React , {useEffect} from 'react';
import { useRouter } from 'next/router'

const Myaccount = () => {
    const router = useRouter();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
          router.push(`${process.env.NEXT_PUBLIC_HOST}/`);
        }
      },[router])
  return (
    <div>
     myaccount 
    </div>
  )
}

export default Myaccount
