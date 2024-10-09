
import { convertDateSimple } from "../utils/date";

export class SubCategoria {

    static fillable = ["Nombre", "Descripcion", "IdCategoria", "created_at"];

    static getFillableTable() {
        return [
            { name: 'Nombre', label: 'Nombre' },
            { name: 'Descripcion', label: 'Descripcion' },
            {
                name: 'IdCategoria', label: 'Categoria',
                search: 'get_categoria', resolve: value => value?.Nombre ?? ""
            },
            {
                name: 'created_at', search: 'created_at',
                label: 'Fecha de registro', resolve: convertDateSimple
            },
        ];
    }
    static filterParams(data) {
        const final = {};
        SubCategoria.fillable.forEach((param) => {
            if (data.hasOwnProperty(param)) {
                final[param] = data[param];
            }
        });
        return final;
    }
}