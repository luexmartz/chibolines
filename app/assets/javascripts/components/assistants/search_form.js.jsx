var SearchForm = React.createClass({
  handleSearch: function() {
    var query = React.findDOMNode(this.refs.query).value;
    var self = this;
    $.ajax({
      url: '/api/assistants/search',
      data: { query: query },
      success: function(data) {
        self.props.handleSearch(data);
      },
      error: function(xhr, status, error) {
        console.log(status, xhr, error, xhr.status);
        createNotification("danger", "Un error ocurrio en la busqueda")
      }
    });
  },
  render: function() {
    return(
      <input onChange={this.handleSearch}
             type="text"
             className="form-control"
             placeholder="Escriba la frase de búsqueda aquí..."
             ref="query" />
    )
  }
});