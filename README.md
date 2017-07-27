# tagged-translations
[![Build Status](https://travis-ci.org/vinhlh/tagged-translations.svg?branch=master)](https://travis-ci.org/vinhlh/tagged-translations)

A dead simple `babel-plugin` for translating texts in React applications.

Input
```js
<Header>
  {t`Hello ${name}!`}
</Header>
```

Output
```js
<Header>
  {`Xin chào ${name} 🤣!`}
</Header>
```

## Features
- Build time translation: build app with minimal footprint.
- Based on ES6 tagged template literals: really helpful for readability/ maintaination/ integrations.
- Translations are configured in a JSON file.

## Usage
### Via `.babelrc`

```js
{
  "plugins": [
    ["tagged-translations", {
      "translation": "./translation.json",
      "tagName": "t"
    }]
  ]
}
```

- `translation`: the location of translation json.
- `tagName`: translation tag name. Default: `t`.

### Via `babel-macros`

```js
{
  "plugins": ["babel-macros"]
}
```

then import the macro and use it.

```js
import t from 'tagged-translations/macro';

const name = 'Vinh Le';

t`Hello ${name}`;
```


## Notes
- We don't cover 100% cases: don't support `\n` characters.