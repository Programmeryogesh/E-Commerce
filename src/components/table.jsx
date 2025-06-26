import * as React from "react";
import Paper from "@mui/material/Paper";
import { DataGridTable } from "../styles/dataTable.style";

export default function DataTable({
  columns,
  rows,
  pagination = false,
  paginationMode,
  editMode,
  processRowUpdate,
  rowCount,
  rowHeight,
  page = 0,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}) {
  const [paginationModel, setPaginationModel] = React.useState({
    page: page,
    pageSize: pageSize,
  });

  React.useEffect(() => {
    setPaginationModel({ page, pageSize });
  }, [page, pageSize]);

  const handlePaginationModelChange = (model) => {
    setPaginationModel(model);
    if (onPageChange) onPageChange(model.page);
    if (onPageSizeChange) onPageSizeChange(model.pageSize);
  };

  return (
    <DataGridTable
      rows={rows}
      rowHeight={rowHeight || 50}
      rowSelection={false}
      columns={columns}
      density="compact"
      disableColumnMenu
      editMode={editMode}
      processRowUpdate={processRowUpdate}
      {...(pagination &&
        paginationMode && {
          pagination: true,
          paginationMode: paginationMode,
          paginationModel: paginationModel,
          pageSizeOptions: [10, 25, 75, 100],
          rowCount: rowCount,
          onPaginationModelChange: handlePaginationModelChange,
        })}
      sx={{
        "& .MuiTablePagination-root": {
          display: pagination ? "flex" : "none",
        },
      }}
    />
  );
}
