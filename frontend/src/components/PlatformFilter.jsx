import React, { useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

const PlatformFilter = ({ checkFilter }) => {

  const [test, setTest] = useState([]);


  const handleOnchange = (val) => {
    // checkFilter(val);
    test.push(val)
    console.log(test)

  };

  const options = [
    { label: "Disney Plus", value: "Disney Plus" },
    { label: "Netflix", value: "Netflix" },
    { label: "MyCanal", value: "MyCanal" },
    { label: "Amazon Prime Video", value: "Amazon Prime Video" },
    { label: "Canal+", value: "Canal+" },
    { label: "La Cinetek", value: "La Cinetek" },
    { label: "OCS Go", value: "OCS Go" },
    { label: "Anime Digital Networks", value: "Anime Digital Networks" },
  ];
  return (
    <MultiSelect
      onChange={handleOnchange}
      placeholder={"Platform"}
      options={options}
    />
  );
};
export default PlatformFilter;
