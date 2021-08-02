import { createElement } from "./react/createElement";
import { render } from "./react/render";
import { workLoop } from "./react/workLoop";

const ele = createElement(
  "div",
  { innerText: "hi div" },
  createElement("TEXT_ELEMENT", { nodeValue: "children" })
);
window.requestIdleCallback(workLoop);

render(ele, document.getElementById("root")!);
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// )
