/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TelemedicinaPageUserLoggedIn.css';
import ValidacionesTecnicas from '../../components/Telemedicina/ValidacionesTecnicas/ValidacionesTecnicas';
import TurnosSolicitud from '../../components/Telemedicina/TurnosSolicitud/TurnosSolicitud';
import ImageBanner from '../../../public/images/banner.png';
import {
  Tabs,
  Tab,
  TabPanel,
  TabList,
  TabContent,
} from '../../components/Tabs';

class TelemedicinaPageUserLoggedIn extends React.Component {
  render() {
    // const { validaciones_tecnicas } = this.props.telemedicina;
    return (
      <div>
        <div
          className={`${s.imageBanner} col-md-12`}
          style={{ backgroundImage: `url(${ImageBanner})` }}
        >
          <h1>
            <strong>
              <span className={`${s.eConsulta}`}>e</span>-Consulta
            </strong>
            <br />
            <small>Tu médico en línea</small>
          </h1>
        </div>
        <div className={`${s.root}`}>
          <div className={`${s.container} row`}>
            <div className="col-md-12" style={{ paddingTop: '50px' }}>
              {this.props.validaciones_tecnicas ? (
                <ValidacionesTecnicas />
              ) : (
                <Tabs>
                  <TabList>
                    <Tab to="#" active>
                      Solicitud Turnos
                    </Tab>
                    <Tab to="/telemedicina/consulta-turnos">
                      Consulta Turnos
                    </Tab>
                  </TabList>
                  <TabPanel>
                    <TabContent active>
                      <TurnosSolicitud />
                    </TabContent>
                  </TabPanel>
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  validaciones_tecnicas: state.telemedicina.validaciones_tecnicas,
});

export default connect(mapStateToProps, null)(
  withStyles(s)(TelemedicinaPageUserLoggedIn),
);
