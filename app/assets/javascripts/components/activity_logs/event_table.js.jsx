var EventTable = React.createClass({
  handleDeleteRecord: function(event) {
    this.props.handleDeleteRecord(event);
  },
  handleUpdateRecord: function(old_event, event) {
    this.props.handleUpdateRecord(old_event, event);
  },
  render: function() {
    var events = [];
    this.props.events.forEach(function(event) {
      if(event.duration != null){
        event.duration = (event.duration + "").replace(" min", "") + " min"
      }
      if(event.stop_time == "Terminada"){
        finished = true
      }else{
        finished = false
      }
      events.push(<Event event={event}
                         key={'event' + event.id}
                         finished={finished}
                         handleDeleteRecord={this.handleDeleteRecord}
                         handleUpdateRecord={this.handleUpdateRecord} />);
    }.bind(this));
    return(
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-md-2">Bebé</th>
            <th className="col-md-2">Asistente</th>
            <th className="col-md-2">Actividad</th>
            <th className="col-md-2">Inicio</th>
            <th className="col-md-2">Estatus</th>
            <th className="col-md-1">Duración</th>
            <th className="col-md-1"></th>
          </tr>
        </thead>
        <tbody>
          {events}
        </tbody>
      </table>
    )
  }
});