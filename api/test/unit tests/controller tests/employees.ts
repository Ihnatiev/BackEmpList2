import { Http } from './http';

export class Employees {
  private _http: Http;
  constructor() {
    this._http = new Http();
  }

  public async findAll() {
    // we actually don't need this intermediate step,
    // we could just
    // return this._http.get('employees');
    // but then this method would be too dumb and not very interesting
    const employees = await this._http.get('employees');
    return employees;
  }
}