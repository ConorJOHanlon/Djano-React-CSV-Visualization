/* App.js */
var React = require("react");
var Component = React.Component;
var CanvasJSReact = require("../libs/canvasjs.react");
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends Component {
  constructor(props, options) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <CanvasJSChart
          options={this.props.data}
        />
      </div>
    );
  }
}
module.exports = Chart;
