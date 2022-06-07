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
        id: entry.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  var HeroDetailData = {};
  const id = context.params.id;
  const heroData = await getDoc(doc(database, "Hero", id));
  const rolesId = heroData.data().rolesId;
  const lanesId = heroData.data().lanesId;
  const rolesData = await getDocs(
    query(collection(database, "Roles"), where("heroId", "in", rolesId))
  );
  const lanesData = await getDocs(
    query(collection(database, "Lanes"), where("heroId", "in", lanesId))
  );
  const roles = rolesData.docs.map((role) => {
    return { ...role.name };
  });
  const lanes = lanesData.docs.map((lane) => {
    return { ...lane.name };
  });
  HeroDetailData = { ...heroData.data(), roles, lanes };

  return {
    props: { heroDetail: HeroDetailData },
  };
};

function DetailPage({ heroDetail }) {
  // const router = useRouter();
  // const heroId = router.query.heroId;

  // const heroDocQuery = doc(database, "Hero", heroId);
  // const getData = async () => {
  //   const heroData = await getDoc(heroDocQuery);
  //   console.log(heroData.data());
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  return <div>Hero name : {heroDetail.name}</div>;
}

export default DetailPage;
