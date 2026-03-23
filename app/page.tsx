'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowUp, X, Crop, Maximize, Wand2, Download, Play, Image as ImageIcon, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Icons ---
const KiveLogo = () => (
  <svg viewBox="0 0 1080 1080" width="24" height="24" className="text-black">
    <g><rect x="809.8" y="-0.3" width="270" height="270" fill="currentColor" /></g>
    <g><rect x="-0.1" width="270" height="1080" fill="currentColor" /></g>
    <path d="M697.6,652.1C595.4,550,539.2,414.2,539.2,269.7H269.9c0,447.4,362.6,810,810,810V810.5  C935.5,810.5,799.7,754.2,697.6,652.1z" fill="currentColor" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-[#644fc1]">
    <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" />
  </svg>
);

// --- Data ---
const GALLERY_ITEMS = [
  {
    id: 1,
    main: 'https://assets.kive.ai/sizes%2Fmkf3mGTDC5XNoDR6mYXu%2FdeEbpLL7SqZ7dRsn5jUu_1600.jpg',
    thumb1: 'https://storage.googleapis.com/airpict.appspot.com/workspace-assets-uploads%2Fmkf3mGTDC5XNoDR6mYXu%2Fcustom-models-manual-uploads%2Fdata-source-urls%2F5508bb86-4e4c-42da-8f70-0c820ee74202_thumbnail.jpg',
    title1: 'Casablanca sweater',
    label1: 'Product',
    thumb2: 'https://assets.kive.ai/image-generations%2Fmkf3mGTDC5XNoDR6mYXu%2FbYSL9M2vEYY09dowTKRipCR4cH73%2F5a46c559-31ab-4859-ba5f-dbcb4c50268b.jpg',
    title2: 'Tennis Court',
    label2: 'Studio'
  },
  {
    id: 2,
    main: 'https://assets.kive.ai/sizes%2Fmkf3mGTDC5XNoDR6mYXu%2FAeU7QP8rFe0WQSloU8or_1600.jpg',
    thumb1: 'https://storage.googleapis.com/airpict.appspot.com/workspace-assets-uploads%2Fmkf3mGTDC5XNoDR6mYXu%2Fcustom-models-manual-uploads%2Fdata-source-urls%2F818d6d23-4261-4a24-8cba-c9326b9a2eb6_thumbnail.jpg',
    title1: 'Athletic mesh tank',
    label1: 'Product',
  },
  {
    id: 3,
    main: 'https://assets.kive.ai/sizes%2Fmkf3mGTDC5XNoDR6mYXu%2FckyyC0xKklnrXhruvoxC_1600.jpg',
    thumb1: 'https://storage.googleapis.com/airpict.appspot.com/workspace-assets-uploads%2Fmkf3mGTDC5XNoDR6mYXu%2Fcustom-models-manual-uploads%2Fdata-source-urls%2F27651ee6-34e4-4535-895d-3297afe9ce9f_thumbnail.jpg',
    title1: 'Varena Longo Robe',
    label1: 'Product',
    thumb2: 'https://assets.kive.ai/image-generations%2Fmkf3mGTDC5XNoDR6mYXu%2FzWuQ4RMcmfchI5WBg75fFOhFVHQ2%2Fa6ff8e4c-44e2-4323-9c30-0bc06cf5a5af.jpg',
    title2: 'Coastline',
    label2: 'Studio'
  },
  {
    id: 4,
    main: 'https://assets.kive.ai/sizes%2Fmkf3mGTDC5XNoDR6mYXu%2Fq6NdLwBC9Xll3CXNfxBX_1600.jpg',
    thumb1: 'https://storage.googleapis.com/airpict.appspot.com/workspace-assets-uploads%2Fmkf3mGTDC5XNoDR6mYXu%2Fcustom-models-manual-uploads%2FQx2xgHOd0aOoHklRlwXP%2Fmasked-control-images%2F2d7b1174-c2c5-4a23-ba0e-9a9bedf1a1d0_thumbnail.jpg',
    title1: 'Off–White – Bookish Logo Knit Sweater',
    label1: 'Product',
    thumb2: 'https://assets.kive.ai/image-generations%2Fmkf3mGTDC5XNoDR6mYXu%2FzWuQ4RMcmfchI5WBg75fFOhFVHQ2%2F8dd7fac6-528e-4dd0-8fff-882d7599a718.jpg',
    title2: 'Basketball Court',
    label2: 'Studio'
  },
  {
    id: 5,
    main: 'https://assets.kive.ai/sizes%2Fmkf3mGTDC5XNoDR6mYXu%2FFrV8K6uBLUPfr35JqXcs_1600.jpg',
    thumb1: 'https://storage.googleapis.com/airpict.appspot.com/workspace-assets-uploads%2Fmkf3mGTDC5XNoDR6mYXu%2Fcustom-models-manual-uploads%2FncdZnOgMWOVYQOh2NmIL%2Fmasked-control-images%2F50cdefb6-837c-4bcd-acd4-1f78200064f0_thumbnail.jpg',
    title1: 'Drewe Bucket Hat',
    label1: 'Product',
    thumb2: 'https://assets.kive.ai/image-generations%2Fmkf3mGTDC5XNoDR6mYXu%2FzWuQ4RMcmfchI5WBg75fFOhFVHQ2%2Ff68d1720-41d2-44ea-bff8-51b20fc204b6.jpg',
    title2: 'Greenhouse',
    label2: 'Studio'
  },
  {
    id: 6,
    main: 'https://assets.kive.ai/sizes%2Fmkf3mGTDC5XNoDR6mYXu%2FQ7TQVFha3K5oxVkDq4Z6_1600.jpg',
    thumb1: 'https://storage.googleapis.com/airpict.appspot.com/workspace-assets-uploads%2Fmkf3mGTDC5XNoDR6mYXu%2Fcustom-models-manual-uploads%2Fdata-source-urls%2F2cbebee9-2326-4258-bf50-0682272412f4_thumbnail.jpg',
    title1: 'Athletic sports bra',
    label1: 'Product',
    thumb2: 'https://assets.kive.ai/image-generations%2Fmkf3mGTDC5XNoDR6mYXu%2FzWuQ4RMcmfchI5WBg75fFOhFVHQ2%2F8dd7fac6-528e-4dd0-8fff-882d7599a718.jpg',
    title2: 'Basketball Court',
    label2: 'Studio'
  },
  {
    id: 7,
    main: 'https://assets.kive.ai/sizes%2Fmkf3mGTDC5XNoDR6mYXu%2F4Y7wm2CFws3irOwZnnMt_1600.jpg',
    thumb1: 'https://storage.googleapis.com/airpict.appspot.com/workspace-assets-uploads%2Fmkf3mGTDC5XNoDR6mYXu%2Fcustom-models-manual-uploads%2F80e4a4bf-478c-404c-b33a-47a2fc77e573%2FShiny%20Trench%20Coat%20Black_thumbnail.jpg',
    title1: 'Zara Shiny Trench Coat Black',
    label1: 'Product',
    thumb2: 'https://assets.kive.ai/image-generations%2Fmkf3mGTDC5XNoDR6mYXu%2FzWuQ4RMcmfchI5WBg75fFOhFVHQ2%2Fd0fc8420-735e-4732-8df5-f2a628b8ff06.jpg',
    title2: 'Snakes',
    label2: 'Studio'
  },
  {
    id: 8,
    main: 'https://assets.kive.ai/sizes%2Fmkf3mGTDC5XNoDR6mYXu%2F0pSanG9urN6IpHwkkufK_1600.jpg',
    thumb1: 'https://storage.googleapis.com/airpict.appspot.com/workspace-assets-uploads%2Fmkf3mGTDC5XNoDR6mYXu%2Fcustom-models-manual-uploads%2Fdata-source-urls%2F167eb2b0-7408-42a9-82e7-ba9cf214d3ee_thumbnail.jpg',
    title1: 'Hooded windbreaker jacket',
    label1: 'Product',
    thumb2: 'https://assets.kive.ai/image-generations%2Fmkf3mGTDC5XNoDR6mYXu%2FbYSL9M2vEYY09dowTKRipCR4cH73%2Fc5c20887-1dff-4ac1-8208-578929c4557a.jpg',
    title2: 'Trail runner',
    label2: 'Studio'
  }
];

const RESULT_ASSETS = [
  { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, type: 'video', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', poster: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1515347619152-141201878563?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, type: 'icon', src: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1000&auto=format&fit=crop' }
];

// --- Components ---

function Navbar({ isResult = false }: { isResult?: boolean }) {
  return (
    <nav className="sticky top-3 w-full flex justify-center z-50 pointer-events-none px-4">
      <div className="relative flex items-center gap-4 p-1 rounded-2xl backdrop-blur-md bg-white/70 border border-gray-200 pointer-events-auto shadow-sm">
        <a href="#" className="flex items-center gap-2 ml-3 text-black font-medium">
          <KiveLogo />
          <span className="text-base">Kive</span>
        </a>
        <ul className="flex list-none gap-1 m-0 p-0">
          <li>
            <a href="#" className="block px-3 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              Get started
            </a>
          </li>
        </ul>
      </div>
      {isResult && (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-auto">
           <a href="#" className="text-sm font-medium text-black hover:opacity-70 transition-opacity flex items-center gap-1">
             kive.ai <span className="text-xs">↗</span>
           </a>
        </div>
      )}
    </nav>
  );
}

function HomeState({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) {
  const [url, setUrl] = useState('');

  return (
    <div className="pt-12 pb-24">
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center mt-20 mb-32 px-4">
        <h1 className="text-[80px] md:text-[124px] leading-[0.9] tracking-[-0.05em] font-medium text-center text-black mb-6">
          Product shots<br />
          for <span className="relative inline-block">
            electronics
            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: -10 }}
              animate={{ opacity: 1, y: -20, rotate: 12.5 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
              className="absolute -top-10 -right-10 w-[120px] h-[150px] shadow-xl rounded-lg overflow-hidden z-10 border-4 border-white"
            >
              <Image 
                src="https://storage.googleapis.com/airpict.appspot.com/shot-new/home%20decor.png" 
                alt="Polaroid" 
                fill 
                className="object-cover"
                unoptimized
              />
            </motion.div>
          </span>
        </h1>
        
        <p className="text-xl text-gray-800 mb-8 text-center max-w-md">
          Enter your online store URL to create AI product shots
        </p>
        
        <form onSubmit={onSubmit} className="flex flex-row justify-between w-full max-w-[600px] h-[72px] p-2 pl-8 items-center bg-[#e4e2e4] rounded-full transition-colors focus-within:ring-2 focus-within:ring-purple-500/20">
          <input 
            type="text" 
            placeholder="Enter your store URL" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent outline-none text-lg text-black placeholder:text-gray-500"
            required
          />
          <button 
            type="submit" 
            className="flex items-center justify-center w-14 h-14 bg-[#d9d9d9] hover:bg-[#cecece] text-black rounded-full transition-colors flex-shrink-0"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </form>

        <div className="mt-20 text-center max-w-[500px]">
          <p className="font-serif italic text-xl mb-2">&quot;How. Can. This. Be?&quot;</p>
          <span className="text-sm text-gray-600">Chris Averill, Founder of Oliiv</span>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="px-4 md:px-8 max-w-[1400px] mx-auto">
        <h2 className="text-2xl font-medium text-center mb-8 tracking-tight">Works with most products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_ITEMS.map((item) => (
            <div key={item.id} className="relative group overflow-hidden rounded-xl aspect-[4/5] bg-gray-200">
              <Image src={item.main} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                
                <div className="flex items-center bg-white/80 backdrop-blur-md rounded-xl p-1.5 gap-2 flex-1 min-w-0 shadow-sm">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image src={item.thumb1} alt="" fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-xs font-medium text-black truncate">{item.title1}</span>
                    <span className="text-[10px] text-gray-500 truncate">{item.label1}</span>
                  </div>
                </div>

                {item.thumb2 && (
                  <div className="flex items-center bg-white/80 backdrop-blur-md rounded-xl p-1.5 gap-2 flex-1 min-w-0 shadow-sm">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <Image src={item.thumb2} alt="" fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="text-xs font-medium text-black truncate">{item.title2}</span>
                      <span className="text-[10px] text-gray-500 truncate">{item.label2}</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Footer */}
      <div className="mt-32 flex flex-col items-center px-4 text-center">
        <h2 className="text-4xl font-medium tracking-tight mb-4">Product photos in minutes</h2>
        <p className="text-lg text-gray-500 mb-12">Create studio-quality product imagery without a studio-sized budget</p>
        
        <div className="flex flex-col gap-4 mb-12 text-left">
          <div className="flex items-center gap-3">
            <CheckIcon /> <span className="text-lg">Import all your products</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckIcon /> <span className="text-lg">Choose from professional presets</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckIcon /> <span className="text-lg">Put products on AI models</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckIcon /> <span className="text-lg">Generate high-quality images and videos</span>
          </div>
        </div>

        <button className="bg-[#5930e5] hover:bg-[#501cde] text-white rounded-xl px-8 py-4 font-medium text-lg flex items-center gap-2 transition-colors">
          <span>→</span> Get started free
        </button>
      </div>
    </div>
  );
}

function AssetEditorModal({ asset, onClose }: { asset: any, onClose: () => void }) {
  const [filter, setFilter] = useState('none');
  const [scale, setScale] = useState(1);
  const [activeTab, setActiveTab] = useState('filters');
  const [isDrawing, setIsDrawing] = useState(false);
  const [sketchPrompt, setSketchPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState('original');
  
  // Comment bubble state
  const [bubbles, setBubbles] = useState<{ id: string, x: number, y: number, text: string, isEditing: boolean }[]>([]);
  const [isAddingBubble, setIsAddingBubble] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPos = useRef<{x: number, y: number} | null>(null);

  if (!asset) return null;

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement> | React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current || imageRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    
    // For bubbles, we want coordinates relative to the image container
    if (activeTab === 'bubbles') {
        return {
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        };
    }

    // For sketch, we want exact canvas coordinates
    const scaleX = (canvas as HTMLCanvasElement).width / rect.width;
    const scaleY = (canvas as HTMLCanvasElement).height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (activeTab !== 'bubbles' || !isAddingBubble) return;
      
      const pos = getCoordinates(e);
      if (!pos) return;

      const newBubble = {
          id: Math.random().toString(36).substr(2, 9),
          x: pos.x,
          y: pos.y,
          text: '',
          isEditing: true
      };
      
      setBubbles([...bubbles, newBubble]);
      setIsAddingBubble(false);
  };

  const updateBubble = (id: string, text: string) => {
      setBubbles(bubbles.map(b => b.id === id ? { ...b, text } : b));
  };

  const finishEditingBubble = (id: string) => {
      setBubbles(bubbles.map(b => b.id === id ? { ...b, isEditing: false } : b));
  };

  const removeBubble = (id: string) => {
      setBubbles(bubbles.filter(b => b.id !== id));
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activeTab !== 'sketch') return;
    const pos = getCoordinates(e);
    if (!pos) return;
    setIsDrawing(true);
    lastPos.current = pos;
    
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ff0000';
      ctx.fill();
    }
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activeTab !== 'sketch') return;
    const pos = getCoordinates(e);
    if (!pos || !lastPos.current) return;
    
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
    lastPos.current = pos;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const handleGenerate = async () => {
    if (activeTab === 'sketch' && !sketchPrompt) return;
    if (activeTab === 'bubbles' && bubbles.length === 0) return;
    if (activeTab === 'adjust' && aspectRatio === 'original' && scale === 1) return;
    
    setIsGenerating(true);
    
    try {
      const img = imageRef.current;
      const canvas = canvasRef.current;
      if (!img || !canvas) return;
      
      let targetWidth = img.naturalWidth;
      let targetHeight = img.naturalHeight;

      if (activeTab === 'adjust' && aspectRatio !== 'original') {
          const [wRatio, hRatio] = aspectRatio.split(':').map(Number);
          const currentRatio = img.naturalWidth / img.naturalHeight;
          const targetRatio = wRatio / hRatio;
          
          if (targetRatio > currentRatio) {
              // Target is wider, keep height, expand width
              targetHeight = img.naturalHeight;
              targetWidth = Math.round(img.naturalHeight * targetRatio);
          } else {
              // Target is taller, keep width, expand height
              targetWidth = img.naturalWidth;
              targetHeight = Math.round(img.naturalWidth / targetRatio);
          }
      }

      const offscreen = document.createElement('canvas');
      offscreen.width = targetWidth;
      offscreen.height = targetHeight;
      const ctx = offscreen.getContext('2d');
      if (!ctx) return;
      
      let promptText = '';

      if (activeTab === 'adjust') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          
          const scaledWidth = img.naturalWidth * scale;
          const scaledHeight = img.naturalHeight * scale;
          const dx = (targetWidth - scaledWidth) / 2;
          const dy = (targetHeight - scaledHeight) / 2;
          
          ctx.filter = filter;
          ctx.drawImage(img, dx, dy, scaledWidth, scaledHeight);
          
          promptText = "Seamlessly extend and fill the white borders of this image to match the new aspect ratio. Maintain the exact same style, lighting, and cohesiveness of the original central image. Make it look like a natural, uncropped photo.";
      } else {
          ctx.filter = filter;
          ctx.drawImage(img, 0, 0);

          if (activeTab === 'sketch') {
              ctx.filter = 'none'; // reset filter for sketch
              ctx.drawImage(canvas, 0, 0);
              promptText = `Transform the red sketched parts into realistic elements matching this description: "${sketchPrompt}". Keep the rest of the image exactly the same. Make it look like a natural, unedited photo.`;
          } else if (activeTab === 'bubbles') {
              // For bubbles, we don't draw the canvas, we just use the base image and describe where to add things
              const bubbleDescriptions = bubbles.filter(b => b.text.trim() !== '').map((b, i) => {
                  // Convert percentage coordinates to rough descriptive locations
                  let xLoc = b.x < 33 ? 'left' : b.x > 66 ? 'right' : 'center';
                  let yLoc = b.y < 33 ? 'top' : b.y > 66 ? 'bottom' : 'middle';
                  return `Add "${b.text}" in the ${yLoc} ${xLoc} area of the image.`;
              }).join(' ');
              
              promptText = `Modify this image by adding objects as requested: ${bubbleDescriptions}. Integrate them naturally into the scene with appropriate lighting and perspective. Keep the rest of the image exactly the same.`;
          }
      }
      
      const base64Data = offscreen.toDataURL('image/jpeg', 0.9).split(',')[1];
      
      const response = await fetch('/api/edit-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Data,
          prompt: promptText
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate');
      
      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      
      if (activeTab === 'sketch') {
          const sketchCtx = canvas.getContext('2d');
          if (sketchCtx) {
            sketchCtx.clearRect(0, 0, canvas.width, canvas.height);
          }
          setSketchPrompt('');
      } else if (activeTab === 'bubbles') {
          setBubbles([]);
      } else if (activeTab === 'adjust') {
          setAspectRatio('original');
          setScale(1);
      }
      
    } catch (error) {
      console.error(error);
      alert('Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row h-[85vh] shadow-2xl">
        {/* Preview Area */}
        <div className="flex-1 bg-gray-100 relative overflow-hidden flex items-center justify-center p-4">
          <div 
              className="relative flex items-center justify-center transition-all duration-300" 
              style={{ 
                ...(activeTab === 'adjust' ? {
                  aspectRatio: aspectRatio !== 'original' ? aspectRatio.replace(':', '/') : undefined,
                  backgroundColor: 'white',
                  maxHeight: '100%',
                  maxWidth: '100%',
                  height: aspectRatio !== 'original' ? (aspectRatio.split(':')[0] > aspectRatio.split(':')[1] ? 'auto' : '100%') : undefined,
                  width: aspectRatio !== 'original' ? (aspectRatio.split(':')[0] > aspectRatio.split(':')[1] ? '100%' : 'auto') : undefined,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                } : {
                  maxHeight: '100%',
                  maxWidth: '100%',
                })
              }}
              onClick={handleImageClick}
          >
            <div 
              className={`relative flex items-center justify-center transition-transform duration-300 ${activeTab === 'adjust' && aspectRatio !== 'original' ? 'w-full h-full' : ''}`} 
              style={{ transform: `scale(${scale})` }}
            >
            {asset.type === 'video' ? (
              <video 
                src={asset.src} 
                controls 
                autoPlay
                className="max-w-full max-h-full object-contain transition-transform duration-200" 
                style={{ filter }} 
              />
            ) : (
              <>
                <img 
                  ref={imageRef}
                  src={generatedImage || asset.src} 
                  alt="Asset" 
                  className={`max-w-full max-h-full object-contain transition-transform duration-200 ${activeTab === 'bubbles' && isAddingBubble ? 'cursor-crosshair' : ''}`} 
                  style={{ filter }} 
                  crossOrigin="anonymous"
                  onLoad={() => {
                    if (canvasRef.current && imageRef.current) {
                      canvasRef.current.width = imageRef.current.naturalWidth;
                      canvasRef.current.height = imageRef.current.naturalHeight;
                    }
                  }}
                />
                <canvas
                  ref={canvasRef}
                  className={`absolute inset-0 w-full h-full ${activeTab === 'sketch' ? 'cursor-crosshair touch-none z-10' : 'pointer-events-none opacity-0'}`}
                  onPointerDown={startDrawing}
                  onPointerMove={draw}
                  onPointerUp={stopDrawing}
                  onPointerOut={stopDrawing}
                />
                {activeTab === 'bubbles' && bubbles.map((bubble, index) => (
                    <div 
                        key={bubble.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1"
                        style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-6 h-6 rounded-full bg-[#5930e5] text-white flex items-center justify-center text-xs font-medium shadow-md border-2 border-white">
                            {index + 1}
                        </div>
                        {bubble.isEditing ? (
                            <div className="bg-white p-2 rounded-lg shadow-xl border border-gray-200 w-48 animate-in fade-in zoom-in duration-200">
                                <input
                                    autoFocus
                                    type="text"
                                    value={bubble.text}
                                    onChange={(e) => updateBubble(bubble.id, e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') finishEditingBubble(bubble.id);
                                    }}
                                    onBlur={() => finishEditingBubble(bubble.id)}
                                    placeholder="What to add here?"
                                    className="w-full text-xs outline-none"
                                />
                            </div>
                        ) : (
                            bubble.text && (
                                <div 
                                    className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm border border-gray-200 text-[10px] font-medium text-gray-700 max-w-[120px] truncate cursor-pointer"
                                    onClick={() => setBubbles(bubbles.map(b => b.id === bubble.id ? { ...b, isEditing: true } : b))}
                                >
                                    {bubble.text}
                                </div>
                            )
                        )}
                    </div>
                ))}
              </>
            )}
            </div>
          </div>
        </div>
        
        {/* Controls Area */}
        <div className="w-full md:w-80 bg-white border-l border-gray-200 p-6 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium tracking-tight">Edit Asset</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('filters')} 
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'filters' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Filters
            </button>
            <button 
              onClick={() => setActiveTab('adjust')} 
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'adjust' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Adjust
            </button>
            {asset.type !== 'video' && (
              <>
                <button 
                  onClick={() => setActiveTab('sketch')} 
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'sketch' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
                >
                  Sketch
                </button>
                <button 
                  onClick={() => setActiveTab('bubbles')} 
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'bubbles' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
                >
                  Bubbles
                </button>
              </>
            )}
          </div>

          {/* Tab Content */}
          <div className="flex-1">
            {activeTab === 'filters' && (
              <div className="flex flex-col gap-2">
                {[
                  { name: 'Normal', value: 'none' },
                  { name: 'Grayscale', value: 'grayscale(100%)' },
                  { name: 'Sepia', value: 'sepia(100%)' },
                  { name: 'Blur', value: 'blur(4px)' },
                  { name: 'High Contrast', value: 'contrast(150%)' },
                  { name: 'Brighten', value: 'brightness(120%)' }
                ].map(f => (
                  <button 
                    key={f.value} 
                    onClick={() => setFilter(f.value)} 
                    className={`px-4 py-3 rounded-xl text-left text-sm transition-colors flex items-center justify-between ${filter === f.value ? 'bg-[#edf2fe] text-[#3e63dd] font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    {f.name}
                    {filter === f.value && <CheckIcon />}
                  </button>
                ))}
              </div>
            )}
            
            {activeTab === 'adjust' && (
              <div className="flex flex-col gap-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Maximize className="w-4 h-4" /> Zoom / Resize
                    </label>
                    <span className="text-xs text-gray-500 font-mono">{Math.round(scale * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="3" 
                    step="0.1" 
                    value={scale} 
                    onChange={e => setScale(parseFloat(e.target.value))} 
                    className="w-full accent-[#5930e5]" 
                  />
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-4">
                    <Crop className="w-4 h-4" /> Aspect Ratio
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { name: 'Original', value: 'original' },
                      { name: 'Square (1:1)', value: '1:1' },
                      { name: 'Portrait (3:4)', value: '3:4' },
                      { name: 'Landscape (4:3)', value: '4:3' },
                      { name: 'Story (9:16)', value: '9:16' },
                      { name: 'Widescreen (16:9)', value: '16:9' }
                    ].map(ratio => (
                      <button
                        key={ratio.value}
                        onClick={() => setAspectRatio(ratio.value)}
                        className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
                          aspectRatio === ratio.value 
                            ? 'bg-[#edf2fe] border-[#3e63dd] text-[#3e63dd]' 
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {ratio.name}
                      </button>
                    ))}
                  </div>
                  
                  {(aspectRatio !== 'original' || scale < 1) && (
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full py-2 bg-[#5930e5] text-white rounded-lg text-sm font-medium hover:bg-[#501cde] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Wand2 className="w-4 h-4" />
                      {isGenerating ? 'Generating...' : 'Generative Expand'}
                    </button>
                  )}
                  
                  <p className="text-xs text-gray-500 leading-relaxed mt-4">
                    Change the aspect ratio and use AI to seamlessly fill in the new areas, maintaining the original style and cohesiveness.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'sketch' && (
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Wand2 className="w-4 h-4" /> Sketch & Generate
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    Draw on the image to sketch an object, then describe what you want to generate in that spot.
                  </p>
                  <input
                    type="text"
                    placeholder="e.g., A realistic bird"
                    value={sketchPrompt}
                    onChange={(e) => setSketchPrompt(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#5930e5]"
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !sketchPrompt}
                    className="w-full py-2 bg-[#5930e5] text-white rounded-lg text-sm font-medium hover:bg-[#501cde] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
                <button
                  onClick={() => {
                    const canvas = canvasRef.current;
                    const ctx = canvas?.getContext('2d');
                    if (ctx && canvas) {
                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                  }}
                  className="text-xs text-gray-500 hover:text-black underline text-center"
                >
                  Clear Sketch
                </button>
              </div>
            )}

            {activeTab === 'bubbles' && (
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Wand2 className="w-4 h-4" /> Add Objects
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    Click &quot;Add Note&quot; then click anywhere on the image to drop a note describing what you want to add.
                  </p>
                  
                  <button
                    onClick={() => setIsAddingBubble(!isAddingBubble)}
                    className={`w-full py-2 rounded-lg text-sm font-medium transition-colors mb-3 flex items-center justify-center gap-2 ${isAddingBubble ? 'bg-[#edf2fe] text-[#3e63dd]' : 'bg-white border border-gray-200 text-black hover:bg-gray-50'}`}
                  >
                    {isAddingBubble ? 'Click on image...' : '+ Add Note'}
                  </button>

                  <div className="flex flex-col gap-2 mb-4 max-h-40 overflow-y-auto">
                      {bubbles.map((bubble, index) => (
                          <div key={bubble.id} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100 text-xs">
                              <div className="w-5 h-5 rounded-full bg-[#5930e5] text-white flex items-center justify-center flex-shrink-0">
                                  {index + 1}
                              </div>
                              <span className="flex-1 truncate text-gray-700">
                                  {bubble.text || 'Empty note'}
                              </span>
                              <button onClick={() => removeBubble(bubble.id)} className="text-gray-400 hover:text-red-500">
                                  <X className="w-3 h-3" />
                              </button>
                          </div>
                      ))}
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || bubbles.length === 0}
                    className="w-full py-2 bg-[#5930e5] text-white rounded-lg text-sm font-medium hover:bg-[#501cde] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
                {bubbles.length > 0 && (
                    <button
                      onClick={() => setBubbles([])}
                      className="text-xs text-gray-500 hover:text-black underline text-center"
                    >
                      Clear All Notes
                    </button>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button className="w-full py-3.5 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-md">
              <Download className="w-4 h-4" /> Export Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const LOADING_MESSAGES = [
  'Hunting for images...',
  'Analyzing content...',
  'Extracting assets...',
  'Generating videos...',
  'Applying AI magic...'
];

function LoadingState() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f5]">
      <div className="relative">
        <motion.h1 
          key={msgIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-4xl md:text-6xl font-medium tracking-tight text-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full whitespace-nowrap"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5930e5] via-[#abbdf9] to-[#5930e5] bg-[length:200%_auto] animate-shimmer">
            {LOADING_MESSAGES[msgIdx]}
          </span>
        </motion.h1>
        {/* Invisible placeholder to maintain height/width */}
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-center opacity-0 pointer-events-none">
          Generating videos...
        </h1>
      </div>
    </div>
  );
}

function ResultState({ onReset }: { onReset: () => void }) {
  const [editingAsset, setEditingAsset] = useState<any>(null);

  return (
    <div className="min-h-screen bg-white pt-12 pb-24">
      <Navbar isResult={true} />
      
      <div className="flex flex-col items-center mt-16 px-4">
        <h1 className="text-5xl font-bold text-black mb-2 tracking-tight">Nice work!</h1>
        <p className="text-gray-500 text-lg mb-12">Your extracted and generated assets are ready</p>

        {/* Result Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1600px] px-4 md:px-8 mb-24">
          {RESULT_ASSETS.map((asset) => (
            <div 
              key={asset.id} 
              onClick={() => setEditingAsset(asset)}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-sm cursor-pointer group"
            >
              {asset.type === 'video' ? (
                <>
                  <video src={asset.src} poster={asset.poster} className="object-cover w-full h-full" muted loop playsInline />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-black ml-1" />
                    </div>
                  </div>
                </>
              ) : (
                <Image src={asset.src} alt={`Result ${asset.id}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
              )}
              
              {/* Type Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm">
                {asset.type === 'video' ? <Video className="w-3.5 h-3.5 text-blue-600" /> : 
                 asset.type === 'icon' ? <Wand2 className="w-3.5 h-3.5 text-purple-600" /> : 
                 <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />}
                <span className="capitalize">{asset.type}</span>
              </div>

              {/* Edit Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                 <button className="w-full py-3 bg-white/95 backdrop-blur-md rounded-xl text-sm font-medium text-black flex items-center justify-center gap-2 shadow-lg hover:bg-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Wand2 className="w-4 h-4" /> Edit Asset
                 </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 flex items-center flex-wrap justify-center gap-2">
            Try more 
            <span className="inline-flex gap-1 bg-gray-100 p-1.5 rounded-xl mx-2">
              <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center text-white text-xs">🧥</div>
              <div className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-white text-xs">🏷️</div>
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-500 text-xs">🩳</div>
            </span>
            products <br className="hidden md:block" /> and keep creating
          </h2>
          
          <p className="text-gray-500 text-lg mb-10 max-w-md">
            Get started in minutes and import more products, use professional AI presets and create stunning visuals.
          </p>

          <div className="flex flex-col gap-3 mb-12 text-left w-full max-w-sm">
            <div className="flex items-center gap-3">
              <CheckIcon /> <span>Import all your products</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckIcon /> <span>Choose from professional presets</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckIcon /> <span>Put products on AI models</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckIcon /> <span>Generate high-quality images and videos</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-20">
            <button 
              onClick={onReset}
              className="px-8 py-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-black font-medium transition-colors w-full sm:w-auto"
            >
              Try again
            </button>
            <button className="px-8 py-4 rounded-xl bg-[#5930e5] hover:bg-[#501cde] text-white font-medium flex items-center justify-center gap-2 transition-colors w-full sm:w-auto">
              <span>→</span> Sign up for free
            </button>
          </div>

          {/* Testimonial */}
          <div className="flex flex-col items-center">
            <div className="text-6xl font-serif text-black mb-4 leading-none">&quot;</div>
            <p className="text-2xl font-medium italic text-center max-w-xl mb-6">
              Kive was my last ditch attempt at making AI work. This is just fantastic.
            </p>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-600">— Emily</span>
              <span className="px-3 py-1 rounded-full border border-gray-300 text-gray-600">Saved $5,000 on a shoot</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Editor Modal */}
      <AnimatePresence>
        {editingAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-[100]"
          >
            <AssetEditorModal asset={editingAsset} onClose={() => setEditingAsset(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Page() {
  const [state, setState] = useState<'idle' | 'loading' | 'result'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setTimeout(() => {
      setState('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3000);
  };

  return (
    <AnimatePresence mode="wait">
      {state === 'idle' && (
        <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <HomeState onSubmit={handleSubmit} />
        </motion.div>
      )}
      {state === 'loading' && (
        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <LoadingState />
        </motion.div>
      )}
      {state === 'result' && (
        <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ResultState onReset={() => setState('idle')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
