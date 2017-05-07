var NewForm = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    description: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      name: '',
      description: ''
    }
  },
  handleAdd: function(e) {
    e.preventDefault();
    var self = this;
    if (this.validForm()) {
      $.ajax({
        url: '/api/v1/activities',
        method: 'POST',
        data: { activity: self.state },
        success: function(data) {
          self.props.handleAdd(data);
          self.setState(self.getInitialState());
        },
        error: function(xhr, status, error) {
          console.log(status, xhr, error, xhr.status);
          if(xhr.status == 400){
            if(xhr.responseText != ""){
              var errors = xhr.responseText.split(",");
              for (var i = 0; i < errors.length; i++) {
                createNotification("danger", errors[i].match(/\[\"(.+)\"\]/)[1]);
              }
            }else{
              createNotification("danger", "No se puede agregar un nuevo registro, Error en los datos.");
            }          
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
    if (this.state.name && this.state.description) {
      return true;
    } else {
      return false;
    }
  },
  handleChange: function(e) {
    var input_name = e.target.name;
    var value = e.target.value;
    this.setState({ [input_name] : value });
  },
  render: function() {
    return(
      <form className="form-inline" onSubmit={this.handleAdd}>  
        <div className="form-group col-md-4">
          <input type="text"
                 className="form-control"
                 name="name"
                 placeholder="Nombre"
                 ref="name"
                 value={this.state.name}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group col-md-6">
          <input type="text"
                 className="form-control"
                 name="description"
                 placeholder="Descripción"
                 ref="description"
                 value={this.state.description}
                 onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary col-md-1 pull-right">Agregar</button>
      </form>
    )
  }
});