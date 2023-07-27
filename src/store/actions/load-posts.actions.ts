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

export const loadPost = createAction(
  '[Post] Load Post',
  props<{ postId: number }>()
);

export const loadPostSuccess = createAction(
  '[Post] Load Post Success',
  props<{ post: IPost}>()
);