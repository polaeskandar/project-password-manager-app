import { useState, ChangeEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./NewCategory.module.css";
import User from "../../Classes/User";
import { CustomThunkDispatch, RootState } from "../../Store";
import { createCategory } from "../../Store/actions/category";

const AddNewCategory = () => {
  const navigate = useNavigate();
  const dispatch: CustomThunkDispatch = useDispatch();
  const user: User | undefined = useSelector((state: RootState) => state.auth.user);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  if (!user) return <>Unexpected Error!</>;

  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const changeDescriptionHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCategoryDescription(event.target.value);
  };

  const saveHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(createCategory({ name: categoryName, description: categoryDescription, userId: user.id }, user.token));
    setCategoryName("");
    setCategoryDescription("");
    navigate("..");
  };

  return (
    <form className="card mb-3">
      <div className="card-body position-relative">
        <i className={`${classes["close-icon"]} fa-solid fa-xmark position-absolute text-secondary`}></i>
        <div className="mb-3">
          <label htmlFor="category-title-new" className="form-label">
            Category Title
          </label>
          <input type="text" className="form-control" id="category-title-new" value={categoryName} onChange={changeNameHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="category-description-new" className="form-label">
            Category Description
          </label>
          <textarea className="form-control" id="category-description-new" value={categoryDescription} onChange={changeDescriptionHandler}></textarea>
        </div>
        <button className="btn btn-dark" onClick={saveHandler}>
          <i className="fa-solid fa-floppy-disk me-1"></i> Save
        </button>
      </div>
    </form>
  );
};

export default AddNewCategory;
