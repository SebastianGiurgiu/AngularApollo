import { createAction, props } from "@ngrx/store";

import { IPost } from "../../models/interfaces";

export const updatePost = createAction(
    '[Post] Update Post',
    props<{ updatedPost: IPost }>()
  );
  
  export const updatePostSuccess = createAction(
    '[Post] Update Post Success',
    props<{ updatedPost: IPost }>()
  );
  
  export const updatePostFailure = createAction(
    '[Post] Update Post Failure',
    props<{errorMessage: string}>()
  );