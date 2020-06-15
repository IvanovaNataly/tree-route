import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
// import { DeviceDescription, DeviceState, Controller } from '@app/shared/models/HardwareModels';
// import {UserInfo} from '@app/shared/models/UserModels';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _tree = new BehaviorSubject<any>(null);

  setData(wrapper: any) {
    this._tree.next(wrapper);
  }

  getData(): Observable<any> {
    return this._tree.asObservable();
  }

}
