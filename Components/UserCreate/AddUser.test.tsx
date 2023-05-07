import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { render as rtlrender, cleanup, fireEvent } from '@testing-library/react';
import AddUser from "./AddUser";



const render = (component: any) =>
    rtlrender(<Provider store={store}>{component}</Provider>);
    afterEach(cleanup);


    describe("AddUser", () => {
        it("render AddUser component Without crashing", () => {
            render(<AddUser />);
        });

        it("check AddUser having userid-field", () => {
            const { getByTestId } = render(<AddUser />)
            const label = getByTestId("userid-label")
            expect(label).toBeInTheDocument();
        })
        it("check AddUser having fullName-field", () => {
            const { getByTestId } = render(<AddUser />)
            const label = getByTestId("fullName-label")
            expect(label).toBeInTheDocument();
        })
        it("check AddUser having emailId-field", () => {
            const { getByTestId } = render(<AddUser />)
            const label = getByTestId("emailId-label")
            expect(label).toBeInTheDocument();
        })
        it("check AddUser having mobilenumber-field", () => {
            const { getByTestId } = render(<AddUser />)
            const label = getByTestId("mobilenumber-label")
            expect(label).toBeInTheDocument();
        })
        it("check AddUser having status-field", () => {
            const { getByTestId } = render(<AddUser />)
            const label = getByTestId("status-label")
            expect(label).toBeInTheDocument();
        })
        it("check AddUser having comment-field", () => {
            const { getByTestId } = render(<AddUser />)
            const label = getByTestId("comment-label")
            expect(label).toBeInTheDocument();
        })
        it("check weather button called properly",()=>{
            const mockOnClick = jest.fn();
            const{getByTestId}=render(<AddUser submitHandler={mockOnClick} ></AddUser>)
            fireEvent.click(getByTestId("cancel-button"))
            expect(mockOnClick).toHaveBeenCalledTimes(1)
        })
        it("check submit button called properly",()=>{
            const mockOnClick = jest.fn();
            const{getByTestId}=render(<AddUser submitHandler={mockOnClick} ></AddUser>)
            fireEvent.click(getByTestId("submit-button"))
            expect(mockOnClick).toHaveBeenCalledTimes(0)
        })
        it("check AddUser accept proper props", () => {
            const { getByTestId } = render(<AddUser>Add User</AddUser>);
            const headerElement = getByTestId("header-title")
            expect(headerElement.textContent).toMatch("Add User")
        })
    });