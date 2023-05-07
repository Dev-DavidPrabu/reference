import {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import './AuthLayout.scss';
import { AiOutlineMenu, AiOutlineCopyrightCircle } from 'react-icons/ai';
import securityIcon from '../../assets/menuIcons/UserShield.svg';
import Cards from '../../assets/menuIcons/Cards.svg';
import Others from '../../assets/menuIcons/Others.svg';
import Payroll from '../../assets/menuIcons/Payroll.svg';
import Remit from '../../assets/menuIcons/Remit.svg';
import Reports from '../../assets/menuIcons/Reports.svg';
import setUpIcon from '../../assets/menuIcons/setupConfig.svg';
import rightArrow from '../../assets/menuIcons/rightArrow.svg';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
  Link,
} from 'react-router-dom';
import Routes from '../../Routes';
import axios from 'axios';
import { RiArrowDropDownLine, RiArrowRightSLine } from 'react-icons/ri';
import { Breadcrumb, Dropdown, Menu } from 'antd';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  logOutUser,
  userLogout,
} from '../../redux/action/UserAuthenticationAction';
import { Constants, ApiEndPoints } from '../../Constants/Constants';
import functionalCodeRoutes from '../../Utills/FunctionalCodes';
import { BsMicrosoft } from 'react-icons/bs';
import emptyAvatar from '../../assets/emptyAvatar.png';
import { Footer } from 'antd/lib/layout/layout';
import { breadCrumbsPath } from './BreadCrumbsPath';

const AuthLayout: FunctionComponent<any> = (props: any) => {
  const { SubMenu } = Menu;
  const location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();
  const [sideBarcollapse, setSideBarcollapse] = useState(false);

  const logoutResponseData = useSelector(
    (state: RootStateOrAny) => state.authenticationReducer.logoutResponse
  );

  useEffect(() => {
    if (logoutResponseData) {
      if (logoutResponseData?.data) {
      } else if (logoutResponseData?.error) {
      }
    }
  }, [logoutResponseData]);
  let userData = JSON.parse(localStorage.getItem('userInfo') || '{}');
  let imageSrc = 'https://' + userData?.userInfo?.profileLinkurl;

  const [image, setImage] = useState('');
  const [userName, setUserName] = useState('');

  const instance = axios.create({
    baseURL: Constants.BaseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData.idToken,
    },
  });

  useEffect(() => {
    if (userData?.userInfo?.userName) {
      setUserName(userData?.userInfo?.userName);
    }
  }, [userData]);
  useEffect(() => {
    if (userData?.userInfo?.profileLinkurl !== undefined) {
      setImage(imageSrc);
    } else {
      setImage(emptyAvatar);
    }
  }, [imageSrc, userData?.userInfo?.profileLinkurl]);

  const userAcessList: any = localStorage.getItem("userAcessList") || {};
  let FunctionalCodes: any = userAcessList.slice(1, -1).split(",");


  let orginalArray: any = [...functionalCodeRoutes];
  let array: any = useMemo(() => {
    let array: any = [];
    orginalArray?.forEach((route: any) => {
      let firstSubMenu: any = [];
      if (FunctionalCodes?.includes(`"${route.functionalCode}"`) || route.isLevelTwo) {
        if (!route.isLevelTwo) {
          array.push(route);
        } else {
          route.menuItems?.forEach((menuItem: any) => {
            if (FunctionalCodes?.includes(`"${menuItem.functionalCode}"`)) {
              if (menuItem.secondSubmenu) {
                let isLevelThreeArr = menuItem.additionalMenuItems.filter(
                  (submenu: any) => {
                    if (FunctionalCodes?.includes(`"${submenu.functionalCode}"`)) {
                      return FunctionalCodes?.includes(`"${submenu.functionalCode}"`)
                    }
                  }
                );
                if (isLevelThreeArr?.length > 0) {
                  let newMenuItem = { ...menuItem };
                  newMenuItem.additionalMenuItems = isLevelThreeArr;
                  newMenuItem.additionalMenuItems = isLevelThreeArr;
                  firstSubMenu.push(newMenuItem);
                }
                // else {
                //   // firstSubMenu.push(menuItem)
                // }
              } else {
                firstSubMenu.push(menuItem);
              }
            } else {
              if (menuItem.secondSubmenu) {
                let isLevelThreeArr = menuItem.additionalMenuItems.filter(
                  (submenu: any) => {
                    if (FunctionalCodes?.includes(`"${submenu.functionalCode}"`)) {
                      return FunctionalCodes?.includes(`"${submenu.functionalCode}"`)
                    }
                  }
                );
                if (isLevelThreeArr?.length > 0) {
                  let newMenuItem = { ...menuItem };
                  newMenuItem.additionalMenuItems = isLevelThreeArr;
                  newMenuItem.additionalMenuItems = isLevelThreeArr;
                  firstSubMenu.push(newMenuItem);
                }
                // else {
                //   // firstSubMenu.push(menuItem)
                // }
              } else {
                firstSubMenu.push(menuItem);
              }
            }
          });
          if (firstSubMenu?.length > 0) {
            let newRoute = { ...route };
            newRoute.menuItems = firstSubMenu;
            array.push(newRoute);
          }
        }
      }
    });
    return array;
  }, []);

  const getRoutes = () => {
    return Routes.map((prop: any, key: any) => {
      if (prop.layout === '/dashboard') {
        if (!prop.subMenu) {
          let Component = prop.component;
          return (
            <Route
              path={prop.layout + prop.path}
              render={(propSub: any) => <Component {...prop} {...propSub} />}
              key={key}
            />
          );
        } else {
          return prop.menuItems.map((e: any) => {
            if (!e.secondSubmenu) {
              let Component = e.component;
              return (
                <Route
                  exact
                  path={e.layout + e.path}
                  render={(propsRoute: any) => (
                    <Component {...e} {...propsRoute} />
                  )}
                  key={key}
                />
              );
            } else {
              return e.additionalMenuItems?.map((values: any) => {
                let Component = values.component;
                return (
                  <Route
                    exact
                    path={values.layout + values.path}
                    render={() => <Component />}
                    key={key}
                  />
                );
              });
            }
          });
        }
      } else {
        return null;
      }
    });
  };

  axios.interceptors.request.use(
    (config: any) => {
      let userDataInt = JSON.parse(localStorage.getItem('userInfo') || '{}');
      if (userDataInt?.idToken) {
        config.headers['Authorization'] = 'Bearer ' + userDataInt.idToken;
        config.headers['x-session-id'] = userDataInt.sessionId;
      }
      config.headers['Content-Type'] = 'application/json';

      return config;
    },
    async (error: any) => {
      const originalRequest = error.config;
      Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error?.response) {
        if (error?.response?.status === 401 && !originalRequest._retry) {
          if (
            error?.response.data.message === 'The incoming token has expired'
          ) {
            originalRequest._retry = true;
            return instance
              .post(ApiEndPoints.refreshToken, {
                loginId: userData.userInfo.loginId,
                refreshToken: userData.refreshToken,
                userType: 'STAFF',
              })
              .then((res: any) => {
                if (res.data.data) {
                  let userDataRes = JSON.parse(
                    localStorage.getItem('userInfo') || '{}'
                  );
                  originalRequest.headers['Authorization'] =
                    'Bearer ' + res.data.data.idToken;
                  originalRequest.headers['x-session-id'] =
                    userDataRes.sessionId;
                  let UpdateSessionInfo = {
                    userInfo: userDataRes.userInfo,
                    idToken: res.data.data.idToken,
                    refreshToken: userDataRes.refreshToken,
                    sessionId: userDataRes.sessionId,

                    loginTime: userDataRes.loginTime,
                  };
                  let userDataInfo = JSON.stringify(UpdateSessionInfo);
                  localStorage.setItem('userInfo', userDataInfo);
                  return axios(originalRequest);
                } else {
                  if (res.data.status === 200) {
                    let errorValueOneHour = res.data.error;
                    if (errorValueOneHour === 'REFRESH_TOKEN_EXPIRED') {
                      handleSessionLogout(false);
                    }
                  }
                }
              });
          } else {
            if (error?.response.data.error === 'SESSION_EXPIRED') {
              handleSessionLogout(false);
            }
          }
        } else if (error?.response?.status === 401) {
          let value = error?.response?.data?.error;

          if (value === 'SESSION_EXPIRED') {
            handleSessionLogout(false);
          }
        } else if (error?.response?.status === 400) {
          let errorValue = error?.response?.data?.error;
          if (errorValue === 'SESSION_INVALID') {
            handleSessionLogout(true);
          }
        }
        return Promise.reject(error);
      }
    }
  );

  const removeLogoutResponse = useCallback(async () => {
    try {
      dispatch(userLogout());
    } catch (err) { }
  }, [dispatch]);
  const logOut = useCallback(
    async (body: any) => {
      try {
        dispatch(logOutUser(body));
      } catch (err) { }
    },
    [dispatch]
  );

  const handleLogout = () => {
    var body = JSON.stringify({
      userType: userData.userInfo.userType,
      loginId: userData.userInfo.loginId,
    });
    logOut(body);
    removeLogoutResponse().then(() => {
      localStorage.clear();
      props.history.push('/auth/login');
    });
  };
  const handleUpdateProfile = () => {
    props.history.push('/dashboard/update-profile');
  };
  let expired = false;
  const handleSessionLogout = (multipleUser: any) => {
    removeLogoutResponse().then(() => {
      localStorage.clear();

      if (multipleUser && !expired) {
        props.history.push({
          pathname: '/auth/login',
          state: 'Error:Multiple Sessions Found for this User',
        });
      } else {
        expired = true;
        props.history.push('/auth/login');
      }
    });
  };
  const menu = (
    <Menu style={{ width: '100%', padding: '1rem 1rem 1rem 1rem' }}>
      <div className='font-size-dropdown'>{userData?.userInfo?.name}</div>
      <Menu.Divider />
      <Menu.Item onClick={handleUpdateProfile}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <div className='font-size-dropdown'>Update Profile</div>
        </div>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <div className='font-size-dropdown'>Logout</div>
        </div>
      </Menu.Item>
    </Menu>
  );

  const breadcrumbs = () => {
    let abc = breadCrumbsPath(location.pathname);
    return (
      <Breadcrumb separator='>'>
        {' '}
        <span className='mr-custom'>
          <BsMicrosoft />{' '}
        </span>
        <Breadcrumb.Item>{abc.path}</Breadcrumb.Item>
        {abc.route.map((e) => {
          return <Breadcrumb.Item href=''>{e}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
    );
  };
  const Header = () => {
    return (
      <div>
        <div className='header d-flex align-items-center justify-content-between'>
          <span className='ps-4'>
            Your Last logged in {moment(userData.loginTime).format('lll')}
          </span>
          <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex justify-content-between align-items-center '>
              <div>
                <img className='user-avatar me-2' src={image} alt=''></img>
              </div>
              <span>
                Welcome {userName}{' '}
                <Dropdown overlay={menu} placement='topRight' arrow>
                  <RiArrowDropDownLine className='svg' />
                </Dropdown>{' '}
              </span>
              {sideBarcollapse && (
                <div>
                  <AiOutlineMenu
                    style={{ fontSize: '28px' }}
                    onClick={() => setSideBarcollapse(!sideBarcollapse)}
                  ></AiOutlineMenu>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='breadcrumbs-layout'>{breadcrumbs()}</div>
      </div>
    );
  };

  const sideBarActiveMenu = () => {
    switch (location.pathname) {
      case '/dashboard/user-Access-Management/User': {
        return {
          defaultOpenKeys: ['sub1', 'BOSetup1'],
          defaultSelectedKeys: ['User'],
        };
      }
      case '/dashboard/user-Access-Management/User-Groups': {
        return {
          defaultOpenKeys: ['sub1', 'BOSetup1'],
          defaultSelectedKeys: ['User-Groups'],
        };
      }
      case '/dashboard/user-Access-Management/User-Groups/Add-User-Group': {
        return {
          defaultOpenKeys: ['sub1', 'BOSetup1'],
          defaultSelectedKeys: ['Add-User-Groups'],
        };
      }
      case '/dashboard/user-Access-Management/User-Rights': {
        return {
          defaultOpenKeys: ['sub1', 'BOSetup1'],
          defaultSelectedKeys: ['Users Rights'],
        };
      }
      case '/dashboard/user-Access-Management/Group-Rights': {
        return {
          defaultOpenKeys: ['sub1', 'BOSetup1'],
          defaultSelectedKeys: ['Group Rights'],
        };
      }
      case '/dashboard/reference-data': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup2'],
          defaultSelectedKeys: ['reference-data'],
        };
      }
      case '/dashboard/ID-Type-Routing': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup2'],
          defaultSelectedKeys: ['ID-Type-Routing'],
        };
      }
      case '/dashboard/Functional-code': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup2'],
          defaultSelectedKeys: ['Functional-code'],
        };
      }
      case '/dashboard/FunctionalCode-Create': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup2'],
          defaultSelectedKeys: ['Functional-code-Create'],
        };
      }
      case '/dashboard/block-mobile-device': {
        return {
          defaultOpenKeys: ['sub1', 'BOSetup3'],
          defaultSelectedKeys: ['block-mobile-device'],
        };
      }
      case '/dashboard/Payroll-Company-Management/company-maintenance': {
        return {
          defaultOpenKeys: ['sub4', 'BOSetup6'],
          defaultSelectedKeys: ['company-maintenance'],
        };
      }
      case '/dashboard/manual-debit-credit/debit-credit-summary': {
        return {
          path: 'Payroll',
          route: ['Manual Debit / Credit'],
        };
      }

      case '/dashboard/manual-debit-credit/debit-credit': {
        return {
          path: 'Payroll',
          route: ['Manual Debit / Credit'],
        };
      }
      case '/dashboard/manual-debit-credit/Add-debit-credit': {
        return {
          path: 'Payroll',
          route: ['Manual Debit / Credit', 'Add'],
        };
      }
      case '/dashboard/manual-debit-credit/View-debit-credit': {
        return {
          path: 'Payroll',
          route: ['Manual Debit / Credit', 'View'],
        };
      }
      case '/dashboard/payroll-account': {
        return {
          defaultOpenKeys: ['sub4', 'BOSetup6'],
          defaultSelectedKeys: ['payroll account'],
        };
      }
      case '/dashboard/Payroll-Account/Edit-Payroll': {
        return {
          defaultOpenKeys: ['sub4', 'BOSetup6'],
          defaultSelectedKeys: ['Payroll Account'],
        };
      }
      case '/dashboard/prefund-Transaction-enquiry': {
        return {
          defaultOpenKeys: ['sub4', 'BOSetup6'],
          defaultSelectedKeys: ['Transaction Enquiry'],
        };
      }
      case '/dashboard/account-transaction': {
        return {
          defaultOpenKeys: ['sub4', 'BOSetup6'],
          defaultSelectedKeys: ['account transaction'],
        };
      }
      case '/dashboard/Company-UserScreen/Company-User': {
        return {
          defaultOpenKeys: ['sub4', 'BOSetup6'],
          defaultSelectedKeys: ['Company User'],
        };
      }
      case '/dashboard/PayrollPrefund': {
        return {
          defaultOpenKeys: ['sub4', 'BOSetup6'],
          defaultSelectedKeys: ['Payroll Prefund'],
        };
      }
      case '/dashboard/Company-UserScreen/Company-User/Add-Company-User-List': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup2'],
          defaultSelectedKeys: ['Add Company User List'],
        };
      }
      case '/dashboard/Company-UserScreen/Company-User/View-Company-User-List': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup2'],
          defaultSelectedKeys: ['Users'],
        };
      }
      case '/dashboard/Company-UserScreen/Company-User/View-Company-User-List/View-Company-User-Add': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup2'],
          defaultSelectedKeys: ['Users-View'],
        };
      }
      case '/dashboard/payroll-enquiry': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup2'],
          defaultSelectedKeys: ['payroll-enquiry'],
        };
      }
      case '/dashboard/KYC-Customer': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['KYC'],
        };
      }
      case '/dashboard/KYC-Customer-Enquiry': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['KYC'],
        };
      }
      case '/dashboard/Mobile-TopUp-Summary-DashBoard': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Mobile Topup Summary'],
        };
      }
      case '/dashboard/OTP-List': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['OTP List'],
        };
      }
      case '/dashboard/Pending-AML-Customers': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Pending-AML-Customers'],
        };
      }
      case '/dashboard/parameter-summary': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Parameter Summary'],
        };
      }
      case '/dashboard/Toggle-Summary': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Toggle Summary'],
        };
      }
      case '/dashboard/Notification-Summary': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Notification Summary'],
        };
      }
      case '/dashboard/Topup-Add': {
        return {
          defaultOpenKeys: ['sub4', 'BOSetup6'],
          defaultSelectedKeys: ['Topup Add'],
        };
      }
      case '/dashboard/Topup-Add/Topup-BatchDetails': {
        return {
          defaultOpenKeys: ['sub4', 'BOSetup6'],
          defaultSelectedKeys: ['Topup Add Detail'],
        };
      }
      case '/dashboard/Topup-Add/Topup-RejectionReport': {
        return {
          defaultOpenKeys: ['sub4', 'BOSetup6'],
          defaultSelectedKeys: ['Topup Add Detail'],
        };
      }
      case '/dashboard/User-Account-Unlock/Customer-Login-Records': {
        return {
          defaultOpenKeys: ['sub1', 'UnlockAccount'],
          defaultSelectedKeys: ['Login Records'],
        };
      }
      case '/dashboard/User-Account-Unlock/block-mobile-device': {
        return {
          defaultOpenKeys: ['sub1', 'UnlockAccount'],
          defaultSelectedKeys: ['Lock Account / Device'],
        };
      }
      case '/dashboard/User-Account-Unlock/unlock': {
        return {
          defaultOpenKeys: ['sub1', 'UnlockAccount'],
          defaultSelectedKeys: ['unlock'],
        };
      }
      case '/dashboard/User-Account-Unlock/Global-Settings-Mobile': {
        return {
          defaultOpenKeys: ['sub1', 'UnlockAccount'],
          defaultSelectedKeys: ['Global-Settings-Mobile'],
        };
      }
      case '/dashboard/User-Account-Unlock/unlock-staff': {
        return {
          defaultOpenKeys: ['sub1', 'UnlockAccount'],
          defaultSelectedKeys: ['unlock-staff'],
        };
      }
      case '/dashboard/home': {
        return {
          defaultOpenKeys: ['sub3', 'OperationCompany'],
          defaultSelectedKeys: ['approvalTask'],
        };
      }
      case '/dashboard/prefund-Account-enquiry': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['Prefund Account Enquiry'],
        };
      }
      case '/dashboard/Wallet-Size-Setup': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['Wallet Size Setup'],
        };
      }
      case '/dashboard/Wallet-Size-Brand-Mapping': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['Wallet Size Brand Mapping'],
        };
      }
      case '/dashboard/Wallet-Size-Setup/Edit-Wallet-Size': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['Wallet Size Setup', 'Edit Wallet Size'],
        };
      }
      case '/dashboard/Wallet-Size-Brand-Mappin/Edit': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['Wallet Size Brand Mapping', 'Edit'],
        };
      }
      case '/dashboard/Setup-And-Configuration/Card-type': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['Card Type'],
        };
      }
      case '/dashboard/User-Login-Records': {
        return {
          defaultOpenKeys: ['sub1', 'BOSetup3'],
          defaultSelectedKeys: ['User-Login-Records'],
        };
      }
      case '/dashboard/Locked-Account-History': {
        return {
          defaultOpenKeys: ['sub1', 'BOSetup3'],
          defaultSelectedKeys: ['Locked-Account-History'],
        };
      }
      case '/dashboard/Global-Settings': {
        return {
          defaultOpenKeys: ['sub1', 'BOSetup3'],
          defaultSelectedKeys: ['Gloabal Settings'],
        };
      }
      case '/dashboard/remit-setup/Payout-Country': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
        };
      }
      case '/dashboard/remit-setup/Edit-Payout-Country': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Edit Payout Country'],
        };
      }
      case '/dashboard/remit-setup/Add-Payout-Country': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Add Payout Country'],
        };
      }
      case '/dashboard/remit-setup/Bank-Setup': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Bank Setup'],
        };
      }
      case '/dashboard/remit-setup/View-Bank-Setup': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['View Bank Setup'],
        };
      }
      case '/dashboard/remit-setup/Branch-Setup': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Branch Setup'],
        };
      }
      case '/dashboard/remit-setup/Edit-Branch-Setup': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Edit Branch Setup'],
        };
      }
      case '/dashboard/remit-setup/Paying-Group': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Paying Group'],
        };
      }
      case '/dashboard/remit-setup/Remittance-Transaction-Processing': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Remittance Transaction Processing'],
        };
      }
      case '/dashboard/remit-setup/Remittance-Fees-And-Charges': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Remittance Fees And Charges'],
        };
      }
      case '/dashboard/remit-setup/Remittance-Transaction-Enquiry': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Remittance Transaction Enquiry Details'],
        };
      }
      case '/dashboard/remit-setup/Edit-On-Behalf-Details': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Edit On Behalf Details'],
        };
      }
      case '/dashboard/remit-setup/On-Behalf-Setup-Details': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['On Behalf Setup'],
        };
      }
      case '/dashboard/remit-setup/Remittance-Transaction-Status-Dashboard': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Remittance Transaction Status Dashboard'],
        };
      }
      case '/dashboard/remit-setup/Remittance-Transaction-Status-Limit': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Remittance Transaction Limit'],
        };
      }
      case '/dashboard/remit-setup/Transaction-Status-Limit': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Remittance Transaction Limit Setup'],
        };
      }
      case '/dashboard/remit-setup/Remittance-Transaction-Status': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Remittance Transaction Status'],
        };
      }
      case '/dashboard/remit-setup/Edit-Paying-Group': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Edit Paying Group'],
        };
      }
      case '/dashboard/remit-setup/ECDD-Setup': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['ECDD Setup'],
        };
      }
      case '/dashboard/remit-setup/Risk-Score': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Risk Score'],
        };
      }
      case '/dashboard/remit-setup/Risk-Score/Add-Risk-Score': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Add Risk Score'],
        };
      }
      case '/dashboard/remit-setup/Risk-Score/Edit-Risk-Score': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Edit Risk Score'],
        };
      }
      case '/dashboard/remit-setup/Transaction-Statistics': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Transaction Statistics'],
        };
      }
      case '/dashboard/remit-setup/Transaction-Statistics/Add-Transaction-Statistics': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Add Transaction Statistics'],
        };
      }
      case '/dashboard/remit-setup/Transaction-Statistics/Edit-Transaction-Statistics': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Edit Transaction Statistics'],
        };
      }
      case '/dashboard/remit-setup/Risk-Factor': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Risk Factor'],
        };
      }
      case '/dashboard/remit-setup/Risk-Factor/Edit-Risk-Factor': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Edit Risk Factor'],
        };
      }
      case '/dashboard/remit-setup/Risk-Factor-Status-Configuration': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Risk Factor Status Configuration'],
        };
      }
      case '/dashboard/remit-setup/Risk-Rating': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Risk Rating'],
        };
      }
      case '/dashboard/remit-setup/Transaction-Statistics/Add-Risk-Rating': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Add Risk Rating'],
        };
      }
      case '/dashboard/remit-setup/Transaction-Statistics/Edit-Risk-Rating': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Edit Risk Rating'],
        };
      }
      case '/dashboard/remit-setup/Exchange-Rate': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Exchange Rate'],
        };
      }
      case '/dashboard/remit-setup/High-Risk-Country-Setup': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['High Risk Country-Setup'],
        };
      }
      case '/dashboard/remit-setup/Remit-AML-Compliance-Config': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Remit AML Compliance Config'],
        };
      }
      case '/dashboard/marketing/Target-Group-Setup': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Target Group Setup'],
        };
      }
      case '/dashboard/marketing/Promo-Code-Summary': {
        return {
          defaultOpenKeys: ['remit', 'remittance'],
          defaultSelectedKeys: ['Promo Code Summary'],
        };
      }
      case '/dashboard/Setup-And-Configuration/ID-Doc-Mapping': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup_6'],
          defaultSelectedKeys: ['ID Doc Mapping'],
        };
      }
      case '/dashboard/Setup-And-Configuration/ID-Doc-Mapping-Add': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup_6'],
          defaultSelectedKeys: ['ID Doc Mapping Add'],
        };
      }
      case '/dashboard/Setup-And-Configuration/ID-Doc-Mapping-Edit': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup_6'],
          defaultSelectedKeys: ['ID Doc Mapping Edit'],
        };
      }

      case '/dashboard/wallet/walletFeatureSummary': {
        return {
          defaultOpenKeys: ['sub3', 'walletFeature'],
          defaultSelectedKeys: ['Wallet Feature Summary'],
        };
      }
      case '/dashboard/wallet/addWalletFeature': {
        return {
          defaultOpenKeys: ['sub3', 'walletFeature'],
          defaultSelectedKeys: ['Add Wallet Feature'],
        };
      }
      case '/dashboard/SRF/Block-Card-Request': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Block Card Request'],
        };
      }
      case '/dashboard/SRF/Add-Block-Card-Request': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Block Card Request', 'Add'],
        };
      }
      case '/dashboard/SRF/View-Block-Card-Request': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Block Card Request', 'View'],
        };
      }
      case '/dashboard/SRF/View-Block-Customer': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Block Card Customer', 'View'],
        };
      }
      case '/dashboard/SRF/View-UnBlock-Customer': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['UnBlock Card Customer', 'View'],
        };
      }
      case '/dashboard/SRF/Card-Upgrade-View-Customer': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Wallet upgrade Customer', 'View'],
        };
      }
      case '/dashboard/SRF/Doc-Upload-Customer-View': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Doc Upload Customer', 'View'],
        };
      }
      case '/dashboard/SRF/Card-Unblock-View-Details': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Unblock Card Request', 'View'],
        };
      }
      case '/dashboard/SRF/Expiry-Wallet-Downgrade': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Expiry Wallet Downgrade'],
        };
      }
      case '/dashboard/SRF/Card-Upgrade-View-Details': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Upgrade Card Request', 'View'],
        };
      }

      case '/dashboard/SRF/Close-Wallet-Account': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Close Wallet Account'],
        };
      }
      case '/dashboard/SRF/Card-Unblock': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Unblock Card Request'],
        };
      }
      case '/dashboard/SRF/Card-Upgrade': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Upgrade Card Request'],
        };
      }
      case '/dashboard/SRF/Doc-Upload-Request': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Doc Upload Request'],
        };
      }
      case '/dashboard/SRF/Doc-Upload-Request-View': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Doc Upload Request View'],
        };
      }
      case '/dashboard/SRF/Doc-Upload-Request-Add': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Doc Upload Request Add'],
        };
      }
      case '/dashboard/SRF/Add-Card-Replacement': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Add Card Replacement', 'Add'],
        };
      }
      case '/dashboard/SRF/View-Card-Replacement': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Card Replacement', 'View'],
        };
      }
      case '/dashboard/SRF/Add-Card-Unblock': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['Unblock Card Request', 'Add'],
        };
      }
      case '/dashboard/PreOnBoarding': {
        return {
          defaultOpenKeys: ['sub4', 'BOSetup_5'],
          defaultSelectedKeys: ['OnBoarding'],
        };
      }
      case '/dashboard/PreOnBoarding-Customer': {
        return {
          defaultOpenKeys: ['sub4', 'BOSetup_5'],
          defaultSelectedKeys: ['OnBoarding-Customer'],
        };
      }
      case '/dashboard/Notification-Master-Setup': {
        return {
          defaultOpenKeys: ['sub3', 'setupNotification'],
          defaultSelectedKeys: ['Notification Master'],
        };
      }
      case '/dashboard/notification-master-view': {
        return {
          defaultOpenKeys: ['sub3', 'setupNotification'],
          defaultSelectedKeys: ['View Notification Master'],
        };
      }
      case '/dashboard/notification-channel': {
        return {
          defaultOpenKeys: ['sub3', 'setupNotification'],
          defaultSelectedKeys: ['Notification Channel'],
        };
      }
      case '/dashboard/notification-channel-view': {
        return {
          defaultOpenKeys: ['sub3', 'setupNotification'],
          defaultSelectedKeys: ['Notification Channel View'],
        };
      }
      case '/dashboard/notification-channel-edit': {
        return {
          defaultOpenKeys: ['sub3', 'setupNotification'],
          defaultSelectedKeys: ['Notification Channel Edit'],
        };
      }
      case '/dashboard/Bulk-Upload-Customer': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Add Bulk'],
        };
      }
      case '/dashboard/Add-Customer': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Add Customer'],
        };
      }

      case '/dashboard/Branch-Management/Agent-Group': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['Agent Group'],
        };
      }
      case '/dashboard/Branch-Management/Agent-Group/Add-Agent-Group': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['Add Agent Group'],
        };
      }
      case '/dashboard/Branch-Management/Agent-Group/Edit-Agent-Group': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['Edit Agent Group'],
        };
      }
      case '/dashboard/Branch-Management/Branch-Dashboard': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['Branch Dashboard'],
        };
      }
      case '/dashboard/Idtype-Summary': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup3'],
          defaultSelectedKeys: ['ID Type'],
        };
      }
      case '/dashboard/Add-Idtype-Summary': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup3'],
          defaultSelectedKeys: ['Add Id Type'],
        };
      }
      case '/dashboard/SRF/Block-After-Grace-Period': {
        return {
          defaultOpenKeys: ['wallet', 'walletSrf'],
          defaultSelectedKeys: ['KYC Block After Grace Period'],
        };
      }
      case '/dashboard/Edit-Idtype-Summary': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup3'],
          defaultSelectedKeys: ['Edit Id Type'],
        };
      }
      case '/dashboard/SRF/IdExpiring-Reports': {
        return {
          defaultOpenKeys: ['sub9', 'reports'],
          defaultSelectedKeys: ['Id Expiring Reports'],
        };
      }
      case '/dashboard/remittanceTransactionReport/MIRS-Declined-Transaction-Report': {
        return {
          defaultOpenKeys: ['sub9', 'remittanceTransaction'],
          defaultSelectedKeys: [
            'Remittance Transaction Report',
            'MIRS Declined Transaction Report',
          ],
        };
      }
      case '/dashboard/FailedTransactionReport': {
        return {
          defaultOpenKeys: ['sub9', 'remittanceTransaction'],
          defaultSelectedKeys: [
            'Remittance Transaction Report',
            'FailedTransactionReport',
          ],
        };
      }
      case '/dashboard/AvgDailyMonthlyTxnComparsionReport': {
        return {
          defaultOpenKeys: ['sub9', 'remittanceTransaction'],
          defaultSelectedKeys: [
            'Remittance Transaction Report',
            'Average / Daily or Monthly Transaction Comparsion Report',
          ],
        };
      }
      case '/dashboard/remittanceTransactionReport/RejectedTransactionReport': {
        return {
          defaultOpenKeys: ['sub9', 'remittanceTransaction'],
          defaultSelectedKeys: [
            'Remittance Transaction Report',
            'Rejected Transaction Report',
          ],
        };
      }
      case '/dashboard/end-of-day-report': {
        return {
          defaultOpenKeys: ['sub9', 'remittanceTransaction'],
          defaultSelectedKeys: [
            'Remittance Transaction Report',
            'End of Day Report',
          ],
        };
      }
      case '/dashboard/transaction-report': {
        return {
          defaultOpenKeys: ['sub9', 'remittanceTransaction'],
          defaultSelectedKeys: [
            'Remittance Transaction Report',
            'Transaction Summary Report',
          ],
        };
      }
      case '/dashboard/SRF/SRFBlockCard': {
        return {
          defaultOpenKeys: ['sub9', 'reportsBlock'],
          defaultSelectedKeys: ['SRF Block Card '],
        };
      }
      case '/dashboard/SRF/SRFUnBlockCard': {
        return {
          defaultOpenKeys: ['sub9', 'reportsUnblock'],
          defaultSelectedKeys: ['SRF UnBlock Card'],
        };
      }
      case '/dashboard/SRF/KYCUpdateCard': {
        return {
          defaultOpenKeys: ['sub9', 'reportsUpdate'],
          defaultSelectedKeys: ['SRF KYCUpdateCard'],
        };
      }
      case '/dashboard/SRF/WalletUpgrade': {
        return {
          defaultOpenKeys: ['sub9', 'reportsWallet'],
          defaultSelectedKeys: ['SRF WalletUpgrade'],
        };
      }
      case '/dashboard/SRF/WalletUpgrade-Approved': {
        return {
          defaultOpenKeys: ['sub9', 'reportsWallet'],
          defaultSelectedKeys: ['SRF WalletUpgrade Approved'],
        };
      }
      case '/dashboard/SRF/WalletUpgrade-Rejected': {
        return {
          defaultOpenKeys: ['sub9', 'reportsWallet'],
          defaultSelectedKeys: ['SRF WalletUpgrade Rejected'],
        };
      }
      case '/dashboard/SRF/WalletUpgrade-Error': {
        return {
          defaultOpenKeys: ['sub9', 'reportsWallet'],
          defaultSelectedKeys: ['SRF WalletUpgrade Error'],
        };
      }
      case '/dashboard/CustomerLoginReport': {
        return {
          defaultOpenKeys: ['sub9', 'securityReport'],
          defaultSelectedKeys: ['Customer Login Report'],
        };
      }
      case '/dashboard/UAMreport': {
        return {
          defaultOpenKeys: ['sub9', 'securityReport'],
          defaultSelectedKeys: ['UAM Report'],
        };
      }
      case '/dashboard/SmsTransactionReport': {
        return {
          defaultOpenKeys: ['sub9', 'securityReport'],
          defaultSelectedKeys: ['SMS Transaction Report'],
        };
      }
      case '/dashboard/BranchManagementReport': {
        return {
          defaultOpenKeys: ['sub9', 'securityReport'],
          defaultSelectedKeys: ['Branch Management Report'],
        };
      }
      case '/dashboard/DailyTransactionReport': {
        return {
          defaultOpenKeys: ['sub9', 'remittanceTransaction'],
          defaultSelectedKeys: ['Daily Transaction Report'],
        };
      }
      case '/dashboard/MonthlyTransactionReport': {
        return {
          defaultOpenKeys: ['sub9', 'remittanceTransaction'],
          defaultSelectedKeys: ['Monthly Transaction Report'],
        };
      }
      case '/dashboard/RefundTransactionReport': {
        return {
          defaultOpenKeys: ['sub9', 'remittanceTransaction'],
          defaultSelectedKeys: ['Refund Transaction Report'],
        };
      }
      case '/dashboard/OnBehalfSenderReport': {
        return {
          defaultOpenKeys: ['sub9', 'remittanceTransaction'],
          defaultSelectedKeys: ['On Behalf Sender Report'],
        };
      }
      case '/dashboard/AMLCFTReports': {
        return {
          defaultOpenKeys: ['sub9', 'AMLCompilanceReports'],
          defaultSelectedKeys: ['AMLCFT Report'],
        };
      }
      case '/dashboard/CustomerRiskProfilingReport': {
        return {
          defaultOpenKeys: ['sub9', 'AMLCompilanceReports'],
          defaultSelectedKeys: ['Custom Risk Profiling Report'],
        };
      }
      case '/dashboard/ECDDReport': {
        return {
          defaultOpenKeys: ['sub9', 'AMLCompilanceReports'],
          defaultSelectedKeys: ['ECDD Report'],
        };
      }
      case '/dashboard/CustomerRiskSummaryReport': {
        return {
          defaultOpenKeys: ['sub9', 'AMLCompilanceReports'],
          defaultSelectedKeys: ['Customer Risk Summary Report'],
        };
      }
      case '/dashboard/TransactionReport': {
        return {
          defaultOpenKeys: ['sub9', 'AMLCompilanceReports'],
          defaultSelectedKeys: ['Transaction Report'],
        };
      }
      case '/dashboard/TransactionSummaryReport': {
        return {
          defaultOpenKeys: ['sub9', 'AMLCompilanceReports'],
          defaultSelectedKeys: ['Transaction Summary Report'],
        };
      }
      case '/dashboard/OnBoardingSummaryReport': {
        return {
          defaultOpenKeys: ['sub9', 'OnboardingReport'],
          defaultSelectedKeys: ['OnBoarding Summary Report'],
        };
      }

      case '/dashboard/OnBoardingDetailReport': {
        return {
          defaultOpenKeys: ['sub9', 'OnboardingReport'],
          defaultSelectedKeys: ['OnBoarding Detail Report'],
        };
      }

      case '/dashboard/MSSLTrackerListReport': {
        return {
          defaultOpenKeys: ['sub9', 'OnboardingReport'],
          defaultSelectedKeys: ['MSSLTracker List Report'],
        };
      }

      case '/dashboard/MaintenanceListReport': {
        return {
          defaultOpenKeys: ['sub9', 'OnboardingReport'],
          defaultSelectedKeys: ['Maintenance List Report'],
        };
      }

      case '/dashboard/GroupNameSummaryReport': {
        return {
          defaultOpenKeys: ['sub9', 'OnboardingReport'],
          defaultSelectedKeys: ['GroupName Summary Report'],
        };
      }
      case '/dashboard/CustomerScreeningReport': {
        return {
          defaultOpenKeys: ['sub9', 'OnboardingReport'],
          defaultSelectedKeys: ['Customer screening report'],
        };
      }
      case '/dashboard/MarketingReport': {
        return {
          defaultOpenKeys: ['sub9', 'OnboardingReport'],
          defaultSelectedKeys: ['Marketing report'],
        };
      }

      case '/dashboard/salesReport': {
        return {
          defaultOpenKeys: ['sub9', 'OnboardingReport'],
          defaultSelectedKeys: ['Sales Report'],
        };
      }
      case '/dashboard/PrefundReconciliationReport': {
        return {
          defaultOpenKeys: ['sub9', 'PayrollReport'],
          defaultSelectedKeys: ['Prefund Reconciliation Report'],
        };
      }
      case '/dashboard/PayrollCompanyCreation': {
        return {
          defaultOpenKeys: ['sub9', 'PayrollReport'],
          defaultSelectedKeys: ['Payroll Company Creation'],
        };
      }
      case '/dashboard/TopupReconciliationReport': {
        return {
          defaultOpenKeys: ['sub9', 'PayrollReport'],
          defaultSelectedKeys: ['Topup Reconciliation Report'],
        };
      }
      case '/dashboard/PayrollSummaryReport': {
        return {
          defaultOpenKeys: ['sub9', 'PayrollReport'],
          defaultSelectedKeys: ['Payroll Transaction Summary Report'],
        };
      }
      case '/dashboard/PayrollDetailReport': {
        return {
          defaultOpenKeys: ['sub9', 'PayrollReport'],
          defaultSelectedKeys: ['Payroll Transaction Detail Report'],
        };
      }
      case '/dashboard/PayrollTxnByCompany': {
        return {
          defaultOpenKeys: ['sub9', 'PayrollReport'],
          defaultSelectedKeys: ['Payroll Transaction By Company Report'],
        };
      }
      case '/dashboard/PrefundAmountReport': {
        return {
          defaultOpenKeys: ['sub9', 'PayrollReport'],
          defaultSelectedKeys: ['Prefund Amount Report'],
        };
      }
      case '/dashboard/PrefundDebitReport​': {
        return {
          defaultOpenKeys: ['sub9', 'PayrollReport'],
          defaultSelectedKeys: ['Prefund Debit Report​'],
        };
      }
      case '/dashboard/PrefundCreditReport​': {
        return {
          defaultOpenKeys: ['sub9', 'PayrollReport'],
          defaultSelectedKeys: ['Prefund Credit Report​​'],
        };
      }

      case '/dashboard/PrefundBalanceByCompany': {
        return {
          defaultOpenKeys: ['sub9', 'PayrollReport'],
          defaultSelectedKeys: ['Prefund Balance By Company'],
        };
      }
      case '/dashboard/TransactionHistoryReport': {
        return {
          defaultOpenKeys: ['sub9', 'PayrollReport'],
          defaultSelectedKeys: ['Transaction History Report'],
        };
      }
      case '/dashboard/walletDowngradeReport': {
        return {
          defaultOpenKeys: ['sub9', 'Life Cycle Reports'],
          defaultSelectedKeys: ['Wallet Downgrade Report'],
        };
      }
      case '/dashboard/View-Idtype-Summary': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup3'],
          defaultSelectedKeys: ['View Id Type'],
        };
      }
      case '/dashboard/Branch-Management/Branch-Dashboard/Add-Branch': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['Branch Dashboard', 'Add Branch'],
        };
      }
      case '/dashboard/Branch-Management/Branch-Dashboard/Edit-Branch': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['Branch Dashboard', 'Edit-Branch'],
        };
      }
      case '/dashboard/Branch-Management/Terminal-Dashboard': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['E-Terminal Dashboard'],
        };
      }
      case '/dashboard/Branch-Management/Terminal-Dashboard/Add-ETerminal': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['E-Terminal Dashboard', 'Add ETerminal'],
        };
      }
      case '/dashboard/Branch-Management/Terminal-Dashboard/Edit-ETerminal': {
        return {
          defaultOpenKeys: ['sub3', 'BOSetup7'],
          defaultSelectedKeys: ['E-Terminal Dashboard', 'Edit ETerminal'],
        };
      }
      case '/dashboard/bank-Payment-Gateway-Mapping': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Bank Payment Gateway Mapping'],
        };
      }
      case ' /dashboard/Notification-Summary': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Notification Summary'],
        };
      }
      case ' /dashboard/Toggle-Summary': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Toggle Summary'],
        };
      }
      case '/dashboard/Toggle-Summary/Toggle-Summary-Edit': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Toggle Summary', 'Toggle-Summary-Edit'],
        };
      }
      case ' /dashboard/parameter-summary': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['parameter summary'],
        };
      }
      case '/dashboard/edit-summary-parameter': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['parameter summary', 'Edit Summary'],
        };
      }
      case '/dashboard/edit-summary-notification': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Notification Summary', 'Edit Summary'],
        };
      }
      case '/dashboard/AMLcompliance-config': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['AMLCompaliance Config'],
        };
      }
      case '/dashboard/Mobile-TopUp-Summary': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Mobile-TopUp-Summary'],
        };
      }
      case '/dashboard/Account-Summary': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Account Summary'],
        };
      }
      case '/dashboard/Account-vendor/Add-Account': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Account Summary'],
        };
      }
      case '/dashboard/View-vendor/View-Account': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Account Summary'],
        };
      }
      case '/dashboard/Edit-vendor/Edit-Account': {
        return {
          defaultOpenKeys: ['sub_5', 'BOSetup_5'],
          defaultSelectedKeys: ['Account Summary'],
        };
      }
      case '/dashboard/Merchant-Setup': {
        return {
          defaultOpenKeys: ['valyou', 'valyoumerchant'],
          defaultSelectedKeys: ['Merchant Setup'],
        };
      }
      case '/dashboard/Merchant-Branch-Summary': {
        return {
          defaultOpenKeys: ['valyou', 'valyoumerchant'],
          defaultSelectedKeys: ['Merchant Branch Summary'],
        };
      }
      case '/dashboard/Merchant-Teller-Summary': {
        return {
          defaultOpenKeys: ['valyou', 'valyoumerchant'],
          defaultSelectedKeys: ['Merchant Teller Summary'],
        };
      }
      case '/dashboard/MerchantBranch/MerchantBranch': {
        return {
          defaultOpenKeys: ['walletOperation', 'walletMerchant'],
          defaultSelectedKeys: ['Merchant Branch'],
        };
      }
      default: {
        return {
          defaultOpenKeys: [],
          defaultSelectedKeys: [],
        };
      }
    }
  };
  const SideBar = (SideBarRoutes: any) => {
    let activemenu = sideBarActiveMenu();
    const locationSideBar = useLocation();
    return (
      <div className='sidebar-background d-flex w-100 flex-column justify-content-between'>
        <div className='d-flex flex-column'>
          <div className='p-4'>
            <AiOutlineMenu
              style={{ fontSize: '18px' }}
              onClick={() => setSideBarcollapse(!sideBarcollapse)}
            ></AiOutlineMenu>{' '}
            Menu
          </div>
          {!sideBarcollapse && (
            <>
              {' '}
              <div className='dashboard-title ms-2'>Admin Dashboard</div>
              <div className='global-menu'>
                <Menu
                  mode='inline'
                  style={{ background: '#36393a' }}
                  defaultOpenKeys={activemenu.defaultOpenKeys}
                  defaultSelectedKeys={activemenu.defaultSelectedKeys}
                  selectedKeys={[locationSideBar.pathname]}
                >
                  {renderAntdNewMenu(SideBarRoutes)}
                </Menu>
              </div>
            </>
          )}
        </div>
        <div className='d-flex flex-column current-date mb-3 text-center'>
          <span>{moment(userData.loginTime).format('LT')}</span>
          <span>{moment(userData.loginTime).format('DD MMM YYYY')}</span>
        </div>
      </div>
    );
  };
  const renderAntdNewMenu = (RenderRoutes: any) => {
    return RenderRoutes.Routes.map((valuesOfRoutes: any, index: any) => {
      console.log(valuesOfRoutes.name);
      return !valuesOfRoutes.subMenu ? (
        <Menu.Item
          key='1'
          onClick={() => {
            navigateTo(valuesOfRoutes.path, valuesOfRoutes.layout);
          }}
        >
          {valuesOfRoutes.name}
        </Menu.Item>
      ) : valuesOfRoutes.name === 'Security Management' ? (
        <SubMenu
          key='sub1'
          title={
            <>
              <img alt='' src={securityIcon} />
              <span className='ms-1 p-1'>{valuesOfRoutes.name}</span>
            </>
          }
        >
          {renderSecondeSubMenu(valuesOfRoutes.menuItems)}
        </SubMenu>
      ) : valuesOfRoutes.name === 'Setup and Configuration' ? (
        <SubMenu
          key='sub3'
          title={
            <>
              <img alt='' src={setUpIcon} />
              <span className='ms-1 p-1'>{valuesOfRoutes.name}</span>
            </>
          }
        >
          {renderSecondeSubMenu(valuesOfRoutes.menuItems)}
        </SubMenu>
      ) : valuesOfRoutes.name === 'Payroll' ? (
        <SubMenu
          key='sub4'
          title={
            <>
              <img alt='' src={Payroll} />
              <span className='ms-1 p-1'>{valuesOfRoutes.name}</span>
            </>
          }
        >
          {renderSecondeSubMenu(valuesOfRoutes.menuItems)}
        </SubMenu>
      ) : valuesOfRoutes.name === 'Branch Management' ? (
        <SubMenu
          key='sub_6'
          title={
            <>
              <img alt='' src={securityIcon} />
              <span className='ms-1 p-1'>{valuesOfRoutes.name}</span>
            </>
          }
        >
          {renderSecondeSubMenu(valuesOfRoutes.menuItems)}
        </SubMenu>
      ) : valuesOfRoutes.name === 'Remittance' ? (
        <SubMenu
          key='remit'
          title={
            <>
              <img alt='' src={Remit} />
              <span className='ms-1 p-1'>{valuesOfRoutes.name}</span>
            </>
          }
        >
          {renderSecondeSubMenu(valuesOfRoutes.menuItems)}
        </SubMenu>
      ) : valuesOfRoutes.name === 'Card Operations' ? (
        <SubMenu
          key='wallet'
          title={
            <>
              <img alt='' src={Cards} />
              <span className='ms-1 p-1'>{valuesOfRoutes.name}</span>
            </>
          }
        >
          {renderSecondeSubMenu(valuesOfRoutes.menuItems)}
        </SubMenu>
      ) : valuesOfRoutes.name === 'Reports' ? (
        <SubMenu
          key='sub9'
          title={
            <>
              <img alt='' src={Reports} />
              <span className='ms-1 p-1'>{valuesOfRoutes.name}</span>
            </>
          }
        >
          {renderSecondeSubMenu(valuesOfRoutes.menuItems)}
        </SubMenu>
      ) : valuesOfRoutes.name === 'Wallet Operation' ? (
        <SubMenu
          key='walletOperation'
          title={
            <>
              <img alt='' src={Others} />
              <span className='ms-1 p-1'>{valuesOfRoutes.name}</span>
            </>
          }
        >
          {renderSecondeSubMenu(valuesOfRoutes.menuItems)}
        </SubMenu>
      ) : valuesOfRoutes.name === 'Valyou' ? (
        <SubMenu
          key='valyou'
          title={
            <>
              <img alt='' src={Others} />
              <span className='ms-1 p-1'>{valuesOfRoutes.name}</span>
            </>
          }
        >
          {renderSecondeSubMenu(valuesOfRoutes.menuItems)}
        </SubMenu>
      ) : (
        <SubMenu
          key='sub_5'
          title={
            <>
              <img alt='' src={Others} />
              <span className='ms-1 p-1'>{valuesOfRoutes.name}</span>
            </>
          }
        >
          {renderSecondeSubMenu(valuesOfRoutes.menuItems)}
        </SubMenu>
      );
    });
  };
  const renderSecondeSubMenu = (valuesOfRoutes: any) => {
    return valuesOfRoutes.map((e: any) => {
      return (
        <>
          {e.name !== 'noSubmenu' ? (
            <SubMenu
              key={e.key}
              title={
                <>
                  <img alt='' src={rightArrow} />
                  <img alt='' src={rightArrow} />
                  <span className='ms-1 p-1'>{e.name}</span>
                </>
              }
            >
              {renderItems(e)}
            </SubMenu>
          ) : (
            <>{renderItems(e)}</>
          )}
        </>
      );
    });
  };
  const renderItems = (value: any) => {
    let result = location.pathname.lastIndexOf('/');
    let result1 = location.pathname.substring(result, location.pathname.length);
    return (
      <>
        {value.secondSubmenu &&
          value.additionalMenuItems.map((secondE: any) => {
            return (
              <>
                {secondE.path === result1
                  ? secondE.visibleInMenu && (
                    <Menu.Item
                      className='nav-link-menu'
                      key={secondE.key}
                      onClick={() => {
                        navigateTo(secondE.path, secondE.layout);
                      }}
                    >
                      {
                        <>
                          <RiArrowRightSLine />
                          <Link
                            className='text-white'
                            to={secondE.layout + secondE.path}
                          >
                            <span className='p-1 '>{secondE.name}</span>
                          </Link>
                        </>
                      }
                    </Menu.Item>
                  )
                  : secondE.visibleInMenu && (
                    <Menu.Item
                      key={secondE.key}
                      onClick={() => {
                        navigateTo(secondE.path, secondE.layout);
                      }}
                    >
                      {
                        <>
                          <RiArrowRightSLine />
                          <Link
                            className='text-white'
                            to={secondE.layout + secondE.path}
                          >
                            <span className='p-1 '>{secondE.name}</span>
                          </Link>
                        </>
                      }
                    </Menu.Item>
                  )}
              </>
            );
          })}
      </>
    );
  };

  const navigateTo = (path: any, layout: any) => {
    history.push(layout + path);
  };
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  const bottomVisible = () =>
    document.documentElement.clientHeight + window.scrollY >=
    (document.documentElement.scrollHeight ||
      document.documentElement.clientHeight);

  useEffect(() => {
    setIsBottomVisible(bottomVisible());
  }, []);

  window.addEventListener('scroll', () => {
    setIsBottomVisible(bottomVisible());
  });

  return (
    <div style={{ width: '100%' }} className='d-flex'>
      <div
        className={`${sideBarcollapse ? 'auth-collapse-unMenu' : 'auth-collapse-menu'
          }`}
      >
        <div>
          <Header></Header>
          <div style={{ minHeight: '72vh' }}>
            <Switch>
              {getRoutes()}
              <Redirect from='*' to='/dashboard' />
              <Redirect from='/' to='/dashboard' />
            </Switch>
          </div>
        </div>

        <Footer className='copyright-text margin d-flex align-item-center justify-content-center mb-0 pb-1 pt-0'>
          Merchantrade Asia Sdn Bhd.{' '}
          <AiOutlineCopyrightCircle></AiOutlineCopyrightCircle> 2022
        </Footer>
      </div>

      {!sideBarcollapse && (
        <div className='sidebar-temp'>
          <SideBar
            Routes={
              Object.keys(userAcessList)?.length === 0
                ? functionalCodeRoutes
                : array
            }
          ></SideBar>
        </div>
      )}
    </div>
  );
};
export default AuthLayout;
