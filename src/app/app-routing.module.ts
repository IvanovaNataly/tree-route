import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreeComponent } from './components/tree/tree.component';
import { ItemComponent } from './components/item/item.component';
import { TreeNodeComponent } from './components/tree-node/tree-node.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: TreeComponent },
  { path: 'group/:id', component: TreeNodeComponent },
  { path: 'item/:id', component: ItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
