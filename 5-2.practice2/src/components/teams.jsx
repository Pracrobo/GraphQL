import "./components.css";

function Teams() {
  function AsideItems() {
    return <div>Teams Aside</div>;
  }

  function MainContents() {
    return <div>Main</div>;
  }

  return (
    <div id="teams" className="component">
      <aside>
        <AsideItems />
      </aside>
      <section className="contents">
        <MainContents />
      </section>
    </div>
  );
}

export default Teams;
