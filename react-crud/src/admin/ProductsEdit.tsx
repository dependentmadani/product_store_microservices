import React, { SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import { Navigate } from 'react-router-dom';

const ProductsEdit = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:8000/api/products/${window.location.pathname.split('/')[3]}`);

                const product = await response.json();

                setTitle(product.title);
                setImage(product.image);
            }
        )();
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch(`http://localhost:8000/api/products/${window.location.pathname.split('/')[3]}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                image: image
            })
        });

        setRedirect(true);
        console.log('The content have been submitted!');
    }

    if (redirect) {
        return <Navigate to={'/admin/products'} />
    }
    
    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className='form-group'>
                    <label>Title</label>
                    <input type="text" className='form-control' name='title' defaultValue={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Image</label>
                    <input type="text" className='form-control' name='image' defaultValue={image} onChange={e => setImage(e.target.value)} />
                </div>
                <button className='btn btn-outline-secondary'>Save</button>
            </form>
        </Wrapper>
    );
}

export default ProductsEdit;