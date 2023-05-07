import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { render as rtlrender, cleanup, fireEvent, act } from '@testing-library/react';
import UserDetails from './UserDetails';

const render = (component: any) =>
    rtlrender(<Provider store={store}>{component}</Provider>);
    afterEach(cleanup);
    
describe("UserDetails", () => {
    it("render UserDetails component Without crashing",  () => {
        render(<UserDetails/>);
    });

    it("check UserDetails having add", () => {

        const { getByTestId } = render(<UserDetails />)
        const headerElement = getByTestId("add")
        expect(headerElement.textContent).toBe(" + Add User")
    })

    it("check UserDetails having print", () => {
        const { getByTestId } = render(<UserDetails />)
        const headerElement = getByTestId("print")
        expect(headerElement).toBeInTheDocument();
    })
    it("check UserDetails having export", () => {
        const { getByTestId } = render(<UserDetails />)
        const headerElement = getByTestId("export")
        expect(headerElement).toBeInTheDocument();
    })
    it("check UserDetails having search-user", () => {
        const { getByTestId } = render(<UserDetails />)
        const headerElement = getByTestId("search-user")
        expect(headerElement).toBeInTheDocument();
    })
    it("check search button called properly",()=>{
        const mockOnClick = jest.fn();
        const{getByTestId}=render(<UserDetails submitHandler={mockOnClick} ></UserDetails>)
        fireEvent.click(getByTestId("search-user"))
        expect(mockOnClick).toHaveBeenCalledTimes(0);
    })
    it("check UserDetails having export as excel", () => {
        const { getByTestId } = render(<UserDetails />)
        const headerElement = getByTestId("excel")
        expect(headerElement).toBeInTheDocument();
    })

});