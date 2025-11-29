const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: false,

  configureWebpack: {
    entry: "./src/main.ts",
    output: {
      filename: "weather-widget.js",
      library: "WeatherWidget",
      libraryTarget: "umd",
      libraryExport: "default",
      globalObject: "this",
    },
    optimization: {
      splitChunks: false,
    },
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
