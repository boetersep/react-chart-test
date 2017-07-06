import * as React from 'react';
import './App.css';
import {VictoryChart, VictoryLine} from 'victory';
import {Observable} from 'rxjs';


class App extends React.Component<{}, {data: Array<any>}> {

  constructor(props:any) {
    super(props);

    this.state = {
      data: []
    }

    Observable.interval(50)
        .map(data => Math.random() * 10)
        .subscribe((r) => {
          let data: Array<any> = this.state.data;
          if (data.length > 10) {
            data.shift();
          }
          const date:Date = new Date();
          data.push({a: date.toTimeString().substring(0, 8) + ':' + date.getMilliseconds(), b: r});
          this.setState({data: data});
        });
  }

  render() {
   const style = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" }
    };
  
    return (
      <div className="App">
        <VictoryChart style={style} width={1100}>
          <VictoryLine data={this.state.data} x="a"
              y="b"/>
        </VictoryChart>
      </div>  
    );
  }
}

export default App;
