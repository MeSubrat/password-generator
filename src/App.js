import './index.css';
import { useCallback, useEffect, useState , useRef} from "react";

function App() {

  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [characterAllowed,setCharacterAllowed]=useState(false)
  const [password,setPassword]=useState("")

  const passwordRef=useRef(null)
  const passwordGenerator = useCallback(()=>{
    let pass=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklnopqrstuvwxyz'
    if(numberAllowed) str+='1234567890'
    if(characterAllowed) str+='~`!@#$%^&*{}?_-+=/'

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,characterAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,characterAllowed,numberAllowed,setPassword])


  const copyToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
    alert("Password Copied!!")
  },[password])

  return (
    <div>
      <h2 style={{textAlign:'center'}}>Password Generator</h2>
      <div  className='container'>
        <div className='pass-div'>
          <label>
            <input type='text' id='pass-field' readOnly placeholder='password' value={password}
            ref={passwordRef}/>
            <button id='btn-copy' onClick={copyToClipboard}>Copy</button>
          </label>
        </div>
        <div>
          <input id='range'
            type='range' 
            min={8} 
            max={100}
            value={length}
            onChange={(e)=>setLength(e.target.value)}/>
            <label id='lengthLabel'>Length: {length}</label>
            
            <input 
            type='checkBox' 
            id='charCheck' 
            style={{cursor:'pointer'}}
            onChange={()=>{
              setCharacterAllowed((prev)=>!prev)
            }}/>
            <label 
            htmlFor='charCheck' 
            style={{cursor:'pointer'}}>
              Character
            </label>

            <input 
            type='checkBox' 
            id='numCheck' 
            style={{cursor:'pointer'}}
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }}/>
            <label 
            htmlFor='numCheck' 
            style={{cursor:'pointer'}}>
              Number
            </label>
        </div>
      </div>

    </div>
  );
}

export default App;
