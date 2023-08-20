'use client'
import AppLayout from "@/components/AppLayout";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        // axios.get('/api/orders').then(response => {
        //     setOrders(response.data);
        // })

        fetch("api/orders")
        .then(response => response.json())
            .then(data => {
                setOrders(data);
        })
        .catch(error => console.error(error))
    }, [])

    return (
       <AppLayout>
        <h1>Orders</h1>
        <table className="basic mt-4">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Paid</th>
                    <th>Recipient</th>
                    <th>Products</th>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 && orders.map(order => (
                    <tr key={order.createdAt}>
                        <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                        <td>{order.name} {order.email}<br />
                        {order.city} {order.zipCode}
                        </td>
                        <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                            {order.paid ? 'YES': 'NO'}
                        </td>
                        <td>
                            {order.line_items.map(l => (
                                <>
                                    {l.price_data.product_data.name} x {l.quantity}<br/>
                                    {/* {JSON.stringify(l)}<br /> */}
                                </>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
       </AppLayout>
    )
}