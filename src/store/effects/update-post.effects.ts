import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Apollo, gql } from 'apollo-angular';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { updatePost, updatePostFailure, updatePostSuccess } from './../actions';

interface UpdatePostResult {
  updatedPost: {
    id: string;
    title: string;
    body: string;
    // alte proprietăți necesare
  };
}

@Injectable()
export class UpdatePostEffects {
  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      switchMap(({ updatedPost }) => {
        const mutation = gql`
        mutation($id: ID!, $input: UpdatePostInput!) {
          updatePost(id: $id, input: $input) {
            id
            body
          }
        }
      `;

        return this.apollo
          .mutate({
            mutation,
            variables: {
              id: updatedPost.id,
              input: {
                body: updatedPost.body,
                title: updatedPost.title,
              }
            }
          })
      }),
      map((result) => updatePostSuccess({ updatedPost: (result.data as any)?.updatePost })),
      catchError((error) => of(updatePostFailure(error?.message)))
    )
  )

  updatePostSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePostSuccess),
      tap(() => {
        this.snackBar.open('Upated post successfully!', 'Close', { duration: 3000 });
      })
    ),
    { dispatch: false }
  );

  updatePostFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePostFailure),
      tap(({ errorMessage }) => {
        this.snackBar.open(`Failed to update post: ${errorMessage}`, 'Close', { duration: 3000 });
      })
    ),
    { dispatch: false }
  );


  constructor(private actions$: Actions, private apollo: Apollo, private snackBar: MatSnackBar) { }
}
