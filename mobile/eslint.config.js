const expoConfig = require("eslint-config-expo/flat");

module.exports = [
  {
    ignores: [
      "dist/*",
      ".expo/*",
      "node_modules/*",
      "src/shared/api/generated/**",
    ],
  },
  ...expoConfig,
];
