import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from './stores';
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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <ToastContainer />
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/products/:id">
              <ProductDetails />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/dashboard">
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
            <Route path="/seller/addproduct">
              <AddNewProduct />
            </Route>
            <Route path="/seller/orders">
              <Orders />
            </Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
