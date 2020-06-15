import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../interfaces/group.interface';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private url = 'assets/data/tree.json';

  constructor(private http: HttpClient) {
  }

  getTree(): Observable<Array<Group>> {
    return this.http.get(this.url) as Observable<Array<Group>>;
  }
}
