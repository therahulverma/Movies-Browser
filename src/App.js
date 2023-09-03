import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MoviesList from "./pages/MoviesList";
import MovieDetails from "./pages/MovieDetails";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MoviesList
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />
          <Route path="/movieDetails/:id" Component={MovieDetails} />
          <Route path="*" Component={PageNotFound} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
