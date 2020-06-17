import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import { GroupComponent } from './components/group/group.component';
import { ItemComponent } from './components/item/item.component';
import { TreeModule } from 'angular-tree-component';
import { TreeService } from './services/tree.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    GroupComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TreeModule.forRoot(),
    FormsModule
  ],
  providers: [TreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
