var React = require("react");
var Component = React.Component;;

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};
    this.pollData = this.pollData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onUploadCSV = this.onUploadCSV.bind(this);
  }
  //Sets the props so that other components can load the data.
  onUploadCSV() {
    this.props.data(this.state.data);
  }

  //Checks for changes to 'prices.csv' and recalulates data.
  pollData(){
    fetch("http://192.168.0.12:8000/fetchChanges/", {
      method: 'GET',
    }).then(data => data.json())
      .then(json => {this.props.data(json)});
  }

  //Handles upload of csv file.
  handleChange(event) {
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    
    fetch("http://192.168.0.12:8000/uploadCSV/", {
      method: 'POST',
      body: formData,
    }).then(data => data.json())
      .then(json =>  {this.setState({data: json})})
      .then(json => {this.onUploadCSV()})
      .then(json => {setInterval(() => {this.pollData()}, 3000);});
  }

  render() {
    return (
      <form action="" method="post" enctype="multipart/form-data">
        <label>
          <input id="file" accept='.csv' name="file" type="file" title="Please upload a .csv file" value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
      </form>
    );
  }
}

module.exports = Upload