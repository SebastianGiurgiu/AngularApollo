import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store, select } from '@ngrx/store';
import { loadPosts } from 'src/store/actions';
import { selectPostState } from 'src/store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'ancient';
  posts: any[] = [];
  page = 1;
  limit = 10;
  totalPosts = 0;
  test = 200;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'title', 'body'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.store.dispatch(loadPosts(this.page, this.limit));
    this.store.pipe(select(selectPostState)).subscribe(state => {
      console.log({state});
      this.posts = state.posts;
      this.totalPosts = state.lenght;
      this.dataSource.data = this.posts;
    });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  loadPosts() {
    this.store.dispatch(loadPosts(this.page, this.limit));
  }

  onPageChange(event: PageEvent) {
    console.log({event});
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.loadPosts();
  }
}
