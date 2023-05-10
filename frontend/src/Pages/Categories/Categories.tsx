import { useSelector } from "react-redux";

import { RootState } from "../../Store";
import classes from "./Categories.module.css";
import CategoryItem from "./CategoryItem";
import User from "../../Classes/User";

const Categories = () => {
  const user: User | undefined = useSelector((state: RootState) => state.auth.user);
  const categories = useSelector((state: RootState) => state.categories.categories.filter((category) => category.userId === user?.id));

  return (
    <div className={classes["categories-list"]}>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default Categories;
