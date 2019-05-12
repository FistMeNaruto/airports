module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/_imports.scss";`
      }
    }
  }
};
