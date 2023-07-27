export interface IPost {
    id: number;
    title: string;
    body: string;
  }
  
  export interface IPostState {
    posts: IPost[];
    length: number;
  }
  
  export const initialState: IPostState = {
    posts: [],
    length: 0
  };