'use client'
import AppLayout from "@../../components/AppLayout";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import ProductForm from "../../../../components/ProductForm";


export default function EditProductPage({ params }) {
    const [productInfo, setProductInfo] = useState(null)

    // const searchParams = useSearchParams();

    // const products = searchParams.get('product');
    // const results = JSON.parse(products)
    // console.log(results)

    // const pathname = usePathname();
    // const router = useRouter();
    // const info = getCheckoutInfo(router);
    // console.log(info)
    // console.log(pathname)

    // console.log(params)


    // const {id} = router.query;
    // console.log({router} );



    useEffect(() => {
        if (!params) {
            return;
        }
        
        fetch('/api/products?id='+params.editProduct)
        .then(response => 
            response.json())
            .then(data => {
                console.log(data)
                setProductInfo(data)
            })
            // console.log(response);
        .catch(error => console.error(error))
    }, [params]);


    // useEffect(() => {
    //     if (router && router.query) {
    //         console.log(router.query)
    //         setParam1(router.query.param1)
    //     }
        
    // }, [router]);
    

    // useEffect(() => {
    //     if (router.isReady) {
    //         // Code using query
    //         console.log( {router});
    //     }
    // }, [router.isReady]);


    return (
        <AppLayout>
            <h1>Edit Product</h1>
            {productInfo && (
                <ProductForm {...productInfo} />
            )}

        </AppLayout>
    )
}