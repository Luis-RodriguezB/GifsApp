import { Component } from '@angular/core';
import { GifsService } from '../service/gifs.service';
import { Gif } from '../interfaces/gifs.interface';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  public defaultImage: string = 'assets/Spinner.svg';

  get resultados():Gif[] {
    return this.gifsService.resultados;
  }

  constructor( private gifsService: GifsService ) { }

}
