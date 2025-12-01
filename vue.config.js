const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: false,

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.entry = "./src/widget.ts";
      config.output.filename = "WeatherWidget.js";
      config.output.library = "WeatherWidget";
      config.output.libraryTarget = "umd";
      config.output.globalObject = "this";
      config.optimization = {
        splitChunks: false,
      };
      config.plugins.push(new (require('./webpack-plugins/css-inline-plugin'))());
    }
  },

  chainWebpack: (config) => {
    // Для production сборки удаляем HTML плагин
    if (process.env.NODE_ENV === "production") {
      config.plugins.delete("html");
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
    }
  },

  css: {
    extract: false,
  },
});
