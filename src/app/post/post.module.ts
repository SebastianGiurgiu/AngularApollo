import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApolloModule } from 'apollo-angular';

import { MaterialComponentsModule } from 'src/modules/mat-modules';
import { PostItemComponent } from './post-item/post-item.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostModalComponent } from './post-modal/post-modal.component';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  declarations: [
    PostModalComponent,
    PostListComponent,
    PostItemComponent,
  ],
  imports: [
    ApolloModule,
    HttpClientModule,
    PostRoutingModule,
    FormsModule,
    CommonModule,
    MaterialComponentsModule,
  ],
  providers: [ ],
})
export class PostModule {}
