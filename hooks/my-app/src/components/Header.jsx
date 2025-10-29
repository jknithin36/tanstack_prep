import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const phone = useContext(AppContext);
  console.log("header Rendered");
  return (
    <div>
      <h1>{phone}</h1>
    </div>
  );
};

export default React.memo(Header);

// memo method
