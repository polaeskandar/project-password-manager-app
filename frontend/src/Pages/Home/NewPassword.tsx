import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { encode } from "base-64";

import { RootState } from "../../Store";
import { capitalize } from "../../Helpers/strings";
import User from "../../Classes/User";
import { newPassword } from "../../Store/passwords";

const NewPassword = () => {
  const [enteredUsername, setEnteredUsername] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [enteredApplication, setEnteredApplication] = useState<string>("");
  const [enteredCategory, setEnteredCategory] = useState<number>(0);
  const [enteredDescription, setEnteredDescription] = useState<string>("This password is for ...");

  const user: User | undefined = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const passwords = useSelector((state: RootState) => state.passwords.passwords.filter((password) => password.userId === user?.id));
  const categories = useSelector((state: RootState) => state.categories.categories.filter((category) => category.userId === user?.id));

  const changeUsernameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredUsername(event.target.value);
  };

  const changePasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(event.target.value);
  };

  const changeApplicationHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredApplication(event.target.value);
  };

  const changeCategoryHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setEnteredCategory(Number(event.target.value));
  };

  const changeDescriptionHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEnteredDescription(event.target.value);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      newPassword({
        id: passwords[passwords.length - 1].id + 1,
        userName: enteredUsername,
        encryptedPassword: encode(enteredPassword),
        app: enteredApplication,
        categoryId: enteredCategory,
        description: enteredDescription,
        createdAt: new Date(),
        userId: user!.id,
      })
    );

    setEnteredUsername("");
    setEnteredPassword("");
    setEnteredApplication("");
    setEnteredCategory(0);
    setEnteredDescription("");
  };

  return (
    <div className="card-body">
      <h1 className="h1 text-center mb-4">Add New Password</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="username-new" className="form-label">
            Username
          </label>
          <input type="text" className="form-control" id="username-new" value={enteredUsername} onChange={changeUsernameHandler} placeholder="Enter your username..." />
        </div>
        <div className="mb-3">
          <label htmlFor="password-new" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password-new" value={enteredPassword} onChange={changePasswordHandler} placeholder="Enter your password..." />
        </div>
        <div className="mb-3">
          <label htmlFor="application-new" className="form-label">
            Application
          </label>
          <input type="text" className="form-control" id="application-new" value={enteredApplication} onChange={changeApplicationHandler} placeholder="Enter your application name..." />
        </div>
        <div className="mb-3">
          <label htmlFor="category-new" className="form-label">
            Category
          </label>
          <select className="form-select" id="category-new" value={enteredCategory} onChange={changeCategoryHandler}>
            <option defaultValue="0">Select a category...</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {capitalize(category.name)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description-new" className="form-label">
            Description
          </label>
          <textarea className="form-control" id="description-new" rows={3} value={enteredDescription} onChange={changeDescriptionHandler}></textarea>
        </div>
        <button type="submit" className="btn btn-block btn-dark w-100">
          <i className="fa-solid fa-floppy-disk me-1 py-1"></i> Save
        </button>
      </form>
    </div>
  );
};

export default NewPassword;
