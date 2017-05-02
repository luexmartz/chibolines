var EventTable = React.createClass({
  handleDeleteRecord: function(event) {
    this.props.handleDeleteRecord(event);
  },
  handleUpdateRecord: function(old_event, event) {
    this.props.handleUpdateRecord(old_event, event);
  },
  handleSortColumn: function(name, order) {
    this.props.handleSortColumn(name, order);
  },
  render: function() {
    var events = [];
    this.props.events.forEach(function(event) {
      events.push(<Event event={event}
                         key={'event' + event.id}
                         handleDeleteRecord={this.handleDeleteRecord}
                         handleUpdateRecord={this.handleUpdateRecord} />);
    }.bind(this));
    return(
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-md-2 sortable">
              <SortColumn name="name"
                          text="Nombre"
                          sort={this.props.sort}
                          order={this.props.order}
                          handleSortColumn={this.handleSortColumn}/>
            </th>
            <th className="col-md-8 sortable">
              <SortColumn name="description"
                          text="Descripción"
                          sort={this.props.sort}
                          order={this.props.order}
                          handleSortColumn={this.handleSortColumn}/>
            </th>
            <th className="col-md-1 sortable"></th>
            <th className="col-md-1 sortable"></th>
          </tr>
        </thead>
        <tbody>
          {events}
        </tbody>
      </table>
    )
  }
});