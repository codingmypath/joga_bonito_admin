'use client';
import AppLayout from "@../../components/AppLayout";
import ProductForm from "../../../components/ProductForm";

export default function NewProduct() {
   return (
    <AppLayout>
        <h1>New Product</h1>
        <ProductForm />
    </AppLayout>
   )
}