import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";

export default class Productos extends Component {
  
  render() {
    const columnas = [
        {
          title: "Producto",
          field: "producto",
        },
        {
          title: "Descripcion",
          field: "descripcion",
        },
        {
          title: "Precio",
          field: "precio",
          type: "numeric"
        },
        {
          title: "Unidades",
          field: "unidades",
          type: "numeric"
        }
      ];
    
      const dataProducts=[
        {producto: "pd1", descripcion: "pd1 prueba", precio: 23.4, unidades: 10},
        {producto: "pd2", descripcion: "pd2 prueba", precio: 236.4, unidades: 5},
        {producto: "pd3", descripcion: "pd3 prueba", precio: 77.8, unidades: 7},
        {producto: "pd4", descripcion: "pd4 prueba", precio: 40, unidades: 8},
        {producto: "pd5", descripcion: "pd5 prueba", precio: 24, unidades: 100},
      ]
    return (
      <div>
        <MaterialTable
            columns={columnas}
            data={dataProducts}
            title="Productos"
            actions={[
                {
                    icon: "edit",
                    tooltip: 'Editar Producto',
                    onClick: (e, rowData)=>alert('Editar '+rowData.producto)
                },
                {
                    icon: 'delete',
                    tooltip: 'Borrar Producto',
                    onClick: (e, rowData)=>window.confirm('Borrar '+rowData.producto)
                }
            ]}
            options={{
                actionsColumnIndex: -1
            }}
            localization={{
                header: {
                    actions: 'Acciones'
                }
            }}
        />
      </div>
    );
  }
}
