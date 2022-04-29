import * as d3 from 'd3'

import { placeWorldMap } from './map'
import {placeBoutonRetour} from './boutons'

//Get viewport dimension
let width = window.innerWidth,
    height = window.innerHeight - 5

//Place svg
let svg = d3.select('body').append('svg').attr('width', width).attr('height', height).attr('style', 'background-color:#2DBFFD;')
//Titre
let title = svg.append('text').attr('class', 'title').text('Pays hôtes des coupes du monde de la FIFA').attr('font-family', 'Helvetica').attr('style', 'font-size:50').attr('text-anchor', 'middle').attr('dominant-baseline', "middle")
title.attr('x', '50%').attr('y', 50)
//Place Map
placeWorldMap(svg)
//Bouton retour
placeBoutonRetour(svg)

export { width, height }