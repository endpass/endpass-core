# endpass-core
Common packages for Endpass

## Developer Instructions

You'll need to have `lerna` installed globally

### Install

Install all packages

```sh
lerna exec -- yarn
```

### Tests

Run tests of all packages

```sh
lerna run test
```

### Publish

In each module run
```sh
yarn update
```

or if need update all modules
```sh
lerna run update
```
