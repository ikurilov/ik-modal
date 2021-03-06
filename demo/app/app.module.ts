import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {IkBs3Modal} from '../../src/modal.module';
import {RouterModule} from '@angular/router';
import { LongModalComponent } from './long-modal/long-modal.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import {FormsModule} from "@angular/forms";
import { NestedModalsComponent } from './nested-modals/nested-modals.component';

@NgModule({
  declarations: [
    AppComponent,
    LongModalComponent,
    ModalContentComponent,
    NestedModalsComponent,
  ],
  imports: [
    BrowserModule,
    IkBs3Modal,
    RouterModule,
    FormsModule
  ],
  entryComponents: [
    LongModalComponent,
    ModalContentComponent,
    NestedModalsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
