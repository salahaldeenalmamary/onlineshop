import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { useQuery, useQueryClient, useMutation } from "react-query";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { Empty } from "antd";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import Chip from "@mui/material/Chip";
import { toast } from "react-toastify";
import { GridToolbar, GridToolbarQuickFilter } from "@mui/x-data-grid";

const PageContainer = React.lazy(() => import("@components/Templates/PageContainer"));

import { GetCustomers, DeleteCustomerRequest, UpdateCustomerStatusRequest } from "@controllers/CustomerController";

function CustomToolBar() {
    return (
        <div
            style={{
                borderRadius: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            className="custom-tool-bar"
        >
            <div>
                <GridToolbarQuickFilter size="small" sx={{ color: "white", padding: 0 }} />
            </div>
            <div>
                <GridToolbar />
            </div>
        </div>
    );
}

function Customer() {
    const queryClient = useQueryClient();
    const { data: customers, isLoading } = useQuery(["customers"], GetCustomers);

    const { mutate: updateByStatusCustomer } = useMutation(UpdateCustomerStatusRequest, {
        onSuccess: (d) => {
            queryClient.invalidateQueries();
            toast("Customer Status Updated", {
                type: "success",
            });
        },
        onError: (d) => {
            toast("Customer Status Update Failed", {
                type: "error",
            });
        },
    });

    const { mutate: deleteCustomer } = useMutation(DeleteCustomerRequest, {
        onSuccess: (d) => {
            queryClient.invalidateQueries();
            toast("Customer Deleted", {
                type: "success",
            });
        },
        onError: (d) => {
            toast("Customer Deleting Failed", {
                type: "error",
            });
        },
    });

    // TODO: connect and add shipping link

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            editable: false,
            renderCell: ({ row }) => {
                return (
                    <div>
                        <strong>{row.name}</strong>
                    </div>
                );
            },
        },
        {
            field: "surname",
            headerName: "Surname",
            flex: 1,
            editable: false,
            renderCell: ({ row }) => {
                return (
                    <div>
                        <strong>{row.surname}</strong>
                    </div>
                );
            },
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            editable: false,
            renderCell: ({ row }) => {
                return (
                    <div>
                        {row.email}
                    </div>
                );
            },
        },
        {
            field: "phone",
            headerName: "Phone",
            flex: 1,
            editable: false,
            renderCell: ({ row }) => {
                return (
                    <div>
                        {row.phone}
                    </div>
                );
            },
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            editable: false,
            renderCell: ({ row }) => {
                return (
                    <div>
                        {row.roles.name}
                    </div>
                );
            },
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            editable: false,
            minWidth: 150,
            renderCell: ({ row }) => {
                return (
                    <div>
                        <Chip label={row.status ? "Active" : "In-active"} color={row.status ? "success" : "error"} size="small" />
                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "",
            flex: 1,
            editable: false,
            valueGetter: ({ row }) => {
                return row.customerID;
            },
            renderCell: ({ row }) => {
                return (
                    <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ cursor: "pointer" }}
                    >
                        <Tooltip placement="top" title={row.inStock ? "Active" : "In-active"}>
                            <IconButton
                                color="primary"
                                fontSize="small"
                                onClick={() => {
                                    updateByStatusCustomer({ id: row.customerID, status: !row.status });
                                }}
                            >
                                <RestartAltIcon color="success" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="top" title="Delete customer">
                            <IconButton
                                color="primary"
                                fontSize="small"
                                onClick={() => {
                                    console.log(row.customerID);
                                    // setConfirmState({
                                    //     isOpen: true,
                                    //     name:
                                    //         row.carPools[0].origin +
                                    //         " to " +
                                    //         row.carPools[0].destination,
                                    //     type: "leave",
                                    //     onConfirm: () => {
                                    //         leaveCarPool({
                                    //             JoinId: row.joinId,
                                    //         });
                                    //     },
                                    // });
                                }}
                            >
                                <DeleteIcon color="error" />
                            </IconButton>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];


    if (isLoading) return <Empty />;

    return (
        <PageContainer>
            <Grid item xs={12}>
                <DataGrid
                    autoHeight
                    rows={customers}
                    loading={isLoading}
                    columns={columns}
                    components={{
                        Toolbar: CustomToolBar,
                    }}
                    componentsProps={{
                        toolbar: {},
                    }}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0
                            ? "even active"
                            : "odd active"
                    }
                    getRowHeight={() => "auto"}
                    getRowId={(row) => row.customerID}
                    onCellEditStop={(_, e) => console.log(e.target)}
                    initialState={{
                        sorting: {
                            sortModel: [
                                {
                                    field: "action",
                                    sort: "asc",
                                },
                            ],
                        },
                    }}
                />
            </Grid>
        </PageContainer>
    )
}

export default React.memo(Customer);