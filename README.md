# seamlessly

> `npm install seamlessly`

Seamlessly integrate frontend and backend, making importing backend code in frontend possible and secure.

## Get Started

1. Copy `.seamlessyrc.json` to your working directory.

```bash
cp node_modules/seamlessly/.seamlesslyrc.json ./
```

2. Choose a loader from the "loaders" folder and follow the respective README for the frontend integration.

3. Choose a backend integration from the "api-generators" folder and follow the respective README.

## Examples

- [Adonis.js v4 + Vue.js](https://github.com/MZanggl/adonis-vue-without-api)

## Creating a plugin

### How to create an API generator

1. Construct an API the user can inject into his routes file to create the routes, allow an option to pass in the `rcPath` (path of seamlesslyrc.json) as well as the actionsPath (path where the actions live).

2. Loop through all files in the actions folder and create a POST route for each, then write the generated routes to `.seamlesslyrc.json`

```jsonc
{
  "method": "POST", // currently always POST, subject to change
  "endpoint": "<file name without path and extension + function name>",
  "file": "<file name without path, but with extension>",
  "id": "<function name>" // will be used as client function name
}
```

3. The request for each route will receive an array named `args` in its payload. Call the actual function using the spread array.

4. Each route must return the following JSON format:

```json
{
  "result": "<actual result of function>"
}
```