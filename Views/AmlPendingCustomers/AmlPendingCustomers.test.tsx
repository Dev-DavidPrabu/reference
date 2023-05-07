import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { fireEvent,render as rtlrender, screen, cleanup,  act } from '@testing-library/react';
import AmlPendingCustomers from "./AmlPendingCustomers";

const render = (component: any) =>
    rtlrender(<Provider store={store}>{component}</Provider>);
    afterEach(cleanup);
    
describe("UserDetails", () => {
    it("render UserDetails component Without crashing",  () => {
        render(<AmlPendingCustomers/>);
    });

    it("check UserDetails having add", () => {

        const { getByTestId } = render(<AmlPendingCustomers />)
        const headerElement = getByTestId("add")
        expect(headerElement.textContent).toBe(" + Add User")
    })

    it("check UserDetails having print", () => {
        const { getByTestId } = render(<AmlPendingCustomers />)
        const headerElement = getByTestId("print")
        expect(headerElement).toBeInTheDocument();
    })
    it("check UserDetails having export", () => {
        const { getByTestId } = render(<AmlPendingCustomers />)
        const headerElement = getByTestId("export")
        expect(headerElement).toBeInTheDocument();
    })
    it("check UserDetails having search-user", () => {
        const { getByTestId } = render(<AmlPendingCustomers />)
        const headerElement = getByTestId("search-user")
        expect(headerElement).toBeInTheDocument();
    })
    it("check search button called properly",()=>{
        const mockOnClick = jest.fn();
        const{getByTestId}=render(<AmlPendingCustomers submitHandler={mockOnClick} ></AmlPendingCustomers>)
        fireEvent.click(getByTestId("search-user"))
        expect(mockOnClick).toHaveBeenCalledTimes(0);
    })
    it("check UserDetails having export as excel", () => {
        const { getByTestId } = render(<AmlPendingCustomers />)
        const headerElement = getByTestId("excel")
        expect(headerElement).toBeInTheDocument();
    })

});