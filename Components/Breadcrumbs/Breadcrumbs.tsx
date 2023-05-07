import "./Breadcrumbs.scss";
import { NavLink } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import Routes from "../../Routes";
import { BsMicrosoft } from "react-icons/bs";

export let lastRoute: string = "";
function updateBreadcrumb(breadcrumb: any) {
  let addSpace = breadcrumb.props.children;
  addSpace = addSpace.replace(/-/g, " ");
  lastRoute = addSpace;

  return addSpace;
}
// map & render your breadcrumb components however you want.

const Breadcrumbs = withBreadcrumbs(Routes)(({ breadcrumbs }) => (
  <div className="breadcrumb ">
    {breadcrumbs.map(({ match, breadcrumb }: any, id: number) => (
      // other props are available during render, such as `location`
      // and any props found in your route objects will be passed through too
      <>
        <span key={match.url}>
          {id === breadcrumbs.length - 1 ? (
            <NavLink style={{ pointerEvents: "none" }} exact to={match.url}>
              <span className="link currentLink">
                {match.url === "/" ? (
                  <BsMicrosoft />
                ) : (
                  updateBreadcrumb(breadcrumb)
                )}
              </span>
              {id === breadcrumbs.length - 1 ? null : (
                <span className="after"></span>
              )}
            </NavLink>
          ) : (
            <NavLink exact to={match.url}>
              <span className="link normalLink">
                {match.url === "/" ? (
                  <BsMicrosoft />
                ) : (
                  updateBreadcrumb(breadcrumb)
                )}
              </span>
              {id === breadcrumbs.length - 1 ? null : (
                <span className="after"></span>
              )}
            </NavLink>
          )}
        </span>
      </>
    ))}
  </div>
));

export default Breadcrumbs;
