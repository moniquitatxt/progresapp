import React from 'react';
import MaterialTable from 'material-table'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import "./TablesPage.css"

const TablesPage = () => {

  const columnas = [
    {
      title: "Nombre completo",
      field: "nombre",
    },
    {
      title: "Cédula",
      field: "cedula",
    },
    {
      title: "Teléfono",
      field: "telefono",
    },
    {
      title: "Carrera",
      field: "carrera",
    },
    {
      title: "Asistencias",
      field: "asistencias",
    },
  ]
  // La variable max contiene el numero de estudiantes maximos, no puede ser const porque no hace efecto

  const data = [
    {nombre: "Miguelanggelo Sumoza", cedula: "30453753", telefono: "0424-9125727", carrera: "Ing. Informatica", asistencias: 7},
    {nombre: "Roman Rodriguez", cedula: "29547813", telefono: "0424-9695717", carrera: "Ing. Informatica", asistencias: 20},
    {nombre: "Jose Saad", cedula: "28954172", telefono: "0414-1879524", carrera: "Ing. Informatica", asistencias: 0},
    {nombre: "Mónica Cuaulma", cedula: "294731478", telefono: "0416-3935478", carrera: "Ing. Informatica", asistencias: 11},
    {nombre: "Miguelanggelo Sumoza", cedula: "30453753", telefono: "0424-9125727", carrera: "Ing. Informatica", asistencias: 7},
    {nombre: "Roman Rodriguez", cedula: "29547813", telefono: "0424-9695717", carrera: "Ing. Informatica", asistencias: 20},
  ]

  return(
    <div className="table-container">
      <MaterialTable columns={columnas} data={data} title="Estudiantes" 
      options={{
        searchFieldStyle:{display:'none'}, headerStyle:{fontWeight:'bold'}, pageSizeOptions:[], 
        emptyRowsWhenPaging: false, pageSize:15, actionsColumnIndex: -1
      }}
      localization={{header:{actions:"Control de asistencia"}}}
      actions={[
        {
          icon: AddIcon,
          tooltip: "Incrementar asistencia",
          onClick: (event, rowData) => console.log("*aumenta* la asistencia de " + rowData.nombre),
        },
        {
          icon: RemoveIcon,
          tooltip: "Disminuir asistencia",
          onClick: (event, rowData) => console.log("*disminuye* la asistencia de " + rowData.nombre),
        }
      ]}
      components={{
        Pagination: () => null,
      }}
      />
    </div>
  )
}

export default TablesPage;