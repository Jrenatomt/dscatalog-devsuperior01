import React from 'react';
import './styles.scss'

type props = {
    price: string;
 }

const ProductPrice = ({ price }: props) => (

    <div className="product-price-container">
        <span className="product-currency">R$</span>
        <h3 className="product-price">
           {price}
        </h3>
    </div>
);

export default ProductPrice;