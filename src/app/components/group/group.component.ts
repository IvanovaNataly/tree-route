import { Component, OnDestroy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs/index';
import { SharedService } from '../../services/shared.service';
import { TreeService } from '../../services/tree.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
  public id: string;
  private subscriptions: SubscriptionLike[] = [];
  private tree: any;
  public children: any;
  public serverError: boolean;

  constructor( private route: ActivatedRoute,
               private sharedService: SharedService,
               private treeService: TreeService,
               private router: Router ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params: any) => {
        this.id = params.id;
        this.getSharedTree();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  getSharedTree() {
    this.sharedService.getData().subscribe((tree: any) => {
      this.tree = tree;
      if (tree) {
        for (const group of tree) {
          this.findGroup(group);
        }
        console.log(this.children);
      }
      else {
        this.getTree();
      }
    });
  }

  getTree() {
    this.subscriptions.push(
      this.treeService.getTree().subscribe(resp => {
        if (resp && resp.length) {
          this.sharedService.setData(resp);
          this.tree = resp;
        }
        else {
          this.serverError = true;
        }
      })
    );
  }

  findGroup(group) {
    if (group.name && group.name.toLowerCase() === this.id) {
      this.children = group.children;
      return;
    }
    if (group.children && group.children.length) {
      for (const child of group.children) {
        this.findGroup(child);
      }
    }
  }

  navigateTo(event) {
    if (event.node.data.children) {
      this.router.navigate(['/group/', event.node.data.name.toLowerCase()]);
    }
    else {
      this.router.navigate(['/item/', event.node.data.name.toLowerCase()]);
    }
  }
}
