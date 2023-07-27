import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Apollo, gql } from 'apollo-angular';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { addPost, addPostFailure, addPostSuccess, updatePostFailure } from './../actions';

@Injectable()
export class AddPostEffects {
  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPost),
      switchMap(({ newPost }) => {
        const mutation = gql`
      mutation ($input: CreatePostInput!) {
        createPost(input: $input) {
          id
          title
          body
        }
      }
    `;

        return this.apollo
          .mutate({
            mutation,
            variables: {
              input: newPost
            }
          })
      }),
      map((result) => {  console.log((result.data as any).createPost); 
        return addPostSuccess({newPost: (result.data as any).createPost}) 
      }),
      catchError((error) => of(updatePostFailure(error?.message)))
    )
  )

  addPostSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPostSuccess),
      tap(() => {
        this.snackBar.open('Add post successfully!', 'Close', { duration: 3000 });
      })
    ),
    { dispatch: false }
  );

  addPostFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPostFailure),
      tap(({ errorMessage }) => {
        this.snackBar.open(`Failed to update post: ${errorMessage}`, 'Close', { duration: 3000 });
      })
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private apollo: Apollo, private snackBar: MatSnackBar) { }
}
