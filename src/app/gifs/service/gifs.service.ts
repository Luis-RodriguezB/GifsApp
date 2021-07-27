import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = '3hwN7OkdyizZn3l98YuitHjwpOmwQeAp';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    }
  }

  searchGifs(query: string) {
    if (query === null || query === undefined) {
      return;
    }
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      this.setHistoryLocalStorage();
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q', query);
      
      this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search?`, {
        params: params,
      })
      .subscribe((resp) => {
        this.resultados = resp.data;
        this.setResultadosLocalStorage();
      });
    }
    
    deleteGifs(query: string = '') {
      query = query.trim().toLowerCase();

      this._historial = this._historial.filter((item) => item !== query);
      this.setHistoryLocalStorage();
      this.setResultadosLocalStorage();
      this.resultados = [];

    this.searchGifs(this._historial[0]);
  }

  private setHistoryLocalStorage() {
    localStorage.setItem('historial', JSON.stringify(this._historial));
  }
  private setResultadosLocalStorage() {
    localStorage.setItem('resultados', JSON.stringify(this.resultados));
  }
}
