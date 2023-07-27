import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-item/post-item.component';

const routes: Routes = [
    {
      path: '',
      component: PostListComponent
    },
    {
      path: ':id',
      component: PostItemComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class PostRoutingModule { }
