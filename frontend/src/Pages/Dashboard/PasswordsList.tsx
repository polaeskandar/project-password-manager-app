import { ChangeEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

import classes from "./PasswordsList.module.css";
import Password from "../../Classes/Password";
import Category from "../../Classes/Category";
import { formatDate } from "../../Helpers/date";
import { capitalize } from "../../Helpers/strings";

const PasswordsList = () => {
  const authenticatedUser = useSelector((state: RootState) => state.auth.user);
  const passwordsList: Array<Password> = useSelector((state: RootState) => state.passwords.passwords.filter((password) => password.userId === authenticatedUser?.id));
  const categoriesList: Array<Category> = useSelector((state: RootState) => state.categories.categories);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const renderPasswords = (passwordsArray: Password[], searchFor: string) => {
    let filteredArray = passwordsArray;
    if (searchFor) filteredArray = passwordsArray.filter((password) => password.app.includes(searchFor));
    else filteredArray = passwordsArray;

    if (filteredArray.length === 0) {
      return (
        <div className="card mb-3 border-dark">
          <div className="card-body text-center">No found passwords!</div>
        </div>
      );
    }

    return filteredArray.map((password: Password) => {
      const link = `/password/${password.id}`;
      const heading = capitalize(password.app);
      const date = formatDate(password.createdAt);
      const category = categoriesList.find((category) => category.id === password.categoryId)?.name.toUpperCase();

      return (
        <NavLink className={({ isActive }) => `card ${isActive ? "border-black" : ""} mb-3`} to={link} key={password.id}>
          <div className={`card-header ${classes["card-header"]}`}>
            <span>{heading}</span>
            <span className="text-secondary">{date}</span>
          </div>
          <div className="card-body">
            <h5 className="card-title">{heading}'s Account Password</h5>
            <p className="card-text">{password.description}</p>
            <span className="badge text-bg-dark">{category}</span>
          </div>
        </NavLink>
      );
    });
  };

  return (
    <>
      <div className={classes["passwords-list"]}>
        <div className="mb-3">
          <input type="search" className="form-control" id="search-passwords" placeholder="Search passwords..." onChange={searchHandler} />
        </div>
        {renderPasswords(passwordsList, searchTerm)}
        <Link to="/password/new" className="btn btn-block btn-dark">
          <i className="fa-solid fa-plus me-2 py-2"></i>Add a new password
        </Link>
      </div>
    </>
  );
};

export default PasswordsList;
