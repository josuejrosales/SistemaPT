import { convertDateSimple } from "../utils/date";

export class Producto {
    constructor(id, nombre, descripcion, precio, stock, categoria, fechaRegistro) {
        this.Id = id;
        this.Nombre = nombre;
        this.Descripcion = descripcion;
        this.Precio = precio;
        this.Stock = stock;
        this.Categoria = categoria;
        this.FechaRegistro = fechaRegistro;
    }
    static getFillable() {
        return [
            { name: 'Nombre', label: 'Nombre' },
            { name: 'Descripcion', label: 'Descripcion' },
            { name: 'Precio', label: 'Precio' },
            { name: 'Stock', label: 'Stock' },
            { name: 'IdCategoria', search: 'get_categoria', label: 'Categoria', resolve: (value) => value?.Nombre ?? "" },
            { name: 'IdSubCategoria', search: 'get_sub_categoria', label: 'Sub Categoria', resolve: (value) => value?.Nombre ?? "" },
            { name: 'created_at', search: 'created_at', label: 'Fecha de registro', resolve: convertDateSimple },

        ];
    }
}
