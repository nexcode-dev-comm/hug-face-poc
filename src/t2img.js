import { InferenceClient } from '@huggingface/inference';
import { useState } from 'react';
import './App.css';

const IMGClient = new InferenceClient(process.env.REACT_APP_HF_API_IMG_KEY);

export function Text2Img() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState(null); 
    const [loading, setLoading] = useState(false);

    async function handleGenerate() {
        if (!input.trim()) return;

        setLoading(true);
        // Clear previous image while loading
        setOutput(null); 

        try {
            const image = await IMGClient.textToImage({
                model: "black-forest-labs/FLUX.1-schnell",
                inputs: input,
                provider: "auto",
                parameters: { num_inference_steps: 30 }, 
            });

            const im = URL.createObjectURL(image);
            setOutput(im);
            console.log("Image Generated:", im);
        } catch (err) {
            console.error(err);
            alert("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Text to Image</h2>
            <textarea 
                rows={3}
                style={{ width: '100%', marginBottom: '12px' }}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Describe the image you want..."
            /> 
            <br />
            <button
                onClick={handleGenerate}
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate Image"}
            </button>
            {output && (
                <div style={{ marginTop: '20px' }}>
                    <img 
                        style={{ width: '500px', borderRadius: '8px' }} 
                        src={output}  
                        alt='AI Result' 
                    />
                </div>
            )}
        </div>
    );
}