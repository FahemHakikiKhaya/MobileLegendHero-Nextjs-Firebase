import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Link from "next/dist/client/link";
import Button from "@mui/material/Button";
import { useRouter } from "next/dist/client/router";

export default function ButtonAppBar() {
  const router = useRouter();
  const [isLogedIn, setIsLogedIn] = useState(false);
  const handleLogout = () => {
    sessionStorage.removeItem("Token");
    setIsLogedIn(false);
  };
  useEffect(() => {
    if (sessionStorage.getItem("Token")) {
      setIsLogedIn(true);
    }
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem("Token")) {
      setIsLogedIn(true);
    }
  }, [router]);

  return (
    <Box
      sx={{
        backgroundColor: "inherit !important",
        position: "fixed",
      }}
    >
      <Box sx={{ marginLeft: "1764px", display: "flex" }}>
        <Link href="/">
          <Button color="info" variant="contained">
            Home
          </Button>
        </Link>
        {isLogedIn ? (
          <Link href="/login">
            <Button color="info" variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button color="info" variant="contained">
              Login
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
}
