import { createAction, props } from '@ngrx/store';

import { IPost } from '../../models/interfaces';

export const addPost = createAction
  ('[Post] Add Post',
    props<{ newPost: IPost }>()
  );

export const addPostSuccess = createAction(
  '[Post] Add Post Success',
  props<{ newPost: IPost }>()
);

export const addPostFailure = createAction(
  '[Post] Add Post Failure',
  props<{errorMessage: string}>()
);