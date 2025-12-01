const fs = require('fs');

class CssInlinePlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('CssInlinePlugin', (factory) => {
      factory.hooks.beforeResolve.tap('CssInlinePlugin', (resolveData) => {
        if (resolveData.request && resolveData.request.includes('?inline')) {
          const cssPath = resolveData.request.replace('?inline', '');
          
          try {
            // Resolve the actual CSS file path
            const fullPath = require.resolve(cssPath, { paths: [resolveData.context] });
            
            // Read CSS content
            const cssContent = fs.readFileSync(fullPath, 'utf8');
            
            // Create a virtual module that exports the CSS as a string
            const virtualModule = `export default ${JSON.stringify(cssContent)};`;
            
            // Replace the request with our virtual module
            resolveData.request = `data:text/javascript;charset=utf-8,${encodeURIComponent(virtualModule)}`;
          } catch (error) {
            console.warn('Failed to inline CSS:', cssPath, error.message);
          }
        }
      });
    });
  }
}

module.exports = CssInlinePlugin;