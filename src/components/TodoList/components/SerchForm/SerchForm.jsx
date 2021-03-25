import styles from "./SerchForm.module.css";

const SerchForm = ({serchValue, setSerchValue}) => {
  return (
    <form className={styles.wrapper}>
      <input
        className={styles.text}
        spellCheck='false'
        type="text"
        placeholder="Serch"
        value={serchValue}
        onChange={(event) => {setSerchValue(event.target.value)}}
      />
    </form>
  );
};

export default SerchForm;
