import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { ProductsResponse } from '../../core/types/Product';
import { MakeRequest } from '../../core/utils/request';
import ProductCard from './components/ProductCard';
import './styles.scss'

const Catalog = () => {

  const [productsResponse, setProductResponse] = useState<ProductsResponse>();

   useEffect(() => {
    const params = {
      page: 0,
      linesPerPage: 12,
    }

    MakeRequest({url: '/products', params })
        .then(response => setProductResponse(response.data));
   }, [] );

return(
    <div className="catalog-container">
       <h1 className="catalog-title">
         Catálogo de produtos
       </h1>
       <div className="catalog-products">
         
        { productsResponse?.content.map(product => (
           <Link to={`/products/${product.id}`} key={product.id}>
             <ProductCard product={product} />
           </Link>
        ))};
       </div>
   </div>
);
}

export default Catalog;