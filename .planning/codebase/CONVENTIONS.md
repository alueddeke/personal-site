# Conventions
*Last mapped: 2026-06-19*

## Code Style

- **Language:** JSX (React 18, no TypeScript)
- **Formatter:** Not configured (no Prettier config found)
- **Linter:** ESLint with `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- **Import style:** Named imports for React hooks; default imports for components and libraries

```jsx
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
```

## Naming

| Thing | Convention | Example |
|-------|-----------|---------|
| Components | PascalCase | `HowlerPlayer.jsx` |
| Utilities | camelCase | `contentful.js` |
| Props | camelCase | `backgroundImage`, `audioClips` |
| State vars | camelCase | `isEmailValid`, `notification` |
| Event handlers | `handle` prefix | `handleSubmit`, `closeNotification` |
| CSS classes | Tailwind utilities + custom tokens | `text-deep-teal`, `bg-light-gray` |
| Env vars | `VITE_` prefix + SCREAMING_SNAKE | `VITE_CONTENTFUL_SPACE_ID` |

## Component Pattern

All components are function components. No class components.

```jsx
function ComponentName({ prop1, prop2 }) {
  // hooks first
  const [state, setState] = useState(null);

  // handlers
  const handleX = () => { ... };

  // early returns for null/loading
  if (!prop1) return null;

  return (
    <section className="...">
      ...
    </section>
  );
}

export default ComponentName;
```

## Styling

- **Framework:** Tailwind CSS v3 with custom tokens in `tailwind.config.js`
- **Custom tokens:** `bg-light-gray`, `text-dark-text`, `text-deep-teal`, `bg-deep-teal`
- **No CSS modules** — all styles via Tailwind class strings
- **Responsive:** `md:` prefix used for breakpoints (e.g. `hidden md:block`, `md:flex-row`)
- **Inline styles:** Used only for dynamic values from Contentful (background images)

```jsx
// Dynamic background — inline style required
style={{ backgroundImage: `url(${image.fields.file.url})` }}
```

## Error Handling

- Data fetch: try/catch in `contentful.js`, re-throws; caught in `App.jsx` useEffect → `setError()`
- Form submit: `.then()/.catch()` promise chain in `ContactMe.jsx`
- Missing data: optional chaining (`backgrounds?.[0]`) used throughout
- Error display: dedicated `<Error />` and `<Loading />` components rendered from `App.jsx`

## Data Access Pattern

All Contentful data flows through a single fetch in `App.jsx` on mount. No lazy loading, no pagination, no caching. Data is prop-drilled from `App` to every section component — no Context or global store.

```jsx
// App.jsx — single source of truth
const [data, setData] = useState(null);
// ...
<Section prop={data.fields.fieldName} />
```

## Asset References

Contentful assets accessed via resolved asset objects:

```jsx
// Correct — asset resolved by contentful.js
image.fields.file.url

// Wrong — don't use Contentful link objects directly
image.sys.id
```
