import { useState, useEffect } from "react";
import reactDom from "react-dom";
import {
  Box,
  TextField,
  Button,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useFormik, Form, Field, Formik, FieldArray } from "formik";
import { array, number, object, string } from "yup";

export default function AddModal({ show, onClose }) {
  const [previewImage, setPreviewImage] = useState("");
  return (
    <Modal
      open={show}
      onClose={() => {
        onClose();
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            marginTop: "70px",
            width: "500px",
            height: "700px",
            backgroundColor: "white",
            padding: "50px",
          }}
        >
          <Formik
            initialValues={{
              name: "",
              price: "",

              roles: [],
              lanes: [],
              image: "",
            }}
            onSubmit={(values, formikHelpers) => {
              console.log(values);
              formikHelpers.resetForm();
            }}
            validationSchema={object({
              name: string()
                .required("Please Enter The Hero Name")
                .min(2, "Name Too Short"),
              price: number()
                .required("Please Input The Price")
                .min(10000, "Must Be More Than 10000")
                .max(32000, "Cannot Be More Than 32000"),
              roles: array().required("A Hero Must Have A Role").max(2),
              lanes: array().required("A Hero MUst Have A Lane").max(2),
              image: string().required("Please Input The Hero Image"),
            })}
          >
            {({ setFieldValue, errors, isValid, touched }) => (
              <Form>
                <Field
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  as={TextField}
                  style={{ marginBlock: "10px" }}
                  error={Boolean(errors.name) && Boolean(touched.name)}
                  helperText={Boolean(touched.name) && errors.name}
                />
                <Field
                  type="number"
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  as={TextField}
                  style={{ marginBlock: "10px" }}
                  error={Boolean(errors.price) && Boolean(touched.price)}
                  helperText={Boolean(touched.price) && errors.price}
                />
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel sx={{ marginTop: "8px" }}>
                    Select Up To Two Roles *
                  </InputLabel>

                  <Field
                    as={Select}
                    type="select"
                    name="roles"
                    multiple="true"
                    style={{ marginBlock: "10px" }}
                    // error={Boolean(errors.roles) && Boolean(touched.roles)}
                    // helperText={Boolean(touched.roles) && errors.roles}
                  >
                    <MenuItem value="IQd2iirX2w83sVl7HRNR">Marksman</MenuItem>
                    <MenuItem value="2HC38QmJgUPwH7KZFp10">Tank</MenuItem>
                    <MenuItem value="ji2XFhDhKlcFFe5fwxS9">Mage</MenuItem>
                    <MenuItem value="atI6ahQC7luRIEWETTRl">Assasin</MenuItem>
                    <MenuItem value="tin4OS042UjXOkHwPLzm">Support</MenuItem>
                    <MenuItem value="91Su0EimjsaIrEh5TE1o">Figther</MenuItem>
                  </Field>
                  <FormHelperText>
                    {Boolean(touched.roles) && errors.roles}
                  </FormHelperText>
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel sx={{ marginTop: "8px" }}>
                    Select Up To Two Lanes
                  </InputLabel>
                  <Field
                    as={Select}
                    type="select"
                    name="lanes"
                    multiple="true"
                    style={{ marginBlock: "10px" }}
                  >
                    <MenuItem value="BR1ijHHX09pn6FCBIyFh">Mid Lane</MenuItem>
                    <MenuItem value="GbeFgoDShkRLdyXeivSX">Gold Lane</MenuItem>
                    <MenuItem value="P2cvz5uyMsKO00ua9FOG">Roam</MenuItem>
                    <MenuItem value="PMfgz045PaLJUuJSwF2l">Jungle</MenuItem>
                    <MenuItem value="x0DxKwqS7JFE6zx09Fk0">Exp Lane</MenuItem>
                  </Field>
                </FormControl>
                <Box>
                  <Box
                    sx={{
                      border: "0.1px solid black",
                      width: "497px",
                      height: "200px",
                      marginBlock: "20px",
                    }}
                  >
                    {previewImage ? (
                      <img style={{ height: "100%" }} src={previewImage} />
                    ) : null}
                  </Box>

                  <input
                    type="file"
                    onChange={(event) => {
                      setFieldValue("image", event.target.files[0]);
                      setPreviewImage(
                        URL.createObjectURL(event.target.files[0])
                      );
                    }}
                  />
                </Box>

                <Box sx={{ marginTop: "20px", display: "flex" }}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{ backgroundColor: "green" }}
                  >
                    Add Hero
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="warning"
                    sx={{ backgroundColor: "darkred" }}
                    onClick={() => {
                      onClose();
                      setPreviewImage("");
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Modal>
  );
}
