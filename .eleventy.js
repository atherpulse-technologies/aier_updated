const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  const outputDir = path.resolve(__dirname, "_site"); // Absolute path to _site/
  const projectRoot = path.resolve(__dirname); // Root of the Eleventy project

  if (!fs.existsSync(outputDir)) {
    console.error("Error: _site directory does not exist.");
    process.exit(1);
  }
  
  // Read all files and directories inside _site/
  fs.readdirSync(outputDir).forEach((file) => {
    const sourcePath = path.join(outputDir, file);
    const destPath = path.join(projectRoot, file);
  
    // Check if source is a file or directory
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      // Recursively copy directory
      fs.cpSync(sourcePath, destPath, { recursive: true });
      console.log(`Copied directory: ${file}`);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied file: ${file}`);
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: outputDir,
    },
  };
};
