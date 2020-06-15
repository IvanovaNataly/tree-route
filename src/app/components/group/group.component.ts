import {Component, OnDestroy, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionLike } from 'rxjs/index';
import {SharedService} from "../../services/shared.service";

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

  constructor( private route: ActivatedRoute,
               private sharedService: SharedService ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params: any) => {
        this.id = params.id;
        this.getTree();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  getTree() {
    this.sharedService.getData().subscribe((tree: any) => {
      this.tree = tree;
      if (tree) {
        for (const group of tree) {
          this.findGroup(group);
        }
        console.log(this.children);
      }
    });
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
}
