import { createReducer, on } from "@ngrx/store";
import { loadPostsSuccess } from "./actions";
import { PostState } from "./interfaces";

export const initialState: PostState = {
    posts: [],
    lenght: 0
};

export const postReducer = createReducer(
    initialState,
    on(loadPostsSuccess, (state, { posts, lenght }) => ({ ...state, lenght, posts: [...state.posts, ...posts]}))
);
