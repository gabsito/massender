import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaciondecampania',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './creaciondecampania.component.html',
  styleUrls: ['./creaciondecampania.component.css']
})
export class CreacionDeCampaniaComponent implements OnInit, AfterViewInit {
  campaignForm: FormGroup;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.campaignForm = this.fb.group({
      nombreCampania: ['', Validators.required],
      mensaje: ['', Validators.required],
      filtro: [''],
      listaDestinatarios: ['']
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // Forzamos la detección de cambios después de que el componente se haya inicializado
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.campaignForm.valid) {
      console.log(this.campaignForm.value);
    }
  }
}
