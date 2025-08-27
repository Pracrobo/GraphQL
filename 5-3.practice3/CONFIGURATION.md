## useMutation

[Apollo Docs](https://www.apollographql.com/docs/react/api/react/useMutation)

```js
import { gql, useMutation } from "@apollo/client";
// 이렇게 하라고 적혀있지만
// 실제 node_modules에서 확인해본 결과
// useMutation, ApolloProvider, useQuery 는 /react로 import 할 수 있게 셋팅 되어 있었다.
// 이걸 통해서 로컬 패치 같은 용어를 알게 되었다.

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

function AddTodo() {
  let input;
  const [addTodo, { data }] = useMutation(ADD_TODO);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
```

## refetching

[apollo docs](https://www.apollographql.com/docs/react/data/queries#refetching)
