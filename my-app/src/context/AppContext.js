import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]); 
    const [allUsers, setAllUsers] = useState([]); 
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
        total: 0,
    });

    const fetchAllData = async (type) => {
        try {
            const response = await axiosInstance.get(`/${type}`);
            if (type === 'products') {
                setAllProducts(response.data.products || []); 
            } else {
                setAllUsers(response.data.users || []); 
            }
        } catch (error) {
            console.error(`Error fetching all ${type}:`, error);
        }
    };

    const fetchPaginatedData = async (type, filterKey, filterValue) => {
        try {
            let url = `/${type}?limit=${pagination.limit}&skip=${(pagination.page - 1) * pagination.limit}`;
            if (filterKey && filterValue) {
                url = `/${type}/filter?key=${filterKey}&value=${filterValue}&limit=${pagination.limit}&skip=${(pagination.page - 1) * pagination.limit}`;
            }

            const response = await axiosInstance.get(url);
            if (type === 'users') {
                setUsers(response.data.users);
            } else {
                setProducts(response.data.products);
            }
            setPagination((prev) => ({
                ...prev,
                total: response.data.total,
            }));
        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
        }
    };

    useEffect(() => {
        fetchAllData('products');
        fetchAllData('users');
    }, []);

    return (
        <AppContext.Provider value={{ products, users, fetchPaginatedData, pagination, setPagination, allProducts, allUsers }}>
            {children}
        </AppContext.Provider>
    );
};
