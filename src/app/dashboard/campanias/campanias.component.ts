import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaniasService } from '../../services/campanias.service';

@Component({
  selector: 'app-campanias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campanias.component.html',
  styleUrls: ['./campanias.component.css']
})
export class CampaniasComponent implements OnInit {
  campanias: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private campaniasService: CampaniasService) { }

  ngOnInit(): void {
    this.campanias = this.campaniasService.getCampanias();
  }

  get paginatedCampanias(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.campanias.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.campanias.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
