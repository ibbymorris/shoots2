const fs = require('fs');

const file = fs.readFileSync('app/page.tsx', 'utf8');

const startIndex = file.indexOf('function AdvancedAssetEditor({ initialAsset, allAssets, onClose }');
const endIndex = file.indexOf('function ResultState({ onReset, assets }');

if (startIndex !== -1 && endIndex !== -1) {
  const before = file.substring(0, startIndex);
  const after = file.substring(endIndex);
  
  const newComponent = `function AdvancedAssetEditor({ initialAsset, allAssets, onClose }: { initialAsset: any, allAssets: any[], onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('Adjust');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8">
      <div className="bg-white w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-900">{initialAsset.name || 'Edit Asset'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Preview */}
          <div className="flex-1 bg-gray-50 flex items-center justify-center p-8 relative">
            {initialAsset.type === 'video' ? (
              <video src={initialAsset.src} className="max-w-full max-h-full object-contain rounded-lg shadow-sm" controls autoPlay loop />
            ) : (
              <img src={initialAsset.src} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg shadow-sm" />
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-white border-l border-gray-100 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {['Adjust', 'Filters', 'Export'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={\`flex-1 py-4 text-sm font-medium transition-colors \${
                    activeTab === tab ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-900'
                  }\`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'Adjust' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brightness</label>
                    <input type="range" className="w-full accent-purple-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contrast</label>
                    <input type="range" className="w-full accent-purple-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Saturation</label>
                    <input type="range" className="w-full accent-purple-600" />
                  </div>
                </div>
              )}
              {activeTab === 'Filters' && (
                <div className="grid grid-cols-2 gap-3">
                  {['Original', 'Vivid', 'Dramatic', 'B&W', 'Vintage', 'Cool'].map((filter) => (
                    <button key={filter} className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors border border-transparent hover:border-purple-200">
                      {filter}
                    </button>
                  ))}
                </div>
              )}
              {activeTab === 'Export' && (
                <div className="space-y-4">
                  <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download High-Res
                  </button>
                  <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> Save to Library
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

`;
  
  fs.writeFileSync('app/page.tsx', before + newComponent + after);
  console.log('Replaced AdvancedAssetEditor');
} else {
  console.log('Could not find boundaries');
}
