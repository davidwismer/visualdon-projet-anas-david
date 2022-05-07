import * as d3 from 'd3'

import { placeWorldMap } from './map'

const POLICE = 'Helvetica'
const COULEUR_PAYS_NON_HOTE = 'white'
const COULEUR_PAYS_HOTE = '#FFD700'
const COULEUR_MER = '#82CFFD'
const COULEUR_DATA = '#FDFF8E'

//Get viewport dimension
const width = window.innerWidth,
    height = window.innerHeight

//Place svg
const svg = d3.select('body').append('svg')
    .attr('width', width).attr('height', height).attr('xmlns', '"http://www.w3.org/2000/svg"')
    .style('position', 'fixed').style('top', 0).style('bottom', 0).style('background-color', COULEUR_MER)
//Titre
svg.append('text')
    .attr('class', 'title').text('Pays hôtes des coupes du monde de football').attr('font-family', 'Helvetica').attr('style', 'font-size:50').attr('text-anchor', 'middle').attr('dominant-baseline', "middle").attr('x', '50%').attr('y', 50)
//Place Map
placeWorldMap(svg)
//Curseur qui ne change pas
d3.select('svg').style('cursor', 'default')

export { width, height, POLICE, COULEUR_PAYS_HOTE, COULEUR_PAYS_NON_HOTE, COULEUR_MER, COULEUR_DATA }