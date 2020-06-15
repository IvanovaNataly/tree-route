import {Item} from './item.interface';

export interface Group {
  name: string;
  children?: Item[];
}
