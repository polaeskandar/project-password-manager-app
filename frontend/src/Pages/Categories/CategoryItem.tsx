import { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./CategoryItem.module.css";
import User from "../../Classes/User";
import Password from "../../Classes/Password";
import Category from "../../Classes/Category";
import { capitalize } from "../../Helpers/strings";
import { formatDate } from "../../Helpers/date";
import { CustomThunkDispatch, RootState } from "../../Store";
import { removeCategory, renameCategory, editCategoryDescription } from "../../Store/category";
import { deleteCategory, editCategory } from "../../Store/actions/category";

type CategoryProps = {
  category: Category;
};

const CategoryItem = ({ category }: CategoryProps) => {
  const dispatch: CustomThunkDispatch = useDispatch();
  const user: User | undefined = useSelector((state: RootState) => state.auth.user);
  const [categoryName, setCategoryName] = useState(category.name);
  const [categoryDescription, setCategoryDescription] = useState(category.description);
  const [showPasswords, setShowPasswords] = useState(false);
  const [changedData, setChangedData] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const passwordsList: Array<Password> = useSelector((state: RootState) => state.passwords.passwords);
  const assignedPasswords = passwordsList.filter((password) => password.categoryId === category.id);

  useEffect(() => {
    dispatch(renameCategory({ id: category.id!, newName: categoryName }));
  }, [categoryName, category.id, dispatch]);

  useEffect(() => {
    dispatch(editCategoryDescription({ id: category.id!, newDescription: categoryDescription }));
  }, [categoryDescription, category.id, dispatch]);

  useEffect(() => {
    if (changedData) {
      setChangedData(false);
      dispatch(editCategory({ id: category.id, name: categoryName, description: categoryDescription, userId: category.userId }, user!.token));
    }
  }, [category.id, category.userId, categoryDescription, categoryName, changedData, dispatch, user]);

  const deleteHandler = () => {
    setChangedData(true);
    dispatch(removeCategory({ id: category.id! }));
    dispatch(deleteCategory(category, user!));
  };

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setChangedData(true);
    setCategoryName(event.target.value);
  };

  const descriptionChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setChangedData(true);
    setCategoryDescription(event.target.value);
  };

  const clickHandler = () => {
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
                  <span>{capitalize(password.application)}</span>
                  <span>{formatDate(password.createdAt as unknown as string)}</span>
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
