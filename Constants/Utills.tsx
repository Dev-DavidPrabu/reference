import moment from "moment";

const dateFormater = (timeStamp: string) => {
  const format = "YYYY-MM-DD";
  let timeFromObject = new Date(timeStamp);
  let convertedFormat = moment(timeFromObject).format(format);
  return convertedFormat.toString();
};


 
export default dateFormater;
