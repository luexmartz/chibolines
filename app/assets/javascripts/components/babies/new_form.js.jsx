var NewForm = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    birthday: React.PropTypes.string,
    mother_name: React.PropTypes.string,
    father_name: React.PropTypes.string,
    address: React.PropTypes.string,
    phone: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      name: '',
      birthday: '',
      mother_name: '',
      father_name: '',
      address: '',
      phone: ''
    }
  },
  handleAdd: function(e) {
    e.preventDefault();
    var self = this;
    if (this.validForm()) {
      $.ajax({
        url: '/api/babies',
        method: 'POST',
        data: { baby: self.state },
        success: function(data) {
          self.props.handleAdd(data);
          self.setState(self.getInitialState());
        },
        error: function(xhr, status, error) {
          console.log(status, xhr, error, xhr.status);
          if(xhr.status == 400){
            createNotification("danger", "No se puede agregar un nuevo registro, Error en los datos.");
          }
          if(xhr.status == 422){
            createNotification("danger", "No se puede agregar un nuevo registro, Error en fecha de nacimiento.");
          }
          if(xhr.status == 500){
            createNotification("danger", "No se puede agregar un nuevo registro");
          }
        }
      })
    } else {
      createNotification("danger", "Por favor llena todos los espacios");
    }
  },
  validForm: function() {
    if (this.state.name && this.state.birthday && this.state.mother_name && this.state.father_name && this.state.address && this.state.phone) {
      return true;
    } else {
      return false;
    }
  },
  handleChange: function(e) {
    var input_name = e.target.name;
    var value = e.target.value;
    console.log(input_name + " : " + value);
    this.setState({ [input_name] : value });
  },
  render: function() {
    return(
      <form className="form-inline" onSubmit={this.handleAdd}>
        <div className="form-group col-md-2">
          <input type="text"
                 className="form-control"
                 name="name"
                 placeholder="Nombre"
                 ref="name"
                 value={this.state.name}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group col-md-2">
          <input type="text"
                 className="form-control"
                 name="birthday"
                 placeholder="Fecha de nacimiento"
                 ref="birthday"
                 data-toggle="tooltip" 
                 data-placement="top" 
                 title="Ejemplo: 2000-08-02"
                 value={this.state.birthday}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group col-md-2">
          <input type="text"
                 className="form-control"
                 name="mother_name"
                 placeholder="Nombre de Mami"
                 ref="mother_name"
                 value={this.state.mother_name}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group col-md-2">
          <input type="text"
                 className="form-control"
                 name="father_name"
                 placeholder="Nombre de Papi"
                 ref="father_name"
                 value={this.state.father_name}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group col-md-2">
          <input type="text"
                 className="form-control"
                 name="address"
                 placeholder="Dirección"
                 ref="address"
                 value={this.state.address}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group col-md-2">
          <input type="text"
                 className="form-control"
                 name="phone"
                 placeholder="Número de contacto"
                 ref="phone"
                 value={this.state.phone}
                 onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary pull-right">Agregar</button>
      </form>
    )
  }
});