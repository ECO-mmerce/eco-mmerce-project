import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import AddNewProduct from './views/AddNewProduct';
import Products from './views/Products';
import ProductDetails from './views/ProductDetails';
import UserDashboard from './views/UserDashboard';
import Orders from './views/Orders';
import { checkToken } from './stores/action';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Navbar />
        <Switch>
          <div className="min-h-screen">
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/products/:id">
              <ProductDetails />
            </Route>
            <Route path="/products" exact>
              <Products />
            </Route>
            <Route path="/cart">
              <UserDashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/seller/login">
              <Login />
            </Route>
            <Route path="/seller/register">
              <Register />
            </Route>
            <Route path="/seller/addProduct">
              <AddNewProduct />
            </Route>
            <Route path="/seller/orders">
              <Orders />
            </Route>
          </div>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
