import { autocompleteClasses } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
export const DataGridTable = styled(DataGrid)({
    border: 0,
    width: autocompleteClasses.fullWidth,
    fontSize: "12px",
  
    // '&::-webkit-scrollbar': {
    //   width: '0px' /* Hide scrollbar */,
    // },
    "& .MuiDataGrid-filler": {
      height: "0px !important",
      border: "0px solid !important",
    },
    "& .MuiDataGrid-columnSeparator": {
      visibility: "hidden",
    },
    "&.MuiDataGrid-root  .MuiDataGrid-cell:focus": {
      outline: "0",
    },
    "&.MuiDataGrid-root  .MuiDataGrid-columnHeader:focus": {
      outline: "0",
    },
    "& .super-app-theme--header": {
      backgroundColor: "transparent",
      color: " #000",
      height: "50px !important",
    },
    "& .MuiDataGrid-sortIcon": {
      opacity: 1,
      color: "#595353",
    },
    "& .MuiDataGrid-cell": {
      color: "#595353",
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#f1f2f6",
    },
    "& .MuiDataGrid-row::nth-of-type(even)": {
      backgroundColor: "#f1f2f6",
    },
    "& .MuiDataGrid-row::nth-of-type(odd)": {
      backgroundColor: "#f9f9fb",
    },
    "& .MuiDataGrid-footerContainer": {
      display: "none",
    },
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      minWidth: "100px !important",
    },
  });