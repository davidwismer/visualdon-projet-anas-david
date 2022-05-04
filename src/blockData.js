import * as d3 from 'd3'
import { width, height } from './index'
import dataWorldCup from './data/dataWorldCup.json'
import emojis from './data/dataEmoji.json'

const worldCupData = dataWorldCup.WorldCups

//Placer le block des données des participants
function placeParticipants(svg, annee) {
    //Remplacer les données si déja
    d3.select('.boxData').remove()
    d3.select('.anecdote').remove()

    const WIDTH_BACKGROUND = width / 3
    const HEIGHT_BACKGROUND = height - 110 //les boutons d'années font 40 de haut + une marge de 15 en bas -> donc on prend 55 en bas et en haut de marge
    const COULEUR_BACKGROUND = '#FDFF8E'
    const MARGIN = 15
    const MARGIN_PARTICIPANTS = 40
    const POLICE_TITRE = 30
    const POLICE_SOUS_TITRE = 25

    //Quel est le pays hote
    let pays = ''
    worldCupData.forEach(coupe => {
        if (coupe.annee == annee) pays = coupe.hote
    })
    if (annee == 2002) pays = 'South Korea / Japan'

    //Créer le groupe qui contient tout
    svg.append('g').attr('class', 'boxData')
        .attr('transform', 'translate(' + (width - 55 + 27.5 - WIDTH_BACKGROUND) + ',' + (height - HEIGHT_BACKGROUND - 55 - 27.5) + ')')
        .style('opacity', 0).transition().duration(750).style('opacity', 1)
    //Créer le rectangle de fond
    d3.select('.boxData').append('rect').attr('class', 'backgroundData').attr('width', WIDTH_BACKGROUND).attr('height', HEIGHT_BACKGROUND)
        .style('fill', COULEUR_BACKGROUND).style('opacity', 0.8)

    //Créer le texte avec Pays et Année.
    d3.select('.boxData').append('g').attr('class', 'paysAnnee').attr('width', WIDTH_BACKGROUND - MARGIN - MARGIN).attr('height', HEIGHT_BACKGROUND / 10)
        .append('text').text(pays + ' - ' + annee).attr('font-family', 'Helvetica').attr('text-anchor', 'middle').attr('dominant-baseline', "middle")
        .attr('x', (WIDTH_BACKGROUND) / 2).attr('y', (HEIGHT_BACKGROUND / 10) / 2)
        .style('font-size', POLICE_TITRE)

    //Créer le bloc avec le podium
    d3.select('.boxData').append('g').attr('class', 'groupPodium').attr('width', WIDTH_BACKGROUND - MARGIN - MARGIN).attr('height', 20 / 100 * HEIGHT_BACKGROUND).attr('transform', 'translate(' + MARGIN + ',' + d3.select('.paysAnnee').attr('height') + ')')
        .append('text').text('Podium').attr('font-family', 'Helvetica').attr('dominant-baseline', "hanging")
        .style('font-size', POLICE_SOUS_TITRE)
    //Créer le podium
    d3.select('.groupPodium').append('g').attr('class', 'podium')
    const podium = d3.select('.podium')
    podium.append('g').attr('class', 'second').attr('transform', 'translate(0,20)').append('rect').attr('width', 50).attr('height', 60).style('fill', 'white')
    podium.append('g').attr('class', 'premier').attr('transform', 'translate(50,0)').append('rect').attr('width', 50).attr('height', 80).style('fill', 'white')
    podium.append('g').attr('class', 'troisieme').attr('transform', 'translate(100,40)').append('rect').attr('width', 50).attr('height', 40).style('fill', 'white')
    podium.attr('transform', 'translate(' + (d3.select('.groupPodium').attr('width') / 2 - 75) + ',' + (d3.select('.groupPodium').attr('height') - MARGIN - 80) + ')')
    //Trouver les liens des drapeaux
    let gagnants = []
    worldCupData.forEach(coupe => {
        if (coupe.annee == annee) gagnants = coupe.podium
    })
    //Gérer les id pour les pays à nom composé
    let gagnantsSplit = []
    for (let i = 0; i < gagnants.length; i++) {
        if (gagnants[i].split(' ').length > 1) {
            let split = gagnants[i].split(' ')
            let splitName = ''
            for (let j = 0; j < split.length; j++) {
                splitName += split[j]
            }
            gagnantsSplit[i] = splitName
        } else {
            gagnantsSplit.push(gagnants[i])
        }
    }

    let lienEmojis = []
    gagnants.forEach(pays => {
        emojis.forEach(emoji => {
            if (pays == emoji.name) lienEmojis.push(emoji.image)
        })
    })
    //Ajouter le texte dans le podium
    d3.select('.premier').append('text').text('1e').attr('font-family', 'Helvetica').attr('text-anchor', 'middle').attr('dominant-baseline', "hanging")
        .attr('transform', 'translate(25,10)')
    d3.select('.second').append('text').text('2e').attr('font-family', 'Helvetica').attr('text-anchor', 'middle').attr('dominant-baseline', "hanging")
        .attr('transform', 'translate(25,10)')
    d3.select('.troisieme').append('text').text('3e').attr('font-family', 'Helvetica').attr('text-anchor', 'middle').attr('dominant-baseline', "hanging")
        .attr('transform', 'translate(25,10)')
    //Ajouter les Drapeaux au podium
    d3.select('.premier').append('image').attr('id', gagnantsSplit[0]).attr('class', gagnants[0]).attr('xlink:href', lienEmojis[0]).attr('width', 40).attr('transform', 'translate(' + 5 + ',' + (-50) + ')')
    d3.select('.second').append('image').attr('id', gagnantsSplit[1]).attr('class', gagnants[1]).attr('xlink:href', lienEmojis[1]).attr('width', 40).attr('transform', 'translate(' + 5 + ',' + (-50) + ')')
    d3.select('.troisieme').append('image').attr('id', gagnantsSplit[2]).attr('class', gagnants[2]).attr('xlink:href', lienEmojis[2]).attr('width', 40).attr('transform', 'translate(' + 5 + ',' + (-50) + ')')

    //Créer le bloc des participants
    let yGroupParticipants = parseFloat(d3.select('.paysAnnee').attr('height')) + parseFloat(d3.select('.groupPodium').attr('height'))
    d3.select('.boxData').append('g').attr('class', 'groupParticipants').attr('width', WIDTH_BACKGROUND - MARGIN - MARGIN).attr('height', 60 / 100 * HEIGHT_BACKGROUND).attr('transform', 'translate(' + MARGIN + ',' + yGroupParticipants + ')')
        .append('text').text('Participants').attr('font-family', 'Helvetica').attr('dominant-baseline', "hanging")
        .style('font-size', POLICE_SOUS_TITRE)
    const LARGEUR_DRAPEAU = 50
    //Création d'un groupe qui accueillera les drapeaux
    d3.select('.groupParticipants').append('g').attr('class', 'participants').attr('width', WIDTH_BACKGROUND - MARGIN - MARGIN - MARGIN_PARTICIPANTS - MARGIN_PARTICIPANTS).attr('height', 60 / 100 * HEIGHT_BACKGROUND - MARGIN_PARTICIPANTS - MARGIN_PARTICIPANTS)
    d3.select('.participants').attr('transform', 'translate(' + ((d3.select('.groupParticipants').attr('width') / 2) - (2 * LARGEUR_DRAPEAU) - (1.5 * MARGIN_PARTICIPANTS)) + ',' + (MARGIN_PARTICIPANTS + 30) + ')')
    //Quels emojis utiliser
    let emojiParticipants = []
    let participants = []
    worldCupData.forEach(coupe => {
        if (coupe.annee == annee) participants = coupe.participants
    })
    participants.forEach(pays => {
        emojis.forEach(emoji => {
            if (emoji.name == pays) emojiParticipants.push(emoji.image)
        })
    })
    //Afficher les emojis
    let indexColonne = 0
    let indexLigne = 0
    let idPays = ''
    for (let pays = 1; pays <= emojiParticipants.length; pays++) {
        let splitPays = participants[pays - 1].split(' ')
        if (splitPays.length > 1) {
            for (let i = 0; i < splitPays.length; i++) {
                idPays += splitPays[i]
            }
        } else {
            idPays = participants[pays - 1]
        }
        let positionX = indexColonne * (LARGEUR_DRAPEAU + MARGIN_PARTICIPANTS)
        let positionY = indexLigne * (LARGEUR_DRAPEAU)
        if(idPays == 'Zaire' || idPays == 'Yugoslavia' || idPays == 'SovietUnion' || idPays == 'NaziGermany' || idPays == 'EastGermany') positionY += 10
        d3.select('.participants').append('image').attr('id', idPays).attr('class', participants[pays - 1]).attr('xlink:href', emojiParticipants[pays - 1]).attr('width', LARGEUR_DRAPEAU)
            .attr('transform', 'translate(' + positionX + ',' + positionY + ')')
        indexColonne++
        if (pays % 4 == 0 && pays != 0) indexLigne++, indexColonne = 0
        idPays = ''
    }

    //Gestion pour les anecdotes
    const WIDTH_ANECDOTE = width / 3
    const HEIGHT_ANECDOTE = height / 5

    d3.select('svg').append('g').attr('class', 'anecdote').attr('width', WIDTH_ANECDOTE)
        .attr('transform', 'translate(' + (width / 2 - WIDTH_ANECDOTE / 1.5) + ',' + (height - HEIGHT_ANECDOTE - 55 - 27.5) + ')')
        .style('opacity', 0).transition().duration(750).style('opacity', 1)
    //Créer rectangle
    d3.select('.anecdote').append('rect').attr('class', 'rectAnecdote').attr('width', WIDTH_ANECDOTE).attr('height', HEIGHT_ANECDOTE)
        .style('fill', COULEUR_BACKGROUND).style('opacity', 0.8)
    //Gérer le texte
    let anecdote = ''
    worldCupData.forEach(coupe => {
        if (coupe.annee == annee) anecdote = coupe.anecdote
    })

    d3.select('.anecdote').append('text').text(anecdote).attr('font-family', 'Helvetica').attr('text-anchor', 'middle').attr('dominant-baseline', "middle")
        .attr('x', WIDTH_ANECDOTE / 2).attr('y', HEIGHT_ANECDOTE / 2)
        .style('font-size', 20)

    //Appel de la fonction pour hover la souris sur les pays
    showCountryName()
}

function showCountryName() {
    d3.selectAll('image').on('mouseover', function (d) {
        const countryName = d.path[0].id
        const translate = d.path[0].attributes[4].nodeValue
        let coords = translate.split('(')
        coords = coords[1].split(')')
        coords = coords[0].split(',')
        const coordX = coords[0]
        const coordY = coords[1]
        const WIDTH = countryName.length * 10
        const HEIGHT = 20

        let positionX = coordX - ((WIDTH - d3.select('#' + countryName).attr('width')) / 2)
        let positionY = coordY - 15
        //Pour les drapeaux différents
        if(countryName == 'Zaire' || countryName == 'Yugoslavia' || countryName == 'SovietUnion' || countryName == 'NaziGermany' || countryName == 'EastGermany') positionY -= 10

        //Definir la bulle avec le nom
        let bulle = d3.select('.' + d.path[1].classList[0]).append('g').attr('class', 'groupBubble').attr('transform', 'translate(' + positionX + ',' + positionY + ')')
            .append('rect').attr('class', 'bubble').attr('width', WIDTH).attr('height', HEIGHT)
            .style('fill', 'lightbluesteel').style('opacity', 0.8)
        //Text dans la bulle
        d3.select('.groupBubble').append('text').text(d.path[0].className.animVal).attr('font-family', 'Helvetica').attr('text-anchor', 'middle').attr('dominant-baseline', "middle").attr('x', bulle.attr('width') / 2).attr('y', bulle.attr('height') / 2)
            .style('font-size', 15).style('fill', 'white')
    })

    //Remove the bubble when leaving the flag with the mouse
    d3.selectAll('image').on('mouseout', function () {
        d3.selectAll('.groupBubble').remove()
    })
}

function deleteParticipants() {
    d3.select('.boxData').remove()
    d3.select('.anecdote').remove()
}

export { placeParticipants, deleteParticipants }