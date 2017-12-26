/* global $ */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MenuTop.css';
import { HOST_SERVER } from '../../constants';

class MenuTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuTop: false,
    };
  }

  showMenuTop(showMenuTop) {
    this.setState({ showMenuTop: !showMenuTop });
    if ($(window).scrollTop() > 30 || $(window).width() < 768) {
      setTimeout(() => {
        $('#menu_top').css({
          top: '51px',
        });
      }, 0);
    }
  }

  render() {
    const showMenuTop = this.state.showMenuTop;
    return (
      <div className={`${s.menuLeft} nav`}>
        <button
          id="iconMenu"
          type="button"
          className={`${s.navbarToggle}`}
          onClick={() => this.showMenuTop(showMenuTop)}
        >
          <span className={s.iconBar} />
          <span className={s.iconBar} />
          <span className={s.iconBar} />
        </button>
        <div className="dropdown open">
          <a
            className={`${s.smgbarPersonas} navbar-brand hidden-sm-down`}
            href="/"
          >
            PERSONAS
          </a>
          {showMenuTop
            ? <ul
                id="menu_top"
                className={`${s.menuDesple} dropdown-menu`}
                role="menu"
                aria-labelledby="menuDropdown"
              >
                <li>
                  <div
                    id="menuCompleto_prepaga"
                    className={`${s.menuCompleto_prepaga} row`}
                  >
                    <ul className="list-unstyled col-sm-2  col-xs-11 offset-lg-1  hidden-xs  hidden-ms">
                      <li>
                        <h3>QUIERO ASOCIARME</h3>
                      </li>
                      <li>
                        <a
                          href={`${HOST_SERVER}smgnewsite/prepaga/nosotros.php`}
                        >
                          Sobre Nosotros
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/nuestros_planes.php">
                          Nuestros Planes
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/profesionales.php">
                          Cartillas
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/mapa_de_sucursales.php">
                          Sucursales
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/derivacion_aportes.php">
                          Derivación de Aportes
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/solicite_un_asesor.php">
                          Solicite un Asesor
                        </a>
                      </li>
                    </ul>
                    <ul className="list-unstyled col-sm-2 col-xs-11  col-xs-offset-1  col-sm-offset-0  hidden-xs  hidden-ms">
                      <li className="itemsMenu ">
                        <h3>INFORMACIÓN ÚTIL</h3>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/mapa_de_sucursales.php">
                          Sucursales
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/telefonos.php">
                          Teléfonos Útiles
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/autorizaciones_info.php">
                          Autorizaciones
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/reintegros.php">
                          Gestión de Reintegros
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/formas_de_pago.php">
                          Formas de Pago
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/cobertura.php">
                          Cobertura
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/beneficios.php">
                          Beneficios
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/novedades.php">
                          Swiss Medical News
                        </a>
                      </li>
                      <li>
                        <a
                          href="../pdf/prepaga/comunicacion_legal.pdf"
                          target="_blank"
                        >
                          Comunicación judicial - Celiaquía
                        </a>
                      </li>
                    </ul>
                    <ul className="list-unstyled col-sm-2 col-xs-11  col-xs-offset-1  col-sm-offset-0  hidden-xs  hidden-ms">
                      <li>
                        <h3>CENTROS MÉDICOS</h3>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/nuestras_clinicas.php">
                          Nuestras Clínicas
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/swiss_medical_center.php">
                          Swiss Medical Center
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/swiss_medical_center.php?center=2">
                          Centros Odontológicos
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/vacunatorio.php">
                          Vacunatorios
                        </a>
                      </li>
                    </ul>
                    <ul className="list-unstyled col-sm-2 col-xs-11  col-xs-offset-1  col-sm-offset-0  hidden-xs  hidden-ms">
                      <li>
                        <h3>PREVENCIÓN</h3>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/prevencion.php">
                          Programas de Prevención
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/charlas_comunidad.php">
                          Charlas a la Comunidad
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/ciclo_actividades.php">
                          Ciclo de Actividades
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/guias_prevencion.php">
                          Guías de Prevención
                        </a>
                      </li>
                    </ul>
                    <ul
                      className={`${s.loguedMenu} list-unstyled col-sm-2 col-xs-11  col-xs-offset-1  col-sm-offset-0`}
                    >
                      <li>
                        <h3>TRÁMITES ONLINE</h3>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/mis_datos.php">
                          Mis Datos
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/mi_plan.php">
                          Mi Plan
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/profesionales.php">
                          Mi Cartilla
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/efactura.php">
                          E-factura
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/turnos_online.php">
                          Turnos Online
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/laboratorio_imagenes.php">
                          Resultados de Estudios
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/gestion_tramites.php">
                          Gestión de Trámites
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/credencialesProvisorias.php">
                          Gestión de Credenciales
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/mis_consumos.php">
                          Historial de Atenciones
                        </a>
                      </li>
                      <hr />
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/formularios.php">
                          Formularios
                        </a>
                      </li>
                      <li>
                        <a href="https://www.swissmedical.com.ar/smgnewsite/prepaga/reglamento_modelo.php">
                          Reglamento y Modelo de Contrato
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            : null}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MenuTop);
