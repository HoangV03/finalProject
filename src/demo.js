/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import Content from "./Content";

function Demo() {
  //   const order = [100, 200, 300];
  //   const [counter, setCounter] = useState(() => {
  //     const total = order.reduce((total, cur) => total + cur);
  //     console.log(total);
  //     return total;
  //   });
  //   const handleIncrease = () => {
  //     setCounter((preState) => preState + 1);
  //   };
  //   return (
  //     <div className="Demo" style={{ padding: 10 }}>
  //       <h1>{counter}</h1>
  //       <button onClick={handleIncrease}>Increase</button>
  //     </div>
  //   );

  //two-way binding

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");

  // const handleSubmit = () => {
  //   console.log({
  //     name,
  //     email,
  //   });
  // };

  const [show, setShow] = useState(false);
  return (
    <div style={{ padding: 20 }}>
      {/* <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} /> */}
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Content />}
    </div>
  );
}
export default Demo;
