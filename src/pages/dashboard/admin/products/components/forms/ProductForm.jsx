import React from 'react'
import ButtonGroup from "@mui/material/ButtonGroup";
import { TextField, Button, MenuItem, Grid, InputAdornment, Switch, FormControlLabel, FormHelperText } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import FormSkeleton from '@components/Skeleton/FormSkeleton';

import { ProductPostRequest, ProductPutRequest } from '@controllers/ProductController';
import { GetConversions } from '@controllers/ConversionController';
import { GetProductTypes } from "@controllers/ProductTypeController";

function ProductForm({ setOpen, selectedForUpdate = null }) {
    const queryClient = useQueryClient();
    const [image, setImage] = React.useState(null);
    const { data: conversions, isLoading } = useQuery(["conversions"], GetConversions);
    const { data: productTypes, isLoading: ptLoading } = useQuery(["productType"], GetProductTypes);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
    };

    const { mutate: createProduct } = useMutation(ProductPostRequest, {
        onSuccess: (d) => {
            queryClient.invalidateQueries();
            toast("Product Created", {
                type: "success",
            });
            setOpen(false);
        },
        onError: (d) => {
            toast("Product Create Failed", {
                type: "error",
            });
        },
    });

    const { mutate: editProduct } = useMutation(ProductPutRequest, {
        onSuccess: (d) => {
            queryClient.invalidateQueries();
            toast("Product Updated", {
                type: "success",
            });
            setOpen(false);
        },
        onError: (d) => {
            toast("Product Updating Failed", {
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
            id: selectedForUpdate ? selectedForUpdate.productID : null,
            Name: selectedForUpdate ? selectedForUpdate.name : "",
            Description: selectedForUpdate ? selectedForUpdate.desc : "",
            Brand: selectedForUpdate ? selectedForUpdate.brand : "",
            PDTypeID: selectedForUpdate ? selectedForUpdate.productType.pdTypeID : 0,
            ConversionSize: selectedForUpdate ? selectedForUpdate.conversionSize : 0,
            ConversionID: selectedForUpdate ? selectedForUpdate.conversion.conversionID : 0,
            Price: selectedForUpdate ? selectedForUpdate.price : 0,
            InStock: selectedForUpdate ? selectedForUpdate.inStock : false,
            Image: selectedForUpdate ? selectedForUpdate.image : null,
        },
        validationSchema: Yup.object({
            Name: Yup.string().required("Required"),
            Description: Yup.string().required("Required"),
            Brand: Yup.string().required("Required"),
            PDTypeID: Yup.number().min(1).required("Required"),
            ConversionID: Yup.number().min(1).required("Required"),
            ConversionSize: Yup.number().required("Required"),
            Price: Yup.number().required("Required"),
            InStock: Yup.bool().oneOf([true, false], "Required"),
        }),
        onSubmit: (values) => {
            if (selectedForUpdate) {
                editProduct(values);
            }
            else {
                delete values.id;
                createProduct(values);
            }
        },
    });

    React.useEffect(() => {
        values.Image = image;
    }, [image]);

    return (
        !isLoading && !ptLoading ? (
            <Grid container rowGap={2}>
                <Grid item xs={12}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Name"
                        name="Name"
                        label="Product Name"
                        type="name"
                        fullWidth
                        size="small"
                        error={!!errors.Name}
                        helperText={errors.Name}
                        value={values.Name}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        margin="dense"
                        id="Description"
                        name="Description"
                        label="Product Description"
                        type="text"
                        fullWidth
                        size="small"
                        error={!!errors.Description}
                        helperText={errors.Description}
                        value={values.Description}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        margin="dense"
                        id="Brand"
                        name="Brand"
                        label="Product brand"
                        type="text"
                        fullWidth
                        size="small"
                        error={!!errors.Brand}
                        helperText={errors.Brand}
                        value={values.Brand}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="PDTypeID"
                        name="PDTypeID"
                        label="Product Category"
                        select
                        fullWidth
                        size="small"
                        error={!!errors.PDTypeID}
                        helperText={errors.PDTypeID}
                        value={values.PDTypeID}
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>
                            <em>Select Option</em>
                        </MenuItem>
                        {productTypes.map((productType) => (<MenuItem key={productType.pdTypeID} value={productType.pdTypeID}>{productType.category}
                        </MenuItem>))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="ConversionID"
                        name="ConversionID"
                        label="Conversion Unit"
                        select
                        fullWidth
                        size="small"
                        error={!!errors.ConversionID}
                        helperText={errors.ConversionID}
                        value={values.ConversionID}
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>
                            <em>Select Option</em>
                        </MenuItem>
                        {conversions.map((conversion) => (<MenuItem key={conversion.conversionID} value={conversion.conversionID}>{conversion.unit}
                        </MenuItem>))}
                    </TextField>
                </Grid>
                {values.ConversionID != 0 ? (
                    <Grid item xs={12}>
                        <TextField
                            id="ConversionSize"
                            name="ConversionSize"
                            label="Conversion size"
                            type="number"
                            fullWidth
                            size="small"
                            error={!!errors.ConversionSize}
                            helperText={errors.ConversionSize}
                            value={values.ConversionSize}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{conversions && conversions.find((conversion) => conversion.conversionID === values.ConversionID).unit}</InputAdornment>
                            }}
                        />
                    </Grid>) : null}

                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch required color="primary" value={values.InStock} checked={values.InStock} onChange={handleChange} id="InStock" />
                        }
                        label="In Stock"
                    />
                    <FormHelperText>{errors.InStock}</FormHelperText>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        margin="dense"
                        id="Price"
                        name="Price"
                        label="Price"
                        type="number"
                        fullWidth
                        size="small"
                        error={!!errors.Price}
                        helperText={errors.Price}
                        value={values.Price}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" component="label">
                        Upload Image
                        <input hidden id="Image" name="Image" onChange={handleImageChange} type="file" accept="image/*" />
                    </Button>
                    {image != null ? " Image Uploaded" : " No image found"}
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
        ) : <FormSkeleton />);
}

export default React.memo(ProductForm);