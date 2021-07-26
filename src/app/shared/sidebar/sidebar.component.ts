import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/service/gifs.service';
import { faTrashAlt, IconDefinition } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  deleteIcon:IconDefinition = faTrashAlt;

  get historial(): string[] {
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) {}

  buscar(item: string): void {
    this.gifsService.searchGifs(item);
  }

  eliminar(item: string) {
    console.log(item);
    this.gifsService.deleteGifs(item);
  }
}
