import { InferenceClient } from '@huggingface/inference';
import logo from './logo.svg';
import './App.css';
import {Text2Img} from './t2img.js';
import { useState } from 'react';
import { OpenAI } from "openai";

//for Text2Text
const TXTClient = new OpenAI({
	baseURL: "https://router.huggingface.co/v1",
	apiKey: process.env.REACT_APP_HF_API_KEY,
  dangerouslyAllowBrowser: true
});
export default function Hface () {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  // For text 2 text 
  async function handleAsk() {
    if (!input.trim()) {
      return ;
    }
    setLoading(true);
    setOutput('');
    try {
      const result =await TXTClient.chat.completions.create({
	    model: "meta-llama/Llama-3.1-8B-Instruct:cerebras",
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
    })
      setOutput(result.choices[0].message.content);
      console.log(result.choices[0].message.content)
    }catch(err){
      setOutput('Error: '+ err.message)
      console.log(err)
    }finally {
      setLoading(false);
      
    }
   }
   
   return (
    <div>
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
      <Text2Img />
    </div>  
   ) ;
} 
