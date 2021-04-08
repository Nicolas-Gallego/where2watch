import React, { useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

const Test = () => {
  const [value, setvalue] = useState("");

  const handleOnchange = (val) => {
    setvalue(val);
  };

  const options = [
    { label: "Action", value: "option_1" },
    { label: "Anime / Manga", value: "option_2" },
    { label: "Comedy", value: "option_3" },
    { label: "Documentary", value: "option_4" },
    { label: "Drama", value: "option_5" },
    { label: "Fantasy", value: "option_6" },
    { label: "Horror", value: "option_7" },
    { label: "Indie", value: "option_8" },
    { label: "Music & Musical Comedy ", value: "option_10" },
    { label: "Police Film ", value: "option_11" },
    { label: "Romance", value: "option_12" },
    { label: "Sci-Fi", value: "option_13" },
    { label: "Thriller", value: "option_14" },
    { label: "Youth & Family", value: "option_9" },
  ];

  return (
    <div className="app">
      <div className="preview-values">
        <h4>Values</h4>
      </div>

      <MultiSelect onChange={handleOnchange} options={options} />
    </div>
  );
};
export default Test;
