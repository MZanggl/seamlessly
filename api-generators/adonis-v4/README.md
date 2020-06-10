To get started require this file under `start/routes.js`.

```javascript
require('seamlessly/api-generators/adonis-v4')()
```

By default it will look for 
- the `.seamlesslyrc.json` file in the root directory of Adonis.
- the files to generate the API from inside `app/Actions`

Override as needed:

```javascript
require('seamlessly/api-generators/adonis-v4')({
  rcPath: '..', // one directory outside of adonis root directory
  actionsPath: 'app/SeamlessActions'
})
```

---

Access `auth` using `this.auth`.

```javascript
exports.login = async function(id) {
  if (this.auth.user) {
    await this.auth.logout()
  }
  return await this.auth.loginViaId(id)
}
```