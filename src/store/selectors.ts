import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './state';
import { PostState } from './interfaces';

// Creează un selector pentru a obține starea postărilor
export const selectPostState = createFeatureSelector<PostState>('posts');