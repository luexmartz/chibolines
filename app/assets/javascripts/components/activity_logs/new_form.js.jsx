var NewForm = React.createClass({
  propTypes: {
    baby_id: React.PropTypes.string,
    assistant_id: React.PropTypes.string,
    activity_id: React.PropTypes.string,
    start_time: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      baby_id: '',
      assistant_id: '',
      activity_id: '',
      start_time: ''
    }
  },
  handleAdd: function(e) {
    e.preventDefault();
    var self = this;
    if (this.validForm()) {
      $.ajax({
        url: '/api/v1/activity_logs',
        method: 'POST',
        data: { activity_log: self.state },
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
    if (this.state.baby_id && this.state.assistant_id &&
        this.state.activity_id && this.state.start_time) {
      if (this.state.baby_id != "0" && this.state.assistant_id != "0" &&
        this.state.activity_id != "0") {
        return true;
      }else {
        return false;
      }
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
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <form className="navbar-form form-inline" role="add" onSubmit={this.handleAdd}>
              <div className="form-group pull-left">
                <select id="baby_id" name="baby_id" ref="baby_id" value={this.state.baby_id} onChange={this.handleChange} className="form-control select-primary">
                  <option value="0">Selecciona Bebe</option>
                </select>
              </div>
              <div className="form-group pull-left">
                <select id="assistant_id" name="assistant_id" ref="assistant_id" value={this.state.assistant_id} onChange={this.handleChange} className="form-control select-primary">
                  <option value="0">Selecciona Asistente</option>
                </select>
              </div>
              <div className="form-group pull-left">
                <select id="activity_id" name="activity_id" ref="activity_id" value={this.state.activity_id} onChange={this.handleChange} className="form-control select-primary">
                  <option value="0">Selecciona Actividad</option>
                </select>
              </div>
              <div className="form-group pull-left datetime">
                <div className='input-group date' id='datetimepicker1'>
                  <input type='text'
                         id="start_time"
                         name="start_time"
                         ref="start_time"
                         value={this.state.start_time}
                         className="form-control start_time"
                         placeholder="Fecha y Hora de inicio"
                         onClick={this.handleChange} />
                  <span className="input-group-addon">
                      <span className="glyphicon glyphicon-calendar"></span>
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn-primary pull-right">Agregar</button>
            </form>
          </div>
        </nav>
      </div>
    )
  }
});