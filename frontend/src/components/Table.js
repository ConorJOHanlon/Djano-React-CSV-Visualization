var React = require("react");
var Component = React.Component;;

var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

class Table extends Component {
  constructor(props) {
    super(props);
    };

  render() {
    return (
      <BootstrapTable data={ this.props.data }>
        <TableHeaderColumn dataField='name' isKey>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='weight'>Weight</TableHeaderColumn>
        <TableHeaderColumn dataField='closePrice'>Close Price</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
module.exports = Table