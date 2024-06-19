import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [NumberAllow, setNumberAllow] = useState(false);
  const [CharAllow, setCharAllow] = useState(false);
  const [Password, setPassword] = useState("");
  const inputRef = useRef(null);

  const PassWordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (NumberAllow) {
      str += "1234567890";
    }
    if (CharAllow) {
      str += " !@#$%^&*()_";
    }

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, NumberAllow, CharAllow]);

  useEffect(() => {
    PassWordGenerator();
  }, [length, NumberAllow, CharAllow, PassWordGenerator]);

  function copyPassword() {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      alert("Password copied to clipboard!");
    }
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="Generated Password"
            readOnly
            ref={inputRef}
          />
          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(parseInt(e.target.value));
              }}
            />
            <label> Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={NumberAllow}
              id="numberinput"
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label> Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={CharAllow}
              id="charinput"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label> Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
