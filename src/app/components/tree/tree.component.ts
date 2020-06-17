import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TreeService } from '../../services/tree.service';
import { Group } from '../../interfaces/group.interface';
import { SubscriptionLike } from 'rxjs';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, OnDestroy {
  public tree: Array<any>;
  private subscriptions: SubscriptionLike[] = [];
  public serverError: boolean;
  public userInputUrl: string;
  public urlToShow: string;

  constructor( private treeService: TreeService,
               private sharedService: SharedService,
               private router: Router ) {}

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  navigateTo(event) {
    if (event.node.data.children) {
      this.router.navigate(['/group/', event.node.data.name.toLowerCase()]);
    }
    else {
      this.router.navigate(['/item/', event.node.data.name.toLowerCase()]);
    }
  }

  onSubmit() {
    console.log(this.userInputUrl);
    this.subscriptions.push(
      this.treeService.getTree(this.userInputUrl).subscribe(resp => {
        if (resp && resp.length) {
          this.sharedService.setData(resp);
          this.tree = resp;
          this.urlToShow = this.userInputUrl;
          this.userInputUrl = '';
          console.log(this.tree);
        }
        else {
          this.serverError = true;
        }
      })
    );
  }
}
