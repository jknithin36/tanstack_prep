// // import React, { useState } from "react";

// // const App = () => {
// //   const [color, setColor] = useState("Red");

// //   function changeColor() {
// //     setColor((curr) => (curr === "Red" ? "Blue" : "Red"));
// //   }
// //   return (
// //     <div>
// //       <h1>My Favorite color is {color}</h1>
// //       <button onClick={changeColor}>Change Color</button>
// //     </div>
// //   );
// // };

// // // basically it is array
// // // value and function

// // export default App;

// // example 2

// // import React, { useState } from "react";

// // const App = () => {
// //   // const [brand, setBrand] = useState("Ferrari");
// //   // const [model, setModel] = useState("Rome");
// //   // const [color, setColor] = useState("Red");
// //   // const [year, setYear] = useState("2023");

// //   const [car, setCar] = useState({
// //     brand: "Ferrari",
// //     model: "Rome",
// //     year: "2023",
// //     color: "Red",
// //   });

// //   function changeColor() {
// //     setCar((prev) => ({
// //       ...prev,
// //       color: prev.color === "Red" ? "Blue" : "Red",
// //     }));
// //   }
// //   return (
// //     <div>
// //       <h1>My {car.brand}</h1>
// //       <h2>
// //         It is a {car.color} {car.model} from {car.year}
// //       </h2>
// //       <button onClick={changeColor}>CHANGE CLOLR</button>
// //     </div>
// //   );
// // };

// // export default App;

// // import React, { useEffect, useState } from "react";

// // const App = () => {
// //   const [count, setCount] = useState(0);
// //   useEffect(() => {
// //     setTimeout(() => {
// //       setCount((curr) => curr + 1);
// //     }, 2000);
// //   }, [count]);

// //   // useEffect(callbackfunction , dependicies)

// //   // no depencies - eveytime
// //   // only initil poaint
// //   // when count changes
// //   return (
// //     <div>
// //       <h1>I have Renderd {count} times</h1>
// //     </div>
// //   );
// // };

// // export default App;

// // ref hook

// // import React, { useEffect, useRef, useState } from "react";

// // const App = () => {
// //   const [value, setValue] = useState(0);

// //   const refCounter = useRef(0);
// //   console.log(refCounter);

// //   // useEffect(() => {
// //   //   setCount((curr) => curr + 1);
// //   // }, []);

// //   useEffect(() => {
// //     refCounter.current = refCounter.current + 1;
// //   });
// //   return (
// //     <div>
// //       <button
// //         onClick={() => setValue((curr) => curr - 1)}
// //         disabled={value === 0}
// //       >
// //         -1
// //       </button>
// //       <h1>Count - {value}</h1>

// //       <button onClick={() => setValue((curr) => curr + 1)}>+1</button>

// //       <h1>Render Count : {refCounter.current}</h1>
// //     </div>
// //   );
// // };

// // export default App;

// // create mutable variables which will not re-reder the components

// // used to access dom elements

// // import React, { useMemo, useState } from "react";

// // const App = () => {
// //   const [number, setNumber] = useState(0);

// //   const [count, setCount] = useState(0);

// //   function cubeNum(num) {
// //     console.log("Calculation done");
// //     return Math.pow(num, 3);
// //   }

// //   const result = useMemo(() => cubeNum(number), [number]);

// //   return (
// //     <div>
// //       <div>
// //         <input
// //           type="number"
// //           value={number}
// //           onChange={(e) => {
// //             setNumber(e.target.value);
// //           }}
// //         />
// //         <h1>The Cubbe of number : {result}</h1>
// //       </div>
// //       <div>
// //         <button onClick={() => setCount(count + 1)}>Counter+=</button>
// //         <h2>{count}</h2>
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;

// // useMemo - returns a memoizex vaue

// // useCallback - returns a momozied function

// // remeber the function and use that value

// import React, { useCallback, useState } from "react";
// import Header from "./components/Header";

// const App = () => {
//   const [count, setCount] = useState(0);

//   const newFn = useCallback(() => {}, []);
//   return (
//     <div>
//       <Header newFn={newFn} />
//       <h1>{count}</h1>
//       <button onClick={() => setCount((prev) => prev + 1)}>Click Here</button>
//     </div>
//   );
// };

// export default App;

import React from "react";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
    </div>
  );
};

export default App;

// data from any components i mean use to manage global data in react app
