import { useEffect, useState } from 'react';
import { CategoryType, validCategories } from 'store/catalog/state';

const useSortedCategories = (categories: CategoryType[]) => {
  const [sortedCategories, setSortedCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    if (categories.length === 0) {
      setSortedCategories(validCategories);
    } else {
      const sortedCategories: CategoryType[] = [];

      categories.forEach(category => {
        if (validCategories.includes(category)) {
          sortedCategories.unshift(category);
        }
      });

      validCategories.forEach(category => {
        if (!sortedCategories.includes(category)) {
          sortedCategories.push(category);
        }
      });

      setSortedCategories(sortedCategories);
    }
  }, [categories]);

  return sortedCategories;
};

export default useSortedCategories;
