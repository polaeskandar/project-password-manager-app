import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../Store";
import User from "../../Classes/User";
import { logout } from "../../Store/auth";

const MainNavigation = () => {
  const navigate = useNavigate();
  const user: User | undefined = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid ps-5 pe-5 pt-3 pb-3">
        <Link className="navbar-brand" to="/">
          <i className="fa-solid fa-key"></i> PMA
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ms-2" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <i className="fa-solid fa-house me-1"></i> Home
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  <i className="fa-solid fa-sitemap me-1"></i> Categories
                </NavLink>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/uncategorized">
                  <i className="fa-solid fa-circle-question"></i> Uncategorized
                </NavLink>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <button onClick={logoutHandler} className="nav-link">
                  <i className="fa-solid fa-arrow-right-from-bracket me-1"></i> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
