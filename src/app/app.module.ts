import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { routes } from './Components/app.routes';

import { AppComponent } from './Components/app.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HeadingPanelComponent } from './Components/heading-panel/heading-panel.component';
import { YearsComponent } from './Components/years/years.component';
import { YearBoxComponent } from './Components/year-box/year-box.component';
import { ShowsComponent } from './Components/shows/shows.component';

import { YearService } from './Services/year.service';
import { ShowService } from './Services/show.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeadingPanelComponent,
    YearsComponent,
    YearBoxComponent,
    ShowsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {
        useHash: true,
    })
  ],
  providers: [
    YearService,
    ShowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
