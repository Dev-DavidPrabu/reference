import "./CustomNavigateProfile.scss";

const CustomNavigateProfile = (props:any) => {
  return (
    <>
    <div className="col d-flex mb-4 mt-4">
      <div className="col-8 d-flex">
        <button
          type="button"
          className={`current-page-Password border-0 p-1 ${
            props.page === "changePassword"
              ? "custom-page-arrow text-white"
              : "text-bold"
          }`}
          onClick={() => props.onClick("changePassword")}
        >
         Change Password
        </button>
        <button
          type="button"
          className={`current-page-Profile border-0 p-1 ms-3 ${
            props.page === "ProfileImgChange"
              ? "custom-page-arrow text-white"
              : "text-bold"
          }`}
          onClick={() => props.onClick("ProfileImgChange")}
        >
          Update Profile Image
        </button>
      </div>
    </div>
</>

  )
}

export default CustomNavigateProfile