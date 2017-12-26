/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as facturasActions from '../../actions/facturasActions';
import s from './TablaFacturas.css';

class TablaFacturas extends React.Component {
  componentDidMount() {
    this.props.fetchFacturas();
  }

  render() {
    if (!this.props.facturas || this.props.facturas.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className="container">
            <h2>Facturas</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Tipo</th>
                  <th>Punto Venta</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {this.props.facturas[0].numero}
                  </td>
                  <td>Doe</td>
                  <td>john@example.com</td>
                </tr>
                <tr>
                  <td>Mary</td>
                  <td>Moe</td>
                  <td>mary@example.com</td>
                </tr>
                <tr>
                  <td>July</td>
                  <td>Dooley</td>
                  <td>july@example.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  facturas: state.facturas,
});

export default connect(mapStateToProps, facturasActions)(
  withStyles(s)(TablaFacturas),
);
