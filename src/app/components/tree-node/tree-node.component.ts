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
  public name: string;
  public children: Array<any>;
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
    this.setName();
    this.setChildren();
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
    if (this.children && this.children.length) {
      this.router.navigate(['/group/', name.toLowerCase()]);
    }
    else {
      this.router.navigate(['/item/', name.toLowerCase()]);
    }
  }

  getSharedTree() {
    this.subscriptions.push(
      this.sharedService.getData().subscribe((tree: any) => {
        if (tree) {
          this.node = tree;
          for (const group of this.node) {
            this.findGroup(group);
          }
        }
        else {
          this.getUrl();
        }
      })
    );
  }

  findGroup(group) {
    if (group.name && group.name.toLowerCase() === this.id) {
      this.node = group;
      this.setName();
      this.setChildren();
      return;
    }
    for (const prop in group) {
      if (this.checkArray(group, prop)) {
        if (this.checkName(prop)) {
          this.node = group;
          this.name = prop;
          this.setChildren();
        } else {
          for (const child of group[prop]) {
            this.findGroup(child);
          }
        }
      }
    }
  }

  getUrl() {
    this.subscriptions.push(
      this.sharedService.getUrl().subscribe((url: string) => {
        if (!url) {
          this.router.navigate(['/main']);
        }
      })
    );
  }

  setName() {
    if (!this.node) return;

    switch (true) {
      case (!!this.node.name):
        this.name = this.node.name;
        break;
      case (!!this.node.username):
        this.name = this.node.username;
        break;
      case (!!this.node.title):
        this.name = this.node.title;
        break;
      case (!!this.node.id):
        this.name = this.node.id;
        break;
      default:
        this.name = Object.keys(this.node)[0];
    }
  }

  setChildren() {
    if (!this.node) return;

    if (this.node.children) {
      this.children = this.node.children;
    }
    else {
      for (const prop in this.node) {
        if (this.checkArray(this.node, prop)) {
          this.children = this.node[prop];
        }
      }
    }
  }

  checkArray(node, prop) {
    if (Object.prototype.hasOwnProperty.call(node, prop) &&
      node[prop].constructor === Array &&
      node[prop].length) {
      return true;
    }
  }

  checkName(prop) {
    if (prop.toLowerCase() === this.id) {
      return true;
    }
  }

}
