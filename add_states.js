const fs = require('fs');

const file = fs.readFileSync('app/page.tsx', 'utf8');

const insertAfter = 'function AdvancedAssetEditor({ initialAsset, allAssets, onClose }: { initialAsset: any, allAssets: any[], onClose: () => void }) {';

const loadingStateAndResultState = `
function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Hunting for images...",
    "Analyzing product details...",
    "Generating high-quality assets...",
    "Applying professional lighting...",
    "Finalizing your product shots..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f4f4]">
      <div className="w-16 h-16 border-4 border-[#5930e5] border-t-transparent rounded-full animate-spin mb-8"></div>
      
      <div className="h-8 relative overflow-hidden w-64 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-medium text-gray-800 absolute inset-0"
          >
            {messages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-12 w-64 h-1 bg-gray-200 rounded-full overflow-hidden relative">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-[#5930e5]"
          initial={{ width: "0%", x: "-100%" }}
          animate={{ width: "40%", x: "250%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>
    </div>
  );
}

function ResultState({ onReset, assets }: { onReset: () => void, assets: any[] }) {
  const [editingAsset, setEditingAsset] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2 font-semibold text-xl">
          <Aperture className="text-[#5930e5]" />
          <span>shot.new</span>
        </div>
        <button 
          onClick={onReset}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Start over
        </button>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your generated assets</h1>
          <p className="text-gray-500">Select any asset to edit, refine, or download.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div 
              key={asset.id}
              className="group relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all"
              onClick={() => setEditingAsset(asset)}
            >
              {asset.type === 'video' ? (
                <video src={asset.src} className="w-full h-full object-cover" autoPlay loop muted playsInline />
              ) : (
                <img src={asset.src} alt={asset.name} className="w-full h-full object-cover" />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium text-sm shadow-lg flex items-center gap-2">
                    <Settings className="w-4 h-4" /> Edit Asset
                  </button>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm capitalize">
                  {asset.type}
                </span>
              </div>
            </div>
          ))}
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
            <AdvancedAssetEditor initialAsset={editingAsset} allAssets={assets} onClose={() => setEditingAsset(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
`;

const index = file.indexOf(insertAfter);
if (index !== -1) {
  const newFile = file.substring(0, index) + loadingStateAndResultState + file.substring(index);
  fs.writeFileSync('app/page.tsx', newFile);
  console.log('Added LoadingState and ResultState');
} else {
  console.log('Could not find insert point');
}
