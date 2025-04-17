import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import style from './EditForm.module.css';  

const EditForm = ({ updateTodo, cancelUpdate, defaultValue }) => {
  const handleSubmit = (e) => { 
    e.preventDefault();
    const form = e.currentTarget;
    const { text } = form.elements;
    const value = text.value.trim();
    if (value === '') {
      return;
    }
    updateTodo(value);
    form.reset();
  }
  return <>
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.submitButton} type="submit">
        <RiSaveLine color="green" size="16px" />
      </button>

      <button className={style.editButton} type="button" onClick={() => cancelUpdate()}>
        <MdOutlineCancel color="red" size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="text"
        required
        defaultValue={defaultValue}
        autoFocus
      />
    </form>
  </>;
};
export default EditForm;
