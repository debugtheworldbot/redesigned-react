import React from "react";
import { createElement } from "./react/createElement";
import { render, workLoop, useState } from "./react/workLoop";

window.requestIdleCallback(workLoop);
/** @jsx createElement */
const container = document.getElementById("root");
function Counter() {
  const [state, setState] = useState(1);
  const [input, setInput] = useState("");
  const todos = [{ title: "todo1" }, { title: "todo2" }];

  return (
    <div>
      <button onClick={() => setState((c: number) => c - 1)}>-</button>
      <span>Count: {state}</span>
      <button onClick={() => setState((c: number) => c + 1)}>+</button>
      <button onClick={() => setState(1)}>reset</button>
      <hr />
      <div>
        <input onInput={(e) => setInput(e.currentTarget.value)} value={input} />
        <h1>hello {input}</h1>
      </div>
      <hr />
      <h1>array list</h1>
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
