import React from 'react';
import ButtonGroup from "@mui/material/ButtonGroup";
import { TextField, Button, Grid } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { ProductTypePostRequest, ProductTypePutRequest } from '@controllers/ProductTypeController';

function ProductTypeForm({ setOpen, selectedForUpdate = null }) {
    const queryClient = useQueryClient();

    const { mutate: createProductType } = useMutation(ProductTypePostRequest, {
        onSuccess: (d) => {
            queryClient.invalidateQueries();
            toast("Product Type Created", {
                type: "success",
            });
            setOpen(false);
        },
        onError: (d) => {
            toast("Product Type Create Failed", {
                type: "error",
            });
        },
    });

    const { mutate: editProductType } = useMutation(ProductTypePutRequest, {
        onSuccess: (d) => {
            queryClient.invalidateQueries();
            toast("Product Type Updated", {
                type: "success",
            });
            setOpen(false);
        },
        onError: (d) => {
            toast("Product Type Updating Failed", {
                type: "error",
            });
        },
    });

    const {
        errors,
        values,
        submitForm,
        handleChange,
        setFieldTouched,
    } = useFormik({
        initialValues: {
            id: selectedForUpdate ? selectedForUpdate.pdTypeID : null,
            category: selectedForUpdate ? selectedForUpdate.category : "",
        },
        validationSchema: Yup.object({
            category: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            if (selectedForUpdate) {
                editProductType(values);
            }
            else {
                delete values.id;
                createProductType(values);
            }
        },
    });

    React.useEffect(() => {
        setFieldTouched("category");
    }, [selectedForUpdate]);

    return (
        <Grid container rowGap={2}>
            <Grid item xs={12}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="category"
                    name="category"
                    label="Product Type Category"
                    type="text"
                    fullWidth
                    size="small"
                    error={!!errors.category}
                    helperText={errors.category}
                    value={values.category}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup
                    variant="spaced"
                    aria-label="outlined primary button group"
                >
                    <Button
                        sx={{ color: "white" }}
                        variant="contained"
                        onClick={submitForm}
                    >
                        Save
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: "#ededed",
                            color: "grey",
                            border: "#BEBEBE",
                        }}
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default React.memo(ProductTypeForm); 