import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Apollo, gql } from 'apollo-angular';
import { map, switchMap } from 'rxjs/operators';

import { loadPosts, loadPostsSuccess } from '../actions';

@Injectable()
export class LoadPostEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      switchMap(({ payload: { page, size } }) =>
        this.apollo
          .watchQuery({
            query: gql`
                        query($options: PageQueryOptions) {
                            posts(options: $options) {
                            data {
                                id
                                title
                                body
                            }
                            meta {
                                totalCount
                            }
                            }
                        }
                        `,
            variables: {
              options: {
                paginate: {
                  page,
                  limit: size
                }
              }
            }
          })
          .valueChanges.pipe(
            map((result: any) => loadPostsSuccess({ posts: result?.data?.posts?.data, length: result?.data?.posts?.meta?.totalCount || 0 }))
          )
      )
    )
  );

  constructor(private actions$: Actions, private apollo: Apollo, private snackBar: MatSnackBar) { }
}
