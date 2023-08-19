'use client'
import AppLayout from "@../../components/AppLayout"
import { useEffect, useState } from "react"
import { Category } from "../models/Category";
import { withSwal } from 'react-sweetalert2';


function Categories({swal}) {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, [])
    function fetchCategories() {
        fetch("api/categories") //might need a "/" in front of api
        .then(response => response.json())
            .then(data => {
                setCategories(data);
        })
        .catch(error => console.error(error));
    }
    const saveCategory = async (ev) => {
    // async function saveCategory(ev) {

        ev.preventDefault();

        if (editedCategory) {
            //update
            const data = {
                name, 
                parentCategory, 
                properties:properties.map(p=> ({name:p.name,values:p.values.split(',')}))
            };
            // data._id = editedCategory._id;
            const JSONdata = JSON.stringify({...data, _id:editedCategory._id})
            const url = "/api/categories";

            const options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSONdata,
            };
            const res = await fetch(url, options);
            console.log("RES:", res)
            const result = await res.json();
            console.log("PUT: ", result)
            setEditedCategory(null);
        } else {
            // Get data from the form.
            const data = {name, 
                parentCategory, 
                properties:properties.map(p=> ({name:p.name,values:p.values.split(',')}))
            };
            // Send the data to the server in JSON format.
            const JSONdata = JSON.stringify(data)
        
            // API endpoint where we send form data.
            const endpoint = '/api/categories'
        
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
            const result = await response.json();
            console.log("POST:", result)
        }
    
        
        setName('');
        setParentCategory('');
        setProperties([]);
        fetchCategories();
    }

    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
        setProperties(category.properties.map(( {name, values}) =>({
            name,
            values:values.join(',')
        }))
        );
    }
    function deleteCategory(category) {
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            // when confirmed and promise resolved...
            console.log("RESULT:", result)
            if (result.isConfirmed) {
                console.log("ENTER DELETE")
                // const {_id} = category;
                //await axios.delete('/api/categories?_id='+_id)
                const {_id} = category;
                await fetch('/api/categories?_id='+_id, { method: 'DELETE'})
                .then(response => response.json())
                    .then(data => {
                    console.log(data)
                })
                .catch(error => console.error(error))
                fetchCategories();
            }
        }).catch(error => {
            // when promise rejected...
        });
    }

    function addProperty() {
        setProperties(prev => {
            return [...prev, {name:'', values:''}]
        });
    }

    function handlePropertyNameChange(index, property, newName) {
        console.log({index, property, newName})
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    }
    function handlePropertyValuesChange(index, property, newValues) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        });
    }
    function removeProperty(indexToRemove) {
        setProperties(prev => {
            const newProperties = [...prev];
            return newProperties.filter((p, pIndex) => {
                return pIndex !== indexToRemove;
            });
        })
    }
    return (
        <AppLayout>
            <h1>Categories</h1>
            <label>{ editedCategory ? `Edit Category ${editedCategory.name}` : 'Create new category'}</label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1">
                        <input  
                        type="text" 
                        placeholder={'Category name'} 
                        onChange={ev => setName(ev.target.value)} 
                        value={name} />
                    <select  
                            onChange={ev => setParentCategory(ev.target.value)}
                            value={parentCategory}>
                        <option value="">No parent category</option>
                        {categories.length > 0 && categories.map(category => (
                                <option value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button 
                        onClick={addProperty}
                        type="button" 
                        className="btn-default text-sm mb-2">
                        Add new property
                    </button>
                {properties.length > 0 && properties.map((property, index) => (
                    <div className="flex gap-1 mb-2">
                        <input type="text" 
                        value={property.name} 
                        className="mb-0"
                        onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                        placeholder="property name (example: color" />
                        <input type="text" 
                        value={property.values}
                        className="mb-0"
                        onChange={ev => handlePropertyValuesChange(index, property, ev.target.value)}
                        placeholder="values, comma separated" />
                        <button 
                            onClick={() => removeProperty(index)}
                            type="button"
                            className="btn-red">
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-1">
                {editedCategory && (
                    <button 
                        type="button"
                        onClick={() => {
                        setEditedCategory(null);
                        setName('');
                        setParentCategory('');
                        setProperties([]);
                        }}
                        className="btn-default">Cancel</button>
                )}
                <button type="submit" 
                className="btn-primary py-1">
                    Save
                </button>
            </div>
            
            </form>
            {!editedCategory && (
                <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td>Parent category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td>
                                <button onClick={() => editCategory(category)} 
                                className="btn-default mr-1">
                                    Edit
                                </button>
                                <button onClick={() => deleteCategory(category) } className="btn-red">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            
        </AppLayout>
    )
}

export default  withSwal(({swal}, ref) => (
    <Categories swal = {swal} />
));