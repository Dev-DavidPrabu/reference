import { store } from '../../redux/store';
import { Provider } from 'react-redux';
import { fireEvent, render as rtlrender, screen, cleanup } from '@testing-library/react';
import CreateUser from "../UserGroupCreate/CreateUser"

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const render = (component: any) =>
  rtlrender(<Provider store={store}>{component}</Provider>);
afterEach(cleanup);
describe("CreateUser", () => {
  it("render CreateUser component Without crashing", () => {
    render(<CreateUser />);
  })
  it("check  CreateUser having custom header User", () => {
    const { getByTestId } = render(<CreateUser />)
    const headerElement = getByTestId("groupid")
    expect(headerElement.textContent).toBe("Group UID *")
  });

})