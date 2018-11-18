import React from "react";
import ReactDOM from "react-dom";
import style from "./index.scss";

const Index = () => {
  return <div className='hellow-world'>Hello World!</div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));