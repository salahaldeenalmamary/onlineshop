import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { useQuery, useQueryClient, useMutation } from "react-query";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { Empty } from "antd";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";

import ConversionForm from "@pages/dashboard/admin/conversions/components/forms/ConversionForm";

const PageContainer = React.lazy(() => import("@components/Templates/PageContainer"));
const CustomToolBar = React.lazy(() => import("@components/Toolbar/CustomToolBar"));
const FormModal = React.lazy(() => import("@components/FormModal/FormModal"));

import { GetConversions, ConversionDeleteRequest } from "@controllers/ConversionController";

function Conversions() {
    const queryClient = useQueryClient();
    const [open, setOpen] = React.useState(false);
    const [selectedForUpdate, setSelectedForUpdate] = React.useState(null);
    const { data: conversions, isLoading } = useQuery(["conversions"], GetConversions);

    function handleSelect(id) {
        setSelectedForUpdate(conversions.find((c) => c.conversionID === id));
        setOpen(true);
    }

    const { mutate: conversionDelete } = useMutation(ConversionDeleteRequest, {
        onSuccess: (d) => {
            queryClient.invalidateQueries();
            toast("Conversion Deleted", {
                type: "success",
            });
            setOpen(false);
        },
        onError: (d) => {
            toast("Conversion Deleting Failed", {
                type: "error",
            });
        },
    });

    const columns = [
        {
            field: "unit",
            headerName: "Unit",
            flex: 1,
            editable: false,
            renderCell: ({ row }) => {
                return (
                    <div>
                        <strong>{row.unit}</strong>
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
                return row.conversionID;
            },
            renderCell: ({ row }) => {
                return (
                    <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ cursor: "pointer" }}
                    >
                        <Tooltip placement="top" title="Update conversion">
                            <IconButton
                                color="primary"
                                fontSize="small"
                                onClick={() => {
                                    handleSelect(row.conversionID);
                                }}
                            >
                                <EditIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="top" title="Delete conversion">
                            <IconButton
                                color="primary"
                                fontSize="small"
                                onClick={() => {
                                    conversionDelete(row.conversionID);
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
                label={`${selectedForUpdate ? "Edit" : "Create"} Conversion`}
            >
                <ConversionForm selectedForUpdate={selectedForUpdate} setOpen={setOpen} />
            </FormModal>
            <Grid item xs={12}>
                <DataGrid
                    autoHeight
                    rows={conversions}
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
                    getRowId={(row) => row.conversionID}
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

export default React.memo(Conversions);