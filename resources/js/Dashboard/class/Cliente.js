import { convertDateSimple } from "../utils/date";

export class Cliente {
    static getFillable() {
        return [
            { name: 'Nombre', label: 'Nombre' },
            { name: 'Email', label: 'Correo' },
            { name: 'Telefono', label: 'Telefono' },
            { name: 'Direccion', label: 'Direccion' },
            { name: 'created_at', search: 'created_at', label: 'Fecha de registro', resolve: convertDateSimple },
        ];
    }
}
