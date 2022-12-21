import { environment } from './../environments/environments';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, ROUTER_INITIALIZER } from '@angular/router';
import { PostComponent } from './shared/post/post.component';
import { PostCardComponent } from './shared/post-card/post-card.component';
import { AboutComponent } from './about/about.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { PostService, PostFirebaseService, PostLocalStorage } from './services/post.service';
import { RouterService } from './services/router.service';
import ptBr from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import { FindPostComponent } from './shared/find-post/find-post.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    PostCardComponent,
    AboutComponent,
    PostsComponent,
    FindPostComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    PostService,
    PostFirebaseService,
    PostLocalStorage,
    RouterService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private routerService: RouterService) {
  }

}
