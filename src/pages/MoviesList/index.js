import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import Rating from "@mui/material/Rating";
import { makeStyles } from "@material-ui/core/styles";
import "../.././index.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  twoLineEllipsis: {
    display: "-webkit-box",
    "-webkit-line-clamp": 2 /* Number of lines you want to display */,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal" /* This ensures that the text wraps inside the box */,
    maxWidth: "100%" /* Adjust the max-width as needed */,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    width: "auto",
    height: "auto",
    position: "relative",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "none",
      color: "#FFFFFF",
      backgroundColor: "#34A853",
      transform: "scale(1.01)",
      transition: "all .2s ease-in-out",
    },
  },
  mainContainer: {
    position: "relative",
    display: "flex",
    margin: "24px",
    flexWrap: "wrap",
    gap: 12,
  },
  image: {
    margin: 8,
    width: "fit-content",
    height: "fit-content",
  },
  moreHoriz: {
    position: "absolute",
    right: 15,
    top: 15,
    height: 30,
    width: 30,
    borderRadius: 40,
    backgroundColor: "#DFDFDF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "-webkit-fill-available",
    width: 220,
    margin: 8,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
    width: "75%",
  },
}));
export default function MoviesList(props) {
  const { searchTerm, setSearchTerm } = props;
  const [moviesList, setMoviesList] = useState([]);
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const fetchData = useMemo(async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=03a703dc0f86042d35314851ff2f5851"
      );
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchData.then((result) => {
      try {
        setMoviesList(result.results);
        setFilteredMoviesList(result.results);
        setIsLoading(true);
        setSearchTerm("");
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    });
  }, [fetchData]);

  useEffect(() => {
    if (!searchTerm || searchTerm == "") {
      setFilteredMoviesList(moviesList);
      setSearchTerm("");
    } else {
      const newData = moviesList.filter((item) => {
        let itemString = item["original_title"];
        return itemString.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredMoviesList(newData);
    }
  }, [searchTerm]);

  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={classes.mainContainer}>
        {isLoading ? (
          filteredMoviesList.length > 0 ? (
            filteredMoviesList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={classes.card}
                  onClick={() => {
                    navigate(`/movieDetails/${item.id}`);
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                    className={classes.image}
                  />
                  <div className={classes.moreHoriz}>
                    <MoreHorizIcon size="small" sx={{ color: "black" }} />
                  </div>
                  <div className={classes.detailsContainer}>
                    <div className={classes.titleContainer}>
                      <div className={classes.title}>{item.original_title}</div>
                      <div>
                        <Rating
                          name="read-only"
                          size="small"
                          value={item.vote_average}
                          readOnly
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <div
                      className="two-line-ellipsis"
                      style={{
                        width: "100%",
                      }}
                    >
                      {item.overview}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>There is no upcoming movie.</>
          )
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              width: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
    </div>
  );
}
