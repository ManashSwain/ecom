import React , {useEffect} from "react";
import Order from "@/Models/Order";
const mongoose = require("mongoose");
import { useRouter } from 'next/router'

const Orders = () => {
    const router = useRouter();

    useEffect(()=>{
      if(!localStorage.getItem('token')){
        router.push('/');
      }
    },[router])
  return (
    <>
      <div className="container p-10">
        <h3 className="text-center text-3xl font-semibold">My Orders</h3>
        <div className="myorders">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b   hover:bg-gray-50 ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    Apple MacBook Pro
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
                <tr className="bg-white border-b  hover:bg-gray-50">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                </tr>
                <tr className="bg-white  hover:bg-gray-50 ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4">Black</td>
                  <td className="px-6 py-4">Accessories</td>
                  <td className="px-6 py-4">$99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

// server side rendering

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find({});

  return {
    props: { orders: orders },
  };
}

export default Orders;
