import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { app, database } from "../../config/firebase";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import UpdateModal from "../../component/updateModal";
import DeleteModal from "../../component/deleteModal";

export const getServerSideProps = async ({ params }) => {
  const id = params.heroId;
  const heroData = await getDoc(doc(database, "Hero", id));

  const rolesData = await getDocs(
    query(collection(database, "Roles"), where("heroId", "array-contains", id))
  );
  const lanesData = await getDocs(
    query(collection(database, "Lanes"), where("heroId", "array-contains", id))
  );

  var roles = [];
  var lanes = [];

  const mapData = () => {
    rolesData.forEach((role) => {
      roles.push(role.data().name);
    });
    lanesData.forEach((lane) => {
      lanes.push(lane.data().name);
    });
  };
  mapData();
  const HeroDetailData = { ...heroData.data(), roles, lanes, heroId: id };

  return {
    props: { heroDetail: HeroDetailData },
  };
};

function DetailPage({ heroDetail }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const { roles, name, image, lanes, price } = heroDetail;
  useEffect(() => {
    if (sessionStorage.getItem("Token")) {
      setIsLogedIn(true);
    }
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundSize: "100%",
        backgroundImage: "url(https://wallpaperaccess.com/full/2467308.jpg)",
      }}
    >
      <Box>
        <Image
          loader={() => image}
          unoptimized={true}
          width="600px"
          height="600px"
          style={{ borderRadius: "50%" }}
          src={image}
          alt="heroDetail"
        />
      </Box>

      <Box style={{ textAlign: "center" }}>
        <Box sx={{ marginTop: "20px" }}>
          {isLogedIn ? (
            <Button
              sx={{ width: "50%" }}
              variant="contained"
              color="success"
              onClick={() => {
                setShowUpdateModal(true);
              }}
            >
              Update
            </Button>
          ) : null}
          <UpdateModal
            show={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            data={heroDetail}
          />

          {isLogedIn ? (
            <Button
              sx={{ width: "50%" }}
              onClick={() => setShowDeleteModal(true)}
              variant="contained"
              color="warning"
            >
              Delete
            </Button>
          ) : null}
          <DeleteModal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            hero={heroDetail}
          />
        </Box>
        <h1 style={{ color: "white" }}>Hero Name : {name}</h1>

        <h2 style={{ color: "white" }}>Price : {price}</h2>

        <h2 style={{ color: "white" }}>
          Roles :
          {roles.map((role, index) => {
            if (index == roles.length - 1) {
              return <span> {role} </span>;
            }
            return <span> {role} , </span>;
          })}
        </h2>
        <h2 style={{ color: "white" }}>
          Lanes :
          {lanes.map((lane, index) => {
            if (index == lanes.length - 1) {
              return <span> {lane} </span>;
            }
            return <span> {lane} , </span>;
          })}
        </h2>
      </Box>
    </Box>
  );
}

export default DetailPage;
