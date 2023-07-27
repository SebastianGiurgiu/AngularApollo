import { createFeatureSelector } from '@ngrx/store';

import { IPostState } from '../models/interfaces';

export const selectPostState = createFeatureSelector<IPostState>('posts');