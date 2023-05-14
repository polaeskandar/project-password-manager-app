import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import classes from "./Categories.module.css";
import CategoryItem from "./CategoryItem";
import { RootState } from "../../Store";

const Categories = () => {
  let categories = useSelector((state: RootState) => state.categories.categories);
  const renderedCategories = categories.map((category) => <CategoryItem category={category} key={category.id} />);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="p-5">
      <div className={`mb-3 ${classes["categories-list"]}`}>{categories.length > 0 && renderedCategories}</div>
      <Outlet />
      <Link to={"/categories/new"} className="btn btn-block btn-dark w-100 py-2">
        <i className="fa-sharp fa-solid fa-plus me-2"></i> Add new category
      </Link>
      {categories.length === 0 && (
        <div className="card mb-3 border-dark mt-3 fw-semibold">
          <div className="card-body text-center">No categories found!</div>
        </div>
      )}
    </div>
  );
};

export default Categories;
