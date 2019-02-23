import { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { AppState } from '.';
import {
  Article,
  User,
  getArticleById,
  getArticleList,
  getPayPal,
  getPopularArticles,
  getSettings,
  getUser,
  getUserArray,
  getUserBalance,
  getUserState,
  getFilteredUserIds,
  getGlobalError,
  isTransactionDeletable,
  Transaction,
} from './reducers';

export function useFilteredUsers(isActive: boolean) {
  return useMappedState<AppState, string[]>(
    useCallback(state => getFilteredUserIds(state, isActive), [isActive])
  );
}

export function useUser(id: string) {
  const user = useMappedState<AppState, User | undefined>(
    useCallback(state => getUser(state, id), [id])
  );
  return user;
}

export function useUserName(id: string): string {
  const user = useMappedState<AppState, User | undefined>(
    useCallback(state => getUser(state, id), [id])
  );
  return user ? user.name : '';
}

export function useUserBalance(id: string): number {
  return useMappedState<AppState, number>(
    useCallback(state => getUserBalance(state, id), [id])
  );
}

export function useArticles(): Article[] {
  return useMappedState<AppState, Article[]>(getArticleList);
}

export function usePopularArticles(): Article[] {
  return useMappedState<AppState, Article[]>(getPopularArticles);
}

export function useArticle(id: number | undefined) {
  if (id) {
    return useMappedState<AppState, Article | undefined>(
      useCallback((state: AppState) => getArticleById(state, id), [id])
    );
  }
  return undefined;
}

export function usePayPalSettings() {
  return useMappedState(getPayPal);
}

export function useSettings() {
  return useMappedState(getSettings);
}

export function useUserArray() {
  return useMappedState(getUserArray);
}

export function useUserState() {
  return useMappedState(getUserState);
}

export function useGlobalError() {
  return useMappedState(getGlobalError);
}

export function useIsTransactionDeletable(id: number) {
  return useMappedState<AppState, boolean>(
    useCallback((state: AppState) => isTransactionDeletable(state, id), [id])
  );
}

export function useTransaction(id: number) {
  return useMappedState<AppState, Transaction | undefined>(
    useCallback((state: AppState) => state.transaction[id], [id])
  );
}