import {
  Button,
  TextField,
  Box,
  Container,
  Avatar,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Form, Field, Formik } from "formik";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { object, string } from "yup";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          paddingTop: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, formikHelpers) => {
            try {
              const user = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );

              sessionStorage.setItem("Token", user._tokenResponse.idToken);
              router.push("/");
            } catch (error) {
              alert(error.message.split("Error")[1]);
            }
          }}
          validationSchema={object({
            email: string()
              .email("Please Enter a Valid Email")
              .required("Please Enter The Hero Name")
              .min(2, "Name Too Short"),
            password: string()
              .required("Please Input The Password")
              .min(7, "Password Must Be At Least 8 Character"),
          })}
        >
          {({ errors, touched, isValid }) => (
            <Form>
              <Field
                fullWidth
                id="email"
                label="Email"
                name="email"
                as={TextField}
                style={{ marginBlock: "10px" }}
                error={Boolean(errors.email) && Boolean(touched.email)}
                helperText={Boolean(touched.email) && errors.email}
              />
              <Field
                fullWidth
                type="password"
                id="password"
                label="Password"
                name="password"
                as={TextField}
                style={{ marginBlock: "10px" }}
                error={Boolean(errors.password) && Boolean(touched.password)}
                helperText={Boolean(touched.password) && errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValid}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
