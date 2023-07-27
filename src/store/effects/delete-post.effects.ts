import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Apollo, gql } from 'apollo-angular';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { deletePost, deletePostFailure, deletePostSuccess } from './../actions';

@Injectable()
export class DeletePostEffects {
  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      switchMap(({ postId }) => {
        const mutation = gql`
        mutation($id: ID!) {
          deletePost(id: $id)
        }
      `;

        return this.apollo.mutate({
          mutation,
          variables: {
            id: postId,
          },
        });
      }),
      map(() => deletePostSuccess()),
      catchError((error) => of(deletePostFailure(error?.message)))
    )
  );

  deletePostSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePostSuccess),
      tap(() => {
        this.snackBar.open('Post deleted successfully!', 'Close', { duration: 3000 });
      })
    ),
    { dispatch: false }
  );

  deletePostFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePostFailure),
      tap(({ errorMessage }) => {
        this.snackBar.open(`Failed to delete post: ${errorMessage}`, 'Close', { duration: 3000 });
      })
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private apollo: Apollo, private snackBar: MatSnackBar) { }
}
