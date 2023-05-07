import './CustomCurrentPageUserManagement.scss';

const CustomCurrentPageManagement = (props: any) => {

    return (
        <div className="col d-flex mb-4 mt-4">
            <div className="col-6 d-flex">
                <button type="button" className={`current-page-lock border-0 p-1 ms-3 ${props.page === 'account' ? "page-bottom-arrow text-white" : "text-bold"}`} style={{width:"200px"}} onClick={props.onClick}>
                Mobile Settings
                </button>
                <button type="button" className={`current-page-lock border-0 p-1 ms-3 ${props.page === 'device' ? "page-bottom-arrow text-white" : "text-bold"}`} style={{width:"200px"}} onClick={props.onClick}>
                    Device Settings
                </button>
            </div>
        </div>
    );
}

export default CustomCurrentPageManagement;