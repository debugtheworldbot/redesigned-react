import React from "react";
import { createElement } from "./react/createElement";
import { render, workLoop, useState } from "./react/workLoop";

window.requestIdleCallback(workLoop);
/** @jsx createElement */
const container = document.getElementById("root");
function Counter() {
  const [state, setState] = useState(1);
  const todos = [{ title: "todo1" }, { title: "todo2" }];
  return (
    <div>
      <h1 onClick={() => setState((c: number) => c + 1)}>Count: {state}</h1>
      <h1 onClick={() => setState(2)}>Count: {state}</h1>

      <ul>
        {todos.map((todo) => (
          <li>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
const element = <Counter />;
render(element, container!);

// const updateValue = (e: any) => {
//   rerender(e.target.value);
// };

// const rerender = (value: string) => {
//   const element = (
//     <div>
//       <input onInput={updateValue} value={value} />
//       <h2>Hello {value}</h2>
//     </div>
//   );
//   render(element, container!);
// };

// rerender("world");
