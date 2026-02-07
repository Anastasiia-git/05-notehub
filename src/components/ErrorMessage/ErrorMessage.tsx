import css from "./ErrorMessage.module.css"; 

interface Props {
  message?: string;
}

function ErrorMessage({ message }: Props) {
  return (
    <div>
      <p className={css.text}>{message ?? "There was an error, please try again..."}</p>
    </div>
  );
}

export default ErrorMessage


