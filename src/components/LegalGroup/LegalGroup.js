/**
 * @author React
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LegalGroup.css';
import Link from '../Link';
import logoVerisignUrl from './logo_verisign.png';
import logoMinisterioJusticiaUrl from './logo_ministerio_justicia.png';

class LegalGroup extends React.Component {
  render() {
    return (
      <div className={`${s.root} hidden-sm-down`}>
        <div className={`${s.container} container`}>
          <div className="row">
            <div className="col-sm-8">
              <ul className={`${s.text} text-left list-unstyled`}>
                <li>Superintendencia del Servicios de Salud</li>
                <li>
                  Organo Control de Obras Sociales y entidades de Medicina
                  Prepaga
                </li>
                <li>
                  0800-222-SALUD (72583) |
                  <Link className={s.link} to="http://www.sssalud.gov.ar">
                    www.sssalud.gov.ar
                  </Link>
                  | RNEMP Nº 132
                </li>
              </ul>
            </div>
            <div className="col-sm-4">
              <div className={`${s.logos} text-right`}>
                <img src={logoVerisignUrl} alt="Verisign" />
                <img
                  src={logoMinisterioJusticiaUrl}
                  alt="Ministerio de Justicia"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(LegalGroup);
