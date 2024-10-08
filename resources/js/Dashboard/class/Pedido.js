import { convertDateSimple } from "../utils/date";

export class Pedido {
    static getFillable() {
        return [
            { name: 'Estado', label: 'Estado' },
            { name: 'Total', label: 'Total' },
            { name: 'SubTotal', label: 'Sub total' },
            { name: 'Descuento', label: 'Descuento' },
            { name: 'Impuesto', label: 'Impuesto' },
            { name: 'IdMetodoPago', search: 'get_metodo_pago', label: 'Metodo de pago', resolve: (value) => value?.Nombre ?? "" },
            { name: 'IdCliente', search: 'get_cliente', label: 'Cliente', resolve: (value) => value?.Nombre ?? "" },
            { name: 'created_at', search: 'created_at', label: 'Fecha de registro', resolve: convertDateSimple },

        ];
    }
}
