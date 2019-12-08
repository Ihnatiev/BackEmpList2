import axios, { AxiosInstance } from 'axios';

export class Http {
  private _httpClient: AxiosInstance;

  constructor() {
    this._httpClient = axios.create({
      baseURL: 'https://localhost:5555/api/',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async get(url: string) {
    const employees = await this._httpClient.get(url);
    return employees.data.data; // ugh!
  }
}