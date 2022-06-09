import {
  Box,
  Grid,
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material/";
import { useState } from "react";
import { app, database } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import HeroCard from "../component/heroCard";
import SearchIcon from "@mui/icons-material/Search";
import AddModal from "../component/addModal";

export const getStaticProps = async () => {
  const heroColRef = collection(database, "Hero");
  var heroList = [];
  const heros = await getDocs(heroColRef);
  heros.forEach((hero) => {
    heroList.push({ ...hero.data(), id: hero.id });
  });
  return {
    props: { heros: heroList },
  };
};

export default function Home({ heros }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const mapHeroList = () => {
    return heros.map((data, index) => {
      return (
        <Grid xs={2} sm={4} md={4} key={index}>
          <HeroCard data={data} />
        </Grid>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "80vw",
        marginLeft: "180px",
      }}
    >
      <Box sx={{ display: "flex", marginTop: "50px" }}>
        <FormControl variant="standard" sx={{ width: "80%" }}>
          <OutlinedInput
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl sx={{ width: "10%" }}>
          <InputLabel>Sort</InputLabel>
          <Select id="demo-simple-select">
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() => setShowAddModal(true)}
          sx={{ width: "10%", color: "black", borderColor: "black" }}
        >
          Add
        </Button>
        <AddModal
          show={showAddModal}
          onClose={() => {
            setShowAddModal(false);
          }}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container columns={{ md: 16 }}>
          {mapHeroList()}
        </Grid>
      </Box>
    </div>
  );
}
