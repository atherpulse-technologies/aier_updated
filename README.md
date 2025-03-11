# Eleventy Project Structure Guide

## Build Process

```bash
npm run build
```
- When you run this command, `.eleventy.js` will build the site and output the contents to the `_site` folder
- For production deployment, the contents of `_site` will be pushed to the server
- The `_out` folder is gitignored and won't be pushed to the repository

## URL and Path Structure Guidelines

### Internal Links
For internal page links, use the `url` filter to create consistent paths regardless of the page depth:

```html
<a href="{{ '/about/' | url }}">About</a>
<a href="{{ '/services/' | url }}">Services</a>
<a href="{{ '/programs/' | url }}">Programs</a>
<a href="{{ '/contact/' | url }}">Contact</a>
```

### Asset References
- **For index.njk (homepage):** Use direct paths
  ```html
  <img src="assets/images/logo.png" alt="Logo">
  ```

- **For nested pages (about/, services/, etc.):** Use relative paths with `../`
  ```html
  <img src="../assets/images/logo.png" alt="Logo">
  ```

- **Alternatively, use absolute paths with the `url` filter:**
  ```html
  <img src="{{ '/assets/images/logo.png' | url }}" alt="Logo">
  ```

## Permalinks Configuration

For consistent URL structures, configure permalinks in your templates:

```yaml
---
permalink: /about/index.html
---
```

Or use this shortened format:
```yaml
---
permalink: /about/
---
```

## Creating Asset References with Eleventy Data

For more robust asset handling, add a custom filter in `.eleventy.js`:

```javascript
eleventyConfig.addFilter("assetPath", function(assetPath) {
  // Get page depth from Eleventy data
  const page = this.page || {};
  const depth = (page.url.match(/\//g) || []).length - 1;
  
  // Add proper number of ../ for depth
  let prefix = '';
  for (let i = 0; i < depth; i++) {
    prefix += '../';
  }
  
  return prefix + assetPath;
});
```

Then use it in your templates:

```html
<img src="{{ 'assets/images/logo.png' | assetPath }}" alt="Logo">
```

## Symlinks for Development

If you need to create symlinks between `_site` and another directory for development purposes, use the provided script:

```bash
node scripts/create-symlinks.js
```

Or add it to your build process by modifying your `.eleventy.js`:

```javascript
eleventyConfig.on('eleventy.after', () => {
  console.log('Creating symlinks...');
  execSync('node scripts/create-symlinks.js', { stdio: 'inherit' });
});
```

## Troubleshooting

If you encounter issues with broken images or links:

1. Verify the asset path is correct for the page's location in the site structure
2. Check if you're using the appropriate method (relative paths with `../` or the `url` filter)
3. Run a clean build: `npm run clean && npm run build`
4. Inspect the generated HTML in the `_site` folder to verify paths

## Best Practices

1. Always use the `url` filter for internal page navigation
2. Be consistent with asset references - either use relative paths or the `assetPath` filter throughout
3. When adding new templates, follow the existing permalink pattern
4. Test navigation and assets in both development and production environments