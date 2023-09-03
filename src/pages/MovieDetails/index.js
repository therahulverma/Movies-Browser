import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@mui/material/Rating";

const useStyles = makeStyles((theme) => ({
  container: { display: "flex", margin: 24 },
  image: { height: "fit-content", width: "fit-content" },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 15,
  },
  titleContainer: {
    display: "flex",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  rating: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    marginLeft: 10,
  },
}));

export default function MovieDetails(props) {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const classes = useStyles();

  const movieId = useMemo(() => params.id, [params.id]);
  const fetchData = useMemo(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=03a703dc0f86042d35314851ff2f5851`
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
        setMovieDetails(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    });
  }, [fetchData]);

  return (
    <>
      <Header />
      <div className={classes.container}>
        {Object.keys(movieDetails).length !== 0 ? (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w220_and_h330_face${movieDetails.poster_path}`}
              className={classes.image}
            />
            <div className={classes.detailsContainer}>
              <div className={classes.titleContainer}>
                <div className={classes.title}>
                  {movieDetails.original_title}
                </div>
                <div className={classes.rating}>
                  (
                  <Rating
                    name="read-only"
                    size="medium"
                    value={movieDetails.vote_average}
                    readOnly
                    style={{ width: "100%" }}
                  />
                  )
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 8,
                }}
              >
                <div
                  style={{
                    fontSize: "1.2rem",
                  }}
                >
                  {`${movieDetails.release_date.split("-")[0]} | ${
                    movieDetails.runtime
                  }mins`}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 2,
                }}
              >
                <div
                  style={{
                    fontSize: "1.2rem",
                  }}
                >
                  {`Description:  ${movieDetails.overview}`}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>Details Not Found</>
        )}
      </div>
    </>
  );
}
