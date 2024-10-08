import { convertDateSimple } from "../utils/date";

export class Cliente {

    static fillable = ["Nombre", "Email", "Telefono", "Direccion", "created_at"];

    static getFillableTable() {
        return [
            { name: 'Nombre', label: 'Nombre' },
            { name: 'Email', label: 'Correo' },
            { name: 'Telefono', label: 'Telefono' },
            { name: 'Direccion', label: 'Direccion' },
            {
                name: 'created_at', search: 'created_at',
                label: 'Fecha de registro', resolve: convertDateSimple
            },
        ];
    }
    static filterParams(data) {
        const final = {};
        Cliente.fillable.forEach((param) => {
            if (data.hasOwnProperty(param)) {
                final[param] = data[param];
            }
        });
        return final;
    }
}
