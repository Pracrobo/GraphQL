import "./components.css";

function People() {
  function AsideItems() {
    return <div>Aside</div>;
  }

  function MainContents() {
    return <div>Main</div>;
  }

  return (
    <div id="people" className="component">
      <aside>
        <AsideItems />
      </aside>
      <section className="contents">
        <MainContents />
      </section>
    </div>
  );
}

export default People;
