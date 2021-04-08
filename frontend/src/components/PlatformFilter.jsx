import React, { useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

const PlatformFilter = () => {
    const [value, setvalue] = useState("");

  const handleOnchange = (val) => {
    setvalue(val);
  };

  const options = [
    { label: "Disney+", value: "option_1" },
    { label: "Netflix", value: "option_2" },
    { label: "MyCanal", value: "option_3" },
    { label: "Prime Video", value: "option_4" },
  ];
    return(
<MultiSelect onChange={handleOnchange} placeholder={'Platform'} options={options} />
    )
}
export default PlatformFilter