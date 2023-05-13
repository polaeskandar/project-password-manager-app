import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./FilterCategories.module.css";
import Category from "../../Classes/Category";
import { RootState } from "../../Store";
import { capitalize } from "../../Helpers/strings";

interface FilterCategoriesProps {
  onChooseFilterCategory: (categoryId: number) => void;
}

const FilterCategories = ({ onChooseFilterCategory }: FilterCategoriesProps) => {
  const authenticatedUser = useSelector((state: RootState) => state.auth.user);
  const categoriesList: Array<Category> = useSelector((state: RootState) => state.categories.categories.filter((category) => category.userId === authenticatedUser?.id));
  const [chosenValue, setChosenValue] = useState<number>(0);

  const clickHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(event.target.value);
    setChosenValue(categoryId);
    onChooseFilterCategory(categoryId);
  };

  const removeFilterHandler = () => {
    setChosenValue(0);
    onChooseFilterCategory(0);
  };

  return (
    <div className="d-flex gap-2 flex-wrap mb-3 position-relative">
      {chosenValue > 0 && <i className={`fa-solid fa-xmark ${classes["remove-filter-icon"]}`} onClick={removeFilterHandler} />}
      <select className="form-select" onChange={clickHandler} value={chosenValue}>
        <option defaultValue={0}>Choose a category</option>
        {categoriesList.map((category) => (
          <option key={category.id} value={category.id}>
            {capitalize(category.name)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterCategories;
