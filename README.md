## Eslint and Prettier

- Install and enable **eslint** extension
- Paste code below into your **user settings**
  ```json
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true,
  },
  ```
- Disable the following rule from **user settings**
  ```json
  "editor.formatOnSave": false,
  ```