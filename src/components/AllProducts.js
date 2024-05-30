import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDc5MDY0LCJpYXQiOjE3MTcwNzg3NjQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYyYTUyNTQwLWE0MTgtNGNhZC05OTg2LTllM2E1YmE0ZTk0MCIsInN1YiI6InNhaWFiaGlsZXNocGFkaWdlbGFAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiI2MmE1MjU0MC1hNDE4LTRjYWQtOTk4Ni05ZTNhNWJhNGU5NDAiLCJjbGllbnRTZWNyZXQiOiJyckRpY1BMbVZZdFhBVUlJIiwib3duZXJOYW1lIjoiQWJoaWxlc2giLCJvd25lckVtYWlsIjoic2FpYWJoaWxlc2hwYWRpZ2VsYUBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMWJkMWEwNTdhIn0.zUsvAyS9p01ZOaeIAJrvWixMBTA9-zdBRlS6XxFhrvI';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div className='my-4 container'>
            <h1>All Products</h1>
            <div className="product-list">-
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
