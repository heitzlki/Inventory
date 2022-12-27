import { createListenerMiddleware, addListener } from '@reduxjs/toolkit';

import type { TypedStartListening, TypedAddListener } from '@reduxjs/toolkit';

import type { RootState, AppDispatch } from 'store/index';

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const middelware =
  listenerMiddleware.startListening as AppStartListening;

export const addMiddelware = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;
