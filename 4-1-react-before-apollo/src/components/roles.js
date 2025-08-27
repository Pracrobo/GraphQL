import "./components.css";
import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

function Roles() {
  const GET_ROLES = gql`
    query GetRoles {
      roles {
        id
      }
    }
  `;
  const [contentId, setContentId] = useState("");

  function AsideItems() {
    const roleIcons = {
      developer: "💻",
      designer: "🎨",
      planner: "📝",
    };
    const { loading, error, data } = useQuery(GET_ROLES);
    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error :(</p>;
    return (
      <ul>
        {data.roles.map(({ id }) => {
          return (
            <li
              key={id}
              className={"roleItem " + (contentId === "id" ? "on" : "")}
              onClick={() => {
                setContentId(id);
              }}
            >
              <span>{contentId === id ? "🔲" : "⬛"}</span>
              {roleIcons[id]} {id}
            </li>
          );
        })}
      </ul>
    );
  }

  function MainContents() {
    return <div></div>;
  }

  return (
    <div id="roles" className="component">
      <aside>{AsideItems()}</aside>
      <section className="contents">{MainContents()}</section>
    </div>
  );
}

export default Roles;
