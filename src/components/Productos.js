import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import {Modal, TextField, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const columnas = [
  {title: "ID", field: "_id" },
  {title: "Producto", field: "producto" },
  {title: "Descripcion", field: "descripcion"},
  {title: "Precio", field: "precio", type: "numeric"},
  {title: "Unidades", field: "unidades", type: "numeric"}
];

/* Api falsa creada y guardad en la carpeta fake_api */
//const baseUrl = "http://localhost:3001/productos";
const baseUrl = "http://localhost:5000/API/productos";


const useStyles = makeStyles((theme)=>({
  modal:{
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%'
  },
  Iconos:{
    cursor: 'pointer'
  },
  imputMaterial:{
    width: '100%'
  }
}));

function Productos() {
  const styles = useStyles();
  const [data, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [productoSeleccionado, setProductoSeleccionado]=useState({
    _id: "",
    producto: "",
    descripcion: "",
    precio: "",
    unidades: ""
  })
  const [productoSeleccionadoPost]=useState({
    //_id: "",
    producto: "",
    descripcion: "",
    precio: "",
    unidades: ""
  })

  /*Metodo para capturar los inputs o textfield*/
  const handleChange=e=>{
    const {name, value}=e.target;
    setProductoSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
    console.log(productoSeleccionado);
  }

  /*Peticion POST */
  const peticionPost=async()=>{
    await axios.post(baseUrl, productoSeleccionadoPost)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  /*Peticiones PUT y DELETE*/
  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+productoSeleccionado._id, productoSeleccionado)
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(producto=>{
        if(producto._id===productoSeleccionado._id){
          producto.producto=productoSeleccionado.producto;
          producto.descripcion=productoSeleccionado.descripcion;
          producto.precio=productoSeleccionado.precio;
          producto.unidades=productoSeleccionado.unidades;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+productoSeleccionado._id)
    .then(response=>{
      setData(data.filter(producto=>producto._id!==productoSeleccionado._id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
  /*------------------------ */

  const seleccionarProducto=(producto, caso)=>{
    setProductoSeleccionado(producto);
    (caso==="Editar")?abrirCerrarModalEditar()
    :
    abrirCerrarModalEliminar()
  }

  /* Peticion GET a la api de forma asincrona ya que es en segundo plano */
  const peticioneGet = async()=>{
    await axios.get(baseUrl)
     .then(response=>{
       setData(response.data);
       console.log(response.data)
     })
  }

  /*Metodos para abrir y cerrar el modal*/
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }
  
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }
  /**--------------------------------------- */
    useEffect(()=>{
      peticioneGet();
    },[])
    
    /* Modal para agregar productos*/
    const insertarProducto=(
      <div className={styles.modal}>
        <h3>Agregar Producto</h3>
        <TextField className={styles.imputMaterial} label="Producto" name="producto" onChange={handleChange}/>
        <br/>
        <TextField className={styles.imputMaterial} label="Descripcion" name="descripcion" onChange={handleChange}/>
        <br/>
        <TextField className={styles.imputMaterial} label="Precio" name="precio" onChange={handleChange}/>
        <br/>
        <TextField className={styles.imputMaterial} label="Unidades" name="unidades" onChange={handleChange}/>
        <br/>
        <div align="right">
          <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
          <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </div>
    )

     /* Modal para editar productos*/
     const editarProducto=(
      <div className={styles.modal}>
        <h3>Editar Producto</h3>
        <TextField className={styles.imputMaterial} label="Producto" name="producto" onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.producto}/>
        <br/>
        <TextField className={styles.imputMaterial} label="Descripcion" name="descripcion" onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.descripcion}/>
        <br/>
        <TextField className={styles.imputMaterial} label="Precio" name="precio" onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.precio}/>
        <br/>
        <TextField className={styles.imputMaterial} label="Unidades" name="unidades" onChange={handleChange} value={productoSeleccionado&&productoSeleccionado.unidades}/>
        <br/>
        <div align="right">
          <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
          <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
      </div>
    )

    /* Modal para eliminar */
    const eliminarProducto=(
      <div className={styles.modal}>
        <p>Estás seguro que deseas eliminar al artista <b>{productoSeleccionado && productoSeleccionado.producto}</b>? </p>
        <div align="right">
          <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
          <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>  
        </div>
  
      </div>
    )

    return (
      <div>
        <br/>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar Producto</Button>
        <br/><br/>
        <MaterialTable
          columns={columnas}
          data={data}
          title="Productos"
          actions={[
            {
              icon: "edit",
              tooltip: "Editar Producto",
              onClick: (e, rowData) => seleccionarProducto(rowData, "Editar")
            },
            {
              icon: "delete",
              tooltip: "Borrar Producto",
              onClick: (e, rowData) => seleccionarProducto(rowData, "Eliminar")
            }
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          localization={{
            header: {
              actions: "Acciones",
            }
          }}
        />


        <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}>
          {insertarProducto}
        </Modal>

        
        <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
          {editarProducto}
        </Modal>

        <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
          {eliminarProducto}
        </Modal>
      </div>
    );
  }
/*}*/

export default Productos;
