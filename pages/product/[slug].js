import React from 'react';
import { useRouter } from 'next/router';

const Slug = () => {
    const router = useRouter();
    const {slug} = router.query ;
    
  return (
    <>
    <h1>This is my slug page  : { slug }</h1>
    </>
  )
}

export default Slug


