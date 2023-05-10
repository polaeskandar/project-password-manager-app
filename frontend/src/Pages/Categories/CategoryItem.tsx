import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./CategoryItem.module.css";
import Password from "../../Classes/Password";
import Category from "../../Classes/Category";
import { RootState } from "../../Store";
import { capitalize } from "../../Helpers/strings";
import { formatDate } from "../../Helpers/date";

type CategoryProps = {
  category: Category;
};

const CategoryItem = ({ category }: CategoryProps) => {
  const [showPasswords, setShowPasswords] = useState(false);
  const authenticatedUser = useSelector((state: RootState) => state.auth.user);
  const passwordsList: Array<Password> = useSelector((state: RootState) => state.passwords.passwords.filter((password) => password.userId === authenticatedUser?.id));
  const assignedPasswords = passwordsList.filter((password) => password.categoryId === category.id);

  return (
    <div className="card" key={category.id}>
      <div className={`card-body ${classes["card-body"]}`}>
        <h5 className="card-title">{capitalize(category.name)}</h5>
        <p className="card-text">{category.description}</p>

        {showPasswords && (
          <ul className="list-group mb-3">
            {assignedPasswords.map((password) => (
              <li className={`list-group-item ${classes["list-group-item"]}`} key={password.id}>
                <Link to={`/password/${password.id}`}>
                  <span>{capitalize(password.app)}</span>
                  <span>{formatDate(password.createdAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className={classes["actions-list"]}>
          <button className="btn btn-light" onClick={() => setShowPasswords(!showPasswords)} disabled={!assignedPasswords.length}>
            {assignedPasswords.length > 0 ? (
              <>
                <i className="fa-solid fa-eye me-1"></i> View Assigned Passwords
              </>
            ) : (
              <>
                <i className="fa-solid fa-eye-slash me-1"></i> No Assigned Passwords
              </>
            )}
          </button>
          <button className="btn btn-dark">
            <i className="fa-solid fa-pen-to-square me-1"></i> Edit
          </button>
          <button className="btn btn-danger">
            <i className="fa-solid fa-trash me-1"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
