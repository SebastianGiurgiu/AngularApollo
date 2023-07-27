export interface Post {
    id: number;
    title: string;
    body: string;
  }
  
  export interface PostState {
    posts: Post[];
    lenght: number;
  }
  
  export const initialState: PostState = {
    posts: [],
    lenght: 0
  };