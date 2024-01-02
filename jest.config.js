module.exports = {
    preset: "react-native",
    setupFiles: [],
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)",
    ],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  };
  