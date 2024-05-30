import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProducts from './components/AllProducts';
import ProductDetails from './components/ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<AllProducts/>} />
				<Route path="/product/:productId" element={<ProductDetails/>} />
			</Routes>
		</Router>
	);
}

export default App;
