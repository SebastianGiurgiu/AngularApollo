import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { filter, take } from 'rxjs';

import { IPost } from 'src/models/interfaces';
import { loadPost } from 'src/store/actions';
import { selectPostState } from 'src/store/selectors';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit, AfterViewInit {
  post: IPost | null = null;
  constructor(private store: Store, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Fetch the 'id' parameter from the route and load the post using the id
    this.route.params.pipe(
      filter(params => !!params['id']), // Ensure that 'id' parameter exists
      take(1) // Take only the first emitted value and unsubscribe automatically
    ).subscribe(params => {
      const postId = params['id'];
      if (postId) {
        this.store.dispatch(loadPost({ postId }));
      }
    });
  }

  ngAfterViewInit(): void {
    // Subscribe to the post state changes and update the post variable
    // Also, manually trigger change detection to update the view
    this.store
      .pipe(
        select(selectPostState),
        filter(state => !!state.currentPost) // Ensure that 'currentPost' exists
      )
      .subscribe(state => {
        this.post = state.currentPost;
        this.cdr.detectChanges(); // Manually trigger change detection
      });
  }

  // Navigate to the '/posts' route when the button is clicked
  onClick(): void {
    this.router.navigate(['/posts']);
  }
}
