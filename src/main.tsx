import React from "react";
import { createElement } from "./react/createElement";
import { render, workLoop, useState } from "./react/workLoop";

window.requestIdleCallback(workLoop);
/** @jsx createElement */
const container = document.getElementById("root");
function Counter() {
  const [state, setState] = useState(1);
  const [count, setCount] = useState(10);
  const [input, setInput] = useState("");
  const todos = [{ title: "todo1" }, { title: "todo2" }];

  function Element() {
    return (
      <div>
        <h1 onClick={() => setCount((c: number) => c - 1)}>Count: {count}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 onClick={() => setState((c: number) => c + 1)}>Count: {state}</h1>
      <h1 onClick={() => setCount((c: number) => c - 1)}>Count: {count}</h1>
      <button onClick={() => setState(1)}>reset</button>
      <input onInput={(e) => setInput(e.currentTarget.value)} value={input} />

      <ul>
        {todos.map((todo) => (
          <li>{todo.title}</li>
        ))}
      </ul>
      <Element />
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
