/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import InputRange from 'react-input-range';
import s from './FilterLeft.css';

class FilterLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 8, max: 21 },
      maxValue: 22,
      minValue: 7,
    };
  }

  onHorarioChange(obj) {
    this.setState({ value: obj });
  }

  render() {
    return (
      <div className={`${s.container} mt-0 card`}>
        <div className="card-body">
          <h5 className="mt-0">
            <strong> Horarios de atención</strong>
          </h5>
          <div className={`${s.input_range}`}>
            <InputRange
              maxValue={this.state.maxValue}
              minValue={this.state.minValue}
              formatLabel={value => value.toFixed(2)}
              value={this.state.value}
              onChange={value => this.setState({ value })}
            />
          </div>
          <div className={`${s.card_text}`}>
            <a
              className={`${s.card_text}`}
              onClick={() => this.onHorarioChange({ min: 7, max: 22 })}
              role="button"
              tabIndex="0"
            >
              Todos|
            </a>
            <a
              className={`${s.card_text}`}
              onClick={() => this.onHorarioChange({ min: 7, max: 12 })}
              role="button"
              tabIndex="0"
            >
              Mañana|
            </a>
            <a
              className={`${s.card_text}`}
              onClick={() => this.onHorarioChange({ min: 13, max: 18 })}
              role="button"
              tabIndex="0"
            >
              Tarde|
            </a>
            <a
              className={`${s.card_text}`}
              onClick={() => this.onHorarioChange({ min: 19, max: 22 })}
              role="button"
              tabIndex="0"
            >
              Noche
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(withStyles(s)(FilterLeft));
