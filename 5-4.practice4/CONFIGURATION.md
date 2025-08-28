## Server

- 1-3.graphql-exp, npm start 으로 실행

## front

- npm run dev 로 실행

## fragment

- 여러 쿼리에 사용될 수 있는 재사용 가능한 필드셋
- 중복을 줄임으로써 전체 코드를 간소화

```js
const Names = gql`
  fragment names on People {
    first_name
    last_name
  }
`;
const HealthInfo = gql`
  fragment healthInfo on People {
    sex
    blood_type
  }
`;
const WorkInfo = gql`
  fragment workInfo on People {
    serve_years
    role
    team
    from
  }
`;
```

fragment \_\_ on () {
field1
field2
field3
}

```js
const GET_PEOPLE = gql`
  query GetPeople {
    people {
      id
      ...names
      ...healthInfo
    }
  }
  ${Names}
  ${HealthInfo}
`;
```

- 패턴에 익숙해지면 될 듯 하다.
