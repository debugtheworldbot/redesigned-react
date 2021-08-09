import React from "react";
import { createElement } from "./react/createElement";
import { render, workLoop } from "./react/workLoop";

window.requestIdleCallback(workLoop);
/** @jsx createElement */
const container = document.getElementById("root");

const updateValue = (e: any) => {
  rerender(e.target.value);
};

const rerender = (value: string) => {
  const element = (
    <div>
      <input onInput={updateValue} value={value} />
      <h2>Hello {value}</h2>
    </div>
  );
  render(element, container!);
};

rerender("world");
