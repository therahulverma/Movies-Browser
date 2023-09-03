import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderWidth: "0", // Remove the border
      },
      "&:hover fieldset": {
        borderWidth: "0", // Remove the border on hover
      },
      "&.Mui-focused fieldset": {
        borderWidth: "0", // Remove the border when focused
      },
    },
    backgroundColor: "#DFDFDF",
    "&:hover": {
      backgroundColor: "#DFDFDF",
    },
    borderRadius: 5,
    width: "40vw",
  },
}));

export default function Header(props) {
  const { searchTerm, setSearchTerm } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative">
          <Toolbar style={{ justifyContent: "space-between" }}>
            {window.location.href.includes("movieDetails") === false ? (
              <TextField
                className={classes.textField}
                id="outlined-basic"
                size="small"
                placeholder="Search…"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={searchTerm}
                onChange={handleChange}
              />
            ) : (
              <span style={{ fontSize: "1.5rem" }}>Movie Details</span>
            )}
            <HomeIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/`);
              }}
            />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
