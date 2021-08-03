import React from "react";
import { createElement } from "./react/createElement";
import { render, workLoop } from "./react/workLoop";

window.requestIdleCallback(workLoop);
/** @jsx createElement */
const Counter = (
  <div>
    <h1>hi</h1>
    <div>children1</div>
    <div>children2</div>
  </div>
);

const container = document.getElementById("root");
render(Counter, container!);
