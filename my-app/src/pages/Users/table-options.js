
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
  { field: 'firstName', headerName: 'FIRST NAME', flex: 1 },
  { field: 'lastName', headerName: 'LAST NAME', flex: 1 },
  { field: 'email', headerName: 'EMAIL', flex: 1 },
  { field: 'age', headerName: 'AGE', width: 100 },
  { field: 'gender', headerName: 'GENDER', width: 120 },
  { field: 'username', headerName: 'USERNAME', flex: 1 },
  { field: 'bloodGroup', headerName: 'BLOOD GROUP', width: 120 },
  { field: 'eyeColor', headerName: 'EYE COLOR', flex: 1 }
];

export { columns, options };
