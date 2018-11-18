import React from "react";
import ReactDOM from "react-dom";
import { hot } from 'react-hot-loader';

import style from "./index.scss";

const Index = () => {
  return <div className='hellow-world'>Hello World!</div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));

export default hot(module)(App)
