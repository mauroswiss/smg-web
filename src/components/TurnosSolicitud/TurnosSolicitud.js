/**
 * @author Esteban Huerta <cancela.eshuer@gmaila.com>
 */
/* global $ */
/* eslint react/prop-types: 0 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TurnosSolicitud.css';
import Confirmacion from './TurnosConfirmacion';
import * as turnosAction from '../../actions/turnosActions';
import DropdownIntegrantes from '../FormComponents/DropdownIntegrantes/dropdownIntegrantes';
import image69669 from './images/69669.jpg';

class SolicitudTurnoPage extends React.Component {
  static validaFechas() {
    if ($('#horaDesde').val() === '-1' && $('#horaHasta').val() === '-1') {
      return true;
    }

    if ($('#horaDesde').val() !== '-1' && $('#horaHasta').val() === '-1') {
      $('#mensaje4').html('Debe seleccionar una hora hasta v&#225;lida.');
      $('#mensaje4').show();
      return false;
    }

    if ($('#horaDesde').val() === '-1' && $('#horaHasta').val() !== '-1') {
      $('#mensaje4').html('Debe seleccionar una hora desde v&#225;lida.');
      $('#mensaje4').show();
      return false;
    }

    if (
      $('#horaDesde option:selected').attr('hora') !== '-1' &&
      $('#horaHasta option:selected').attr('hora') !== '-1'
    ) {
      let stt = new Date(
        `November 13, 2013 ${$('#horaDesde option:selected').attr('hora')}`,
      );
      stt = stt.getTime();
      let endt = new Date(
        `November 13, 2013 ${$('#horaHasta option:selected').attr('hora')}`,
      );
      endt = endt.getTime();

      if (endt <= stt) {
        $('#mensaje4').html('La hora Hasta debe ser mayor a la hora Desde.');
        $('#mensaje4').show();
        return false;
      }
    }
    return true;
  }

  static changeProfesional() {
    $('#horaDesde, #horaHasta, #fechaTurno').prop('disabled', false);
    // TODO $('#fechaTurno').datepicker('update', new Date());
    $('#btnBuscarProximoTurno').prop('disabled', 'disabled');
    $('#resultados, #mensaje4').hide(200);
    $('#horaDesde').val('00:00');
    $('#horaHasta').val('23:59');
  }

  static getLabelFecha(fecha) {
    const year = fecha.split('/')[2];
    const monthDay = fecha.split('/')[1];
    const day = fecha.split('/')[0];

    const date = new Date(year, monthDay - 1, day);
    const dayOfWeek = date.getUTCDay();
    let diaSemana = '';
    switch (dayOfWeek) {
      case 0:
        diaSemana = 'Domingo';
        break;
      case 1:
        diaSemana = 'Lunes';
        break;
      case 2:
        diaSemana = 'Martes';
        break;
      case 3:
        diaSemana = 'Miercoles';
        break;
      case 4:
        diaSemana = 'Jueves';
        break;
      case 5:
        diaSemana = 'Viernes';
        break;
      case 6:
        diaSemana = 'Sabado';
        break;
      case 7:
        diaSemana = 'Domingo';
        break;
      default:
        diaSemana = '';
    }

    const month = date.getMonth() + 1;
    let strMonth = '';
    switch (month) {
      case 1:
        strMonth = 'Enero';
        break;
      case 2:
        strMonth = 'Febrero';
        break;
      case 3:
        strMonth = 'Marzo';
        break;
      case 4:
        strMonth = 'Abril';
        break;
      case 5:
        strMonth = 'Mayo';
        break;
      case 6:
        strMonth = 'Junio';
        break;
      case 7:
        strMonth = 'Julio';
        break;
      case 8:
        strMonth = 'Agosto';
        break;
      case 9:
        strMonth = 'Septiembre';
        break;
      case 10:
        strMonth = 'Octubre';
        break;
      case 11:
        strMonth = 'Noviembre';
        break;
      case 12:
        strMonth = 'Diciembre';
        break;
      default:
        strMonth = '';
    }

    const f = `${diaSemana} ${day} de ${strMonth} de ${year}`;
    return f;
  }

  constructor(props) {
    super(props);

    this.state = {
      telContactCenter: '0810-333-8876',
      integranteSeleccionado: 'Integrantes',
      mensaje1: this.props.mensaje1,
      mensaje2: this.props.mensaje2,
      mensaje3: this.props.mensaje3,
      mensaje4: this.props.mensaje4,
      paso: '1',
      tipoTurno: '',
      especialidad: '',
      practica: '',
    };

    this.seleccionarIntegrante = this.seleccionarIntegrante.bind(this);
    this.changeTipoTurno = this.changeTipoTurno.bind(this);
    this.changeEspecialidades = this.changeEspecialidades.bind(this);
    this.changePractica = this.changePractica.bind(this);
    this.cargaPreparaciones = this.cargaPreparaciones.bind(this);
    this.selectCentro = this.selectCentro.bind(this);
    this.changeSexoProfesional = this.changeSexoProfesional.bind(this);
    this.cargaProfesionales = this.cargaProfesionales.bind(this);
    // changeProfesional = this.changeProfesional.bind(this);
    this.buscaPrimeroDisponible = this.buscaPrimeroDisponible.bind(this);
    // this.validaFechas = this.validaFechas.bind(this);
    this.buscaTurnos = this.buscaTurnos.bind(this);
    // this.getLabelFecha = this.getLabelFecha.bind(this);
    this.nextScreen = this.nextScreen.bind(this);
  }

  componentDidMount() {
    $('#fechaTurno').datepicker({
      language: 'es',
      format: 'dd/mm/yyyy',
      startView: 2,
      startDate: '-0d',
      endDate: '+500d',
    });
    $('#fechaTurno').datepicker('update', new Date());
  }

  componentWillReceiveProps(nextProps) {
    // Si se cambio el combo de practicas
    if (
      JSON.stringify(this.props.practicasOptions) !==
      JSON.stringify(nextProps.practicasOptions)
    ) {
      if ($('#practic').is(':enabled')) {
        if (nextProps.practicasOptions.length === 1) {
          $('#mensaje2')
            .html(
              'Para esta especialidad no existen pr&#225;cticas a elegir, por favor seleccione Lugar de Atenci&#243;n.',
            )
            .show(200);
          this.cargaCentros();
        } else if (nextProps.practicasOptions.length === 2) {
          setTimeout(() => {
            $('#practic option:eq(1)').prop('selected', true);
            this.changePractica();
            this.cargaCentros();
          }, 0);
        } else {
          $('#practic').val('0');
          this.changePractica();
        }
      }
    }

    // Si se actualiza el texto de preparaciones lleno el data-content para mostrar popover
    if (
      JSON.stringify(this.props.preparacionesText) !==
      JSON.stringify(nextProps.preparacionesText)
    ) {
      setTimeout(() => {
        let textoPreparacion = '';
        $('#ticketPreparacion span').each(function() {
          textoPreparacion += $(this).text();
        });
        if (textoPreparacion !== '') {
          $(
            '#trTicketPreparacion, #btnPreparacion, #verBotonPreparacion',
          ).show();
          $('#verPreparacion').attr('data-content', textoPreparacion).popover();
        }
      }, 0);
    }

    // Si se busco proxima fecha disponible
    if (
      JSON.stringify(this.props.fechaPrimerTurnoDisponble) !==
      JSON.stringify(nextProps.fechaPrimerTurnoDisponble)
    ) {
      setTimeout(() => {
        const fechaSeleccinadaSplit = $('#fechaTurno').val().split('/');

        // Obtengo la fecha seleccionada y le saco los "/"
        const fechaSeleccionadaYMD =
          fechaSeleccinadaSplit[2] +
          fechaSeleccinadaSplit[1] +
          fechaSeleccinadaSplit[0];

        // Fecha seleccionada formato DD/MM/YYYY
        const fechaSeleccionadaBarsDMY = $('#fechaTurno').val();

        // Convierto la fecha que vino del servicio de formato YYYYMMDD a YYYY/MM/DD
        const fechaPrimerTurnoDisponbleYear = nextProps.fechaPrimerTurnoDisponble[0].text.substr(
          0,
          4,
        );
        const fechaPrimerTurnoDisponbleMonth = nextProps.fechaPrimerTurnoDisponble[0].text.substr(
          4,
          2,
        );
        const fechaPrimerTurnoDisponbleDay = nextProps.fechaPrimerTurnoDisponble[0].text.substr(
          6,
        );
        const fechaPrimerTurnoDisponbleBarsYMD = `${fechaPrimerTurnoDisponbleYear}/${fechaPrimerTurnoDisponbleMonth}/${fechaPrimerTurnoDisponbleDay}`;

        const fechaPrimerTurnoDisponbleBarsYMDSplit = fechaPrimerTurnoDisponbleBarsYMD.split(
          '/',
        );
        // Convierto la fecha que vino del servicio de formato YYYY/MM/DD a DD/MM/YYYY
        const fechaPrimerTurnoDisponbleBarsDMY = `${fechaPrimerTurnoDisponbleBarsYMDSplit[2]}/${fechaPrimerTurnoDisponbleBarsYMDSplit[1]}/${fechaPrimerTurnoDisponbleBarsYMDSplit[0]}`;

        if (
          nextProps.fechaPrimerTurnoDisponble[0].text !== fechaSeleccionadaYMD
        ) {
          if (nextProps.fechaPrimerTurnoDisponble[0].text === '') {
            /*
            console.log('2');
            console.log(nextProps.fechaPrimerTurnoDisponble[0].text);
            */

            $('#mensaje4').html('No se encontraron turnos disponibles.');
            $('#mensaje4').show();
            $('body').css('cursor', 'default');
            $('#btnBuscarProximoTurno').prop('disabled', 'disabled');
          } else {
            // console.log('3');

            /* TODO ?
            const year = fechaSeleccinadaSplit[2];
            const month = fechaSeleccinadaSplit[1];
            const day = fechaSeleccinadaSplit[0];
            */
            /* TODO ?
            if (
              this.getLabelFecha(fechaSeleccionadaBarsDMY) ===
                this.getLabelFecha(fechaSeleccionadaBarsDMY) ||
              mensaje == '0'
            ) {
              $('#mensaje4').hide();
            }
            */

            $('#mensaje4').html(
              `No se encontraron turnos disponibles para el <span id="diaBusqueda">${SolicitudTurnoPage.getLabelFecha(
                fechaSeleccionadaBarsDMY,
              )}</span>. El pr&#243;ximo turno disponible es el <span style="color:red;">${SolicitudTurnoPage.getLabelFecha(
                fechaPrimerTurnoDisponbleBarsDMY,
              )}</span>.`,
            );
            $('#mensaje4').show();

            $('#fechaTurno').datepicker(
              'update',
              new Date(
                fechaPrimerTurnoDisponbleYear,
                fechaPrimerTurnoDisponbleMonth,
                fechaPrimerTurnoDisponbleDay,
              ),
            );
            this.buscaTurnos(nextProps.fechaPrimerTurnoDisponble[0].text);
          }
        } else {
          $('#mensaje4').hide();
          this.buscaTurnos(nextProps.fechaPrimerTurnoDisponble[0].text);
        }
      }, 0);
    }
  }

  seleccionarIntegrante(inteSel) {
    this.setState({ integranteSeleccionado: inteSel });
    $(
      '#mensaje1, #mensaje2, #mensaje3, #mensaje4, #btnPreparacion, #verBotonPreparacion, #cent, #divFechaBusqueda, #resultados',
    ).hide(200);
    $('#tipoTurno').val(0);
    $('#espec, #practic, #sexoProf, #prof').val(0).prop('disabled', 'disabled');
    $('#horaDesde').val('00:00');
    $('#horaHasta').val('23:59');
    $('#horaDesde, #horaHasta, #fechaTurno, #btnBuscarProximoTurno').prop(
      'disabled',
      'disabled',
    );
    // TODO alert('FALTA VALIDAR TURNO???');
  }

  validaTotalEspecialidades() {
    $('body').css('cursor', 'progress');
    // TODO alert('FALTA VALIDAR TURNO???');
    this.cargaPracticas();
  }

  cargaPracticas() {
    if ($('#espec').val() !== '0') {
      if ($('#espec option:selected').attr('data-visualiza') === 'V') {
        $('body').css('cursor', 'default');
        $('#div_carga').hide(200);
        $('#mensaje1').html(
          `Para la asignaci&#243;n de este turno le solicitamos se comunique por favor con nuestro Contact Center al 
            ${this.state.telContactCenter}.`,
        );
        $('#mensaje1').show(200);
      } else {
        // $.support.cors = true;
        const integranteOptionSelected = $('#integrante option:selected');
        let sexo = integranteOptionSelected.attr('data-sexo');
        let edad = integranteOptionSelected.attr('data-edad');
        const especialidad = $('#espec').val();
        edad = '32';
        sexo = 'M';
        this.props.fetchPracticas(sexo, edad, especialidad);

        $('#practic').prop('disabled', false);
        $('body').css('cursor', 'default');

        // FUNCION EN COMPONENTWILLRECEIVEPROPS PARA OCULTAR O MOSTRAR MENSAJE Y LLAMAR A CARGAR CENTROS this.cargaCentros si es necesario
      }
    }
  }

  cargaCentros() {
    if ($('#practic option:selected').attr('data-visualiza') === 'V') {
      $('body').css('cursor', 'default');
      if ($('#mensaje2').attr('class') === 'alert alert-danger') {
        $('#mensaje2').toggleClass('alert-danger');
        $('#mensaje2').toggleClass('alert-info');
      }
      $('#mensaje2')
        .html(
          `Para la asignaci&#243;n de este turno con la practica seleccionada, le solicitamos se comunique por favor con nuestro Contact Center al 
            ${this.state.telContactCenter}.`,
        )
        .show(200);
    } else {
      $('body').css('cursor', 'progress');

      const integranteOptionSelected = $('#integrante option:selected');
      let sexo = integranteOptionSelected.attr('data-sexo');
      let edad = integranteOptionSelected.attr('data-edad');
      const especialidad = $('#espec').val();
      const practica = $('#practic').val();

      edad = '32';
      sexo = 'M';

      this.props.fetchCentros(sexo, edad, especialidad, practica);
      $('#cent').find('input:checkbox').prop('checked', false);
      $('#cent').show(200);
      $('body').css('cursor', 'default');
    }
  }

  changePractica() {
    $(
      '#mensaje3, #mensaje4, #btnPreparacion, #verBotonPreparacion, #divFechaBusqueda, #resultados, #cent',
    ).hide(200);

    $(
      '#sexoProf, #prof, #horaDesde, #horaHasta, #fechaTurno, #btnBuscarProximoTurno',
    ).prop('disabled', 'disabled');
    $('#horaDesde').val('00:00');
    $('#horaHasta').val('23:59');

    if ($('#practic').val() !== '0') {
      $('#mensaje2').hide(200);
      if ($('#practic option:selected').attr('data-visualiza') === 'V') {
        if ($('#mensaje2').attr('class') === 'alert alert-info') {
          $('#mensaje2').toggleClass('alert-danger');
          $('#mensaje2').toggleClass('alert-info');
        }
        $('#mensaje2').html($('#espec option:selected').attr('data-mensaje'));
        $('#mensaje2').show(200);
      } else {
        $('#cent').show(200);
        this.cargaPreparaciones();
        this.cargaCentros();
      }
    } else {
      if ($('#mensaje2').attr('class') === 'alert alert-info') {
        $('#mensaje2').toggleClass('alert-danger');
        $('#mensaje2').toggleClass('alert-info');
      }
      $('#mensaje2').html('Debe seleccionar una pr&#225;ctica');
      $('#mensaje2').show(200);
    }
  }

  cargaPreparaciones() {
    if ($('#practic').val() !== '0') {
      $('body').css('cursor', 'progress');
      const prestacion = $('#practic option:selected').attr('data-prestac');
      const filtro = 'A';
      const consulta = '';
      this.props.fetchPreparaciones(prestacion, filtro, consulta);
      $('body').css('cursor', 'default');
    }
  }

  selectCentro(e) {
    $('#mensaje3, #mensaje4, #resultados').hide(200);
    $('#btnBuscarProximoTurno').prop('disabled', 'disabled');
    $('#horaDesde').val('00:00');
    $('#horaHasta').val('23:59');

    let centroSanLuis = false;
    let centroBarrioNorte = false;
    const fields = $("input[name='centros']").serializeArray();
    for (let i = 0; i < fields.length; i += 1) {
      if (fields[i].value === '4') {
        centroSanLuis = true;
      }
      if (fields[i].value === '12') {
        centroBarrioNorte = true;
      }
    }

    if (fields.length === 0) {
      //  TODO $('#prof').html("<option prestad='0'>Profesional</option>");
      $(
        '#prof, #sexoProf, #horaDesde, #horaHast, #fechaTurno, #btnBuscarProximoTurno',
      ).prop('disabled', 'disabled');
      $('#divFechaBusqueda, #resultados').hide(200);
      $('#horaDesde').val('00:00');
      $('#horaHasta').val('23:59');
    } else {
      $('#mensaje2').hide(200);
      if ($('#practic').val() !== '0') {
        if (
          $.trim($('#practic option:selected').attr('prestac')) === 'MA10005' &&
          (centroSanLuis || centroBarrioNorte)
        ) {
          $(
            '#sexoProf, #prof, #horaDesde, #horaHasta, #fechaTurno, #btnBuscarProximoTurno',
          ).prop('disabled', 'disabled');
          $('#divFechaBusqueda, #resultados').hide(200);
          $('#horaDesde').val('00:00');
          $('#horaHasta').val('23:59');

          $('#mensaje2')
            .html(
              `Para solicitar un turno con esta pr&#225;ctica, en los centros Swiss Medical Center Barrio Norte o Centro M&#233;dico San Luis, le solicitamos se comunique por favor con nuestro Contact Center al ${this
                .state.telContactCenter}.`,
            )
            .show(200);

          // TODO $('#prof').html("<option prestad='0'>Profesional</option>");

          return;
        }
        $('#mensaje2').hide(200);
      }
      $('#sexoProf, #horaDesde, #horaHasta, #fechaTurno').prop(
        'disabled',
        false,
      );
      $('#sexoProf').val('-1');
      // TODO $('#fechaTurno').datepicker('update', new Date());
      $('#divFechaBusqueda').show(200);
      this.cargaProfesionales();
    }

    let msje = '';
    const $opts = $('#cent').find('input');
    $opts.each(function() {
      if ($(this).prop('checked')) {
        if (
          $.trim($(this).attr('observacion')) !== '' ||
          $.trim($(this).attr('mensajeEdad')) !== ''
        ) {
          msje += `<b>${$(this).attr('nombreCentro')}:</b><br/>`;
          if ($(this).attr('mensajeEdad') !== '') {
            msje += `${$(this).attr('mensajeEdad')}<br/>`;
          }
          if ($(this).attr('observacion') !== '') {
            msje += `${$(this).attr('observacion')}<br/>`;
          }
        }
      }
    });
    if (msje !== '') {
      $('#mensaje2').html(msje);
      $('#mensaje2').show(200);
    } else {
      $('#mensaje2').hide();
    }

    const checkClicked = $(e.target);
    if (checkClicked.attr('data-visualiza') === 'V') {
      if (checkClicked.checked) {
        checkClicked.checked = false;
        if (fields.length === 1) {
          $(
            '#sexoProf, #prof, #horaDesde, #horaHasta, #fechaTurno, #btnBuscarProximoTurno',
          ).prop('disabled', 'disabled');

          // TODO $('#prof').html("<option prestad='0'>Profesional</option>");

          $('#divFechaBusqueda').hide(200);
        }
        $('#mensaje2').html(checkClicked.attr('data-mensaje'));
        $('#mensaje2').show(200);
      } else {
        $('#mensaje2').hide(200);
      }
    }
  }

  cargaProfesionales() {
    if ($('#sexoProf').val() !== '0') {
      const fields = $("input[name='centros']").serializeArray();
      if (fields.length === 0) {
        $('body').css('cursor', 'default');
        $('#mensaje2').show();
        $('#mensaje2').html('Debe seleccionar al menos un centro de atencion.');
        return false;
      }
      $('body').css('cursor', 'progress');
      let ids = '';
      for (let i = 0; i < fields.length; i += 1) {
        ids += `${fields[i].value};`;
      }

      const edad = '32';
      const especialidad = $('#espec').val();
      const practica = $('#practic').val() === '0' ? '' : $('#practic').val();
      const centro = ids;
      const sexo = $('#sexoProf').val() === '0' ? '' : $('#sexoProf').val();
      this.props.fetchProfesionales(edad, especialidad, practica, centro, sexo);

      $('#sexoProf, #prof').prop('disabled', false);
      $('body').css('cursor', 'default');
    }
    return true;
  }

  changeSexoProfesional() {
    $('#mensaje3, #mensaje4, #resultados').hide(200);
    $('#prof, #horaDesde, #horaHasta, #btnBuscarProximoTurno').prop(
      'disabled',
      'disabled',
    );
    // TODO $('#prof').html("<option prestad='0'>Profesional</option>");
    $('#horaDesde').val('00:00');
    $('#horaHasta').val('23:59');

    if ($('#sexoProf').val() !== '0') {
      $('#horaDesde, #horaHasta, #fechaTurno').prop('disabled', false);
      $('#fechaTurno').datepicker('update', new Date());
      this.cargaProfesionales();
    }
  }

  buscaPrimeroDisponible() {
    if ($('#fechaTurno').val() === '') {
      $('#fechaTurno').focus();
    } else if (SolicitudTurnoPage.validaFechas()) {
      $('body').css('cursor', 'progress');

      const ids = [];
      const fields = $("input[name='centros']").serializeArray();

      for (let i = 0; i < fields.length; i += 1) {
        ids.push(parseInt(fields[i].value, 10));
      }

      /*
        const fechaSplit = $('#fechaTurno').val().split('/'); 
        const fecha = new Date(
          `${fechaSplit[2]}.${fechaSplit[1]}.${fechaSplit[0]}`,
        ).getTime() / 1000;
      */

      // Obtengo la fecha seleccionada y le saco los "/"
      const fechaSeleccinadaSplit = $('#fechaTurno').val().split('/');
      const fecha =
        fechaSeleccinadaSplit[2] +
        fechaSeleccinadaSplit[1] +
        fechaSeleccinadaSplit[0];

      let horaDesde = '00:00';
      let horaHasta = '23:59';

      if ($('#horaDesde').val() !== '-1') {
        horaDesde = $('#horaDesde').val();
      }

      if ($('#horaHasta').val() !== '-1') {
        horaHasta = $('#horaHasta').val();
      }

      const prestador = $('#prof').val() === '0' ? '' : $('#prof').val();
      const dias = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE'];
      const practicas =
        $('#practic').val() === '0' ? '' : parseInt($('#practic').val(), 10);
      const sexoProf =
        $('#sexoProf').val() === '0' || $('#sexoProf').val() === '-1'
          ? ''
          : $('#sexoProf').val();
      const especialidad = $('#espec').val();
      const dataParams = {
        prestad: prestador,
        dias,
        fechaDesde: fecha,
        horaDesde: horaDesde.replace(':', ''),
        horaHasta: horaHasta.replace(':', ''),
        primeraVez: true,
        estado: 'L',
        centros: ids,
        practicas: [practicas],
        esConsultorio: false,
        aplicativo: 'CMA',
        idEspecialidad: parseInt(especialidad, 10),
        cantidad: 1,
        sexo: sexoProf,
        username: 'darioa',
      };

      this.props.fetchPrimerFechaDisponible(dataParams);
      // CONTINUA EN componentWillReceiveProps
      $('body').css('cursor', 'default');
    }
  }

  buscaTurnos(fecha) {
    const ids = [];
    const fields = $("input[name='centros']").serializeArray();

    for (let i = 0; i < fields.length; i += 1) {
      ids.push(parseInt(fields[i].value, 10));
    }

    /*
      const fechaSplit = $('#fechaTurno').val().split('/'); 
      const fecha = new Date(
        `${fechaSplit[2]}.${fechaSplit[1]}.${fechaSplit[0]}`,
      ).getTime() / 1000;
    */

    let horaDesde = '00:00';
    let horaHasta = '23:59';

    if ($('#horaDesde').val() !== '-1') {
      horaDesde = $('#horaDesde').val();
    }

    if ($('#horaHasta').val() !== '-1') {
      horaHasta = $('#horaHasta').val();
    }

    const prestador = $('#prof').val() === '0' ? '' : $('#prof').val();
    const dias = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE'];
    const practicas =
      $('#practic').val() === '0' ? '' : parseInt($('#practic').val(), 10);
    const sexoProf =
      $('#sexoProf').val() === '0' || $('#sexoProf').val() === '-1'
        ? ''
        : $('#sexoProf').val();
    const especialidad = $('#espec').val();
    const dataParams = {
      prestad: prestador,
      dias,
      fechaDesde: fecha.toString(),
      horaDesde: horaDesde.replace(':', ''),
      horaHasta: horaHasta.replace(':', ''),
      primeraVez: true,
      estado: 'L',
      centros: ids,
      practicas: [practicas],
      soloFecha: true,
      esConsultorio: false,
      idEspecialidad: parseInt(especialidad, 10),
      cantidad: 1,
      sexo: sexoProf,
    };

    this.props.fetchTurnoPorFecha(dataParams);

    $('body').css('cursor', 'default');
    $('#headerFecha').html(SolicitudTurnoPage.getLabelFecha(fecha));

    /* HACER EL SERVICIO ERROR IGUAL QUE SIEMPRE MENSAJE 1
        success: function(data) {
          var xml = data,
          xmlDoc = $.parseXML( xml ),
          $xml = $( xmlDoc ),
          $turno= $xml.find('turno');
    
          
          
        
          $("body").css("cursor", "default");
          $('#resultados').show();
          $("#btnBuscarProximoTurno").prop('disabled', false);
          filtraHorario();
        }
    });
*/
  }

  changeEspecialidades() {
    $(
      '#mensaje1, #mensaje2, #mensaje3, #mensaje4, #divFechaBusqueda, #resultados, #btnPreparacion, #verBotonPreparacion',
    ).hide(200);
    $(
      '#sexoProf, #fechaTurno, #btnBuscarProximoTurno, #prof, #horaDesde, #horaHasta',
    ).prop('disabled', 'disabled');
    $('#horaDesde').val('00:00');
    $('#horaHasta').val('23:59');

    if ($('#espec option:selected').attr('data-visualiza') === 'V') {
      $('#practic').prop('disabled', 'disabled');
      if ($('#mensaje2').attr('class') === 'alert alert-info') {
        $('#mensaje2').toggleClass('alert-danger');
        $('#mensaje2').toggleClass('alert-info');
      }
      $('#mensaje2')
        .html($('#espec option:selected').attr('data-mensaje'))
        .show(200);
    } else {
      let mensaje = '';
      if (
        $.trim($('#espec option:selected').attr('data-mensaje_edad')) !== ''
      ) {
        mensaje += `${$('#espec option:selected').attr(
          'data-mensaje_edad',
        )}</br>`;
      }
      if ($.trim($('#espec option:selected').attr('data-observ')) !== '') {
        mensaje += `${$('#espec option:selected').attr('data-observ')}</br>`;
      }
      if (mensaje !== '') {
        if ($('#mensaje2').attr('class') === 'alert alert-danger') {
          $('#mensaje2').toggleClass('alert-danger');
          $('#mensaje2').toggleClass('alert-info');
        }
        $('#mensaje2').html(mensaje);
        $('#mensaje2').show(200);
      } else {
        $('#mensaje2').hide(200);
      }
      this.validaTotalEspecialidades();
    }
  }

  nextScreen(paso) {
    this.setState({
      paso,
      tipoTurno: $('#tipoTurno option:selected').text(),
      especialidad: $('#espec option:selected').text(),
      practica: $('#practic option:selected').text(),
    });
  }

  changeTipoTurno() {
    $(
      '#mensaje1, #mensaje2, #mensaje3, #mensaje4, #divFechaBusqueda, #resultados',
    ).hide(200);
    $(
      '#espec, #practic, #sexoProf, #fechaTurno, #btnBuscarProximoTurno, #prof, #horaDesde, #horaHasta',
    ).prop('disabled', 'disabled');
    $('#verPreparacion').popover('hide');
    $('#horaDesde').val('00:00');
    $('#horaHasta').val('23:59');
    this.cargaEspecialidades();
  }

  cargaEspecialidades() {
    if ($('#tipoTurno').val() !== '0') {
      const integranteOptionSelected = $('#integrante option:selected');
      let sexo = integranteOptionSelected.attr('data-sexo');
      let edad = integranteOptionSelected.attr('data-edad');
      edad = '32';
      sexo = 'M';

      $('body').css('cursor', 'progress');
      // $.support.cors = true;
      this.props.fetchEspecialidades(sexo, edad);
      $('#espec').prop('disabled', false);
      $('body').css('cursor', 'default');
    }
  }

  render() {
    switch (this.state.paso) {
      case '1':
        return (
          <div className={s.root}>
            <div className={s.container}>
              <div className={s.page_header}>
                <h1>
                  Solicitud de Turnos&nbsp;
                  <small className={s.copete}>
                    en Centros M&#233;dicos propios.
                  </small>
                </h1>
              </div>

              <div className="col-md-12" style={{ marginBottom: '20px' }}>
                <div className="clearfix">
                  <div className={`${s.breadcrumb} col-md-12`}>
                    <span className={s.breadcrumb_red}>Solicitar</span>&nbsp;<span>&gt;&gt; Confirmar &gt;&gt; Detalle</span>
                  </div>
                </div>
              </div>

              <div
                className="alert alert-warning"
                role="alert"
                id="mensaje1"
                style={{ display: this.state.mensaje1.display }}
              >
                {this.state.mensaje1.text}
              </div>

              <div className="row clearfix">
                <div className="col-md-6">
                  <div className="form-group col-md-9">
                    <div className="input-group">
                      <span className="input-group-addon">1</span>
                      <div
                        className="col-md-12 row"
                        id="integrantesDropdownDivContainer"
                      >
                        <DropdownIntegrantes
                          style={{ width: '100%' }}
                          setIntegrante={this.seleccionarIntegrante}
                          integrantes={[]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group col-md-9">
                    <div className="input-group">
                      <span className="input-group-addon">2</span>
                      <select
                        id="tipoTurno"
                        className="form-control"
                        required="true"
                        onChange={this.changeTipoTurno}
                        // value={this.state.tipoTurno}
                      >
                        <option id="0" value="0">
                          Tipo de turno
                        </option>
                        <option id="CMA" value="CMA">
                          M&#233;dicos y estudios en centros propios
                        </option>
                        <option id="ODO" value="ODO">
                          Odontol&#243;gico en centros propios
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row clearfix">
                <div className="col-md-6">
                  <div className="form-group col-md-9">
                    <div className="input-group">
                      <span className="input-group-addon">3</span>
                      <select
                        id="espec"
                        className="form-control"
                        required="true"
                        disabled
                        onChange={this.changeEspecialidades}
                      >
                        {this.props.especialidadOptions.map(option =>
                          <option
                            key={option.id}
                            value={option.value}
                            data-mensaje_edad={option.mensaje_edad}
                            data-observ={option.observ}
                            data-espe={option.espe}
                            data-visualiza={option.visualiza}
                            data-mensaje={option.mensaje}
                            style={{ color: option.color }}
                          >
                            {option.text}
                          </option>,
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group col-md-9">
                    <div className="input-group">
                      <span className="input-group-addon">4</span>
                      <select
                        id="practic"
                        className="form-control"
                        required="true"
                        onChange={this.changePractica}
                        disabled
                      >
                        {this.props.practicasOptions.map(option =>
                          <option
                            key={option.id}
                            value={option.value}
                            data-visualiza={option.visualiza}
                            data-mensaje={option.mensaje}
                            data-practica={option.practica}
                            data-prestac={option.prestac}
                          >
                            {option.text}
                          </option>,
                        )}
                      </select>
                    </div>
                  </div>
                  <div
                    id="btnPreparacion"
                    className={`${s.btnPreparacion} col-md-12`}
                  >
                    <a
                      id="verPreparacion"
                      tabIndex="0"
                      className="btn btn-md btn-danger"
                      role="button"
                      data-toggle="popover"
                      data-trigger="focus"
                      title=""
                      data-original-title="PREPARACION"
                    >
                      Preparacion
                    </a>
                  </div>
                </div>
              </div>

              <br />
              <div
                className="alert alert-warning"
                role="alert"
                style={{ display: this.state.mensaje2.display }}
                id="mensaje2"
              >
                {this.state.mensaje2.text}
              </div>

              <div className="row clearfix">
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="col-md-11">
                      <div className="input-group">
                        <span className="input-group-addon">5</span>
                        <div
                          className="input-group-addon well well-sm"
                          style={{ width: '100%' }}
                        >
                          <div className="row">
                            <div className="col-xs-12 col-md-3">
                              Lugar de atención
                            </div>
                            <div
                              className={`${s.selectCentros} col-xs-6 col-md-9 hidden-md-down`}
                            >
                              Seleccione uno o más centros
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="cent" style={{ display: 'none' }}>
                <div className="clearfix">
                  <div className="col-md-12">
                    <div className="form-group row">
                      {this.props.centrosList.map(option =>
                        <div className="col-sm-4" key={option.id}>
                          <div className="row" style={{ marginBottom: '5px' }}>
                            <div
                              className="col-md-3"
                              style={{
                                paddingRight: '0',
                                right: '-5px',
                              }}
                            >
                              <img
                                alt={option.centro}
                                className="hidden-xs hidden-sm hidden-md"
                                style={{ cursor: 'pointer' }}
                                src={image69669}
                              />
                            </div>
                            <div
                              className="col-md-8"
                              style={{
                                paddingLeft: '0',
                                left: '0',
                                width: '70%',
                                lineHeight: '15px',
                              }}
                            >
                              <div
                                className={`${s.centros_card} card card-sm`}
                                style={{ height: '99px' }}
                              >
                                <table height="90px" width="100%">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <span
                                          style={{
                                            color: '#f40000',
                                            fontSize: '11px',
                                          }}
                                        >
                                          {option.centro}
                                        </span>
                                        <br />
                                        <span
                                          style={{
                                            color: '#3d3c3c',
                                            fontSize: '9px',
                                          }}
                                        >
                                          {option.domicilio}
                                          <br />
                                          Tel.: {option.telefono}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <input
                                          type="checkbox"
                                          name="centros"
                                          value={option.idcentro}
                                          onClick={this.selectCentro}
                                          data-visualiza={option.visualiza}
                                          data-mensaje={option.mensaje}
                                          data-domicilio={option.domicilio}
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>,
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row clearfix">
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="col-md-11 row">
                      <div className="col-md-2">Opcional</div>
                      <div className="col-md-10">
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row clearfix">
                <div className="col-md-6">
                  <div className="form-group col-md-9">
                    <div className="input-group">
                      <span className="input-group-addon">6</span>
                      <select
                        id="sexoProf"
                        className="form-control"
                        required="true"
                        onChange={this.changeSexoProfesional}
                        disabled
                      >
                        <option value="0">Sexo del profesional</option>
                        <option value="-1">Sexo Indistinto</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group col-md-9">
                    <div className="input-group">
                      <span className="input-group-addon">7</span>
                      <select
                        id="prof"
                        className="form-control"
                        required="true"
                        onChange={this.changeProfesional}
                        disabled
                      >
                        {this.props.profesionalesOptions.map(option =>
                          <option key={option.id} value={option.value}>
                            {option.text}
                          </option>,
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row clearfix">
                <div className="col-md-12">
                  <div className="form-group col-md-11">
                    <hr style={{ marginBottom: '25px' }} />
                  </div>
                </div>
              </div>

              <div className="row clearfix">
                <div className="col-md-12">
                  <div className="form-group col-md-9">
                    <div className="input-group">
                      <span className="input-group-addon">8</span>
                      <div className="row col-md-12">
                        <div
                          className={`${s.horarios_left} col-xs-12 col-md-3`}
                        >
                          <select
                            id="horaDesde"
                            className="form-control"
                            // onChange="callFrom('horaDesde');"
                            style={{ width: '100%' }}
                            disabled
                          >
                            <option data-hora="00:00">00:00</option>
                            <option data-hora="01:00">01:00</option>
                            <option data-hora="02:00">02:00</option>
                            <option data-hora="03:00">03:00</option>
                            <option data-hora="04:00">04:00</option>
                            <option data-hora="05:00">05:00</option>
                            <option data-hora="06:00">06:00</option>
                            <option data-hora="07:00">07:00</option>
                            <option data-hora="08:00">08:00</option>
                            <option data-hora="09:00">09:00</option>
                            <option data-hora="10:00">10:00</option>
                            <option data-hora="11:00">11:00</option>
                            <option data-hora="12:00">12:00</option>
                            <option data-hora="13:00">13:00</option>
                            <option data-hora="14:00">14:00</option>
                            <option data-hora="15:00">15:00</option>
                            <option data-hora="16:00">16:00</option>
                            <option data-hora="17:00">17:00</option>
                            <option data-hora="18:00">18:00</option>
                            <option data-hora="19:00">19:00</option>
                            <option data-hora="20:00">20:00</option>
                            <option data-hora="21:00">21:00</option>
                            <option data-hora="22:00">22:00</option>
                            <option data-hora="23:00">23:00</option>
                          </select>
                        </div>
                        <div
                          className={`${s.horarios_right} col-xs-12 col-md-3`}
                        >
                          <select
                            id="horaHasta"
                            className="form-control"
                            // onChange="callFrom('horaHasta');"
                            style={{ width: '100%' }}
                            disabled
                          >
                            <option data-hora="23:59">23:59</option>
                            <option data-hora="23:00">23:00</option>
                            <option data-hora="22:00">22:00</option>
                            <option data-hora="21:00">21:00</option>
                            <option data-hora="20:00">20:00</option>
                            <option data-hora="19:00">19:00</option>
                            <option data-hora="18:00">18:00</option>
                            <option data-hora="17:00">17:00</option>
                            <option data-hora="16:00">16:00</option>
                            <option data-hora="15:00">15:00</option>
                            <option data-hora="14:00">14:00</option>
                            <option data-hora="13:00">13:00</option>
                            <option data-hora="12:00">12:00</option>
                            <option data-hora="11:00">11:00</option>
                            <option data-hora="10:00">10:00</option>
                            <option data-hora="09:00">09:00</option>
                            <option data-hora="08:00">08:00</option>
                            <option data-hora="07:00">07:00</option>
                            <option data-hora="06:00">06:00</option>
                            <option data-hora="05:00">05:00</option>
                            <option data-hora="04:00">04:00</option>
                            <option data-hora="03:00">03:00</option>
                            <option data-hora="02:00">02:00</option>
                            <option data-hora="01:00">01:00</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <div
                className="alert alert-warning"
                role="alert"
                style={{ display: 'none' }}
                id="mensaje3"
              />

              <div className="row clearfix">
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="col-md-11">
                      <div className="input-group">
                        <span className="input-group-addon">9</span>
                        <div
                          className="input-group-addon well well-sm"
                          style={{ width: '100%' }}
                        >
                          <div className="row">
                            <div
                              className="col-xs-12 col-md-12"
                              style={{ textAlign: 'left' }}
                            >
                              Ingresar Fecha
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row clearfix">
                <div className="col-md-12">
                  <div id="divFechaBusqueda" style={{ display: 'none' }}>
                    <div className="col-md-8 row">
                      <div className="form-group row">
                        <div className="col-md-6">
                          <div className="input-group">
                            <div className="col-lg-12">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  autoComplete="off"
                                  id="fechaTurno"
                                  data-toggle="tooltip"
                                  data-placement="right"
                                  title="Es necesaria la fecha del turno"
                                  placeholder="DD/MM/AAAA"
                                />
                                <button
                                  className="input-group-addon btn-group btn-group-sm btn-danger"
                                  id="btnBuscarTurno"
                                  tabIndex="0"
                                  data-trigger="focus"
                                  title="BUSCAR"
                                  data-content=""
                                  style={{
                                    backgroundColor: '#d9534f',
                                    borderColor: '#d9534f',
                                    color: '#fff',
                                  }}
                                  onClick={this.buscaPrimeroDisponible}
                                >
                                  Buscar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="col-lg-12">
                            <button
                              className="btn btn-danger"
                              id="btnBuscarProximoTurno"
                              tabIndex="0"
                              data-trigger="focus"
                              title="PROXIMO"
                            >
                              Próximo Disponible
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row clearfix">
                <div className="col-md-12">
                  <div className="form-group col-md-11">
                    <div className="input-group">
                      <span className="input-group-addon">10</span>
                      <div
                        className="input-group-addon well well-sm"
                        style={{ width: '100%' }}
                      >
                        <div className="row">
                          <div className="col-xs-12 col-md-3">
                            Turnos Disponibles
                          </div>
                          <div
                            className={`${s.selectCentros} col-xs-6 col-md-9 hidden-md-down`}
                          >
                            Seleccione un turno
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row clearfix">
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="col-md-12">
                      <div className="input-group" style={{ width: '100%' }}>
                        <div className="row">
                          <div className="col-md-12">
                            <div
                              className="alert alert-warning"
                              role="alert"
                              style={{ display: 'none' }}
                              id="mensaje4"
                            />
                          </div>
                        </div>
                        <div
                          id="resultados"
                          style={{ textAlign: 'center', display: 'none' }}
                        >
                          <div className="row">
                            <div
                              className="col-md-12"
                              style={{ textAlign: 'center' }}
                            >
                              <h4>
                                <span
                                  className="label label-danger"
                                  id="headerFecha"
                                >
                                  fecha
                                </span>
                              </h4>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <table className="table table-hover">
                                <thead style={{ textAlign: 'center' }}>
                                  <tr style={{ textAlign: 'center' }}>
                                    <th style={{ textAlign: 'center' }}>
                                      Hora
                                    </th>
                                    <th style={{ textAlign: 'center' }}>
                                      Apellido
                                    </th>
                                    <th style={{ textAlign: 'center' }}>
                                      Nombre
                                    </th>
                                    <th style={{ textAlign: 'center' }}>
                                      Lugar de atención
                                    </th>
                                  </tr>
                                </thead>
                                <tbody id="bodyResult" />
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-11 mt-3 clearfix">
                <a
                  id="btnSolicitarTurno"
                  tabIndex="0"
                  className="btn btn-md btn-danger float-right"
                  role="button"
                  onClick={() => this.nextScreen('2')}
                >
                  Solicitar Turno
                </a>
                <a
                  id="nuevaBusqueda"
                  tabIndex="0"
                  className="btn-secondary btn float-right"
                  role="button"
                >
                  Nueva búsqueda
                </a>
                <div className="col-md-2 offset-md-8" />
                <div className="col-md-2" />
              </div>

              <div
                id="divImpresion"
                style={{
                  width: '600px',
                  height: '700px',
                  border: 'solid 1px #000',
                  position: 'relative',
                  padding: '10px',
                  display: 'none',
                }}
              >
                <table width="100%">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          textAlign: 'center',
                          width: '50%',
                          verticalAlign: 'middle',
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 'bold',
                            fontFamily:
                              'Trebuchet MS,Helvetica,Jamrul,sans-serif',
                            color: '#D7D7D7',
                            fontSize: '20px',
                          }}
                        >
                          DETALLE DE TURNO
                        </span>
                      </td>
                      <td
                        style={{
                          textAlign: 'right',
                          width: '50%',
                        }}
                      >
                        &#160;
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="3"
                        style={{ borderBottom: 'solid 2px #D7D7D7' }}
                      >
                        &#160;
                      </td>
                    </tr>
                    <tr>
                      <td>&#160;</td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        <span className={s.divImpresionSpanTitle}>
                          D&#237;a y Hora:
                        </span>
                        <br />
                        <span
                          id="ticketDiaHora"
                          className={s.divImpresionSpanContent}
                        />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        <span className={s.divImpresionSpanTitle}>
                          Paciente:
                        </span>
                        <br />
                        <span
                          id="ticketPaciente"
                          className={s.divImpresionSpanContent}
                        />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className={s.divImpresionSpanTitle}>
                          Nro. Socio:
                        </span>
                        <br />
                        <span
                          id="ticketNroSocio"
                          className={s.divImpresionSpanContent}
                        />
                      </td>
                      <td colSpan="2">
                        <span className={s.divImpresionSpanTitle}>
                          Prepaga:
                        </span>
                        <br />
                        <span
                          id="ticketPrepaga"
                          className={s.divImpresionSpanContent}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>&#160;</td>
                    </tr>
                    <tr id="trTicketProfesional">
                      <td colSpan="3">
                        <span className={s.divImpresionSpanTitle}>
                          Profesional:
                        </span>
                        <br />
                        <span
                          id="ticketProfesional"
                          className={s.divImpresionSpanContent}
                        />
                        <br />
                      </td>
                    </tr>
                    <tr id="trTicketReemplazante">
                      <td colSpan="3">
                        <span className={s.divImpresionSpanTitle}>
                          Profesional Reemplazante:
                        </span>
                        <br />
                        <span
                          id="ticketProfesionalReemplazante"
                          className={s.divImpresionSpanContent}
                        />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        <span className={s.divImpresionSpanTitle}>
                          Especialidad:
                        </span>
                        <br />
                        <span
                          id="ticketEspecialidad"
                          className={s.divImpresionSpanContent}
                        />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        <span className={s.divImpresionSpanTitle}>
                          Lugar de atenci&#243;n:
                        </span>
                        <br />
                        <span
                          id="ticketLugarAtencion"
                          className={s.divImpresionSpanContent}
                        />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        <span className={s.divImpresionSpanTitle}>
                          Direcci&#243;n:
                        </span>
                        <br />
                        <span
                          id="ticketDireccion"
                          className={s.divImpresionSpanContent}
                        />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>&#160;</td>
                    </tr>
                    <tr id="trTicketPreparacion">
                      <td colSpan="3">
                        <span className={s.divImpresionSpanTitle}>
                          Preparaci&#243;n:
                        </span>
                        <br />
                        <span
                          id="ticketPreparacion"
                          className={s.divImpresionSpanContent}
                        >
                          {this.props.preparacionesText.map(option =>
                            <span key={option.preparacion.id}>
                              {option.preparacion.descripcion}
                            </span>,
                          )}
                        </span>
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>&#160;</td>
                    </tr>
                    <tr id="trTicketAutorizacion">
                      <td colSpan="3">
                        <span
                          id="ticketAutorizacion"
                          className={s.divImpresionSpanContent}
                        />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>&#160;</td>
                    </tr>
                    <tr id="trTicketMensaje">
                      <td colSpan="3">
                        <span className={s.divImpresionSpanTitle}>
                          Importante:
                        </span>
                        <br />
                        <span
                          id="ticketMensaje"
                          className={s.divImpresionSpanContent}
                        />
                        <br />
                        <span
                          id="ticketMenores"
                          className={s.divImpresionSpanContent}
                        />
                        <br />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case '2': // confirmacion
        return (
          <div className={s.root}>
            <Confirmacion data={this.state} nextScreen={this.nextScreen} />
          </div>
        );
      case '3': // detalle
        return <div className={s.root}>Detalle</div>;
      default:
        return <div className={s.root} />;
    }
  }
}

const mapStateToProps = state => ({
  especialidadOptions: state.turnos.especialidadOptions,
  practicasOptions: state.turnos.practicasOptions,
  centrosList: state.turnos.centrosList,
  profesionalesOptions: state.turnos.profesionalesOptions,
  preparacionesText: state.turnos.preparacionesText,
  fechaPrimerTurnoDisponble: state.turnos.fechaPrimerTurnoDisponble,
  primerTurnoDisponible: state.turnos.primerTurnoDisponible,
  mensaje1: state.turnos.mensaje1,
  mensaje2: state.turnos.mensaje2,
  mensaje3: state.turnos.mensaje3,
  mensaje4: state.turnos.mensaje4,
});

SolicitudTurnoPage.defaultProps = {
  especialidadOptions: [
    {
      id: '0',
      text: 'Especialidad y estudios',
      value: '0',
      mensaje_edad: '',
      observ: '',
      visualiza: '',
      mensaje: '',
      color: '#333',
    },
  ],
  practicasOptions: [
    {
      id: '0',
      text: 'Práctica',
      value: '0',
      practica: '0',
      visualiza: '',
      prestac: '',
      mensaje: '',
    },
  ],
  centrosList: [
    {
      id: '0',
      domicilio: '',
      Prov: '',
      visualiza: '',
      centro: '',
      mensaje__edad: '',
      telefono: '',
      idcentro: '',
      cod__presmed: '',
    },
  ],
  profesionalesOptions: [{ id: '0', text: 'Profesional', value: '0' }],
  preparacionesText: [{ preparacion: { id: '0', descripcion: '' } }],
  fechaPrimerTurnoDisponble: [{ id: '0', text: '' }],
  primerTurnoDisponible: [{ id: '0', text: '' }],
  mensaje1: { text: '', display: 'none' },
  mensaje2: { text: '', display: 'none' },
  mensaje3: { text: '', display: 'none' },
  mensaje4: { text: '', display: 'none' },
};

export default connect(mapStateToProps, turnosAction)(
  withStyles(s)(SolicitudTurnoPage),
);
