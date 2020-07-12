import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _tree = new BehaviorSubject<any>(null);
  private _url = new BehaviorSubject<string>(null);

  setData(wrapper: any) {
  this._tree.next(wrapper);
}

  getData(): Observable<any> {
    return this._tree.asObservable();
  }

  setUrl(wrapper: string) {
    this._url.next(wrapper);
  }

  getUrl(): Observable<string> {
    return this._url.asObservable();
  }

}
