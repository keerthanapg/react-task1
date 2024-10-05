import React from 'react';
import { Box, Button, Select, MenuItem, FormControl } from '@mui/material';

const DataTable = ({ data, columns, pagination, onPageChange, onPageSizeChange }) => {
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    const currentPage = pagination.page;

    // Function to calculate the range of page numbers to display
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; 
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <Box sx={{ width: '100%', overflow: 'auto' }}>
            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.field} style={{ border: '1px solid #ccc', padding: '8px', background: '#c0e3e5' }}>
                                {col.headerName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row) => (
                            <tr key={row.id}>
                                {columns.map((col) => (
                                    <td key={col.field} style={{ border: '1px solid #ccc', padding: '8px' }}>
                                        {row[col.field]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: 'center', padding: '16px' }}>
                                No results found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination and Rows Per Page Options */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                {/* Rows per page */}
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <Select
                        labelId="rows-per-page-label"
                        value={pagination.limit}
                        onChange={(e) => onPageSizeChange(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Rows per page' }}
                        sx={{ bgcolor: '#f0f0f0', borderRadius: '4px' }} 
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>

                {/* Pagination Controls */}
                <Box display="flex" alignItems="center">
                    {/* Previous Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        sx={{ marginRight: '8px' }}
                    >
                        &lt;
                    </Button>

                    {pageNumbers.map((pageNumber) => (
                        <Button
                            key={pageNumber}
                            variant={currentPage === pageNumber ? 'contained' : 'outlined'}
                            color="primary"
                            onClick={() => onPageChange(pageNumber)}
                            sx={{ margin: '0 4px' }} 
                        >
                            {pageNumber}
                        </Button>
                    ))}

                    {/* Next Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        sx={{ marginLeft: '8px' }} 
                    >
                        &gt;
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DataTable;
