import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';

import { RootState } from 'store/index';
import { CategoryType, ProductState } from 'store/catalog/state';
import { useDebounce } from 'hooks/useDebounce';

export const useSearch = (): [
  ProductState[],
  (query: string) => void,
  string,
  React.Dispatch<React.SetStateAction<string>>,
  Array<CategoryType>,
  React.Dispatch<React.SetStateAction<Array<CategoryType>>>,
] => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategories, setSearchCategories] = useState<Array<CategoryType>>(
    [],
  );
  const [searchResults, setSearchResults] = useState<ProductState[]>([]);

  const catalog = useSelector((state: RootState) => state.catalogReducer);

  const debouncedSearchQuery = useDebounce(searchQuery, 100);

  const memoizedSearchResults = useMemo(() => {
    return search(debouncedSearchQuery, searchCategories);
  }, [debouncedSearchQuery, searchCategories, catalog]);

  function search(
    query: string,
    categories: Array<CategoryType>,
  ): ProductState[] {
    query = query.toLowerCase();

    let filteredCatalog;
    if (categories.length === 0) {
      filteredCatalog = Object.values(catalog);
    } else {
      filteredCatalog = Object.values(catalog).filter(product =>
        categories.includes(product.category),
      );
    }

    const results: ProductState[] = Object.values(filteredCatalog).filter(
      product => product.name.toLowerCase().indexOf(query) !== -1,
    );

    return results.sort((a, b) => a.name.localeCompare(b.name));
  }

  function handleSearchChange(query: string) {
    setSearchQuery(query);
  }

  useEffect(() => {
    setSearchResults(memoizedSearchResults);
  }, [memoizedSearchResults]);

  return [
    searchResults,
    handleSearchChange,
    searchQuery,
    setSearchQuery,
    searchCategories,
    setSearchCategories,
  ];
};

export default useSearch;
