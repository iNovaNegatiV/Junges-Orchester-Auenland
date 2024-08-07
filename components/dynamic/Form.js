const Form = ({ blok }) => {
  function submitForm(event) {
    event.preventDefault();
    console.log("Submitted!");
  }

  return (
    <form onSubmit={submitForm}>
      <button type="submit">SENDEN</button>
    </form>
  );
};
export default Form;
