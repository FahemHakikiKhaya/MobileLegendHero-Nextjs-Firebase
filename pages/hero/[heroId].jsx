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
import { Box, Button } from "@mui/material";
import UpdateModal from "../../component/updateModal";

export const getStaticPaths = async () => {
  const entries = await getDocs(collection(database, "Hero"));
  const paths = entries.docs.map((entry) => {
    return {
      params: {
        heroId: entry.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.heroId;
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
  const { roles, name, image, lanes, price } = heroDetail;
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",

        backgroundImage:
          "url(https://images.wallpaperscraft.com/image/single/fog_mountains_silhouette_267045_1920x1080.jpg)",
      }}
    >
      <Box>
        <img
          style={{ borderRadius: "50%", width: "600px", height: "600px" }}
          src={image}
        />
      </Box>

      <Box style={{ textAlign: "center" }}>
        <Box sx={{ marginTop: "20px" }}>
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
          <UpdateModal
            show={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            data={heroDetail}
          />
          <Button sx={{ width: "50%" }} variant="contained" color="warning">
            Delete
          </Button>
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
