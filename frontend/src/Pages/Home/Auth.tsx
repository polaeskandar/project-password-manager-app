import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import { useDispatch } from "react-redux";

import { CustomThunkDispatch } from "../../Store";
import { authAction } from "../../Store/actions/auth";

const Auth = () => {
  const [mode, setMode] = useState<string>("login");
  const [enteredUsername, setEnteredUsername] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [enteredPasswordConfirmation, setEnteredPasswordConfirmation] = useState<string>("");
  const dispatch: CustomThunkDispatch = useDispatch();

  const changeUsernameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredUsername(event.target.value);
  };

  const changePasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(event.target.value);
  };

  const changePasswordConfirmationHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredPasswordConfirmation(event.target.value);
  };

  const changeModeHandler = (event: MouseEvent) => {
    event.preventDefault();
    setMode(mode === "login" ? "register" : "login");
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (mode === "login") {
      dispatch(authAction({ id: "", username: enteredUsername, password: enteredPassword, token: "" }, mode));
    } else {
      if (enteredPassword === enteredPasswordConfirmation) dispatch(authAction({ id: "", username: enteredUsername, password: enteredPassword, token: "" }, mode));
    }
  };

  const headingText = mode === "login" ? "Login to an existing account" : "Register a new account";
  const changeModeBtnText = mode === "login" ? "Don't have an account? create one here!" : "Login to an existing account here!";
  const usernamePlaceholder = mode === "login" ? "Enter your username..." : "Choose a new username...";
  const passwordPlaceholder = mode === "login" ? "Enter your password..." : "Choose a new password...";
  const btnText = mode === "login" ? "Login" : "Register";

  return (
    <div className="card mb-3 w-75 me-auto ms-auto mt-5">
      <div className="card-body">
        <h5 className="card-title mt-4 mb-5 text-center fw-semibold text-capitalize">{headingText}</h5>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="username-auth" className="form-label">
              Username
            </label>
            <input type="username" className="form-control" id="username-auth" value={enteredUsername} onChange={changeUsernameHandler} placeholder={usernamePlaceholder} />
          </div>
          <div className="mb-3">
            <label htmlFor="password-auth" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password-auth" value={enteredPassword} onChange={changePasswordHandler} placeholder={passwordPlaceholder} />
          </div>
          {mode === "register" && (
            <div className="mb-3">
              <label htmlFor="password-confirmation-auth" className="form-label">
                Password Confirmation
              </label>
              <input
                type="password"
                className="form-control"
                id="password-confirmation-auth"
                value={enteredPasswordConfirmation}
                onChange={changePasswordConfirmationHandler}
                placeholder="Enter password confirmation..."
              />
            </div>
          )}
          <button onClick={changeModeHandler} className="btn text-primary mb-3 w-100">
            {changeModeBtnText}
          </button>
          <button type="submit" className="btn btn-dark w-100">
            <i className="fa-solid fa-right-to-bracket me-1"></i> {btnText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
