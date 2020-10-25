import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/arrow.svg'
import './styles.scss'
import ProductPrice from '../../../../core/components/ProductPrice';
import { MakeRequest } from '../../../../core/utils/request';
import { Product } from '../../../../core/types/Product';

type paramsType = {
   productId: string;
}

const ProductDetails = () => {

   const { productId } = useParams<paramsType>();
   const [product, setProduct] = useState<Product>();


   useEffect(() => {
      MakeRequest({url: `/products/${productId}` })
         .then(response => setProduct(response.data))
   }, [productId]);

 return(
    <div className="card-base border-radios-20 product-details-container">
        
        <div className="product-details">
           <Link to="/products" className="Product-details-goback">
           <ArrowIcon className="icon-goback" />
           <h1 className="text-goback">VOLTAR</h1>
           </Link>
           <div className="row">
              <div className="col-6 pr-5">
                 <div className="product-details-card text-center">
                     <img src={product?.imgUrl} alt={product?.name} className="product-details-image" />
                 </div>
                  <h1 className="produc-details-name">
                     {product?.name}
                  </h1>
                  {product?.price && <ProductPrice price={product?.price} />}
              </div>
              <div className="col-6 product-details-card">
                 <h1 className="product-description-title">
                     Decrição do Produto
                 </h1>
                 <p className="product-description-text">
                  {product?.description}
                 </p>
              </div>
           </div>
    </div>
    </div>

  );
}  

export default ProductDetails;