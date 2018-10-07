import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Cell.css'

export default class Cell extends Component {
  static propTypes = {
    dead: PropTypes.bool.isRequired,
  }

  render() {
    const { dead, ...others } = this.props;

    return (
      <div className={classNames({
        'Cell': true,
        'Cell-dead': dead,
      })}
      {...others}>
      </div>
    )
  }
}
