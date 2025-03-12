const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  // Standard passthrough copies
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addWatchTarget("./src/");

  return {
    pathPrefix: "/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: path.resolve(__dirname, "_site")
    }
  };
};

