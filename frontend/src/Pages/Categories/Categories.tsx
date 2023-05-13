import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import classes from "./Categories.module.css";
import CategoryItem from "./CategoryItem";
import User from "../../Classes/User";
import { RootState } from "../../Store";

const Categories = () => {
  const user: User | undefined = useSelector((state: RootState) => state.auth.user);
  const categories = useSelector((state: RootState) => state.categories.categories.filter((category) => category.userId === user?.id));

  return (
    <div className="p-5">
      <div className={classes["categories-list"]}>{categories.length > 0 && categories.map((category) => <CategoryItem category={category} key={category.id} />)}</div>
      <Outlet />
      <Link to={"/categories/new"} className="btn btn-block btn-dark w-100 mt-4 py-2">
        <i className="fa-sharp fa-solid fa-plus me-2"></i> Add new category
      </Link>
      {categories.length === 0 && (
        <div className="card mb-3 border-dark m-5 fw-semibold">
          <div className="card-body text-center">No categories found!</div>
        </div>
      )}
    </div>
  );
};

export default Categories;
