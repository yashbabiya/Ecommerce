import { Route, Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import Shop from './pages/Shop';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/shop' element={<Shop/>}/>
          <Route exact path='/product' element={<Product />}/>
          <Route exact path='/cart' element={<Cart />}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/account' element={<Account/>}/>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
