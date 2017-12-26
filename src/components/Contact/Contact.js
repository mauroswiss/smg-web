/**
 * Contact Component
 */
/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */
/* eslint class-methods-use-this: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import onClick from '../../actions/footerActions';
import { sendEmail } from '../../actions/sendEmailActions';
import s from './Contact.css';
import cerrarImg from './images/cerrar.png';
import ConctacForm from './ContacForm/ContacForm';

class Contact extends React.Component {
  onClickSendMail(e, name, email, phone, description, sendEmailProps) {
    e.preventDefault();
    sendEmailProps(name, email, phone, description);
  }

  onClick() {
    this.props.onClickButton();
  }

  render() {
    return (
      <div
        className={
          this.props.ContactClick
            ? `${s.formulario_opinion} ${s.show} hidden-sm-down`
            : `${s.formulario_opinion} ${s.hidden} hidden-sm-down`
        }
      >
        <p>
          <a
            className={`${s.handle}`}
            role="button"
            onClick={() => this.onClick()}
            tabIndex={0}
          >
            <img src={cerrarImg} height="20" alt="Cerrar" />
          </a>
        </p>
        {(() => {
          switch (this.props.sendEmail) {
            case true:
              return (
                <div className="alert alert-success text-center">
                  Se envio el mensaje correctamente
                </div>
              );
            case false:
              return (
                <div className="alert alert-danger text-center">
                  Error al enviar el mensaje
                </div>
              );
            default:
              return (
                <div className="alert alert-danger text-center">
                  Todos los campos son obligatorios.
                </div>
              );
          }
        })()}
        <ConctacForm
          sendEmailProps={this.props.sendEmailProps}
          onClickSendMail={this.onClickSendMail}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ContactClick: state.footer.show,
  sendEmail: state.sendEmail.send,
});

const mapDispatchToProps = dispatch => ({
  onClickButton: () => dispatch(onClick()),
  sendEmailProps: (name, email, phone, description) =>
    dispatch(sendEmail(name, email, phone, description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(Contact),
);
