import { convertDateSimple } from "../utils/date";

export class MetodoPago {

    static fillable = ["Nombre","created_at"];

    static getFillableTable() {
        return [
            { name: 'Nombre', label: 'Tipo de Pago' },
            {
                name: 'created_at', search: 'created_at',
                label: 'Fecha de registro', resolve: convertDateSimple
            },
        ];
    }
    static filterParams(data) {
        const final = {};
        MetodoPago.fillable.forEach((param) => {
            if (data.hasOwnProperty(param)) {
                final[param] = data[param];
            }
        });
        return final;
    }
}