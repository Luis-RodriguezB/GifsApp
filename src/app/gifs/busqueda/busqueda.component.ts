import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifsService) {}

  buscar() {
    const value = this.txtSearch.nativeElement.value;

    if (value.trim().length > 1) {
      this.gifService.searchGifs(value);
    }

    this.txtSearch.nativeElement.value = '';
  }
}
