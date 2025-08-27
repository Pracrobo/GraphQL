## Apollo Client

```bash
npm install @apollo/client graphql rxjs
```

### test

```bash
npm install web-vitals
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### App Test 관련 셋팅

```javascript
import { test, expect } from "vitest"; // 명시적 지정
```

package-json

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest"
  },
```

### Main.jsx

```javascript
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
```

### ApolloClient 설정

```javascript
const client = new ApolloClient({
  link: new HttpLink({ uri: "server-host" }),
  cache: new InMemoryCache(),
});
```

[관련 셋팅 문서 - apollo docs](https://www.apollographql.com/docs/react/get-started)
