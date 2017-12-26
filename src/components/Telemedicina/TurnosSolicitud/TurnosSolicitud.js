/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TurnosSolicitudFilter from '../../../components/Telemedicina/TurnosSolicitudFilter/TurnosSolicitudFilter';
import TurnosSolicitudAlert from '../../../components/Telemedicina/TurnosSolicitudAlert/TurnosSolicitudAlert';
import CardHeader from '../../../components/Telemedicina/CardHeader/CardHeader';
import FilterLeft from '../../../components/Telemedicina/FilterLeft/FilterLeft';
import ListCards from '../../../components/Telemedicina/ListCards/ListCards';
import ModalConfirmacionTurno from '../../../components/Telemedicina/ModalConfirmacionTurno/ModalConfirmacionTurno';
import ModalConfirmacionTurnoResp from '../../../components/Telemedicina/ModalConfirmacionTurnoResp/ModalConfirmacionTurnoResp';
import ModalBienvenida from '../../../components/Telemedicina/ModalBienvenida/ModalBienvenida';
import IconSuccess from '../../../../public/images/ic_checked.png';
import IconWarning from '../../../../public/images/ic_exclamation.png';
import IconCalendar from '../../../../public/images/ic_calendar_notif.png';
import Image from '../../../components/Telemedicina/images/medico.png';
import * as telemedicinaActions from '../../../actions/telemedicinaActions';

class TurnosSolicitud extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slep: 1,
    };

    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
  }
  componentDidMount() {}

  next(slep) {
    this.setState({
      slep: slep + 1,
    });
  }

  back(slep) {
    this.setState({
      slep: slep - 1,
    });
  }

  render() {
    const { showAlert } = this.props.telemedicina;
    const { disponibilidad } = this.props.telemedicina;
    let alertDisponibilidad = '';
    const componentCard = (
      <div className="row">
        <div className="col-md-4">
          <FilterLeft />
        </div>
        <div className="col-md-8" style={{ paddingLeft: '0' }}>
          <CardHeader />
          <ListCards />
          <ListCards />
          <ListCards />
        </div>
      </div>
    );
    if (showAlert) {
      if (disponibilidad === 0) {
        alertDisponibilidad = (
          <TurnosSolicitudAlert alertType="success">
            <div className="col-md-1">
              <img alt="Anterior" src={IconSuccess} />
            </div>
            <div className="col-md-8">
              <span>
                Hay médicos de guardia disponibles para atención espontánea.
              </span>
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => this.props.showValidacionesTecnicas()}
              >
                Iniciar atención
              </button>
            </div>
          </TurnosSolicitudAlert>
        );
      } else if (disponibilidad === 1) {
        alertDisponibilidad = (
          <TurnosSolicitudAlert alertType="warning">
            <div className="col-md-1">
              <img alt="Anterior" src={IconWarning} />
            </div>
            <div className="col-md-11">
              <span>
                En este momento no hay médicos disponibles. Por favor agendá un
                turno para tu E-Consulta.
              </span>
            </div>
          </TurnosSolicitudAlert>
        );
      } else {
        alertDisponibilidad = (
          <TurnosSolicitudAlert alertType="success">
            <div className="col-md-1">
              <img alt="Anterior" src={IconCalendar} />
            </div>
            <div className="col-md-11">
              <span>
                En este momento no hay médicos disponibles. Programá un turno
                para las próximas horas.
              </span>
            </div>
          </TurnosSolicitudAlert>
        );
      }
    }

    return (
      <div>
        <TurnosSolicitudFilter />
        <div className="col-md-12">
          {alertDisponibilidad}
        </div>
        {showAlert ? componentCard : ''}
        <ModalConfirmacionTurno
          image={Image}
          profesional="Gonzalo Manuel Roberto"
          fecha="13 de noviembre de 2017"
          hora=" 09:30 hs"
        />
        <ModalConfirmacionTurnoResp email="sergio.piana@gmail.com" />
        <ModalBienvenida
          slep={this.state.slep}
          next={this.next}
          back={this.back}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  telemedicina: state.telemedicina,
});

export default connect(mapStateToProps, telemedicinaActions)(
  withStyles()(TurnosSolicitud),
);
