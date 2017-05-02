var Event = React.createClass({
  getInitialState: function() {
    return { edit: false };
  },
  propTypes: {
    name: React.PropTypes.string,
    description: React.PropTypes.string
  },
  handleDelete: function(e) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: '/api/activities/' + this.props.event.id,
      success: function(data) {
        this.props.handleDeleteRecord(this.props.event);
      }.bind(this),
      error: function(xhr, status, error) {
        console.log(status, xhr, error, xhr.status);
        if(xhr.status == 404){
          createNotification("danger", "No se puede eliminar el registro solicitado, Registro no encontrado.");
        }
        if(xhr.status == 500){
          createNotification("danger", "No se puede eliminar el registro solicitado");
        }
      }
    });
  },
  handleToggle: function(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  },
  recordValue: function(field) {
    return React.findDOMNode(this.refs[field]).value;
  },
  handleUpdate: function(e) {
    e.preventDefault();
    if (this.validRecord()) {
      var event_data = {
        name: this.recordValue("name"),
        description: this.recordValue("description")
      };
      $.ajax({
        method: 'PUT',
        url: '/api/activities/' + this.props.event.id,
        data: { activity: event_data },
        success: function(data) {
          this.props.handleUpdateRecord(this.props.event, data);
          this.setState({ edit: false });
        }.bind(this),
        error: function(xhr, status, error) {
          console.log(status, xhr, error, xhr.status);
          if(xhr.status == 400){
            createNotification("danger", "No se puede actualizar el registro solicitado, Error en los datos.");
          }
          if(xhr.status == 404){
            createNotification("danger", "No se puede actualizar el registro solicitado, Registro no encontrado.");
          }
          if(xhr.status == 500){
            createNotification("danger", "No se puede actualizar el registro solicitado");
          }
        }
      });
    } else {
      createNotification("danger", "Por favor llena todos los espacios");
    }
  },
  validRecord: function() {
    if (this.recordValue("name") &&
        this.recordValue("description")) {
      return true;
    } else {
      return false;
    }
  },
  renderForm: function() {
    return(
      <tr>
        <td>
          <input name="name"
                 defaultValue={this.props.event.name}
                 className="form-control"
                 type="text"
                 ref="name"
          />
        </td>
        <td>
          <input name="description"
                 defaultValue={this.props.event.description}
                 className="form-control"
                 type="text"
                 ref="description"
          />
        </td>
        <td>
          <a className="btn btn-success btn-sm"
             onClick={this.handleUpdate}>
            Guardar
          </a>
          <a className="btn btn-default btn-sm"
             onClick={this.handleToggle} >
            Cancelar
          </a>
        </td>
      </tr>
    );
  },
  renderRecord: function() {
    var event = this.props.event;
    return(
      <tr>
        <td>{event.name}</td>
        <td>{event.description}</td>
        <td>
          <a className="btn btn-primary btn-xs"
             onClick={this.handleToggle} >
             Editar
          </a>
          <a className="btn btn-danger btn-xs"
             onClick={this.handleDelete} >
            Eliminar
          </a>
        </td>
      </tr>
    );
  },
  render: function() {
    if (this.state.edit) {
      return(this.renderForm());
    } else {
      return(this.renderRecord());
    }
  }
})