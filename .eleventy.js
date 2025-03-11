const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  const outputDir = path.resolve(__dirname, "_site"); // Eleventy's output directory
  const projectRoot = path.resolve(__dirname); // Root of the project

  // Run copy operation ONLY if script is executed via `npm run build`
  if (process.env.npm_lifecycle_event === "build") {
    if (!fs.existsSync(outputDir)) {
      console.error("Error: _site directory does not exist. Run Eleventy first.");
      process.exit(1);
    }

    console.log("Copying _site contents to project root...");

    // Read all files and directories inside _site/
    fs.readdirSync(outputDir).forEach((file) => {
      const sourcePath = path.join(outputDir, file);
      const destPath = path.join(projectRoot, file);

      try {
        // Check if source is a file or directory
        const stats = fs.statSync(sourcePath);

        if (stats.isDirectory()) {
          // Recursively copy directory and overwrite existing files
          fs.cpSync(sourcePath, destPath, { recursive: true, force: true });
          console.log(`Copied directory: ${file}`);
        } else {
          // Copy file and overwrite if it exists
          fs.copyFileSync(sourcePath, destPath);
          console.log(`Copied file: ${file}`);
        }
      } catch (error) {
        console.error(`Error copying ${file}:`, error);
      }
    });

    console.log("Copy operation completed.");
  }

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: outputDir,
    },
  };
};
