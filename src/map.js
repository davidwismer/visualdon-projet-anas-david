import * as d3 from 'd3'
import dataCoord from './data/datacoord.geojson'
import dataWorldCup from './data/dataWorldCup.json'
import { placeBoutonsAnnees, deleteBoutonsAnnees } from './boutons'

const worldCupData = dataWorldCup.WorldCups

function placeWorldMap(svg) {
    let width = svg.attr("width"),
        height = svg.attr("height"),
        centered

    //Map and projection
    let projection = d3.geoNaturalEarth1()
        .scale(width / 1.8 / Math.PI)
        .translate([width / 2, height / 2])

    let path = d3.geoPath().projection(projection)

    // Draw the map
    svg.append("g")
        .attr('style', 'stroke-width: 0.5px;')
        .attr('class', 'map')
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
        .attr("d", path)
        .attr('class', function (d) { return d.properties.name })
        .style("stroke", "black")
        .on('click', function (d) {
            //Click function pour gérer le zoom+
            const pays = d.path[0].__data__.properties.name
            const geometry = d.path[0].__data__.geometry
            let paysAutre = []
            let paysClicked = false

            //Agit seulement si le nom du pays est dans la liste des hôtes de coupes du monde
            worldCupData.forEach(coupe => {
                if (!paysClicked && pays == coupe.hote && d3.select('.retour').attr('style') == 'opacity: 0;') {
                    paysClicked = true

                    //Gérer Titre disparition
                    d3.select('.title').style('opacity', 0)

                    //Zoom sur le pays cliqué
                    let x, y, k, centroid = path.centroid(geometry);
                    x = centroid[0];
                    y = centroid[1];
                    k = 5;
                    centered = geometry;
                    svg.select('.map').selectAll("path")
                        .classed("active", centered && function (d) { return d === centered; });
                    svg.select('.map').transition()
                        .duration(750)
                        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                        .style("stroke-width", 0.5 / k + "px");

                    //Changer la couleur des autres pays
                    worldCupData.forEach(coupe => {
                        if (pays !== coupe.hote) {
                            paysAutre.push(coupe.hote)
                        }
                    })

                    //Faire apparaitre le bouton retour
                    d3.select('.retour').transition().duration(750).style('opacity', '1')

                    //Faire apparaitre les boutons pour les années
                    placeBoutonsAnnees(svg, pays)
                }
            })
            paysClicked = false

            //Changer la couleur des autres pays
            paysAutre.forEach(pays => {
                if (pays == 'South Africa') d3.select('.South.Africa').transition().duration(750).attr('fill', 'white')
                if (pays == 'United States') d3.select('.United.States').transition().duration(750).attr('fill', 'white')
                if (pays == 'South Korea') d3.select('.South.Korea').transition().duration(750).attr('fill', 'white')
                d3.select('.' + pays).transition().duration(750).attr('fill', 'white')
            })
        })
}

export { placeWorldMap };