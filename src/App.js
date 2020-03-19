import React, { Component } from 'react';
import './App.css';
import APIkey from './APIkey';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: Array(47).fill(false),
      prefectures: {},
      series: []
    };
    this._changeSelection = this._changeSelection.bind(this);
  }

  componentDidMount() {
    // 都道府県の一覧を取得
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: { 'X-API-KEY': APIkey }
    })
    .then(response => response.json())
    .then(res => {this.setState({ prefectures: res.result });
    });
  }

  _changeSelection(index) {
    // チェックボックスの動作
    const selected_copy = this.state.selected.slice();
    selected_copy[index] = !selected_copy[index];

    if (!this.state.selected[index]) {
      this.setState({
        //selected: selected_copy
      });
    } else {
      this.setState({
        //selected: selected_copy
      });
    }
  }

  renderItem(props) {
    return (
      <div key={props.prefCode} style={{ margin: '5px', display: 'inline-block' }}>
        <input
        type="checkbox"
        checked={this.state.selected[props.prefCode - 1]}
        onChange={() => this._changeSelection(props.prefCode - 1)}
        />
        {props.prefName}
      </div>
    );
  }

  render() {
    const data = this.state.prefectures;
    return (
      <div>
        <h1>都道府県</h1>
        {Object.keys(data).map(i => this.renderItem(data[i]))}
      </div>
    );
  }
}

export default App;
