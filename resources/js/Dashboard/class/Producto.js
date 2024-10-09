import { convertDateSimple } from "../utils/date";

export class Producto {

    static fillable = ["Nombre", "Descripcion", "Precio", "Stock", "IdCategoria", "IdSubCategoria", "created_at"];

    static getFillableTable() {
        const ignore = true;
        return [
            { name: 'Nombre', label: 'Nombre' },
            { name: 'Descripcion', label: 'Descripcion' },
            { name: 'Precio', label: 'Precio' },
            { name: 'Stock', label: 'Stock' },
            { ignore, name: 'IdCategoria', search: 'get_categoria', label: 'Categoria', resolve: (value) => value?.Nombre ?? "" },
            { ignore, name: 'IdSubCategoria', search: 'get_sub_categoria', label: 'Sub Categoria', resolve: (value) => value?.Nombre ?? "" },
            { ignore, name: 'created_at', search: 'created_at', label: 'Fecha de registro', resolve: convertDateSimple },

        ];
    }
    static filterParams(data) {
        const final = {};
        Producto.fillable.forEach((param) => {
            if (data.hasOwnProperty(param)) {
                final[param] = data[param];
            }
        });
        return final;
    }
}
