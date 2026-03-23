const fs = require('fs');
const file = fs.readFileSync('app/page.tsx', 'utf8');

const lines = file.split('\n');
const startIdx = lines.findIndex(line => line.startsWith('function ResultState({ onReset, assets }: { onReset: () => void, assets: any[] }) {'));

if (startIdx !== -1) {
  // Find the end of this ResultState function
  let endIdx = -1;
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i] === '}') {
      endIdx = i;
      break;
    }
  }
  
  if (endIdx !== -1) {
    lines.splice(startIdx, endIdx - startIdx + 1);
    fs.writeFileSync('app/page.tsx', lines.join('\n'));
    console.log('Removed duplicate ResultState');
  }
}
