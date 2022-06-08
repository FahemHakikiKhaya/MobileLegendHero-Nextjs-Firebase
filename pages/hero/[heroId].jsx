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
  return (
    <div>
      <h1>Hero Name : {heroDetail.name}</h1>
      {heroDetail.roles.map((role) => {
        return <h4>{role}</h4>;
      })}
      {heroDetail.lanes.map((lane) => {
        return <h4>{lane}</h4>;
      })}
    </div>
  );
}

export default DetailPage;
