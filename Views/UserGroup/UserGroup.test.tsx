
import { store } from '../../redux/store';
import { Provider } from 'react-redux';
import { fireEvent, render as rtlrender, screen, cleanup } from '@testing-library/react';
import UserGroups from './UserGroups';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })



const render = (component: any) =>
  rtlrender(<Provider store={store}>{component}</Provider>);
afterEach(cleanup);
describe("Usergroup", () => {
  it("render Usergroup component Without crashing", () => {
    render(<UserGroups />);
  })
  it("check  UserGroups having custom header User Groups", () => {
    const { getByTestId } = render(<UserGroups />)
    const headerElement = getByTestId("usergroup")
    expect(headerElement.textContent).toBe("User Group")
  });
  it("check  UserGroups having custom header User", () => {
    const { getByTestId } = render(<UserGroups />)
    const headerElement = getByTestId("User")
    expect(headerElement.textContent).toBe("User")
  });
  it("check  UserGroups having custom header UserRights", () => {
    const { getByTestId } = render(<UserGroups />)
    const headerElement = getByTestId("UserRights")
    expect(headerElement.textContent).toBe("User Rights")
  });
  it("check  UserGroups having custom header GroupRights", () => {
    const { getByTestId } = render(<UserGroups />)
    const headerElement = getByTestId("GroupRights")
    expect(headerElement.textContent).toBe("Group Rights")
  });

  it("check  UserGroups having custom button Add", () => {
    const { getByTestId } = render(<UserGroups />)
    const headerElement = getByTestId("Button")
    expect(headerElement.textContent).toBe("+ Add")
  });
  
  it("check  UserGroups having Field Print", () => {
    const {getByTestId} = render(<UserGroups />)
    const headerElement = getByTestId("button-custom-print")
    expect(headerElement).toBeInTheDocument();
  });
  it("check  UserGroups having Field pdf", () => {
    const {getByTestId} = render(<UserGroups />)
    const headerElement = getByTestId("button-custom-pdf")
    expect(headerElement).toBeInTheDocument();
  });

  it("check  UserGroups having Field search", () => {
    const {getByTestId} = render(<UserGroups />)
    const headerElement = getByTestId("button-custom-search")
    expect(headerElement).toBeInTheDocument();
  });
  it("check  UserGroups having Field filter", () => {
    const {getByTestId} = render(<UserGroups />)
    const headerElement = getByTestId("button-custom-filter")
    expect(headerElement).toBeInTheDocument();
  });
  it("check weather button called properly",()=>{
    const mockOnClick = jest.fn();
    const{getByText,getByTestId}=render(<UserGroups onClick={mockOnClick}></UserGroups>)
    fireEvent.click(getByTestId("button-custom-id"))
    expect(mockOnClick).toHaveBeenCalledTimes(0)

})
it("check weather  pdf button called properly",()=>{
  const mockOnClick = jest.fn();
  const{getByText,getByTestId}=render(<UserGroups onClick={mockOnClick}></UserGroups>)
  fireEvent.click(getByTestId("button-custom-pdf"))
  expect(mockOnClick).toHaveBeenCalledTimes(0)

})
it("check weather  print button called properly",()=>{
  const mockOnClick = jest.fn();
  const{getByText,getByTestId}=render(<UserGroups onClick={mockOnClick}></UserGroups>)
  fireEvent.click(getByTestId("button-custom-print"))
  expect(mockOnClick).toHaveBeenCalledTimes(0)

})
it("check weather  search option called properly",()=>{
  const mockOnClick = jest.fn();
  const{getByText,getByTestId}=render(<UserGroups onClick={mockOnClick}></UserGroups>)
  fireEvent.click(getByTestId("button-custom-search"))
  expect(mockOnClick).toHaveBeenCalledTimes(0)

})
it("check weather  filter option called properly",()=>{
  const mockOnClick = jest.fn();
  const{getByText,getByTestId}=render(<UserGroups onClick={mockOnClick}></UserGroups>)
  fireEvent.click(getByTestId("button-custom-filter"))
  expect(mockOnClick).toHaveBeenCalledTimes(0)

})



 
})

