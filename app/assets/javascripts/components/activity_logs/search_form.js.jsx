var SearchForm = React.createClass({
  propTypes: {
    baby_id: React.PropTypes.string,
    assistant_id: React.PropTypes.string,
    status: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      baby_id: '',
      assistant_id: '',
      status: ''
    }
  },
  handleSearch: function(e) {
    e.preventDefault();
    var self = this;

    $.ajax({
      url: '/api/activity_logs/search',
      data: { activity_log: self.state },
      success: function(data) {
        self.props.handleSearch(data);
      },
      error: function(xhr, status, error) {
        console.log(status, xhr, error, xhr.status);
        createNotification("danger", "Un error ocurrio en la busqueda")
      }
    });
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
            <form className="navbar-form form-inline" role="search" onSubmit={this.handleSearch}>
              
              <div className="form-group pull-left">
                <select id="baby_id" name="baby_id" ref="baby_id" value={this.state.baby_id} onChange={this.handleChange} className="form-control select-primary">
                  <option value="">Selecciona Bebe</option>
                </select>
              </div>
              <div className="form-group pull-left">
                <select id="assistant_id" name="assistant_id" ref="assistant_id" value={this.state.assistant_id} onChange={this.handleChange} className="form-control select-primary">
                  <option value="">Selecciona Asistente</option>
                </select>
              </div>
              <div className="form-group pull-left">
                <select id="status" name="status" ref="status" value={this.state.status} onChange={this.handleChange} className="form-control select-primary">
                  <option value="all">Todos</option>
                  <option value="stop">Terminado</option>
                  <option value="start">En progreso</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary pull-right">Filtrar</button>
            </form>
          </div>
        </nav>
      </div>
    )
  }
});