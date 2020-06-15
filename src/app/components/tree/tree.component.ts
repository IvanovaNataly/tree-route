import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TreeService } from '../../services/tree.service';
import { Group } from '../../interfaces/group.interface';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, OnDestroy {
  public tree: Array<any>;
  private subscriptions: SubscriptionLike[] = [];

  constructor( private treeService: TreeService,
               private router: Router,) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.treeService.getTree().subscribe(resp => {
        console.log('response', resp);
        if (resp && resp.length) {
          this.tree = resp;
          console.log('group', this.tree);
        }
        else {
          console.log('No controllers for this site');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  navigateTo(event) {
    console.log(event.node.data.id)
    this.router.navigate(['/item/', event.node.data.id]);
  }
}
