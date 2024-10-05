/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import DataTable from '../../components/DataTable';
import { FaSearch, FaHome } from 'react-icons/fa'; 
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { columns } from './table-options';
import { Link } from 'react-router-dom'; 
import '../../styles/users.css';

const Users = () => {
    const { users, fetchPaginatedData, pagination, setPagination, allUsers = [] } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState({ key: '', value: '' });

    const uniqueNames = [...new Set(allUsers.map(user => user.lastName))];
    const uniqueEmail = [...new Set(allUsers.map(user => user.email))];
    const uniqueAges = [...new Set(allUsers.map(user => user.age))];
    const uniqueGenders = [...new Set(allUsers.map(user => user.gender))];

    useEffect(() => {
        if (selectedFilter.key && selectedFilter.value) {
            fetchPaginatedData('users', selectedFilter.key, selectedFilter.value);
        } else {
            fetchPaginatedData('users');
        }
    }, [pagination.page, pagination.limit, selectedFilter]);

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, page: newPage }));
    };

    const handlePageSizeChange = (newPageSize) => {
        setPagination((prev) => ({ ...prev, limit: newPageSize, page: 1 }));
    };

    const handleFilterChange = (key, value) => {
        setSelectedFilter({ key, value });
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    const filteredUsers = users.filter(user =>
        Object.values(user).some(value =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    
  
    return (
        <>
            <h2 className="users-heading">Users</h2>

            {/* Home icon at the top-right corner */}
            <div style={{ position: 'absolute', top: 20, right: 20 }}>
                <Link to="/" className="home-link">
                    <FaHome size={24} style={{ color: '#000' }} /> {/* Home icon */}
                </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <div className="search-container">
                    <button className="search-button" onClick={() => setShowSearch(prev => !prev)}>
                        <FaSearch className="search-icon" />
                    </button>
                    {showSearch && (
                        <TextField
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search users"
                            sx={{ width: '300px' }}
                        />
                    )}
                </div>

                <Autocomplete
                    options={uniqueNames}
                    getOptionLabel={(option) => option}
                    onChange={(event, newValue) => handleFilterChange('lastName', newValue || '')}
                    renderInput={(params) => <TextField {...params} label="Name" variant="outlined" />}
                    sx={{ minWidth: 220 }}
                    value={selectedFilter.key === 'lastName' ? selectedFilter.value : ''}
                />
                <Autocomplete
                    options={uniqueEmail}
                    getOptionLabel={(option) => option}
                    onChange={(event, newValue) => handleFilterChange('email', newValue || '')}
                    renderInput={(params) => <TextField {...params} label="Email" variant="outlined" />}
                    sx={{ minWidth: 350 }}
                    value={selectedFilter.key === 'email' ? selectedFilter.value : ''}
                />
                <Autocomplete
                    options={uniqueAges}
                    getOptionLabel={(option) => option.toString()}
                    onChange={(event, newValue) => handleFilterChange('age', newValue || '')}
                    renderInput={(params) => <TextField {...params} label="Age" variant="outlined" />}
                    sx={{ minWidth: 220 }}
                    value={selectedFilter.key === 'age' ? selectedFilter.value : ''}
                />
                <Autocomplete
                    options={uniqueGenders}
                    getOptionLabel={(option) => option}
                    onChange={(event, newValue) => handleFilterChange('gender', newValue || '')}
                    renderInput={(params) => <TextField {...params} label="Gender" variant="outlined" />}
                    sx={{ minWidth: 220 }}
                    value={selectedFilter.key === 'gender' ? selectedFilter.value : ''}
                />
            </div>

            <DataTable
                data={filteredUsers}
                columns={columns}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </>
    );
};

export default Users;
