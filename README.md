# Typed Route Params for Express

### Overview
A TypeScript-aware wrapper around Express that adds typed route parameters based on the pattern `/<param:type>`. The path definition is used both for compile-time type inference and for runtime conversion of `req.params` values.

### Core capabilities
- Type inference for route params using `<name:type>` syntax.
- Support for `str`, `num`, and `bool`.
- Compile-time type safety for `app.get`, `app.post`, `app.route`, `router.get`, and `router.route`.
- Runtime conversion:
  - `num` -> `number`
  - `bool` -> `boolean`
  - `str` / default -> `string`
- Validation for invalid parameter names and unsupported parameter types.

### Supported route syntax
- `<id>` -> string
- `<id:str>` -> string
- `<id:num>` -> number
- `<id:bool>` -> boolean

Example:

```ts
import express from './lib/typedParamsExpress'

const app = express()

app.get('/users/<id:num>', (req, res) => {
  req.params.id // number
  res.send('ok')
})

app.route('/profiles/<id:bool>').get((req, res) => {
  req.params.id // boolean
  res.send('ok')
})

```

---

## Summary
This library enables typed route parameters in Express with a compact pattern-based syntax and runtime coercion. It is useful when strong static typing for URL segments is required without changing the underlying Express runtime model.
