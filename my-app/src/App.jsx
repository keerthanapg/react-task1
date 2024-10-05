import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Users from './pages/Users';
import Products from './pages/Products';
import { AppProvider } from './context/AppContext';

function App() {
    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </Router>
        </AppProvider>
    );
}

export default App;
