import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosModel } from '../../models/productos';
import { ModalDialogService } from '../../services/modal-dialog.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
Lista: ProductosModel[] = [];
  FormReg: FormGroup;
  mostrar: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    private productosService: ProductosService,
    private modalDialogService: ModalDialogService
  ) {}
  ngOnInit() {
    this.mostrarTabla();
    this.createForm();
  }
  mostrarTabla() {
    this.productosService.get().subscribe((res: any) => {
      this.Lista = res;
    });
  }
  Agregar() {
    this.mostrar = true;
  }
  createForm() {
    this.FormReg = this.formBuilder.group({
      ProductoID: [0],
      ProductoNombre: ['', [Validators.required]],
      ProductoStock: [0, [Validators.required]],
      ProductoFechaAlta: [null, [Validators.required]]
    });
  }
  Grabar() {
    if (this.FormReg.invalid) {
      return;
    }
    const formValue = this.FormReg.value;
    if (formValue.ProductoID == 0 || formValue.ProductoID == null) {
      formValue.ProductoID = 0;
      this.productosService.post(formValue).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.mostrarTabla();
      });
    }
  }
  Volver() {
    this.mostrar = false;
  }

 

}