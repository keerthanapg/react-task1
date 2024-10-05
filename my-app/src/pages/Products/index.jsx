/* eslint-disable */
import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import DataTable from '../../components/DataTable';
import { columns } from './table-options';
import { FaHome,FaSearch } from 'react-icons/fa'; 
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete'; 
import { Link } from 'react-router-dom'; 
import '../../styles/users.css';

const Products = () => {
    const { products, fetchPaginatedData, pagination, setPagination, allProducts = [] } = useContext(AppContext); 
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    
    // Extract unique brands, categories, and titles for dropdowns
    //Doing client side filtering as the api does not support filtering for products
    const uniqueBrands = useMemo(() => [...new Set(allProducts.map(product => product.brand))], [allProducts]);
    const uniqueCategories = useMemo(() => [...new Set(allProducts.map(product => product.category))], [allProducts]);
    const uniqueTitles = useMemo(() => [...new Set(allProducts.map(product => product.title))], [allProducts]);

    useEffect(() => {
        fetchPaginatedData('products');
    }, [pagination.page, pagination.limit]); 

    // Handle search based on the full dataset 
    const filteredProducts = useMemo(() => {
        const filtered = allProducts.filter(product => {
            const matchesSearchQuery = Object.values(product).some(value =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            );
            const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            const matchesTitle = selectedTitle ? product.title === selectedTitle : true;
            return matchesSearchQuery && matchesBrand && matchesCategory && matchesTitle;
        });

        setPagination((prev) => ({
            ...prev,
            total: filtered.length,
        }));

        const start = (pagination.page - 1) * pagination.limit;
        const end = start + pagination.limit;
        return filtered.slice(start, end);
    }, [allProducts, searchQuery, selectedBrand, selectedCategory, selectedTitle, pagination.page, pagination.limit]);

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, page: newPage }));
    };

    const handlePageSizeChange = (newPageSize) => {
        setPagination((prev) => ({ ...prev, limit: newPageSize, page: 1 }));
    };

    useEffect(() => {
        setPagination((prev) => ({ ...prev, page: 1 }));
    }, [searchQuery, selectedBrand, selectedCategory, selectedTitle]);

    const handleBrandChange = (value) => {
        setSelectedBrand(value);
        setSelectedCategory(''); 
        setSelectedTitle('');
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setSelectedBrand(''); 
        setSelectedTitle(''); 
    };

    const handleTitleChange = (value) => {
        setSelectedTitle(value);
        setSelectedBrand(''); 
        setSelectedCategory(''); 
    };

    return (
        <div>
            <h2 className="products-heading">Products</h2>
            <div style={{ position: 'absolute', top: 20, right: 20 }}>
                <Link to="/" className="home-link">
                    <FaHome size={24} style={{ color: '#000' }} /> {/* Home icon */}
                </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>

                <button className="search-button" onClick={() => setShowSearch(prev => !prev)}>
                    <FaSearch className="search-icon" />
                </button>
                {showSearch && (
                    <TextField
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products"
                        sx={{ width: '300px' }} 
                    />
                )}

                <Autocomplete
                    options={uniqueTitles}
                    getOptionLabel={(option) => option}
                    onChange={(event, newValue) => handleTitleChange(newValue || '')}
                    renderInput={(params) => <TextField {...params} label="Title" variant="outlined" />}
                    sx={{ minWidth: 220 }}
                    value={selectedTitle}
                />

                <Autocomplete
                    options={uniqueBrands}
                    getOptionLabel={(option) => option}
                    onChange={(event, newValue) => handleBrandChange(newValue || '')}
                    renderInput={(params) => <TextField {...params} label="Brand" variant="outlined" />}
                    sx={{ minWidth: 220 }}
                    value={selectedBrand}
                />

                <Autocomplete
                    options={uniqueCategories}
                    getOptionLabel={(option) => option}
                    onChange={(event, newValue) => handleCategoryChange(newValue || '')}
                    renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                    sx={{ minWidth: 220 }}
                    value={selectedCategory}
                />
            </div>
            <DataTable
                data={filteredProducts}
                columns={columns}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </div>
    );
};

export default Products;
