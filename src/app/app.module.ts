import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostModule } from './post/post.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddPostEffects, DeletePostEffects, UpdatePostEffects, LoadPostEffects } from 'src/store/effects';
import { postReducer } from 'src/store/reducers';

@NgModule({
  declarations: [ AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ApolloModule,
    HttpClientModule,
    AppRoutingModule,
    PostModule,
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
