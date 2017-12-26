import { HOST_SERVER } from '../../constants';

export default [
  {
    title: 'MIS DATOS',
    image: 'mis_datos.png',
    to: `${HOST_SERVER}smgnewsite/prepaga/mis_datos.php?origen=barIzq`,
  },
  {
    title: 'MI PLAN',
    image: 'plan.png',
    to: `${HOST_SERVER}smgnewsite/prepaga/mi_plan.php?origen=barIzq`,
  },
  {
    title: 'MI CARTILLA',
    image: 'cartillas.png',
    to: `${HOST_SERVER}smgnewsite/prepaga/cartillaweb.php`,
  },
  {
    title: 'E-FACTURAS',
    image: 'facturas.png',
    to: `${HOST_SERVER}smgnewsite/prepaga/efactura.php?origen=barIzq`,
  },
  {
    title: 'TURNOS ONLINE',
    image: 'turnos.png',
    to: `/turnos`,
  },
  {
    title: 'RESULTADO DE ESTUDIOS',
    image: 'laboratorio.png',
    to: `${HOST_SERVER}smgnewsite/prepaga/laboratorio_imagenes.php?origen=barIzq`,
  },
  {
    title: 'GESTIÓN DE CREDENCIALES',
    image: 'credencialprovi.png',
    to: `${HOST_SERVER}smgnewsite/prepaga/credencialesProvisorias.php?origen=barIzq`,
  },
  {
    title: 'GESTIÓN DE TRAMITES',
    image: 'autorizaciones.png',
    to: `${HOST_SERVER}mgnewsite/prepaga/gestion_tramites.php?origen=barIzq`,
  },
  {
    title: 'HISTORIAL DE ATENCIONES',
    image: 'historial.png',
    to: `${HOST_SERVER}smgnewsite/prepaga/mis_consumos.php?origen=barIzq`,
  },
];
