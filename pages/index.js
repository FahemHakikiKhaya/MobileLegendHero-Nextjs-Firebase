import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useEffect, useState } from "react";
import { app, database } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import HeroCard from "../component/heroCard";

export default function Home() {
  const [heroData, setHeroData] = useState([]);
  const heroColRef = collection(database, "Hero");

  const getData = async () => {
    onSnapshot(heroColRef, (data) => {
      const heroList = data.docs.map((hero) => {
        return hero.data();
      });
      setHeroData(heroList);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const mapHeroList = () => {
    return heroData.map((data, index) => {
      return (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <HeroCard data={data} />
        </Grid>
      );
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {mapHeroList()}
      </Grid>
    </Box>
  );
}
