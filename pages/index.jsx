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
import { collection, getDocs, query, where } from "firebase/firestore";
import HeroCard from "../component/heroCard";
import SearchIcon from "@mui/icons-material/Search";
import AddModal from "../component/addModal";

export const getStaticProps = async () => {
  const heroColRef = query(
    collection(database, "Hero"),
    where("isDelete", "==", false)
  );
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
  const [filteredHeros, setFilteredHeros] = useState(heros);
  const [sortedHeros, setSortedHeros] = useState(heros);
  const [keyword, setKeyword] = useState("");
  const [sortMethod, setSortMethod] = useState("");

  const mapHeroList = () => {
    return sortedHeros.map((data, index) => {
      return (
        <Grid xs={2} sm={4} md={4} key={index}>
          <HeroCard data={data} />
        </Grid>
      );
    });
  };
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearchPress = (e) => {
    if (e.code === "Enter") {
      var resultFilter = heros.filter((hero) => {
        const heroName = hero.name.toLowerCase();

        return heroName.includes(keyword);
      });

      switch (sortMethod) {
        case "a-z":
          resultFilter.sort((a, b) => {
            // a : Kaos
            // b : Celana
            // b --> a

            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          });
          break;
        case "z-a":
          resultFilter.sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            } else if (a.name > b.name) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case "none":
          break;
      }

      setFilteredHeros(resultFilter);
      setSortedHeros(resultFilter);
    }
  };

  const handleSortChange = (e) => {
    const sortMethod = e.target.value;
    const data = [...filteredHeros];
    switch (sortMethod) {
      case "a-z":
        data.sort((a, b) => {
          // a : Kaos
          // b : Celana
          // b --> a

          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case "z-a":
        data.sort((a, b) => {
          if (a.name < b.name) {
            return 1;
          } else if (a.name > b.name) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case "none":
        break;
    }
    setSortedHeros(data);
    setSortMethod(sortMethod);
  };

  return (
    <div
      style={{
        width: "100% !important",

        backgroundImage:
          "url(https://images.wallpaperscraft.com/image/single/fog_rain_light_night_92504_1920x1080.jpg)",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80vw",
          minHeight: "100vh",
          marginLeft: "180px",
          backgroundColor: "inherit",
        }}
      >
        <Box sx={{ display: "flex", marginTop: "50px" }}>
          <FormControl variant="con" sx={{ width: "80%" }}>
            <OutlinedInput
              onKeyPress={handleSearchPress}
              onChange={handleSearchChange}
              sx={{ backgroundColor: "white" }}
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
            <Select
              id="demo-simple-select"
              sx={{ backgroundColor: "white" }}
              onChange={handleSortChange}
            >
              <MenuItem value="none">none</MenuItem>
              <MenuItem value="a-z">A-Z</MenuItem>
              <MenuItem value="z-a">Z-A</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            onClick={() => setShowAddModal(true)}
            sx={{
              width: "10%",
              color: "black",
              borderColor: "black",
              backgroundColor: "white",
            }}
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
    </div>
  );
}
