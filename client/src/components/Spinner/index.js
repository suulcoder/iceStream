import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/PulseLoader";
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const Spinner = () => (
  <div className="skew-loader">
    <ClipLoader
      css={override}
      size={10}
      color={"#540A08"}
      loading={true}
    />
  </div>
)

export default Spinner
