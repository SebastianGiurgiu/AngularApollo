import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InMemoryCache } from '@apollo/client/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { AddPostEffects, DeletePostEffects, LoadPostEffects, UpdatePostEffects } from 'src/store/effects';
import { postReducer } from 'src/store/reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostModalComponent } from './post-modal/post-modal.component';
import { MaterialComponentsModule } from 'src/modules/mat-modules';

@NgModule({
  declarations: [
    AppComponent,
    PostModalComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    ApolloModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    FormsModule,
    MaterialComponentsModule,
    StoreModule.forRoot({ posts: postReducer }),
    EffectsModule.forRoot([AddPostEffects, DeletePostEffects, UpdatePostEffects, LoadPostEffects])
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://graphqlzero.almansi.me/api',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
