import fs from 'fs';
import path from 'path';

function replaceInDirectory(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      replaceInDirectory(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const original = content;

      // Backgrounds
      content = content.replace(/#0C0C0C/gi, '#F8FAFC'); // Slate 50
      content = content.replace(/#121212/gi, '#FFFFFF'); // White
      content = content.replace(/#111111/gi, '#FFFFFF'); // White
      content = content.replace(/#161616/gi, '#FFFFFF');
      content = content.replace(/#060606/gi, '#F1F5F9'); // Slate 100
      content = content.replace(/#070707/gi, '#F1F5F9'); 
      content = content.replace(/#021008/gi, '#F0FDF4'); // Green 50
      content = content.replace(/#030B18/gi, '#EFF6FF'); // Blue 50
      content = content.replace(/#18092A/gi, '#FAF5FF'); // Purple 50
      content = content.replace(/#031D0D/gi, '#DCFCE7'); // Green 100
      content = content.replace(/#041530/gi, '#DBEAFE'); // Blue 100

      // Text colors
      content = content.replace(/#D7E2EA/gi, '#1E293B'); // Slate 800 (was light gray/blue text)
      content = content.replace(/#BBCCD7/gi, '#334155'); // Slate 700 
      
      // We should swap text-white to text-slate-900? 
      // Only do it when we know it's not a primary color text.
      // There might be hover:text-white. 
      // Let's replace hover:text-white with hover:text-slate-900.
      content = content.replace(/hover:text-white/g, 'hover:text-slate-900');
      
      // Let's replace 'text-[#FFFFFF]' with 'text-[#0F172A]' if it exists
      
      // Also shadows like rgba(0,0,0,0.8) should become lighter
      content = content.replace(/rgba\(0,0,0,0\.8\)/g, 'rgba(0,0,0,0.1)');
      content = content.replace(/rgba\(0,0,0,0\.85\)/g, 'rgba(0,0,0,0.12)');
      content = content.replace(/rgba\(0,0,0,0\.9\)/g, 'rgba(0,0,0,0.15)');
      content = content.replace(/rgba\(0,0,0,0\.95\)/g, 'rgba(0,0,0,0.2)');
      content = content.replace(/rgba\(0,0,0,0\.5\)/g, 'rgba(0,0,0,0.05)');

      // Glow around elements
      // Before: bg-[#0EA5E9]/10 (maybe keep)
      // text-white -> text-slate-800 ... actually maybe we can just search for selection:bg-[#0EA5E9] selection:text-white

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated theme in ${fullPath}`);
      }
    }
  }
}

replaceInDirectory('./src');
console.log('Light Theme Replacement Complete!');
