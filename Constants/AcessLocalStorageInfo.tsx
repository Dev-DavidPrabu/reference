const getLocalStorageValues = () => {
    let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
    return (Object.keys(userData).length > 0?true:false)
};



export default getLocalStorageValues;
  