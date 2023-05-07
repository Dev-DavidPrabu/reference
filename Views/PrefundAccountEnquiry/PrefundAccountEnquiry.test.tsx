import { Provider } from "react-redux";
import { store } from "../../redux/store";
import {
  render as rtlrender,
  cleanup,
  fireEvent,
  act,
} from "@testing-library/react";
import PrefundAccountEnquiry from "./PrefundAccountEnquiry";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { Table } from "antd";
import { Button, Input } from "reactstrap";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import CustomButton from "../../Components/UI/CustomButton";

Enzyme.configure({ adapter: new Adapter() });

const render = (component: any) =>
  mount(<Provider store={store}>{component} </Provider>);
afterEach(cleanup);
describe("PrefundAccountEnquiry", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => {
        return {
          matches: false,
        };
      },
    });
  });
  it("render PrefundAccountEnquiry component Without crashing", () => {
    render(<PrefundAccountEnquiry />);
  });

  test.only("check PrefundAccountEnquiry having", async () => {
    const prefundHeader = [
      {
        title: "Company Name",
        dataIndex: "companyName",
        sorter: {
          compare: (a: any, b: any) => {
          },
        },
      },
      {
        title: "Contact Person",
        dataIndex: "authorizerName",
        sorter: {
          compare: (a: any, b: any) =>
            a.authorizerName.localeCompare(b.authorizerName),
        },
      },
      {
        title: "Contact Mobile No",
        dataIndex: "authorizerMobileNo",
        sorter: {
          compare: (a: any, b: any) =>
            a.authorizerMobileNo.localeCompare(b.authorizerMobileNo),
        },
      },
      {
        title: "Email Address",
        dataIndex: "companyEmail",
        sorter: {
          compare: (a: any, b: any) =>
            a.companyEmail.localeCompare(b.companyEmail),
        },
      },
      {
        title: "Status",
        align: "center",
        dataIndex: "statusCode",
        sorter: {
          compare: (a: any, b: any) => a.statusCode.localeCompare(b.statusCode),
        },
        render: (status: any, record: { key: React.Key }) => {
          return (
            <label
              className={`d-flex justify-content-center ${
                status === "A" ? "text-success" : "text-danger"
              }`}
            >
              {status === "A" ? "Active" : "InActive"}
            </label>
          );
        },
      },
      {
        title: "Manage",
        align: "center",
        dataIndex: "Manage",
      },
    ];
    const datas = render(<PrefundAccountEnquiry />);
    const tableData = [
      {
        companyName: "test-Company",
        authorizerName: "test",
        authorizerMobileNo: "test",
        companyEmail: "test",

        statusCode: "test",
      },
      {
        companyName: "test-Company1",
        authorizerName: "test11",
        authorizerMobileNo: "test11",
        companyEmail: "test11",

        statusCode: "test11",
      },
    ];

    let submitbtn = datas.find("#button");
    let reset = datas.find("#resetbutton");
    let input = datas.find(Input).at(0);
    input.simulate("change", { target: { value: "test" } });
    submitbtn.simulate("submit");
    reset.simulate("click");

    const mockfn = jest.fn();
    const props = {
      component: "payrollEnquiry",
      color: "secondary",
      id: "btn",
    };

    await act(async () => {
      const header = render(
        <CustomHeader
          CustomTableHeader={tableData}
          TableData={prefundHeader}
          DisableMange={true}
        />
      );
      const btn = render(<CustomButton {...props} />);
      const click = btn.find(Button);
      click.simulate("click");
    });
  });
  it("check  UserGroups having custom header UserRights", () => {
    const test = render(<PrefundAccountEnquiry />);
    const headerElement = test.find("#test");
    expect(headerElement).toBeInTheDocument();
  });
});
