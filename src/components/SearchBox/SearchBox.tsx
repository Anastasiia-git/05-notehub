import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (value: string) => void;
  value: string;
}

function SearchBox({ onChange, value }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      name="query"
      placeholder="Search notes"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
}

export default SearchBox;
