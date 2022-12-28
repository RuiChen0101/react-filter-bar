import { Component } from "react";
import ReactFilterBar, { FilterItem, FilterType } from "@ruichen0101/react-filter-bar";

import "./App.css";

interface AppState {
  filterData: FilterItem[]
}

class App extends Component<any, AppState> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      filterData: []
    }
  }

  render() {
    return (
      <div className="app">
        <div className="container">
          <h1 className="title">React Filter Bar</h1>
          <div className="filter-bar-body">
            <ReactFilterBar
              filterSetting={[{
                key: "user.id",
                text: "Id",
                type: FilterType.inputEq,
              }, {
                key: "user.name",
                text: "name",
              }, {
                key: "user.email",
                text: "email",
              }, {
                key: "user.status",
                text: "status",
                type: FilterType.dropdown,
                options: [
                  { text: 'normal', value: 1 },
                  { text: 'blocked', value: -1 },
                  { text: 'deleted', value: -99 }
                ]
              }]}
              onFilterUpdate={(result) => {
                console.log(result);
                this.setState({ filterData: result })
              }}
            />
            <div className="filter-result">
              <p>Filter Result</p>
              {JSON.stringify(this.state.filterData)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
