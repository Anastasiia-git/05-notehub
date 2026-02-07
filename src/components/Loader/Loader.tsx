import css from "./Loader.module.css";

function Loader() {
  return (
    <div>
      <p className={css.text}>Loading notes, please wait...</p>
    </div>
  );
}

export default Loader;
