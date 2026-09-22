---
description: Quick-reference syntax for the JavaScript features reached for most often — destructuring, optional chaining, array methods.
date: 2026-09-11
keywords: [javascript, cheatsheet, reference]
---

# JavaScript cheatsheet

## Destructuring

```js
const { name, age = 0 } = user;
const [first, ...rest] = list;
```

## Optional chaining and nullish coalescing

```js
const city = user?.address?.city ?? "Unknown";
```

## Common array methods

```js
list.map((x) => x * 2);
list.filter((x) => x > 0);
list.reduce((sum, x) => sum + x, 0);
list.find((x) => x.id === targetId);
```
