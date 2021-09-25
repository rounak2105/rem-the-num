import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LdrboardComponent } from './ldrboard/ldrboard.component';
import { AboutComponent } from './about/about.component';
import { GameComponent } from './game/game.component';

import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'leaderboard', component: LdrboardComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
