import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+=-|{}[]:<>,.?/";
    }
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length); //RNG
      pass += str.charAt(char); //Add charcter to the final password string
    }
    setPassword(pass);
  }, [length, numbersAllowed, charAllowed, setPassword]); //memoises (remembers) till the given values change

  //useRef hook
  const passwordRef = useRef(null); //takes reference of value & shows changes to the user

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select() // shows on selection on ui   
    window.navigator.clipboard.writeText(password) //copies to clip board
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charAllowed, passwordGenerator]); //Runs on page load & reruns on change of dependencies


  return (
    <>
      <div className="w-full  max-w-2xl shadow-md rounded-3xl px-6 py-5 my-10 mx-auto text-[#ef4858] bg-[#0d0e0f] font-bold ">
        <h1 className="text-[30px] text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-xl overflow-hidden mb-6 ">
          <input
            type="text"
            value={password}
            className=" bg-[#1b1c1d] outline-1 rounded-s-xl text-[20px] h-12 w-full py-1 px-4"
            placeholder="Password"
            ref={passwordRef}  //links the value to useRef
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-gradient-to-r from-[#fb4840] to-[#ef4858] text-[#fcdede]  text-[18px] px-3 py-1 shrink-0 rounded-e-xl"
          >
            🗐 Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <label className="text-[14px] px-1">Length:{length}</label>
            <input
              type="range"
              min={8}
              max={32}
              value={length}
              className="cursor-pointer h-12 accent-[#ef4858]"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-x-1">
            <label>Numbers :</label>
            <input
              type="checkbox"
              className="accent-[#ef4858]"
              defaultChecked={numbersAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
          </div>
          <div className="flex items-center gap-x-1">
            <label>Symbols :</label>
            <input
              type="checkbox"
              className="accent-[#ef4858]"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
