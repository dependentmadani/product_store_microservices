import React, { useEffect, useState } from 'react';
import { Product } from '../admin/interfaces/product';

const Main = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(()=> {
        (
            async () => {
                const res = await fetch('http://localhost:8001/api/products');

                const data = await res.json();
                setProducts(data);
            }
        )();
    }, [])

    const like = async (id: number) => {
        await fetch(`http://localhost:8001/api/products/${id}/like`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        });
        setProducts(products.map((p: any) => {
            if (p.id === id) {
                p.likes++;
            }
            return p;
        }))
    }

    return (
        <main>

        <section className="py-5 text-center container">
            <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Album example</h1>
                <p className="lead text-body-secondary">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                <p>
                <a href="#" className="btn btn-primary my-2">Main call to action</a>
                <a href="#" className="btn btn-secondary my-2">Secondary action</a>
                </p>
            </div>
            </div>
        </section>

        <div className="album py-5 bg-body-tertiary">
            <div className="container">
                <div className='row'>
                    {products.map((e: any) => {
                        return (
                            <div className='col-md-4' key={e.id}>
                                <div className='card mb-4 shadow-sm'>
                                    <img src={e.image} height={180} alt={e.title} />
                                    <div className='card-body'>
                                        <p className='card-text'>{e.title}</p>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='btn-group'>
                                                <button className='btn btn-sm btn-outline-secondary' type='button' onClick={() => like(e.id)}>Like</button>
                                            </div>
                                            <small className='text-muted'>{e.likes} likes</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            {/* <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div className="col">
                <div className="card shadow-sm">
                    <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                    <div className="card-body">
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small className="text-body-secondary">9 mins</small>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col">
                <div className="card shadow-sm">
                    <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                    <div className="card-body">
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small className="text-body-secondary">9 mins</small>
                    </div>
                    </div>
                </div>
                </div>
            </div> */}
            </div>
        </div>

        </main>
    );
}

export default Main;