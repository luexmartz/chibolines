var EventApplication = React.createClass({
  getInitialState: function() {
    return { events: [],
             sort: "name",
             order: "asc" };
  },
  componentDidMount: function() {
    this.getDataFromApi();
  },
  getDataFromApi: function() {
    var self = this;
    $.ajax({
      url: '/api/v1/babies',
      method: 'GET',
      success: function(data) {
        self.setState({ events: data });
      },
      error: function(xhr, status, error) {
        console.log(status, xhr, error, xhr.status);
        createNotification("danger", "No se pueden obtener los datos");
      }
    });
  },
  handleSearch: function(events) {
    this.setState({ events: events });
  },
  handleAdd: function(event) {
    var events = this.state.events;
    events.unshift(event);
    this.setState({ events: events });
  },
  handleDeleteRecord: function(event) {
    var events = this.state.events.slice();
    var index = events.indexOf(event);
    events.splice(index, 1);
    this.setState({ events: events });
  },
  handleUpdateRecord: function(old_event, event) {
    var events = this.state.events.slice();
    var index = events.indexOf(old_event);
    events.splice(index, 1, event);
    this.setState({ events: events });
  },
  handleSortColumn: function(name, order) {
    if (this.state.sort != name) {
      order = 'asc';
    }
    $.ajax({
      url: '/api/v1/babies',
      data: { sort_by: name, order: order },
      method: 'GET',
      success: function(data) {
        this.setState({ events: data, sort: name, order: order });
      }.bind(this),
      error: function(xhr, status, error) {
        console.log(status, xhr, error, xhr.status);
        createNotification("danger", "No se pueden ordenar los registros");
      }
    });
  },
  render: function() {
    return(
      <div className="container">
        <div id="upload-alerts" class="container"></div>
        <div className="jumbotron">
          <h4>Principes y Princesas</h4>
        </div>
        <div className="row">
          <NewForm handleAdd={this.handleAdd} />
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-md-12">
            <SearchForm handleSearch={this.handleSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <EventTable events={this.state.events}
                        sort={this.state.sort}
                        order={this.state.order}
                        handleDeleteRecord={this.handleDeleteRecord}
                        handleUpdateRecord={this.handleUpdateRecord}
                        handleSortColumn={this.handleSortColumn} />
          </div>
        </div>
      </div>
    )
  }
});