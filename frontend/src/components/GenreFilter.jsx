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
    { label: "Action", value: "option_1" },
    { label: "Animation", value: "option_2" },
    { label: "Comedy", value: "option_3" },
    { label: "Crime", value: "option_4" },
    { label: "Documentary", value: "option_5" },
    { label: "Drama", value: "option_6" },
    { label: "Family", value: "option_7" },
    { label: "Fantasy", value: "option_8" },
    { label: "History", value: "option_10" },
    { label: "Horror", value: "option_11" },
    { label: "Music", value: "option_12" },
    { label: "Mystery", value: "option_13" },
    { label: "Romance", value: "option_14" },
    { label: "Science Fiction", value: "option_15" },
    { label: "TV Movie", value: "option_16" },
    { label: "Thriller", value: "option_17" },
    { label: "War", value: "option_18" },
    { label: "Western", value: "option_19" },
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
