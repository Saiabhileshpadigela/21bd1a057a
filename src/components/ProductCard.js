import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="card product-card my-3">
            <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">Price: {product.price}</p>
                <p className="card-text">Rating: {product.rating}</p>
                <p className="card-text">Discount: {product.discount}%</p>
                <p className="card-text">Availability: {product.availability}</p>
                <Link to={`/product/${product.productName}`} className="btn btn-primary">View Details</Link>
            </div>
        </div>
    );
};

export default ProductCard;
