import React, {createRef, useEffect, useState} from 'react';
import {convertString} from "./SquareLookup";
import './App.css';

function App() {
  const [charArray, setCharArray] = useState<string[]>([]);
  const [square, setSquare] = useState<JSX.Element[]>([]);
  const [squareTextMode, setSquareTextMode] = useState<boolean>(true);
  const [spaceMode, setSpaceMode] = useState<boolean>(false);
  const [justCopied, setJustCopied] = useState<boolean>(false);
  const tableRef = createRef<HTMLTableElement>()
  const inputRef = createRef<HTMLInputElement>()

  const defaultText = "TYPESOMETHING";

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value) {
      setCharArray(e.target.value.split(''));
    }
  }

  const generateSquare = (charArray:string[]):JSX.Element[] => {
    const rows:JSX.Element[] = [];
    for(let x = 0; x < charArray.length; x++) {
      const datas:JSX.Element[] = [];
      for(let y = 0; y < charArray.length; y++) {
        datas.push(
                <td key={"D"+x+y}>{charArray[Math.abs((y-x)%charArray.length)]}</td>
        )
      }
      rows.push(<tr key={"R" + x}>{datas}</tr>)
    }
    return rows;
  }

  const copyTableToClipboard = () => {
    if(!tableRef.current) return;
    const text = tableRef.current.innerText;
    let copyString = squareTextMode ? convertString(text) : text;
    copyString = spaceMode ? copyString.replaceAll("\t", " ") : copyString;
    copyString += "\nhttps://wordsquare.bhison.com";
    navigator.clipboard.writeText(copyString);
    setJustCopied(true);
  }

  useEffect(() => {
    setSquare(()=>generateSquare(charArray));
  },[charArray]);

  useEffect(()=>{
    if(inputRef.current) inputRef.current.value = defaultText;
    setCharArray(defaultText.split(""));
    // eslint-disable-next-line
  },[]);

  useEffect(()=>{
    if(justCopied) {
      window.setTimeout(()=>{
        setJustCopied(false)
      },2000);
    }
  },[justCopied])

  return (
    <div className="main">
      <header className="Word Square Creator">
        <div className="top">
          <h1>▣ Word Square Generator ▣</h1>
          <div className="topContent">
            <div className="inputContainer">
              <input ref={inputRef} type="text" onChange={handleInput}/>
            </div>
            {
              justCopied
                      ? <div className="copyButton justCopied" onClick={copyTableToClipboard}>📄 COPIED TO CLIPBOARD</div>
                      :
                      <>
                        <div className="copyButton toggleButton" onClick={()=>setSquareTextMode(!squareTextMode)}>{squareTextMode ? "🄰":"A"}</div>
                        <div className="copyButton toggleButton" onClick={()=>setSpaceMode(!spaceMode)}>{spaceMode ? "‒":"⸺"}</div>
                        <div className="copyButton" onClick={copyTableToClipboard}>📋</div>
                      </>
            }
          </div>
        </div>
        <table ref={tableRef}>
          <tbody>
            {square}
          </tbody>
        </table>
      </header>
      <div className="nametag"><a href="https://github.com/bhison/wordsquare" rel="noreferrer" target="_blank">View on Github<img src={window.location.origin + '/github.png'} alt="Github Icon"/></a></div>
    </div>
  );
}

export default App;
