import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Product from './components/Products';
import './styles.scss'

const Admin = () => (
    <div className="admin-container">
        <Navbar />
        <div className="admin-content">
          <Switch>
              <Route path="/admin/products">
                 <Product />
              </Route>

              <Route path="/admin/categories">
                 <h1>Catgories</h1>
              </Route>

              <Route path="/admin/users">
                 <h1>users</h1>
              </Route>

          </Switch>
        </div>
    </div>
);

export default Admin;