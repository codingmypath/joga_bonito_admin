'use client'
import { useEffect, useState } from "react";



export default function Dashboard() {

const [orders, setOrders] = useState("");
const [products, setProducts] = useState("")

useEffect(() => {
    fetch("api/orders")
    .then(response => response.json())
        .then(data => {
            setOrders(data);
    })
    .catch(error => console.error(error))
}, [])



useEffect( () => {
    fetch("api/products")
    .then(response => response.json())
        .then(data => {
            setProducts(data);
    })
    .catch(error => console.error(error))
}, []);

return (
    <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-2 ">
        <div className="w-full bg-white rounded p-3 mt-3 sm:w-full md:w-full lg:w-full shadow">
            <div className="flex justify-between">
            <h1 className="text-gray-500 font-semibold" >Recent Orders</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-500 bg-highlight rounded-full p-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            </div>
           
            {orders.length > 0 && orders.slice(0, 3).map(order => (
                <div>
                <div className="font-semibold">
                    {order.name}
                </div>
                <div className="flex-auto">
                    {(new Date(order.createdAt)).toLocaleString()}
                </div>
                </div>
            ))}
        </div>
        <div className="w-full bg-white rounded p-3 mt-3 sm:w-full md:w-full lg:w-full shadow">
            <div className="flex justify-between">
            <h1 className="text-gray-500 font-semibold">Total Orders</h1>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-500 bg-highlight rounded-full p-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            </div>
                <div className="text-2xl">
                    {orders.length}
                </div>
        </div>
        <div className="w-full bg-white rounded p-3 mt-3 md:w-full lg:w-full shadow">
            <div className="flex justify-between">
                <h1 className="text-gray-500 font-semibold">Total Products</h1>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-500 bg-highlight rounded-full p-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
            </div>
            <div className="text-2xl">
                {products.length}
            </div>
        </div>
    </div>
)}