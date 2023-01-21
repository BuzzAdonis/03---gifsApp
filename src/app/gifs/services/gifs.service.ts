import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey    :string = '6l6gU2kvq7mLTtUPKZb9ULGO2J2ulSL2';
  private servicioUrl    :string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  //Todos Cambiar any por su tipo
  public resultados: Gif[] =[];

  get historial(){
    return[...this._historial];
  }

  constructor(private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('lastBusqueda')!) || [];

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query:string = ''){
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.slice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = new HttpParams()
          .set('api_key',this.apiKey)
          .set('q'      ,query)
          .set('limit'  ,'10');

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
             .subscribe(resp =>{
              this.resultados = resp.data;
              localStorage.setItem('lastBusqueda', JSON.stringify(this.resultados));   
             });
  
  }
}
