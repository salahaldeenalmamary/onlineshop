import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { useQuery, useQueryClient, useMutation } from "react-query";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { Empty } from "antd";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";

import RoleForm from "@pages/dashboard/admin/customers/components/forms/RoleForm";

const PageContainer = React.lazy(() => import("@components/Templates/PageContainer"));
const CustomToolBar = React.lazy(() => import("@components/Toolbar/CustomToolBar"));
const FormModal = React.lazy(() => import("@components/FormModal/FormModal"));

import { GetRoles, RoleDeleteRequest } from "@controllers/RoleController";

function Role() {
    const queryClient = useQueryClient();
    const [open, setOpen] = React.useState(false);
    const [selectedForUpdate, setSelectedForUpdate] = React.useState(null);
    const { data: roles, isLoading } = useQuery(["roles"], GetRoles);

    function handleSelect(id) {
        setSelectedForUpdate(roles.find((pt) => pt.roleID === id));
        setOpen(true);
    }

    const { mutate: deleteRole } = useMutation(RoleDeleteRequest, {
        onSuccess: (d) => {
            queryClient.invalidateQueries();
            toast("Role Deleted", {
                type: "success",
            });
            setOpen(false);
        },
        onError: (d) => {
            toast("Role Deleting Failed", {
                type: "error",
            });
        },
    });

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
            field: "action",
            headerName: "",
            flex: 1,
            editable: false,
            valueGetter: ({ row }) => {
                return row.pdTypeID;
            },
            renderCell: ({ row }) => {
                return (
                    <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ cursor: "pointer" }}
                    >
                        <Tooltip placement="top" title="Update role">
                            <IconButton
                                color="primary"
                                fontSize="small"
                                onClick={() => {
                                    handleSelect(row.roleID);
                                }}
                            >
                                <EditIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="top" title="Delete role">
                            <IconButton
                                color="primary"
                                fontSize="small"
                                onClick={() => {
                                    deleteRole(row.roleID);
                                }}
                            >
                                <DeleteIcon color="error" />
                            </IconButton>
                        </Tooltip>
                    </div>
                );
            },
        },
    ]

    if (isLoading) return <Empty />;

    return (
        <PageContainer>
            <FormModal
                setOpen={setOpen}
                open={open}
                label={`${selectedForUpdate ? "Edit" : "Create"} Role`}
            >
                <RoleForm selectedForUpdate={selectedForUpdate} setOpen={setOpen} />
            </FormModal>
            <Grid item xs={12}>
                <DataGrid
                    autoHeight
                    rows={roles}
                    loading={isLoading}
                    columns={columns}
                    components={{
                        Toolbar: CustomToolBar,
                    }}
                    componentsProps={{
                        toolbar: {
                            create: () => {
                                setOpen(true);
                            },
                        },
                    }}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 && "even"
                    }
                    getRowHeight={() => "auto"}
                    getRowId={(row) => row.roleID}
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

export default React.memo(Role);