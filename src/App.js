import React, { Component } from 'react';
import './App.css';
import Cell from './Cell/Cell';
import Clock from './Clock/Clock'

class App extends Component {
  state = {
    birthday: '1991-02-03',
    msg: '',
  }

  handleChangeBirthday = (birthday, isOk) => {
    isOk ?
      this.setState({
        birthday: birthday,
        msg: '',
      })
      :
      this.setState({
        birthday: '1991-02-03',
        msg: '请输入正确的日期！ 形如1991-02-03。'
      });
  }

  handleEnterPress = (e)=>{
    if (e.key === 'Event') {
      let birthday = this.refs.birthday.value;
      let pat = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
      if (pat.test(birthday)) {
        return this.handleChangeBirthday(birthday, true)
      } else {
        return this.handleChangeBirthday(birthday, false)
      }
    }
  }

  render() {
    const { birthday, msg } = this.state;
    console.log(birthday)

    // 现在的时间和生日相应时间戳

    let nowTimeStamp = Date.now();
    let birthdayTimeStamp = Date.parse(birthday);
    console.log('nowTimeStamp: ' + nowTimeStamp + ' , birthday: ' + birthday);

    // 我的生命已过的时间戳和月数

    let myLife = nowTimeStamp - birthdayTimeStamp;
    let myLifeMonth = Math.round(myLife / (((365 * 4 + 1) / 48) * 24 * 60 * 60 * 1000));
    console.log('myLifeMonth: ' + myLifeMonth);

    // 共900个月的生命表

    let table = [];
    for (let i = 0; i < 900; i++) {
      if (i < myLifeMonth) {
        table.push(true)
      } else {
        table.push(false);
      }
    }

    return (
      <div className="App">
        {table.map((value, index) => {
          return (
            <Cell
              key={index}
              dead={value}
              style={{
                display: 'inline-block',
                float: 'left',
                clear: index % 30 === 0 ? 'both' : 'none',
              }}
            ></Cell>
          );
        })}
        <p>
          <label htmlFor="birthday-input">请输入你的生日</label>
          <input style={{ fontSize: 32, width: 200 }}
            defaultValue="1991-02-03"
            id="birthday-input"
            type="text"
            title="如: 1991-02-03"
            ref='birthday'
          ></input>
          <button
            style={{ fontSize: 24 }}
            onKeyPress={this.handleEnterPress}
            onClick={() => {
              let birthday = this.refs.birthday.value;
              let pat = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
              if (pat.test(birthday)) {
                return this.handleChangeBirthday(birthday, true)
              } else {
                return this.handleChangeBirthday(birthday, false)
              }
            }}>确定</button>
        </p>
        <p style={{ fontSize: 24, color: 'red' }}>{msg}</p>
        <p>人均75年, <span className="green">900</span> 个月, 你已经活了 <span className="red">{myLifeMonth}</span> 个月。</p>
        <p>你的生命可能只剩 <span className="red">{Math.round((900 - myLifeMonth) / 900 * 100)}%</span> 。</p>
        <p>生命不息, 奋斗不止！</p>
        <p>加油!</p>
        <Clock style={{ position: 'fixed', bottom: 0, right: 50 }}></Clock>
      </div >
    );
  }
}

export default App;
