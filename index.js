const superagent = require('superagent');
const fs = require('fs');

//MapQuest api
const end = (err,data) => {
  if (err) console.log('Error');
  console.log(data.toString());
  console.log('ejecución finalizada');
}

const leer = () => {
  fs.readFile('organismosMuseos.txt',end)
}

const imprimirMuseos = (error, respuesta) => {
  if (error) {
    throw new Error('algo se rompió', error);
  }
  const museos = respuesta.body.results;
  const mapMuseos = museos.map(m => (
    console.log('escribiendo museo en archivo'),
    `Museo: ${m.nombre}, ${m.direccion}. Por cualquier consulta comunicarse al ${m.telefono}\n`
  ));
  fs.appendFile('organismosMuseos.txt', mapMuseos, requestOrganismos);
}

const imprimirOrganismos = (error, respuesta) => {
  if (error) {
    throw new Error('algo se rompió', error);
  }
  const organismos = respuesta.body.results;
  const mapOrganismos = organismos.map(o => (
    console.log('escribiendo organismo en archivo'),
    `Organismo: ${o.direccion}. Por cualquier consulta comunicarse al ${o.telefono}\n`
  ));
  fs.appendFile('organismosMuseos.txt', mapOrganismos, leer);
}

const requestOrganismos = () => {
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/organismos')
    .query({ format: 'json' })
    .end(imprimirOrganismos)
  console.log('Descargando Organismos');
}

const requestMuseos = () => {
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/museos')
    .query({ format: 'json' })
    .end(imprimirMuseos)
  console.log('Descargando Museos');
}

requestMuseos()