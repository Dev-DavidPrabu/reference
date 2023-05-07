import "./CustomTableDataResponse.scss";

const CustomTableDataResponse = (props: any) => {
  return (
    <>
      <p className="apiStatus">
        <p className="apiStatus">{`${props.message}`}</p>
      </p>
    </>
  );
};
export default CustomTableDataResponse;
