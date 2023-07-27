import { createAction, props } from "@ngrx/store";

export const deletePost = createAction(
    '[Post] Delete Post',
    props<{ postId: number }>()
  );
  
  export const deletePostSuccess = createAction(
    '[Post] Delete Post Success',
  );
  
  export const deletePostFailure = createAction(
    '[Post] Delete Post Failure',
    props<{errorMessage: string}>()
  );
  