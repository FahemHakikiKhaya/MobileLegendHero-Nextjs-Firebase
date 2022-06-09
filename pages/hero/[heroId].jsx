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
import { Box } from "@mui/material";

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
  const HeroDetailData = { ...heroData.data(), roles, lanes };

  return {
    props: { heroDetail: HeroDetailData },
  };
};

function DetailPage({ heroDetail }) {
  const { roles, name, image, lanes, price } = heroDetail;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box>
        <img style={{ borderRadius: "50%", width: "600px" }} src={image} />
      </Box>
      <Box style={{ textAlign: "center" }}>
        <h1>Hero Name : {name}</h1>
        <Box sx={{ display: "flex", marginLeft: "70px" }}>
          <h2>Price : </h2>
          <img
            style={{ width: "50px" }}
            src="https://cdn0.iconfinder.com/data/icons/business-management-line-2/24/cash-512.png"
          />
          <h2>{price}</h2>
        </Box>

        <h2>
          Roles :
          {roles.map((role, index) => {
            if (index == roles.length - 1) {
              return <span>{role}</span>;
            }
            return <span> {role} , </span>;
          })}
        </h2>
        <h2>
          Lanes :
          {lanes.map((lane, index) => {
            if (index == lanes.length - 1) {
              return <span>{lane}</span>;
            }
            return <span> {lane} , </span>;
          })}
        </h2>
      </Box>
    </Box>
  );
}

export default DetailPage;
