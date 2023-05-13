import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./PasswordItem.module.css";
import { capitalize } from "../../Helpers/strings";
import { formatDate } from "../../Helpers/date";
import Password from "../../Classes/Password";
import Category from "../../Classes/Category";
import { deletePassword } from "../../Store/passwords";

interface PasswordItemProps {
  password: Password;
  category: Category | undefined;
}

const PasswordItem = ({ password, category }: PasswordItemProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const link = `/password/${password.id}`;
  const heading = capitalize(password.application);
  const date = formatDate(password.createdAt as unknown as string);

  const deleteHandler = () => {
    dispatch(deletePassword({ id: password.id }));
    navigate("/", { replace: true });
  };

  return (
    <>
      <NavLink className={({ isActive }) => `card ${isActive ? "border-black" : ""} mb-3`} to={link} key={password.id}>
        <div className={`card-header ${classes["card-header"]}`}>
          <span>{heading}</span>
          <span className="text-secondary">
            {date}
            <i className={`fa-solid fa-trash-can ms-2 ${classes["delete-icon"]}`} data-bs-toggle="modal" data-bs-target={`#confirmModal-${password.id}`}></i>
          </span>
        </div>
        <div className="card-body">
          <h5 className="card-title">{heading}'s Account Password</h5>
          <p className="card-text">{password.description}</p>
          {category && <span className="badge text-bg-dark">{category.name}</span>}
        </div>
      </NavLink>
      <div className="modal fade" id={`confirmModal-${password.id}`} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`confirmModal-${password.id}-label`}>
                Are you sure you want to proceed? - Deleting password for "{password.application}".
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">This action is irreversible.</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteHandler}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordItem;
