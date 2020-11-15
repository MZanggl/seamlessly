## Webpack loader

Specify the loader in your webpack configurations.

```javascript
const path = require('path')

{
  // ... other configs
  module: {
    rules: [
      {
        test: /SeamlessActions/, // check for imports from a |SeamlessActions" folder
        use: {
          loader: 'seamlessly/loaders/webpack',
          options: {
            rcPath: path.join(__dirname, '..') // path of .seamlesslyrc.json
          }
        }
      }
    ]
  }
}
```