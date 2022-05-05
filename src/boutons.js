import * as d3 from 'd3'
import { width, height, COULEUR_PAYS_HOTE, COULEUR_PAYS_NON_HOTE, POLICE } from './index'
import dataWorldCup from './data/dataWorldCup.json'
import { placeParticipants, deleteParticipants } from './blockData'

const worldCupData = dataWorldCup.WorldCups

//Bouton de retour
function placeBoutonRetour(svg) {
    const LARGEUR_BOUTON = 150
    const HAUTEUR_BOUTON = 40
    const COULEUR_BOUTON = 'black'

    svg.append('g').attr('class', 'retour').attr('transform', 'translate(15,15)')
        .style('opacity', 0).transition().duration(750).style('opacity', '1').style('cursor', 'pointer')
    
    //Rectangle bouton retour
    d3.select('.retour').append('rect').attr('class', 'retourRect').attr('width', LARGEUR_BOUTON).attr('height', HAUTEUR_BOUTON).attr('fill', COULEUR_BOUTON).attr('stroke', 'black').attr('rx', '20px').attr('ry', '20px')

    //Text retour
    d3.select('.retour').append('text').text('Retour').attr('font-family', POLICE).attr('text-anchor', 'middle').attr('dominant-baseline', "middle").attr('x', d3.select('.retourRect').attr('width') / 2).attr('y', d3.select('.retourRect').attr('height') / 2)
        .style('fill', 'white').style('font-size', 25)
    
    //Click function to go back to full map    
    d3.select('.retour').on('click', () => {
        let x = width / 2,
            y = height / 2,
            k = 1
        svg.select('.map').transition()
            .duration(750)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 0.5 / k + "px");

        //Put title back
        function title() {
            d3.select('.title').transition().duration(750).style('opacity', 1)
        }
        d3.timeout(title, 400)

        //Faire disparaitre le bouton retour
        deleteRetour()

        //Faire disparaitre les boutons années
        deleteBoutonsAnnees()

        //Faire disparaitre les données de participants
        deleteParticipants()

        //Remettre la couleur aux autres pays
        worldCupData.forEach(coupe => {
            if (coupe.hote == 'South Africa') d3.select('.South.Africa').transition().duration(750).attr('fill', COULEUR_PAYS_HOTE)
            if (coupe.hote == 'United States') d3.select('.United.States').transition().duration(750).attr('fill', COULEUR_PAYS_HOTE)
            if (coupe.hote == 'South Korea') d3.select('.South.Korea').transition().duration(750).attr('fill', COULEUR_PAYS_HOTE)
            d3.select('.' + coupe.hote).transition().duration(750).attr('fill', COULEUR_PAYS_HOTE)
        })
    })
}

//Placer le ou les boutons pour choisir les années
function placeBoutonsAnnees(svg, pays) {
    const LARGEUR_BOUTON = 150
    const HAUTEUR_BOUTON = 40
    const COULEUR_BOUTON = 'black'

    //Get chaque année de coupes du monde pour le pays
    let annees = []
    worldCupData.forEach(coupe => {
        if (coupe.hote == pays) annees.push(coupe.annee)
    })

    //Gérer le groupe avec le ou les boutons.
    svg.append('g').attr('class', 'annees').attr('width', LARGEUR_BOUTON * annees.length).attr('height', HAUTEUR_BOUTON).attr('transform', 'translate(' + ((width / 2) - (LARGEUR_BOUTON / 2)) + ',' + (height - 15 - HAUTEUR_BOUTON) + ')')
        .style('opacity', 0).transition().duration(750).style('opacity', 1)

    //Mettre les boutons dans le rectangle (i sert à la position des boutons)
    let i
    let indexAnnee = 1
    switch (annees.length) {
        case 1:
            i = 0
            break;
        case 2:
            i = -0.5
            break;
    }
    annees.forEach(annee => {
        //Rectangle pour le ou les boutons
        d3.select('.annees').append('g').attr('class', 'boutonAnnee' + indexAnnee + ' boutonAnnee').attr('id', annee).attr('stroke', 'black').attr('transform', 'translate(' + (i * LARGEUR_BOUTON + (i * 10)) + ', 0)').append('rect').attr('class', 'anneeRect' + indexAnnee).attr('width', LARGEUR_BOUTON).attr('height', HAUTEUR_BOUTON).attr('fill', COULEUR_BOUTON).attr('rx', '20px').attr('ry', '20px')

        //Le bouton de l'année pas sélectionné est plus transparent que l'autre
        if (indexAnnee == 2) d3.select('.boutonAnnee2').style('opacity', 0.5)

        //Texte pour les boutons
        d3.select('.boutonAnnee' + indexAnnee).append('text').text(annee).attr('font-family', POLICE).attr('text-anchor', 'middle').attr('dominant-baseline', "middle").attr('x', d3.select('.anneeRect' + indexAnnee).attr('width') / 2).attr('y', d3.select('.anneeRect' + indexAnnee).attr('height') / 2)
            .style('fill', 'white').style('font-size', 25).style('stroke', 'white')

        //Gérer les cliques sur les boutons des années
        if (annees.length == 2) {
            d3.selectAll('.boutonAnnee').on('click', function (d) {
                const anneeClickee = d.path[1].id
                const classClickee = d.path[1].classList[0]

                //Faire apparaitre le rectangle avec les données des participants si click
                if (d3.select('.' + classClickee).style('opacity') == 0.5) placeParticipants(svg, anneeClickee)

                //Rendre l'opacité aux boutons
                d3.selectAll('.boutonAnnee').style('opacity', 0.5)
                d3.select('.' + classClickee).style('opacity', 1)

            })
        }
        i++
        indexAnnee++
    })
    //Curseur pointer
    d3.selectAll('.annees').style('cursor', 'pointer')

    //Faire apparaitre les données des participants
    placeParticipants(svg, annees[0])
}

//Fonction pour supprimer les boutons des années
function deleteBoutonsAnnees() {
    d3.select('.annees').remove()
}

//Fonction pour supprimer le bouton de retour
function deleteRetour(){
    d3.select('.retour').remove()
}

export { placeBoutonRetour, placeBoutonsAnnees, deleteBoutonsAnnees, deleteRetour }