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
import ProductForm from "@pages/dashboard/admin/products/components/forms/ProductForm";

const CustomToolBar = React.lazy(() => import("@components/Toolbar/CustomToolBar"));
const FormModal = React.lazy(() => import("@components/FormModal/FormModal"));
const PageContainer = React.lazy(() => import("@components/Templates/PageContainer"));

import { GetProducts, ProductDeleteRequest, UpdateProductStatusRequest } from "@controllers/ProductController";

function Product() {
    const queryClient = useQueryClient();
    const [open, setOpen] = React.useState(false);
    const [selectedForUpdate, setSelectedForUpdate] = React.useState(null);
    const { data: products, isLoading } = useQuery(["product"], GetProducts);

    function handleSelect(id) {
        setSelectedForUpdate(products.find((pt) => pt.productID === id));
        setOpen(true);
    }
    const { mutate: updateByStatusProduct } = useMutation(UpdateProductStatusRequest, {
        onSuccess: (d) => {
            queryClient.invalidateQueries();
            toast("Product Status Updated", {
                type: "success",
            });
            setOpen(false);
        },
        onError: (d) => {
            toast("Product Status Update Failed", {
                type: "error",
            });
        },
    });

    const { mutate: deleteProduct } = useMutation(ProductDeleteRequest, {
        onSuccess: (d) => {
            queryClient.invalidateQueries();
            toast("Product Deleted", {
                type: "success",
            });
            setOpen(false);
        },
        onError: (d) => {
            toast("Product Deleting Failed", {
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
            minWidth: 150,
            renderCell: ({ row }) => {
                return (
                    <div>
                        <strong>{row.name}</strong>
                    </div>
                );
            },
        },
        {
            field: "brand",
            headerName: "Brand",
            flex: 1,
            editable: false,
            minWidth: 150,
            renderCell: ({ row }) => {
                return (
                    <div>
                        <strong>{row.brand}</strong>
                    </div>
                );
            },
        },
        {
            field: "conversion",
            headerName: "Size",
            flex: 1,
            editable: false,
            minWidth: 150,
            renderCell: ({ row }) => {
                return (
                    <div>
                        {row.conversionSize}{row.conversion.unit}
                    </div>
                );
            },
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
            editable: false,
            minWidth: 150,
            renderCell: ({ row }) => {
                return (
                    <div>
                        {row.price}
                    </div>
                );
            },
        },
        {
            field: "In Stock",
            headerName: "In Stock",
            flex: 1,
            editable: false,
            minWidth: 150,
            renderCell: ({ row }) => {
                return (
                    <div>
                        <Chip label={row.inStock ? "In Stock" : "Out of Stock"} color={row.inStock ? "success" : "error"} size="small" />
                    </div>
                );
            },
        },
        {
            field: "image",
            headerName: "Image",
            flex: 1,
            editable: false,
            minWidth: 150,
            renderCell: ({ row }) => {
                return (
                    <div>
                        <img src={row.imageUrl} alt={row.imageName} width="100%" height="100%" />
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
                return row.productID;
            },
            renderCell: ({ row }) => {
                return (
                    <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ cursor: "pointer" }}
                    >
                        <Tooltip placement="top" title={row.inStock ? "Out of stock" : "In stock"}>
                            <IconButton
                                color="primary"
                                fontSize="small"
                                onClick={() => {
                                    updateByStatusProduct({ id: row.productID, inStock: !row.inStock });
                                }}
                            >
                                <RestartAltIcon color="success" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="top" title="Update product">
                            <IconButton
                                color="primary"
                                fontSize="small"
                                onClick={() => {
                                    handleSelect(row.productID);
                                }}
                            >
                                <EditIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="top" title="Delete product">
                            <IconButton
                                color="primary"
                                fontSize="small"
                                onClick={() => {
                                    console.log(row.productID);
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
            <FormModal
                setOpen={setOpen}
                open={open}
                label={`${selectedForUpdate ? "Edit" : "Create"} Product`}
            >
                <ProductForm selectedForUpdate={selectedForUpdate} setOpen={setOpen} />
            </FormModal>
            <Grid item xs={12}>
                <DataGrid
                    autoHeight
                    rows={products}
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
                        params.indexRelativeToCurrentPage % 2 === 0
                            ? "even active"
                            : "odd active"
                    }
                    getRowHeight={() => "auto"}
                    getRowId={(row) => row.productID}
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

export default React.memo(Product);