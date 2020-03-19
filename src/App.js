import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
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
      // チェックされていなかった場合: データ取得
      // RESAS API 人口構成: https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
      fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${index + 1}`,
      { headers: { 'X-API-KEY': APIkey} }
      )
      .then(response => response.json())
      .then(res => {
        let tmp = [];
        // data[0]はlabel="総人口"に相当する
        Object.keys(res.result.data[0].data).forEach(i => {
          tmp.push(res.result.data[0].data[i].value);
        });
        const res_series = {
          name: this.state.prefectures[index].prefName,
          data: tmp
        };
        this.setState({
          selected: selected_copy,
          series: [...this.state.series, res_series]
        });
      });
    } else {
      const series_copy = this.state.series.slice();
      // チェック済みの場合: seriesから除外
      for (let i = 0; i < series_copy.length; i++) {
        if (series_copy[i].name == this.state.prefectures[index].prefName) {
          series_copy.splice(i, 1);
        }
      }
      this.setState({
        selected: selected_copy,
        series: series_copy
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
    const options = {
      title: {
        text: ''
      },
      yAxis: {
        title: {
          text: '人口数'
        }
      },
      xAxis: {
        title: {
          text: '年度'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top'
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointInterval: 3,
          pointStart: 1970
        }
      },
      series: this.state.series
    };
    return (
      <div>
        <h1>都道府県別の総人口推移グラフ</h1>
        <h2>都道府県</h2>
        {Object.keys(data).map(i => this.renderItem(data[i]))}
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default App;
