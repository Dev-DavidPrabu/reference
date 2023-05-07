import "./SubmitCancelButton.scss";

const SubmitCancelButton = (props: any) => {
  return (
    <>
      <button
        className={`SubmitCancelButton-save border-0 text-white ${!props?.marginLeft && 'ml-4px'}`}
        onClick={props.onSubmit}
      >
        {props.button}
      </button>
      <button
        className="SubmitCancelButton-cancel border-0 ms-3"
        onClick={props.onCancel}
        type="button"
      >
        {props.secondButton}
      </button>
    </>
  );
};
export default SubmitCancelButton;
