import * as d3 from 'd3'

import placeWorldMap from './map-accueil';

//Place world map
let svg = d3.select('body').append('svg').attr('width', '1000').attr('height', '800')

placeWorldMap(svg)