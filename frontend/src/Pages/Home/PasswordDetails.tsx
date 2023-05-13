import { useState, Fragment, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decode } from "base-64";

import User from "../../Classes/User";
import classes from "./PasswordDetails.module.css";
import { RootState } from "../../Store";
import { capitalize } from "../../Helpers/strings";
import { changeUserName, changePassword, changeApplication, changeCategory, changeDescription } from "../../Store/passwords";

const PasswordDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const user: User | undefined = useSelector((state: RootState) => state.auth.user);
  const password = useSelector((state: RootState) => state.passwords.passwords.find((password) => password.id === id));
  const categories = useSelector((state: RootState) => state.categories.categories.filter((category) => category.userId === user?.id));

  const [showPassword, setShowPassword] = useState(false);
  const [changedData, setChangedData] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  if (!password) return <>Error found</>;

  let btnText = (
    <Fragment>
      <i className="fa-solid fa-pen-to-square"></i> Edit
    </Fragment>
  );

  if (canEdit) {
    btnText = (
      <Fragment>
        <i className="fa-solid fa-floppy-disk"></i> Save
      </Fragment>
    );
  }

  const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setChangedData(true);
    dispatch(changeUserName({ id: password.id, newUserName: event.target.value }));
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setChangedData(true);
    dispatch(changePassword({ id: password.id, newPassword: event.target.value }));
  };

  const applicationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setChangedData(true);
    dispatch(changeApplication({ id: password.id, newApplication: event.target.value }));
  };

  const categoryChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setChangedData(true);
    dispatch(changeCategory({ id: password.id, newCategory: event.target.value }));
  };

  const descriptionChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setChangedData(true);
    dispatch(changeDescription({ id: password.id, newDescription: event.target.value }));
  };

  const togglePasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const clickHandler = () => {
    if (changedData) {
      console.log("Sending some request...");
      setChangedData(false);
    }

    setCanEdit(!canEdit);
  };

  return (
    <div className="password-details">
      <div className="card">
        <h5 className="card-header">{capitalize(password.application)}</h5>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" className="form-control" id="username" disabled={!canEdit} value={password.userName} onChange={usernameChangeHandler} />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type={!showPassword ? "password" : "text"} className="form-control" id="password" disabled={!canEdit} value={decode(password.encryptedPassword)} onChange={passwordChangeHandler} />
            <i className={`fa-solid fa-eye${showPassword ? "-slash" : ""} text-secondary ${classes["password-view-icon"]}`} onClick={togglePasswordHandler}></i>
          </div>
          <div className="mb-3">
            <label htmlFor="application" className="form-label">
              Application
            </label>
            <input type="text" className="form-control" id="application" disabled={!canEdit} value={capitalize(password.application)} onChange={applicationChangeHandler} />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select className="form-select" id="category-new" disabled={!canEdit} value={password.categoryId} onChange={categoryChangeHandler}>
              <option defaultValue="0">Select a category...</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {capitalize(category.name)}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="application" className="form-label">
              Description
            </label>
            <textarea className="form-control" id="description-new" rows={3} disabled={!canEdit} value={password.description} onChange={descriptionChangeHandler}></textarea>
          </div>
          <button className="btn btn-dark" onClick={clickHandler}>
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordDetails;
