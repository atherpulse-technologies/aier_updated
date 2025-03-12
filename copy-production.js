const fs = require('fs');
const path = require('path');

const outputDir = path.resolve(__dirname, '_site');
const projectRoot = __dirname;

if (!fs.existsSync(outputDir)) {
  console.error('Error: _site directory does not exist. Run build first.');
  process.exit(1);
}

console.log('Copying _site contents to project root...');

// Create file copier function
const copyFiles = (src, dest) => {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    entry.isDirectory() 
      ? (fs.mkdirSync(destPath, { recursive: true }), copyFiles(srcPath, destPath))
      : fs.copyFileSync(srcPath, destPath);
  }
};

try {
  copyFiles(outputDir, projectRoot);
  console.log('Production copy completed successfully');
} catch (error) {
  console.error('Copy failed:', error);
  process.exit(1);
}
