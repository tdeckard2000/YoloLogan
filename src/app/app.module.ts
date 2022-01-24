import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EventTileComponent } from './event-tile/event-tile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalWrapper } from './modal-wrapper/modal-wrapper.component';
import { NewEventModalComponent } from './new-event-modal/new-event-modal.component';
import { PostAsGuestModalComponent } from './post-as-guest-modal/post-as-guest-modal.component';
import { SignInModalComponent } from './sign-in-modal/sign-in-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    SidebarComponent,
    EventTileComponent,
    FilterPipePipe,
    HighlightTextPipe,
    MapComponent,
    ModalWrapper,
    NewEventModalComponent,
    PostAsGuestModalComponent,
    SignInModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
