import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs/index';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent implements OnInit, OnDestroy {
  @Input() node;
  public showChildren: boolean;
  public id: string;
  private subscriptions: SubscriptionLike[] = [];

  constructor( private router: Router,
               private route: ActivatedRoute,
               private sharedService: SharedService) { }

  ngOnInit() {
    this.showChildren = false;
    if (!this.node) {
      this.subscriptions.push(
        this.route.params.subscribe((params: any) => {
          this.id = params.id;
          this.getSharedTree();
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  toggleChildren() {
    this.showChildren = !this.showChildren;
  }

  navigateTo(event) {
    const name = event.target.innerText;
    if (this.node.children && this.node.children.length) {
      this.router.navigate(['/group/', name.toLowerCase()]);
    }
    else {
      this.router.navigate(['/item/', name.toLowerCase()]);
    }
  }

  getSharedTree() {
    this.sharedService.getData().subscribe((tree: any) => {
      if (tree) {
        this.node = tree;
        for (const group of this.node) {
          this.findGroup(group);
        }
      }
    });
  }

  findGroup(group) {
    if (group.name && group.name.toLowerCase() === this.id) {
      this.node = group;
      return;
    }
    if (group.children && group.children.length) {
      for (const child of group.children) {
        this.findGroup(child);
      }
    }
  }

}
