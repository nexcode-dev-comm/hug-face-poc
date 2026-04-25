import { InferenceClient } from '@huggingface/inference';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const hf = new InferenceClient('ACCESS_TOKEN');
export default function Hface () {
  const [input, setInput] = useState('hello');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleAsk() {
    if (!input.trim()) {
      return ;
    }
    setLoading(true);
    setOutput('');
    try {
      const result = await hf.textGeneration({
    model: "mistralai/Mistral-7B-Instruct-v0.3",
    inputs: "Artificial intelligence is"
})
      setOutput(result.generated_text);
    }catch(err){
      setOutput('Error: '+ err.message)
      console.log(err)
    }finally {
      setLoading(false);
      
    }
   }
   return (
    <div style = {{ maxWidth:600, margin:'40px auto', padding:24}}>
      <h2>Ask HFace </h2>
      <textarea 
      rows={3}
      style={ {width: '100%', margin: 12}}
      value = {input}
      onChange={e =>setInput(e.target.value)}
      placeholder = "ask to HFace ..."
      /> 
      <br />
      <button
        onClick={handleAsk}
        disabled= {loading}
       >
        {loading ? "Thinking ..." :"ask"}
      </button>
      {output && (<div> {output}</div>)}

    </div>
   ) ;
} 