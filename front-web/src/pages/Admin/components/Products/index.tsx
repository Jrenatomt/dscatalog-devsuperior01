import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const Product = () => {

    return(
        <div>
            <Switch>
                <Route path="/admin/products"exact>
                  <List />
                </Route>
                <Route path="/admin/products/create">
                   <Form />
                </Route>
                <Route path="/admin/products/:productID">
                  <h1>editar um produto</h1>
                </Route>
            </Switch>
        </div>
    )
}

export default Product;