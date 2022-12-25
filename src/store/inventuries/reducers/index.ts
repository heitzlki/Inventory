import {
  inventuryAdd,
  inventuryDelete,
  // inventuryEditName,
  // inventuryUpdatedAt,
} from 'store/inventuries/reducers/inventuryReducers';

import {
  itemAdd,
  itemDelete,
  itemSetAmount,
} from 'store/inventuries/reducers/itemReducers';

const reducers = {
  inventuryAdd,
  inventuryDelete,
  // inventuryEditName,
  // inventuryUpdatedAt,
  itemAdd,
  // itemChangeOrder,
  itemDelete,
  itemSetAmount,
};

export default reducers;
