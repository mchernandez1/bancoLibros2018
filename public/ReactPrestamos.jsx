var PrestamosAll = React.createClass({

  getInitialState: function () {
    return { material: '' ,nombre: '',codigo:'',email:'',documento:'',fecha:'',id:'',Buttontxt:'Save', data1: []};
  },
   handleChange: function(e) {
        this.setState({[e.target.name]: e.target.value});
    },

  componentDidMount() {

    $.ajax({
       url: "api/getPrestamo",
       type: "GET",
       dataType: 'json',
       ContentType: 'application/json',
       success: function(data) {
         this.setState({data1: data});

       }.bind(this),
       error: function(jqXHR) {
         console.log(jqXHR);

       }.bind(this)
    });
  },

  DeleteData(id){
  var prestamoDelete = {
        'id': id
           };
    $.ajax({
      url: "/api/removePrestamo/",
      dataType: 'json',
      type: 'POST',
      data: prestamoDelete,
      success: function(data) {
        alert(data.data);
         this.componentDidMount();

      }.bind(this),
      error: function(xhr, status, err) {
         alert(err);


      }.bind(this),
      });
    },


    EditData(item){
   this.setState({material: item.material,nombre:item.nombre,codigo:item.codigo,email:item.email,documento:item.documento,fecha:item.fecha,id:item._id,Buttontxt:'Update'});

     },

  handleClick: function() {

   var Url="";
   if(this.state.Buttontxt=="Save"){
      Url="/api/savePrestamo";
       }
      else{
      Url="/api/UpdatePrestamo";
      }
      var prestamodata = {
        'material': this.state.material,
        'nombre':this.state.nombre,
        'codigo':this.state.codigo,
        'email':this.state.email,
        'documento':this.state.documento,
        'fecha':this.state.fecha,
        'id':this.state.id,
    }

     $.ajax({
      url: Url,
      dataType: 'json',
      type: 'POST',
      data: prestamodata,
      success: function(data) {
          alert(data.data);
          this.setState(this.getInitialState());
          this.componentDidMount();

      }.bind(this),
      error: function(xhr, status, err) {
         alert(err);
      }.bind(this)
    });
  },


   render: function() {
    return (
      <div  className="container"  style={{marginTop:'50px'}}>
       <p className="text-center" style={{fontSize:'25px'}}><b> Prestamo materiales banco de libros ANDAR</b></p>
  <form>
    <div className="col-sm-12 col-md-12"  style={{marginLeft:'50%'}}>   
  <table className="table-bordered">
     <tbody>
    <tr>
      <td><b>Material</b></td>
      <td>
         <input className="form-control" type="text" value={this.state.material}    name="material" onChange={ this.handleChange } />

      </td>
    </tr>

    <tr>
      <td><b>Nombre</b></td>
      <td>
      <input type="text" className="form-control" value={this.state.nombre}  name="nombre" onChange={ this.handleChange } />
      <input type="hidden" value={this.state.id}    name="id"  />
      </td>
    </tr>

    <tr>
      <td><b>Codigo</b></td>
      <td>
        <input type="text"  className="form-control" value={this.state.codigo}  name="codigo" onChange={ this.handleChange } />
      </td>
    </tr>


    <tr>
      <td><b>Email</b></td>
      <td>
        <input type="text"  className="form-control" value={this.state.email}  name="email" onChange={ this.handleChange } />
      </td>
    </tr>

   <tr>
      <td><b>Documento</b></td>
      <td>
        <input type="text"  className="form-control" value={this.state.documento}  name="documento" onChange={ this.handleChange } />
      </td>
    </tr>

    <tr>
      <td><b>Fecha</b></td>
      <td>
        <input type="text"  className="form-control" value={this.state.fecha}  name="fecha" onChange={ this.handleChange } />
      </td>
    </tr>

    <tr>
      <td></td>
      <td>
        <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />
      </td>
    </tr>

 </tbody>
    </table>
</div>


<div className="col-sm-12 col-md-12 "  style={{marginTop:'50px',marginLeft:'300px'}} >

 <table className="table-bordered"><tbody>
   <tr><th><b>ID</b></th><th><b>Material</b></th><th><b>Nombre</b></th><th><b>Codigo</b></th><th><b>Email</b></th><th><b>Documento</b></th><th><b>Fecha</b></th><th><b>Editar</b></th><th><b>Borrar</b></th></tr>
    {this.state.data1.map((item, index) => (
        <tr key={index}>
           <td>{index+1}</td>
          <td>{item.material}</td>
          <td>{item.nombre}</td>
          <td>{item.codigo}</td>
          <td>{item.email}</td>
          <td>{item.documento}</td>
          <td>{item.fecha}</td>
           <td>

           <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Edit</button>
          </td>
          <td>
             <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item._id)}}>Delete</button>
          </td>
        </tr>
    ))}
    </tbody>
    </table>
     </div>
</form>
      </div>
    );
  }
});

ReactDOM.render(<PrestamosAll  />, document.getElementById('root'))
