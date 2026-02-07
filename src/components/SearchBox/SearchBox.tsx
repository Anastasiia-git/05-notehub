import css from "./SearchBox.module.css";
import toast from "react-hot-toast";

interface SearchBoxProps {
  onSubmit: (query: string) => Promise<void> | void;
  onChange: (value: string) => void;
  value: string;
}

function SearchBox({ onSubmit, onChange, value }: SearchBoxProps) {
  const formAction = async (formData: FormData) => {
    const query = formData.get("query")?.toString().trim() ?? "";

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }
    await onSubmit(query);
  };

  return (
    <form className={css.form} action={formAction}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Search notes"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </form>
  );
}

export default SearchBox;
