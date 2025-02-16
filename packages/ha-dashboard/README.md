# HA Dashboard

## Notes

```shell
curl \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyNGExMWFlNTBhMGQ0NjMzOTE2NGE2YTlmNWIxNDYzOCIsImlhdCI6MTczOTY3NzU1MCwiZXhwIjoyMDU1MDM3NTUwfQ.ciTgdkVd77-YdaZvPjGPSCaYXlo6hg7EkBOQvKhjDko" \
    -H "Content-Type: application/json" \
    -d '{"number_to_add": 100 ,
     "return_response": true}' \
    http://192.168.1.35:8123/api/services/script/test_response\?return_response\=true
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses
  [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast
  Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
    languageOptions: {
        // other options...
        parserOptions: {
            project: ['./tsconfig.node.json', './tsconfig.app.json'],
            tsconfigRootDir: import.meta.dirname,
        },
    },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or
  `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
    // Set the react version
    settings: { react: { version: '18.3' } },
    plugins: {
        // Add the react plugin
        react,
    },
    rules: {
        // other rules...
        // Enable its recommended rules
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
    },
})
```
