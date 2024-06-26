import './App.css';
import Nav from './component/Nav';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './component/Footer';
import SignUp from './component/SingUp'
import PrivateComponent from './component/PrivateComponent';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import ProductList from './component/ProductList';
import UpdateProduct from './component/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route element={<PrivateComponent/>}>
            <Route path='/' element={<ProductList/>}></Route>
            <Route path='/add-product' element={< AddProduct />}></Route>
            <Route path='/update-product/:id' element={<UpdateProduct/>}></Route>
            <Route path='/profile' element={<h1> Profile</h1>}></Route>
          </Route>

          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>

        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
