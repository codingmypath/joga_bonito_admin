'use client'
import AppLayout from "@../../components/AppLayout"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteProductPage( {params}) {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState();

    console.log(params)

    useEffect(() => {
        if (!params) {
            return;
        }
        // axios.get('/api/products?='+id).then(response => {
        //     setProductInfo(response.data);
        // })
        fetch('/api/products?id='+params.id)
        .then(response => response.json())
            .then(data => {
                console.log(data)
                setProductInfo(data);
        })
        .catch(error => console.error(error))
    }, [params]);

    function goBack() {
        router.push('/products');
    }

    async function deleteProduct() {
        // axios.delete('/api/products?id='+params)
        await fetch('/api/products?id='+params.id, { method: 'DELETE'})
            .then(data => {
                console.log(data)
                goBack();
            })
            .catch(error => console.error(error))
    }
    return (
        <AppLayout>
           <h1 className="text-center">Do you really want to delete &quot;{productInfo?.title}&quot;?</h1>
           <div className="flex gap-2 justify-center">
            <button className="btn-red" onClick={deleteProduct}>Yes</button>
            <button className="btn-default" onClick={goBack}>No</button>
           </div>
        </AppLayout>
    )
}