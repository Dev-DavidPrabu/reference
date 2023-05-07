
import { Label } from "reactstrap";
import "./FiltersSelected.scss"

const FiltersSelected = (props: any) => {
    function firstLetter(text:string) {
        let result =  text.charAt(0).toUpperCase() + text.slice(1);
        result = result.replace(/([A-Z])/g, ' $1').trim();
        return result;
      } 
    const renderdata = (value: any) => {
        const data = Object.keys(value);
        return (
        <>
            {data.map((key: any) => (
                <div className={`ms-2 ${value[key].length === 0 && "d-none"}`}>{value[key]&& <>{`${firstLetter(key)} : ${value[key] === "false" ? "ACTIVE" : value[key] === "true" ? "INACTIVE" : value[key]}`}</>}
                </div>
            ))}
        </>
        );
    };

    return (
            <div className="mt-3 p-3 d-flex selected-filter">
                <Label className="d-flex align-items-center me-2">Filter Selected:</Label>
                {renderdata(props?.value)}
            </div>
    );

}

export default FiltersSelected;