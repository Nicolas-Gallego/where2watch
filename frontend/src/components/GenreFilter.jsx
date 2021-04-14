import React, { useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

const GenreFilter = ({ checkGenreFilter }) => {
  const [value, setvalue] = useState("");

  const handleOnchange = (val) => {
    let filterGenre = [];
    filterGenre = val.map((type) => {
      return type.value;
    });
    checkGenreFilter(filterGenre);
  };

  const options = [
    { label: "Action", value: "Action" },
    { label: "Animation", value: "Animation" },
    { label: "Comedy", value: "Comedy" },
    { label: "Crime", value: "Crime" },
    { label: "Documentary", value: "Documentary" },
    { label: "Drama", value: "Drama" },
    { label: "Family", value: "Family" },
    { label: "Fantasy", value: "Fantasy" },
    { label: "History", value: "History" },
    { label: "Horror", value: "Horror" },
    { label: "Music", value: "Music" },
    { label: "Mystery", value: "Mystery" },
    { label: "Romance", value: "Romance" },
    { label: "Science Fiction", value: "Science Fiction" },
    { label: "TV Movie", value: "TV Movie" },
    { label: "Thriller", value: "Thriller" },
    { label: "War", value: "War" },
    { label: "Western", value: "Western" },
  ];
  return (
    <MultiSelect
      onChange={handleOnchange}
      placeholder={"Genre"}
      options={options}
      jsonValue={true}
    />
  );
};
export default GenreFilter;
