import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Uncategorized.module.css";
import { RootState } from "../../Store";
import { changeCategory } from "../../Store/passwords";
import { capitalize } from "../../Helpers/strings";
import User from "../../Classes/User";

const Uncategorized = () => {
  const dispatch = useDispatch();
  const [addedToCategory, setAddedToCategory] = useState(false);

  const user: User | undefined = useSelector((state: RootState) => state.auth.user);
  const categories = useSelector((state: RootState) => state.categories.categories.filter((category) => category.userId === user?.id));
  const categoriesIDs = categories.map((category) => category.id);
  const passwords = useSelector((state: RootState) => {
    return state.passwords.passwords.filter((password) => {
      return password.userId === user?.id && (password.categoryId === 0 || !categoriesIDs.includes(password.categoryId));
    });
  });

  if (addedToCategory) {
    setTimeout(() => setAddedToCategory(false), 5000);
  }

  if (passwords.length === 0) {
    return (
      <>
        {addedToCategory && <div className="alert alert-dark m-5 fw-semibold text-center">Added to category!</div>}
        <div className="card mb-3 border-dark m-5 fw-semibold">
          <div className="card-body text-center">No uncategorized passwords found!</div>
        </div>
      </>
    );
  }

  const categoryChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setAddedToCategory(true);
    dispatch(changeCategory({ id: Number(event.target.parentElement?.dataset.id), newCategory: Number(event.target.value) }));
  };

  return (
    <>
      {addedToCategory && <div className="alert alert-dark m-5">Added to category!</div>}
      <div className={classes["uncategorized-passwords-list"]}>
        {passwords.map((password) => (
          <div className="card" key={password.id}>
            <div className="card-body">
              <h5 className="card-title">{capitalize(password.app)}</h5>
              <p className="card-text">{password.description}</p>
              <div className="mb-3" data-id={password.id}>
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select className="form-select" id="category-new" onChange={categoryChangeHandler}>
                  <option defaultValue="0">Select a category...</option>
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {capitalize(category.name)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Uncategorized;
