import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';

import { RootState } from 'store/index';
import { ProductState } from 'store/catalog/state';
import { useDebounce } from 'hooks/useDebounce';

export const useSearch = (): [
  ProductState[],
  (query: string) => void,
  string,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductState[]>([]);

  const catalog = useSelector((state: RootState) => state.catalogReducer);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const memoizedSearchResults = useMemo(() => {
    return search(debouncedSearchQuery);
  }, [debouncedSearchQuery, catalog]);

  function search(query: string): ProductState[] {
    query = query.toLowerCase();

    const results: ProductState[] = Object.values(catalog).filter(
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

  return [searchResults, handleSearchChange, searchQuery, setSearchQuery];
};

export default useSearch;
