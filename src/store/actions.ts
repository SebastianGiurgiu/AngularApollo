import { createAction, props } from '@ngrx/store';
import { Post } from './interfaces';

export const loadPosts = createAction(
    '[Post] Load Posts',
    (page: number, size: number) => ({ payload: { page, size } })
  );

export const loadPostsSuccess = createAction(
    '[Post] Load Posts Success',
    props<{ posts: Post[], lenght: number }>()
  );

export const setSearchTerm = createAction(
  '[Search] Set Search Term',
  props<{ term: string }>()
);