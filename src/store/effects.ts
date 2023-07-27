// post.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Apollo, gql } from 'apollo-angular';
import { map, switchMap } from 'rxjs/operators';
import { loadPosts, loadPostsSuccess } from './actions';
import { Store } from '@ngrx/store';

@Injectable()
export class PostEffects {
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
                                    page, // Folosește valorile actuale pentru page și size
                                    limit: size
                                }
                            }
                        }
                    })
                    .valueChanges.pipe(
                        map((result: any) => loadPostsSuccess({ posts: result?.data?.posts?.data, lenght: result?.data?.posts?.meta?.totalCount || 0 }))
                    )
            )
        )
    );

    constructor(private actions$: Actions, private apollo: Apollo, private store: Store) { }
}
