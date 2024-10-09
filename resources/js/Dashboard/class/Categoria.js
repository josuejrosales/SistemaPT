import { convertDateSimple } from "../utils/date";

export class Categoria {

    static fillable = ["Nombre","Descripcion","created_at"];

    static getFillableTable() {
        return [
            { name: 'Nombre', label: 'Nombre' },
            { name: 'Descripcion', label: 'Descripcion' },
            {
                name: 'created_at', search: 'created_at',
                label: 'Fecha de registro', resolve: convertDateSimple
            },
        ];
    }
    static filterParams(data) {
        const final = {};
        Categoria.fillable.forEach((param) => {
            if (data.hasOwnProperty(param)) {
                final[param] = data[param];
            }
        });
        return final;
    }
}