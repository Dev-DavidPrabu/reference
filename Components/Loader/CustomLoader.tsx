import { Dots } from "react-activity";

const CustomLoader = (props: any) =>{

    return(
        <div className="d-flex justify-content-center">
          <Dots color="red" size={props.size} speed={1} animating={props.isLoading} />
        </div>
    );
}

export default CustomLoader;