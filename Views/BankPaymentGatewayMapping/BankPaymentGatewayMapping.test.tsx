import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { render as rtlrender, cleanup, fireEvent } from '@testing-library/react';
import BankPaymentGatewayMapping  from "./BankPaymentGatewayMapping";



const render = (component: any) =>
    rtlrender(<Provider store={store}>{component}</Provider>);
    afterEach(cleanup);


    describe("AddUser", () => {
        it("render AddUser component Without crashing", () => {
            render(<BankPaymentGatewayMapping />);
        });

    });