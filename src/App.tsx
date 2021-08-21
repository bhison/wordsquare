import React, {createRef, useEffect, useState} from 'react';
import './App.css';

function App() {
  const [charArray, setCharArray] = useState<string[]>([])
  const [square, setSquare] = useState<JSX.Element[]>([])
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
                <td>{charArray[Math.abs((y-x)%charArray.length)]}</td>
        )
      }
      rows.push(<tr>{datas}</tr>)
    }
    return rows;
  }

  const copyTableToClipboard = () => {
    if(!tableRef.current) return;
    navigator.clipboard.writeText(tableRef.current.innerText);
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
      },3000);
    }
  },[justCopied])

  return (
    <div className="main">
      <div className="nametag">By <a href="https://twitter.com/timbhison">@timbhison</a></div>


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
                      : <div className="copyButton" onClick={copyTableToClipboard}>📋</div>
            }
          </div>
        </div>
        <table ref={tableRef}>
          {square}
        </table>
      </header>
    </div>
  );
}

export default App;
