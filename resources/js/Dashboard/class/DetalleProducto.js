
export class DetallePedido {
    static getFillable() {
        return [
            { name: 'IdProducto', search: "get_producto", label: 'Producto', resolve: (value) => value?.Nombre ?? "" },
            { name: 'Cantidad', label: 'Cantidad' },
            { name: 'PrecioUnitario', label: 'Precio Unitario' },
            { name: 'Total', label: 'Total' },
        ];
    }
}
