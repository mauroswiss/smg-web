/* eslint react/prop-types: 0 */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ConsultaTurnosPageUserLoggedIn.css';
import TurnosConsulta from '../../../components/Telemedicina/TurnosConsulta/TurnosConsulta';
import ImageBanner from '../../../../public/images/banner.png';
import {
  Tabs,
  Tab,
  TabPanel,
  TabList,
  TabContent,
} from '../../../components/Tabs';

class ConsultaTurnosPageUserLoggedIn extends React.Component {
  render() {
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
              <Tabs>
                <TabList>
                  <Tab to="/telemedicina/solicitud-turnos">
                    Solicitud Turnos
                  </Tab>
                  <Tab to="#" active>
                    Consulta Turnos
                  </Tab>
                </TabList>
                <TabPanel>
                  <TabContent active>
                    <TurnosConsulta />
                  </TabContent>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ConsultaTurnosPageUserLoggedIn);
