
const options = {
  filterType: "dropdown",
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 20],
  download: false,
  print: false,
  viewColumns: false,
  selectableRowsHeader: false,
  selectableRows: "none",
  selectToolbarPlacement: "none",
};

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'TITLE', flex: 1 },
    { field: 'description', headerName: 'DESCRIPTION', flex: 2 },
    { field: 'category', headerName: 'CATEGORY', flex: 1 },
    { field: 'price', headerName: 'PRICE', width: 150 },
    { field: 'discountPercentage', headerName: 'DISCOUNT (%)', width: 130 },
    { field: 'rating', headerName: 'RATING', width: 100 },
    { field: 'stock', headerName: 'STOCK', width: 100 },
    { field: 'brand', headerName: 'BRAND', flex: 1 },
    { field: 'availabilityStatus', headerName: 'AVAILABILITY', width: 150 }
];


export { columns, options };
