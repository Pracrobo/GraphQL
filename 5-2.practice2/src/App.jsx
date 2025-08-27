import React, { useState } from "react";
import "./App.css";

import Roles from "./components/roles";
import Teams from "./components/teams";
import People from "./components/people";

import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

function App() {
  const [menu, setMenu] = useState("Roles");

  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:4000",
    }),
    cache: new InMemoryCache(),
  });

  // 컴포넌트 매핑
  const renderContent = () => {
    switch (menu) {
      case "Roles":
        return <Roles />;
      case "Teams":
        return <Teams />;
      case "People":
        return <People />;
      default:
        return <Roles />;
    }
  };

  function NavMenus() {
    return ["Roles", "Teams", "People"].map((_menu, key) => {
      return (
        <li
          key={key}
          className={menu === _menu ? "on" : ""}
          onClick={() => {
            setMenu(_menu);
          }}
        >
          {_menu}
        </li>
      );
    });
  }

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
          <h1>Company Management</h1>
          <nav>
            <ul>{NavMenus()}</ul>
          </nav>
        </header>
        <main>{renderContent()}</main>
      </ApolloProvider>
    </div>
  );
}

export default App;
