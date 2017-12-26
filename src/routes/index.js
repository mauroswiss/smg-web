/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

/* eslint-disable global-require */
const routes = {
  path: '/',
  children: [
    {
      path: '/',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/telemedicina',
      load: () =>
        import(/* webpackChunkName: 'telemedicina' */ './telemedicina'),
    },
    {
      path: '/telemedicina/solicitud-turnos',
      load: () =>
        import(/* webpackChunkName: 'telemedicina' */ './telemedicina'),
    },
    {
      path: '/telemedicina/consulta-turnos',
      load: () =>
        import(/* webpackChunkName: 'telemedicinaConsultaTurnos' */ './telemedicina/consultaTurnos'),
    },
    {
      path: '/turnosSolicitud',
      load: () =>
        import(/* webpackChunkName: 'turnosSolicitud' */ './turnosSolicitud'),
    },
    {
      path: '/personas',
      load: () => import(/* webpackChunkName: 'personas' */ './personas'),
    },
    {
      path: '/empresas',
      load: () => import(/* webpackChunkName: 'empresas' */ './empresas'),
    },
    {
      path: '/prestadores',
      load: () => import(/* webpackChunkName: 'prestadores' */ './prestadores'),
    },
    {
      path: '/proveedores',
      load: () => import(/* webpackChunkName: 'proveedores' */ './proveedores'),
    },
    {
      path: '/colaboradores',
      load: () =>
        import(/* webpackChunkName: 'colaboradores' */ './colaboradores'),
    },
    {
      path: '/rrhh',
      load: () => import(/* webpackChunkName: 'rrhh' */ './rrhh'),
    },
    {
      path: '/facturas',
      load: () => import(/* webpackChunkName: 'facturas' */ './facturas'),
    },
    {
      path: '/turnos',
      load: () => import(/* webpackChunkName: 'turnos' */ './turnos'),
    },
    {
      path: '*',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    const route = await next();
    route.title = `${route.title || 'Untitled Page'} - www.swissmedical.com.ar`;
    route.description = route.description || '';
    return route;
  },
};

if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
