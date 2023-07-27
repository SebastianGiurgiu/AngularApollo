import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store, select } from '@ngrx/store';

import { IPost } from 'src/models/interfaces';
import { addPost, deletePost, loadPosts, updatePost } from 'src/store/actions';
import { selectPostState } from 'src/store/selectors';
import { PostModalComponent } from '../post-modal/post-modal.component';

const DIALOG_WIDTH = '1000px';
const DIALOG_HEIGHT = '500px';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements AfterViewInit {
  posts: IPost[] = [];
  filteredPosts: IPost[] = []; // Separate array to hold the filtered posts
  page = 1;
  limit = 10;
  totalPosts = 0;
  totalPages = 0;

  constructor(private store: Store, private dialog: MatDialog) { }

  // Function to load the posts
  loadPosts() {
    this.store.dispatch(loadPosts(this.page, this.limit));
  }

  ngAfterViewInit() {
    // Load posts when the component is initialized
    this.loadPosts();

    // Subscribe to the post state in the store to get the posts and total count
    this.store
      .pipe(
        select(selectPostState))
      .subscribe(state => {
        this.posts = this.filteredPosts = state.posts; // Initialize both posts and filteredPosts arrays
        this.totalPosts = state.length;
        this.totalPages = Math.ceil(this.totalPosts / this.limit);
      });
  }

  // Function to filter the posts based on user input
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.page = 1; // Reset the page to 1 when applying a new filter

    this.filteredPosts = this.posts.filter((post: IPost) => {
      return (
        post.id.toString().includes(filterValue) ||
        post.title.toLowerCase().includes(filterValue) ||
        post.body.toLowerCase().includes(filterValue)
      );
    });
  }

  // Function to load posts when moving to the next page
  onNextPage() {
    this.page++;
    this.loadPosts();
  }

  // Function to load posts when moving to the previous page
  onPreviousPage() {
    this.page--;
    this.loadPosts();
  }

  // Function to open a dialog and view a post's details
  onViewPost(post: IPost) {
    this.dialog.open(PostModalComponent, {
      width: DIALOG_WIDTH,
      height: DIALOG_HEIGHT,
      data: { post }
    });
  }

  // Function to delete a post
  onDeletePost(postId: number) {
    this.store.dispatch(deletePost({ postId }));
  }

  // Function to open a dialog to update a post's details
  updatePost(post: IPost) {
    const dialogRef = this.dialog.open(PostModalComponent, {
      width: DIALOG_WIDTH,
      height: DIALOG_HEIGHT,
      data: { post, isEditable: true }
    });

    dialogRef
      .afterClosed()
      .subscribe(updatedPost => {
        if (!!updatedPost) {
          this.store.dispatch(updatePost({ updatedPost }));
        }
      });
  }

  // Function to open a dialog to add a new post
  addPost() {
    const dialogRef = this.dialog.open(PostModalComponent, {
      width: DIALOG_WIDTH,
      height: DIALOG_HEIGHT,
      data: { post: null, isEditable: true }
    });

    dialogRef.
      afterClosed()
      .subscribe(newPost => {
        if (!!newPost) {
          this.store.dispatch(addPost({ newPost }));
        }
      });
  }
}
