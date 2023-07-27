import { createAction, props } from '@ngrx/store';

import { IPost } from '../../models/interfaces';

export const loadPosts = createAction(
  '[Post] Load Posts',
  (page: number, size: number) => ({ payload: { page, size } })
);

export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ posts: IPost[], length: number }>()
);
