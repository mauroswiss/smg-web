import {
  FETCH_TURNOS_SUCCESS,
  FETCH_DETALLE_TURNOS_SUCCESS,
  FETCH_REMOVE_TURNOS_SUCCESS,
  CLEAN_TURNOS_LIST,
  FETCH_ESPECIALIDADES_SUCCESS,
  FETCH_ESPECIALIDADES_ERROR,
  FETCH_PRACTICAS_SUCCESS,
  FETCH_PRACTICAS_ERROR,
  FETCH_CENTROS_SUCCESS,
  FETCH_CENTROS_ERROR,
  FETCH_PREPARACIONES_SUCCESS,
  FETCH_PREPARACIONES_ERROR,
  FETCH_PROFESIONALES_SUCCESS,
  FETCH_PROFESIONALES_ERROR,
  FETCH_PRIMER_FECHA_DISPONIBLE_SUCCESS,
  FETCH_PRIMER_FECHA_DISPONIBLE_ERROR,
  FETCH_TURNO_POR_FECHA_SUCCESS,
  FETCH_TURNO_POR_FECHA_ERROR,
  CLEAN_TURNOS_DELETED,
  FETCH_EMAIL_SUCCESS,
  FETCH_PHONE_SUCCESS,
} from '../constants/index';

const defaultPracticas = [
  {
    id: '0',
    text: 'Práctica',
    value: '0',
    practica: '0',
    visualiza: '',
    prestac: '',
    mensaje: '',
  },
];

const defaultProfesionales = [{ id: '0', text: 'Profesional', value: '0' }];

function isObject(val) {
  if (val === null) {
    return false;
  }
  return typeof val === 'function' || typeof val === 'object';
}

// MAESTROS ESPECIALIDADES
function cargaEspecialidades(data) {
  let options = [];
  options = data.map((option, index) => {
    let newOption = {};
    if (option.exten !== '') {
      let color = '#333';
      if (option.visualiza === 'V') {
        color = '#f40000';
      }

      newOption = {
        id: index + 1,
        text: option.exten,
        value: option.espe,
        mensaje_edad: option.mensaje__edad,
        observ: option.observacion,
        visualiza: option.visualiza,
        mensaje: option.mensaje,
        color,
        espe: option.espe,
      };
    }
    return newOption;
  });

  options.unshift({
    id: '0',
    text: 'Especialidad y estudios',
    value: '0',
    mensaje_edad: '',
    observ: '',
    visualiza: '',
    mensaje: '',
    color: '#333',
  });

  return options;
}

function cargaEspecialidadesError() {
  return {
    text:
      'En estos momentos no es posible asignar turnos. Para la asignaci&#243;n de este turno le solicitamos se comunique por favor con nuestro Contact Center al 0810-333-8876',
    display: 'block',
  };
}

// MAESTROS PRACTICAS
function cargaPracticas(data) {
  let options = [];
  options = data.map((option, index) => {
    let newOption = {};
    if (option.exten !== '') {
      newOption = {
        id: index + 1,
        text: option.exten,
        value: option.practica,
        practica: option.practica,
        prestac: option.prestac,
        visualiza: option.visualiza,
        mensaje: option.mensaje,
      };
    }
    return newOption;
  });

  options.unshift({
    id: '0',
    text: 'Práctica',
    value: '0',
    practica: '0',
    visualiza: '',
    prestac: '',
    mensaje: '',
  });

  return options;
}

function cargaPracticasError() {
  return {
    text:
      'En estos momentos no es posible asignar turnos. Para la asignaci&#243;n de este turno le solicitamos se comunique por favor con nuestro Contact Center al 0810-333-8876',
    display: 'block',
  };
}

// MAESTROS CENTROS
function cargaCentros(data) {
  let options = [];
  options = data.map((option, index) => {
    let newOption = {};
    if (option.centro !== '') {
      newOption = {
        id: index + 1,
        domicilio: option.domicilio,
        Prov: option.Prov,
        visualiza: option.visualiza,
        centro: option.centro,
        mensaje__edad: option.mensaje__edad,
        telefono: option.telefono,
        idcentro: option.idcentro,
        cod__presmed: option.cod__presmed,
      };
    }
    return newOption;
  });
  return options;
}

function cargaCentrosError() {
  return {
    text:
      'En estos momentos no es posible asignar turnos. Para la asignaci&#243;n de este turno le solicitamos se comunique por favor con nuestro Contact Center al 0810-333-8876',
    display: 'block',
  };
}

// GET PREPARACIONES
function cargaPreparaciones(data) {
  if (isObject(data)) {
    const newData = { ...data };
    newData.id = 0;
    return [newData];
  }

  let options = [];
  options = data.map((option, index) => {
    let newOption = {};
    if (option.preparacion.titulo !== '') {
      newOption = {
        id: index,
        descripcion: option.preparacion.descripcion,
      };
    }
    return newOption;
  });
  return options;
}

// GET PROFESIONALES
function cargaProfesionales(data) {
  let options = [];
  options = data.map((option, index) => {
    let newOption = {};
    if (option.prestad !== '') {
      newOption = {
        id: index,
        text: `${option.aperazon}, ${option.nombre}`,
        value: option.prestad,
      };
    }
    return newOption;
  });
  return options;
}

// GET PRIMER TURNO DISPONIBLE
// function getTurnoPorFecha(data)
function getTurnoPorFecha() {
  /*
  let options = [];
  options = data.map((option, index) => {
    let newOption = {};
    if (option['hora-desde'] !== '') {
      if (option.nombrereem !== '') {
        newOption = {
          id: index,
          text: `${option.aperazon}, ${option.nombre}`,
          value: option.prestad,
          primeraVez: option['primera-vez'],
          duracion: option['duracion-turno'],
          prestador: option.prestador,
          hora: option['hora-desde'],
          fecha: option['fecha-turno'],
          dia: option['dia'],
          consultorio: option.consultorio,
          idCentro: option['id-centro'],
          dCentro: option['d-centro'],
          nombretitu: option['nombre-abre'],
          apetitu: option['ape-razon'],
          nombrereem: option['ree-nombre-abre'],
          apereem: option['ree-ape-razon'],
          dataContent: option['cant-turnos-necesarios'],
          turnosNecesarios:  `El profesional ${option.aperazon}, ${option.nombre}`,  option['cant-turnos-necesarios'],
        };
      } else {
        newOption = {
          id: index,
          text: `${option.aperazon}, ${option.nombre}`,
          value: option.prestad,
        };
      }
      
      
      if($.trim($(this).attr('nombrereem'))!=''){
      
        data-content="El profesional '+$(this).attr('apetitu')+', '+$(this).attr('nombretitu')+' en el horario seleccionado va a ser reemplazado por el profesional '+$(this).attr('apereem')+', '+$(this).attr('nombrereem')+'">
        <td style="width:30px;">'+$(this).find('hora-desde').text()+'</td><td style="width:130px;">'+$(this).find("ape-razon").text()+'</td>
        <td style="width:130px;">'+$(this).find("nombre-abre").text()+'</td><td>'+$(this).find('d-centro').text()+'</td></tr>';
      } else {
        tr+='<tr primeravez="'+$(this).find('primera-vez').text()+'" duracion="'+$(this).find('duracion-turno').text()+'" 
        prestador="'+$(this).find('prestador').text()+'" hora="'+$(this).find('hora-desde').text()+'" fecha="'+$(this).find('fecha-turno').text()+'" dia="'+$(this).find('dia').text()+'" consultorio="'+$(this).find('consultorio').text()+'" idCentro="'+$(this).find('id-centro').text()+'" dCentro="'+$(this).find('d-centro').text()+'" nombretitu="'+$(this).find('nombre-abre').text()+'" apetitu="'+$(this).find('ape-razon').text()+'" nombrereem="'+$(this).find('ree-nombre-abre').text()+'" apereem="'+$(this).find('ree-ape-razon').text()+'" turnosNecesarios="'+$(this).find('cant-turnos-necesarios').text()+'"><td style="width:30px;">'+$(this).find('hora-desde').text()+'</td><td style="width:130px;">'+$(this).find("ape-razon").text()+'</td><td style="width:130px;">'+$(this).find("nombre-abre").text()+'</td><td>'+$(this).find('d-centro').text()+'</td></tr>';
      }


      
    }
    return newOption;
  });
  return options;
}

var tr='';

$turno.each(function () {
  if($(this).find('hora-desde').text()!=''){
    
  }
});
$('#bodyResult').html(tr);

$( "#bodyResult tr" ).click(function() {
  $trs=$( "#bodyResult" ).find("tr");
  $trs.each(function () {
    $(this).removeClass('active');
    $(this).popover('destroy');
  });
  
  if($(this).attr('class')=='active'){
    $(this).removeClass('active');
    $(this).popover('destroy');
  } else {
    $(this).addClass('active');
    $(this).popover('show');
  }
});
*/
}

// TELEFONOS
function phones(data) {
  let jsonPhones = {};
  let numeroPart;
  let numeroCel;
  let int;
  let caracteristicaCel;
  let caracteristicaPart;
  data.map(phone => {
    if (phone.tipo === 'A') {
      numeroPart = phone.numero;
      int = phone.interno;
      caracteristicaPart = phone.caracteristica;
    }
    if (phone.tipo === 'C') {
      numeroCel = phone.numero;
      caracteristicaCel = phone.caracteristica;
    }
    jsonPhones = {
      cel: {
        numero: numeroCel,
        caracteristica: caracteristicaCel,
      },
      part: {
        numero: numeroPart,
        int,
        caracteristica: caracteristicaPart,
      },
    };
    return jsonPhones;
  });
  return jsonPhones;
}

export default function turnos(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    // LISTADO DE TURNOS OK
    case FETCH_TURNOS_SUCCESS:
      newState.turnos = action.data;
      newState.fechaDesde = action.fechaDesde;
      newState.fechaHasta = action.fechaHasta;
      return newState;

    // DETALLE MODAL TURNOS OK
    case FETCH_DETALLE_TURNOS_SUCCESS:
      newState.detalle = action.data;
      return newState;

    // REMOVE TURNO OK
    case FETCH_REMOVE_TURNOS_SUCCESS:
      newState.remove = action.data;
      return newState;

    // LIMPIAR LISTA TURNOS
    case CLEAN_TURNOS_LIST:
      newState.turnos = null;
      return newState;

    // LIMPIAR STATE DE TURNOS ELIMINADOS
    case CLEAN_TURNOS_DELETED:
      newState.remove = null;
      return newState;

    // MAESTROS ESPECIALIDADES OK
    case FETCH_ESPECIALIDADES_SUCCESS:
      newState.especialidadOptions = cargaEspecialidades(action.data);
      newState.practicasOptions = defaultPracticas;
      newState.profesionalesOptions = defaultProfesionales;
      return newState;

    // MAESTROS ESPECIALIDADES ERROR
    case FETCH_ESPECIALIDADES_ERROR:
      newState.mensaje1 = cargaEspecialidadesError();
      return newState;

    // MAESTROS PRACTICAS OK
    case FETCH_PRACTICAS_SUCCESS:
      newState.practicasOptions = cargaPracticas(action.data);
      newState.profesionalesOptions = defaultProfesionales;
      return newState;

    // MAESTROS PRACTICAS ERROR
    case FETCH_PRACTICAS_ERROR:
      newState.mensaje1 = cargaPracticasError();
      return newState;

    // MAESTROS CENTROS OK
    case FETCH_CENTROS_SUCCESS:
      newState.centrosList = cargaCentros(action.data);
      newState.profesionalesOptions = defaultProfesionales;
      return newState;

    // MAESTROS CENTROS ERROR
    case FETCH_CENTROS_ERROR:
      newState.mensaje1 = cargaCentrosError();
      return newState;

    // GET PREPARACIONES OK
    case FETCH_PREPARACIONES_SUCCESS:
      newState.preparacionesText = cargaPreparaciones(action.data);
      return newState;

    // GET PREPARACIONES ERROR
    case FETCH_PREPARACIONES_ERROR:
      newState.mensaje1 = cargaCentrosError();
      return newState;

    // GET PROFESIONALES OK
    case FETCH_PROFESIONALES_SUCCESS:
      newState.profesionalesOptions = cargaProfesionales(action.data);
      return newState;

    // GET PROFESIONALES ERROR
    case FETCH_PROFESIONALES_ERROR:
      newState.mensaje1 = cargaCentrosError();
      return newState;

    // GET PRIMER FECHA DISPONIBLE OK
    case FETCH_PRIMER_FECHA_DISPONIBLE_SUCCESS:
      newState.fechaPrimerTurnoDisponble = [{ id: 0, text: action.data.fecha }];
      return newState;

    // GET PRIMER FECHA DISPONIBLE ERROR
    case FETCH_PRIMER_FECHA_DISPONIBLE_ERROR:
      newState.mensaje4 = cargaCentrosError();
      return newState;

    // GET TURNO POR FECHA OK
    case FETCH_TURNO_POR_FECHA_SUCCESS:
      newState.primerTurnoDisponible = getTurnoPorFecha(action.data);
      return newState;

    // GET TURNO POR FECHA ERROR
    case FETCH_TURNO_POR_FECHA_ERROR:
      newState.mensaje1 = cargaCentrosError();
      return newState;

    // CONSULTA DE EMAILS PARA CONFIRMACION
    case FETCH_EMAIL_SUCCESS:
      newState.emails = action.data;
      return newState;

    // CONSULTA DE TELEFONOS PARA CONFIRMACION
    case FETCH_PHONE_SUCCESS:
      newState.phones = phones(action.data);
      return newState;

    default:
      return state;
  }
}
