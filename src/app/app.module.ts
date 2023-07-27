import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importă BrowserAnimationsModule pentru animații
import { MatTableModule } from '@angular/material/table'; // Importă MatTableModule pentru tabel
import { MatPaginatorModule } from '@angular/material/paginator'; // Importă MatPaginatorModule pentru paginare
import { MatSortModule } from '@angular/material/sort'; // Importă MatSortModule pentru sortare
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { postReducer } from 'src/store/reducers';
import { PostEffects } from 'src/store/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ApolloModule,
    HttpClientModule,
    BrowserAnimationsModule, // Adaugă BrowserAnimationsModule în imports
    MatTableModule, // Adaugă MatTableModule în imports
    MatPaginatorModule, // Adaugă MatPaginatorModule în imports
    MatSortModule, // Adaugă MatSortModule în imports
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    StoreModule.forRoot({ posts: postReducer }),
    EffectsModule.forRoot([PostEffects])
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
