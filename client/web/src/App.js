import './App.css';
import '@material-tailwind/react/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkToken } from './stores/action';
import SocketContext, { socket } from './config/socket';

import Home from './views/Home';
import Cart from './components/Cart';
import Login from './views/Login';
import Orders from './views/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import History from './views/History';
import ChatRoom from './views/ChatRoom';
import Register from './views/Register';
import Products from './views/Products';
import ScanProduct from './views/ScanProduct';
import EditProduct from './views/EditProduct';
import UserDashboard from './views/UserDashboard';
import AddNewProduct from './views/AddNewProduct';
import ProductDetails from './views/ProductDetails';
import SellerDashboard from './views/SellerDashboard';
import SellerProductDetail from './views/SellerProductDetail';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <div className="App overflow-x-hidden">
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
            <Route path="/scan">
              <ScanProduct />
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
