import { useState, useEffect } from "react";
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
import { Form, Field, Formik } from "formik";
import { array, number, object, string } from "yup";
import { UploadData } from "./uploadData";
import Image from "next/image";

export default function AddModal({ show, onClose }) {
  const [previewImage, setPreviewImage] = useState("");

  const menuItemDisabled = (item, values) => {
    var isDisabled = false;
    if (values.length == 2) {
      for (var i = 0; i < values.length; i++) {
        const value = values[i];
        if (value == item) {
          isDisabled = false;
          break;
        }
        isDisabled = true;
      }
    }
    return isDisabled;
  };
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
            marginTop: "40px",
            width: "500px",
            height: "750px",
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
            onSubmit={async (values, formikHelpers) => {
              const res = await UploadData(values);
              formikHelpers.resetForm();
              setPreviewImage("");
              if (res) {
                onClose();
                alert("Hero Added Please Refresh The Page");
              }
            }}
            validationSchema={object({
              name: string()
                .required("Please Enter The Hero Name")
                .min(2, "Name Too Short"),
              price: number()
                .required("Please Input The Price")
                .min(10000, "Must Be More Than 10000")
                .max(32000, "Cannot Be More Than 32000"),
              roles: array().min(1),
              lanes: array().min(1),
              image: string().required("Please Input The Hero Image"),
            })}
          >
            {({ setFieldValue, errors, isValid, touched, values }) => (
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
                    <MenuItem
                      value="IQd2iirX2w83sVl7HRNR"
                      disabled={menuItemDisabled(
                        "IQd2iirX2w83sVl7HRNR",
                        values.roles,
                        errors.roles
                      )}
                    >
                      Marksman
                    </MenuItem>
                    <MenuItem
                      value="2HC38QmJgUPwH7KZFp10"
                      disabled={menuItemDisabled(
                        "2HC38QmJgUPwH7KZFp10",
                        values.roles,
                        errors.roles
                      )}
                    >
                      Tank
                    </MenuItem>
                    <MenuItem
                      value="ji2XFhDhKlcFFe5fwxS9"
                      disabled={
                        menuItemDisabled(
                          "ji2XFhDhKlcFFe5fwxS9",
                          values.roles,
                          errors.roles
                        ) && true
                      }
                    >
                      Mage
                    </MenuItem>
                    <MenuItem
                      value="atI6ahQC7luRIEWETTRl"
                      disabled={
                        menuItemDisabled(
                          "atI6ahQC7luRIEWETTRl",
                          values.roles,
                          errors.roles
                        ) && true
                      }
                    >
                      Assasin
                    </MenuItem>
                    <MenuItem
                      value="tin4OS042UjXOkHwPLzm"
                      disabled={
                        menuItemDisabled(
                          "tin4OS042UjXOkHwPLzm",
                          values.roles,
                          errors.roles
                        ) && true
                      }
                    >
                      Support
                    </MenuItem>
                    <MenuItem
                      value="91Su0EimjsaIrEh5TE1o"
                      disabled={
                        menuItemDisabled(
                          "91Su0EimjsaIrEh5TE1o",
                          values.roles,
                          errors.roles
                        ) && true
                      }
                    >
                      Figther
                    </MenuItem>
                  </Field>
                  <FormHelperText style={{ color: "red" }}>
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
                    <MenuItem
                      value="BR1ijHHX09pn6FCBIyFh"
                      disabled={
                        menuItemDisabled(
                          "BR1ijHHX09pn6FCBIyFh",
                          values.lanes
                        ) && true
                      }
                    >
                      Mid Lane
                    </MenuItem>
                    <MenuItem
                      value="GbeFgoDShkRLdyXeivSX"
                      disabled={
                        menuItemDisabled(
                          "GbeFgoDShkRLdyXeivSX",
                          values.lanes
                        ) && true
                      }
                    >
                      Gold Lane
                    </MenuItem>
                    <MenuItem
                      value="P2cvz5uyMsKO00ua9FOG"
                      disabled={
                        menuItemDisabled(
                          "P2cvz5uyMsKO00ua9FOG",
                          values.lanes
                        ) && true
                      }
                    >
                      Roam
                    </MenuItem>
                    <MenuItem
                      value="PMfgz045PaLJUuJSwF2l"
                      disabled={
                        menuItemDisabled(
                          "PMfgz045PaLJUuJSwF2l",
                          values.lanes
                        ) && true
                      }
                    >
                      Jungle
                    </MenuItem>
                    <MenuItem
                      value="x0DxKwqS7JFE6zx09Fk0"
                      disabled={
                        menuItemDisabled(
                          "x0DxKwqS7JFE6zx09Fk0",
                          values.lanes
                        ) && true
                      }
                    >
                      Exp Lane
                    </MenuItem>
                  </Field>
                  <FormHelperText style={{ color: "red" }}>
                    {Boolean(touched.lanes) && errors.lanes}
                  </FormHelperText>
                </FormControl>
                <Box>
                  <label>Input Image *</label>
                  <Box
                    sx={{
                      border: "0.1px solid black",
                      width: "497px",
                      height: "200px",
                      marginBlock: "20px",
                    }}
                  >
                    {previewImage ? (
                      <Image
                        height="200px"
                        width="200px"
                        src={previewImage}
                        alt="addModal"
                      />
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
                  <FormHelperText style={{ color: "red", marginLeft: "15px" }}>
                    {Boolean(touched.roles) && errors.image}
                  </FormHelperText>
                </Box>

                <Box sx={{ marginTop: "20px", display: "flex" }}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{ backgroundColor: "green" }}
                    disabled={!isValid}
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
