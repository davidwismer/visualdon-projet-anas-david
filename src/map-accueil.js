import * as d3 from 'd3'
import dataCoord from './data/datacoord.geojson'
import dataWorldCup from './data/dataWorldCup.json'

const worldCupData = dataWorldCup.WorldCups

function placeWorldMap(svg) {
    let width = +svg.attr("width"),
        height = +svg.attr("height");


    //Map and projection
    let projection = d3.geoNaturalEarth1()
        .scale(width / 2 / Math.PI)
        .translate([width / 2, height / 2])
    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(dataCoord.features)
        .enter().append("path")
        .attr("fill", function (d) {
            let paysHote = false
            worldCupData.forEach(coupe => {
                if (d.properties.name == coupe.hote) paysHote = true
            });
            if (paysHote) return 'red'
            else return 'white'
        })
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "black")
}

export default placeWorldMap;