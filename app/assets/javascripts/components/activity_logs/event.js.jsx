var Event = React.createClass({
  getInitialState: function() {
    return { edit: false, finished: this.props.finished };
  },
  propTypes: {
    baby: React.PropTypes.string,
    assistant: React.PropTypes.string,
    activity: React.PropTypes.string,
    start_time: React.PropTypes.string,
    stop_time: React.PropTypes.string,
    duration: React.PropTypes.string,
    comments: React.PropTypes.string
  },
  handleDelete: function(e) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: '/api/v1/activity_logs/' + this.props.event.id,
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
    this.setState({ edit: !this.state.edit, finished: false });
  },
  recordValue: function(field) {
    return React.findDOMNode(this.refs[field]).value;
  },
  handleUpdate: function(e) {
    e.preventDefault();
    // if (this.validRecord()) {
      var event_data = {
        comments: this.recordValue("comments")
      };
      $.ajax({
        method: 'PUT',
        url: '/api/v1/activity_logs/' + this.props.event.id,
        data: { activity_log: event_data },
        success: function(data) {
          this.props.handleUpdateRecord(this.props.event, data);
          this.setState({ edit: false, finished: true });
        }.bind(this),
        error: function(xhr, status, error) {
          console.log(status, xhr, error, xhr.status);
          if(xhr.status == 400){
            createNotification("danger", "No se puede actualizar el registro solicitado, Error en los datos.");
          }
          if(xhr.status == 404){
            createNotification("danger", "No se puede actualizar el registro solicitado, Registro no encontrado.");
          }
          if(xhr.status == 422){
            createNotification("danger", "No se puede actualizar el registro solicitado, No se puede Terminar antes de la fecha de Inicio.");
          }
          if(xhr.status == 500){
            createNotification("danger", "No se puede actualizar el registro solicitado");
          }
        }
      });
    // } else {
    //   createNotification("danger", "Por favor llena todos los espacios");
    // }
  },
  renderForm: function() {
    return(
      <tr className="position_relative">
        <td>
          <input name="comments"
                 defaultValue={this.props.event.comments}
                 className="form-control position_absolute"
                 placeholder="Comentarios"
                 type="text"
                 ref="comments"
          />
        </td>
        <td></td><td></td><td></td><td></td><td></td>
        <td>
          <a className="btn btn-success btn-sm"
             onClick={this.handleUpdate}>
            Guardar
          </a>
        </td>
        <td>
          <a className="btn btn-default btn-sm"
             onClick={this.handleToggle} >
            Cancelar
          </a>
        </td>
      </tr>
    );
  },
  renderFormWithoutUpdate: function() {
    var event = this.props.event;
    return(
      <tr className="position_relative">
        <td>{event.baby}</td>
        <td>{event.assistant}</td>
        <td>{event.activity}</td>
        <td>{event.start_time}</td>
        <td>{event.stop_time}</td>
        <td>{event.duration}</td>
        <td>
        </td>
        <td>
          <a className="btn btn-danger btn-xs"
             onClick={this.handleDelete} >
            Eliminar
          </a>
        </td>
      </tr>
    );
  },
  
  renderRecord: function() {
    var event = this.props.event;
    return(
      <tr className="position_relative">
        <td>{event.baby}</td>
        <td>{event.assistant}</td>
        <td>{event.activity}</td>
        <td>{event.start_time}</td>
        <td>{event.stop_time}</td>
        <td>{event.duration}</td>
        <td>
          <a className="btn btn-success btn-xs"
             onClick={this.handleToggle} >
            Terminar
          </a>
        </td>
        <td>
          <a className="btn btn-danger btn-xs"
             onClick={this.handleDelete} >
            Eliminar
          </a>
        </td>
      </tr>
    );
  },
  render: function() {
    if (this.state.finished) {
      return(this.renderFormWithoutUpdate());
    }else{
      if (this.state.edit) {
        return(this.renderForm());
      } else {
        return(this.renderRecord());
      }
    }
  }
})