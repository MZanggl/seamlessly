## Webpack loader

Specify the loader in your webpack configurations.

```javascript
const path = require('path')

{
  // ... other configs
  module: {
    rules: [
      {
        test: /Actions/, // check for imports from an Actions folder
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