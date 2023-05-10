import { useState, Fragment, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../Store";
import { capitalize } from "../../Helpers/strings";
import { changeUserName, changePassword } from "../../Store/passwords";

const PasswordDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const password = useSelector((state: RootState) => state.passwords.passwords.find((password) => password.id === Number(id)));
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

  const clickHandler = () => {
    if (changedData) console.log("Sending some request...");
    setCanEdit(!canEdit);
  };

  return (
    <div className="password-details">
      <div className="card">
        <h5 className="card-header">{capitalize(password.app)}</h5>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" className="form-control" id="username" disabled={!canEdit} value={password.userName} onChange={usernameChangeHandler} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" disabled={!canEdit} value={password.encryptedPassword} onChange={passwordChangeHandler} />
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
