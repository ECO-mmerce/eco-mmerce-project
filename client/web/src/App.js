import './App.css';
import '@material-tailwind/react/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Cart from './components/Cart';
import History from './views/History';
import Login from './views/Login';
import Register from './views/Register';
import AddNewProduct from './views/AddNewProduct';
import Products from './views/Products';
import ProductDetails from './views/ProductDetails';
import UserDashboard from './views/UserDashboard';
import Orders from './views/Orders';
import { checkToken } from './stores/action';
import ChatRoom from './views/ChatRoom';
import SellerDashboard from './views/SellerDashboard';
import SellerProductDetail from './views/SellerProductDetail';
import EditProduct from './views/EditProduct';
import SocketContext, { socket } from './config/socket';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  return (
    <SocketContext.Provider value={socket}>
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
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/dashboard">
              <UserDashboard />
            </Route>
            <Route path="/chat">
              <ChatRoom />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/seller" exact>
              <SellerDashboard />
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
            <Route path="/seller/products/edit/:id">
              <EditProduct />
            </Route>
            <Route path="/seller/products/:id">
              <SellerProductDetail />
            </Route>
            <Route path="/seller/orders">
              <Orders />
            </Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
