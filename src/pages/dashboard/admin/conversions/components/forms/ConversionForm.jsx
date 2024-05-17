import React from 'react'
import ButtonGroup from "@mui/material/ButtonGroup";
import { TextField, Button, Grid } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { ConversionPostRequest, ConversionPutRequest } from "@controllers/ConversionController";

function ConversionForm({ setOpen, selectedForUpdate = null }) {
    const queryClient = useQueryClient();

    console.log(selectedForUpdate);

    const { mutate: createConversion } = useMutation(ConversionPostRequest, {
        onSuccess: (d) => {
            queryClient.invalidateQueries();
            toast("Conversion Created", {
                type: "success",
            });
            setOpen(false);
        },
        onError: (d) => {
            toast("Conversion Create Failed", {
                type: "error",
            });
        },
    });

    const { mutate: editConversion } = useMutation(ConversionPutRequest, {
        onSuccess: (d) => {
            queryClient.invalidateQueries();
            toast("Conversion Updated", {
                type: "success",
            });
            setOpen(false);
        },
        onError: (d) => {
            toast("Conversion Updating Failed", {
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
            id: selectedForUpdate ? selectedForUpdate.conversionID : null,
            unit: selectedForUpdate ? selectedForUpdate.unit : "",
        },
        validationSchema: Yup.object({
            unit: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            if (selectedForUpdate) {
                editConversion(values);
            }
            else {
                delete values.id;
                createConversion(values);
            }
        },
    });

    React.useEffect(() => {
        setFieldTouched("unit");
    }, [selectedForUpdate]);

    return (
        <Grid container rowGap={2}>
            <Grid item xs={12}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="unit"
                    name="unit"
                    label="Conversion Unit"
                    type="text"
                    fullWidth
                    size="small"
                    error={!!errors.unit}
                    helperText={errors.unit}
                    value={values.unit}
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

export default React.memo(ConversionForm);