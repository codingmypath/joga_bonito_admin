import { createFactory, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import Image from "next/image";

export default function ProductForm({
    _id, 
    title: existingTitle, 
    description: existingDescription, 
    price:existingPrice,
    images: existingImages,
    category:assignedCategory,
    properties:assignedProperties,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [category, setCategory] = useState(assignedCategory || '');
    const [productProperties, setProductProperties] = useState(assignedProperties || {})
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();


    useEffect(() => {
        // axios.get('/api/categories').then(result => {
        //     result.data;
        // })
        fetch("/api/categories")
        .then(response => response.json())
            .then(data => {
                setCategories(data);
        })
        .catch(error => console.error(error));

    }, [])

//  fetch("api/categories")
//         .then(response => response.json())
//             .then(data => {
//                 setCategories(data);
//         })
//         .catch(error => console.error(error));



    console.log({_id});
    // async function createProduct(ev) {
    //     ev.preventDefault();
    //     const data = {title, description, price};
    //     await axios.post('/app/products', data);
    // }


    // const createProduct = async (ev) => {
    //     ev.preventDefault();
    //     const data = {title, description, price};
    //     const response = await fetch('/api/products', data);
    //     response.json()
    // }


    // async function createProduct(ev) {
    //     ev.preventDefault();
    //     const data = {title, description, price};
    //     await fetch('/api/form', 
    //     {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //           },
    //     } )
    // }


    //THIS ONE WORKED BEFORE I MADE CHANGES RIGHT BELOW THIS BLOCK
    // const saveProduct = async (ev) => {
    //     // Stop the form from submitting and refreshing the page.
    //     ev.preventDefault();

     
    //     // Get data from the form.
    //     const data = {title, description, price};
     
    //     // Send the data to the server in JSON format.
    //     const JSONdata = JSON.stringify(data)
     
    //     // API endpoint where we send form data.
    //     const endpoint = '/api/products'
     
    //     // Form the request for sending data to the server.
    //     const options = {
    //       // The method is POST because we are sending data.
    //       method: 'POST',
    //       // Tell the server we're sending JSON.
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       // Body of the request is the JSON data we created above.
    //       body: JSONdata,
    //     }

    //     // Send the form data to our forms API on Vercel and get a response.
    //     const response = await fetch(endpoint, options)
 
    //     // Get the response data from server as JSON.
    //     // If server returns the name submitted, that means the form works.
    //     const result = await response.json()
    //     console.log(`Is this your full name: ${result.data}`)
    //     setGoToProducts(true);
    // }
    

    const saveProduct = async (ev) => {
        // Stop the form from submitting and refreshing the page.
        ev.preventDefault();
        
        if (_id) {
            //update
            const data = {title, description, price, images, category, properties:productProperties};
            const JSONdata = JSON.stringify({...data, _id})
            const url = "/api/products";

        
            const options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSONdata,
            };
            const res = await fetch(url, options);
            const result = await res.json();
            console.log("PUT: ", result.data)
            setGoToProducts(true);

        } else {
            //create
        // Get data from the form.
        const data = {title, description, price, images, category, properties:productProperties};
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)
     
        // API endpoint where we send form data.
        const endpoint = '/api/products'
     
        // Form the request for sending data to the server.
        const options = {
          // The method is POST because we are sending data.
          method: 'POST',
          // Tell the server we're sending JSON.
          headers: {
            'Content-Type': 'application/json',
          },
          // Body of the request is the JSON data we created above.
          body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)
 
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        console.log(`POST: ${result.data}`)
        setGoToProducts(true);
        }  
    }

    if (goToProducts) {
        router.push('/products')
    }

    async function uploadImages(ev) {

        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            })
            // console.log("RES:", data)
            const result = await res.json()
            console.log("DATA?", result)
            setImages(oldImages => {
                console.log('DATA', res.data)
                return [...oldImages, ...result.links];
            })
        }
        setIsUploading(false);
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    function setProductProp(propName, value) {
        setProductProperties(prev => {
            
            const newProductProps = {...prev};
            newProductProps[propName] = value;
            return newProductProps;
        })
    }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({_id}) => _id === category);
        propertiesToFill.push(...catInfo.properties);
        while(catInfo?.parent?._id) {
            const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
        }
    }



    // async function createProduct(ev) {
    //     ev.preventDefault();
    //     const data = {title, description, price};
    //     const response = await fetch('/api/route', data);
    //     console.log(response)
    //     return JSON.stringify(response);
    // }

 
    // async function createProduct(ev) {
    //   const formData = await request.formData()
    //   const name = formData.get('name')
    //   const email = formData.get('email')
    //   return NextResponse.json({ name, email })
    // }
        

    return (
            <form onSubmit={saveProduct}>
                <label>Product name</label>
                <input 
                    type="text" 
                    placeholder="product name" 
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)} 
                />
                <label>Category</label>
                <select value={category} 
                        onChange={ev => setCategory(ev.target.value)} required>
                    <option value="">Uncategorized</option>
                    {categories.length > 0 && categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
                {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                    <div key={p.name} className="">
                        <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
                        <div>
                            <select value={productProperties[p.name]} 
                                    onChange={ev => setProductProp(p.name,ev.target.value)}>
                                    <option value="">Choose one</option>
                                    {p.values.map(v => (
                                    <option key={v} value={v}>{v}</option>
                                    ))}
                            </select>
                        </div>
                    </div>
                ))}
                <label>
                    Photos 
                </label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <ReactSortable list={images} className="flex flex-wrap" setList={updateImagesOrder}>
                        {!!images?.length && images.map(link =>( 
                            <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                                <img src={link} alt="" className="rounded-lg" />
                            </div>
                        ))}
                    </ReactSortable>
                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <Spinner />
                        </div>
                    )}
                    <label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-sm bg-white shadow-sm border border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" onChange={uploadImages} className="hidden"/>
                    </label>
            
                </div>
                <label>Description</label>
                <textarea 
                    placeholder="description" 
                    value={description}
                    onChange={ev => setDescription(ev.target.value)} 
                />
                <label>Price</label>
                <input type="number" 
                placeholder="price" 
                value={price} 
                onChange={ev => setPrice(ev.target.value)} 
                />
                <button type="submit" className="btn-primary">Save</button>
            </form>
    );
}