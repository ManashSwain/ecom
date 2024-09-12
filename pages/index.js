// import Image from "next/image";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Head from 'next/head';



export default function Home() {
  return (
    <>
    <Head>
    <title>The Comfy wear</title>
    <meta name="description" content="This is an amazing e-commerce website" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
   <Hero/>
   <Categories/>
   </>
  );
}
