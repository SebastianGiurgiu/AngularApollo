import { createReducer, on } from "@ngrx/store";

import { IPostState } from "../models/interfaces";
import { addPostSuccess, deletePost, loadPostsSuccess, updatePostSuccess } from "./actions";

export const initialState: IPostState = {
    posts: [],
    length: 0
};

export const postReducer = createReducer(
    initialState,
    // Reducer for handling the successful loading of posts
    on(loadPostsSuccess, (state, { posts, length }) => ({ ...state, length, posts })),
  
    // Reducer for handling the successful addition of a new post
    on(addPostSuccess, (state, { newPost }) =>  { 
      console.log({newPost}); // Logging the newly added post for debugging purposes
      return ({ ...state, posts: [...state.posts, newPost], length: state.length + 1 }) }),
  
    // Reducer for handling the deletion of a post
    on(deletePost, (state, { postId }) => ({
      ...state,
      posts: state.posts.filter(post => post.id !== postId), // Filter out the deleted post
      length: state.length - 1, // Decrement the total number of posts
    })),
  
    // Reducer for handling the successful update of a post
    on(updatePostSuccess, (state, { updatedPost }) => {
      // Update the state with the modified post
      const updatedPosts = state.posts.map(post =>
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      );
      return { ...state, posts: updatedPosts };
    })
  );
