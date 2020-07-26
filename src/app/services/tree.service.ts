import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../interfaces/group.interface';

const routes = {
  id: (id: string) => `assets/data/item-images/item-${id}.json`,
  templateTreeUrl: () => `assets/data/tree.json`,
};

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor(private http: HttpClient) {
  }

  getTree(url?: string): Observable<Array<Group>> {
    let requestUrl: string;
    url ? ( requestUrl = url) : ( requestUrl = routes.templateTreeUrl() );
    return this.http.get(requestUrl) as Observable<Array<Group>>;
  }

  getItemImage(id: string): Observable<any> {
    return this.http.get(routes.id(id));
  }
}
