import { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./CategoryItem.module.css";
import Password from "../../Classes/Password";
import Category from "../../Classes/Category";
import { RootState } from "../../Store";
import { capitalize } from "../../Helpers/strings";
import { formatDate } from "../../Helpers/date";
import { deleteCategory, renameCategory, editCategoryDescription } from "../../Store/category";

type CategoryProps = {
  category: Category;
};

const CategoryItem = ({ category }: CategoryProps) => {
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState(category.name);
  const [categoryDescription, setCategoryDescription] = useState(category.description);
  const [showPasswords, setShowPasswords] = useState(false);
  const [changedData, setChangedData] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const authenticatedUser = useSelector((state: RootState) => state.auth.user);
  const passwordsList: Array<Password> = useSelector((state: RootState) => state.passwords.passwords.filter((password) => password.userId === authenticatedUser?.id));
  const assignedPasswords = passwordsList.filter((password) => password.categoryId === category.id);

  const deleteHandler = () => {
    setChangedData(true);
    dispatch(deleteCategory({ id: category.id }));
  };

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setChangedData(true);
    setCategoryName(event.target.value);
    dispatch(renameCategory({ id: category.id, newName: categoryName }));
  };

  const descriptionChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setChangedData(true);
    setCategoryDescription(event.target.value);
    dispatch(editCategoryDescription({ id: category.id, newDescription: categoryDescription }));
  };

  const clickHandler = () => {
    if (changedData) {
      console.log("Sending some sort of request...");
      setChangedData(false);
    }

    setCanEdit(!canEdit);
  };

  return (
    <div className="card" key={category.id}>
      <div className={`card-body ${classes["card-body"]}`}>
        <h5 className="card-title">{!canEdit ? capitalize(category.name) : <input type="text" className="form-control" value={categoryName} onChange={nameChangeHandler} />}</h5>
        <p className="card-text">{!canEdit ? category.description : <textarea className="form-control" rows={5} value={categoryDescription} onChange={descriptionChangeHandler} />}</p>

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
            <i className={`fa-solid fa-eye${assignedPasswords.length === 0 || showPasswords ? "-slash" : ""} me-1`}></i>
            {assignedPasswords.length === 0 && "No assigned passwords"}
            {assignedPasswords.length > 0 && !showPasswords && "View assigned passwords"}
            {assignedPasswords.length > 0 && showPasswords && "Hide assigned passwords"}
          </button>
          <button className="btn btn-dark" onClick={clickHandler}>
            <i className={`fa-solid ${!canEdit ? "fa-pen-to-square" : "fa-floppy-disk"} me-1`}></i> {!canEdit ? "Edit" : "Save changes"}
          </button>
          <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#confirmModal-${category.id}`}>
            <i className="fa-solid fa-trash me-1"></i> Delete
          </button>

          <div className="modal fade" id={`confirmModal-${category.id}`} aria-labelledby="confirmModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="confirmModalLabel">
                    Are you sure you want to proceed? - Deleting category "{category.name}"
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
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
