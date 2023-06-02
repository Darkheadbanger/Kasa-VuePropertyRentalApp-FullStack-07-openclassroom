module.exports = {
  root: true,
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  env: {
    node: true,
  },
  // extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "vue/no-reserved-component-names": "off",
  },
};
