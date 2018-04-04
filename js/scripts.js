
        let resolPhones = window.matchMedia('(max-width: 450px)')
        let resolTables = window.matchMedia('(max-width: 800px)')
        function pleaseRecharge() {
            box('Recarga La Pagina Por Favor','');
        }
        function mediaQuerie(markSelect,$mark) {
            if (resolPhones.matches) {
                switch (markSelect != '') {
                    case markSelect == 1:
                        $mark.style.top = '48px'
                        break;
                    case markSelect == 2:
                        $mark.style.top = '145px'
                        break;
                    case markSelect == 3:
                        $mark.style.top = '245px'
                        break;
                    case markSelect == 4:
                        $mark.style.top = '145px'
                        $mark.style.left = '-50px'
                        $mark.style.width = '400px'
                        break;
                    case markSelect == 5:
                        $mark.style.top = '145px'
                        $mark.style.left = '-50px'
                        $mark.style.width = '400px'
                        break;
                    case markSelect == 6:
                        $mark.style.left = '43px'
                        $mark.style.height = '300px'
                        break;
                    case markSelect == 7:
                        $mark.style.left = '143px'
                        $mark.style.height = '300px'
                        break;
                    case markSelect == 8:
                        $mark.style.left = '243px'
                        $mark.style.height = '300px'
                        break;
                }
            } else if (resolTables.matches) {
                switch (markSelect != '') {
                    case markSelect == 1:
                        $mark.style.top = '58px'
                        break;
                    case markSelect == 2:
                        $mark.style.top = '190px'
                        break;
                    case markSelect == 3:
                        $mark.style.top = '325px'
                        break;
                    case markSelect == 4:
                        $mark.style.top = '195px'
                        $mark.style.left = '-60px'
                        $mark.style.width = '525px'
                        break;
                    case markSelect == 5:
                        $mark.style.top = '195px'
                        $mark.style.left = '-60px'
                        $mark.style.width = '525px'
                        break;
                    case markSelect == 6:
                        $mark.style.left = '57px'
                        $mark.style.height = '400px'
                        break;
                    case markSelect == 7:
                        $mark.style.left = '190px'
                        $mark.style.height = '400px'
                        break;
                    case markSelect == 8:
                        $mark.style.left = '325px'
                        $mark.style.height = '400px'
                        break;
                }
            }
        }
        resolTables.addListener(mediaQuerie)
        resolPhones.addListener(mediaQuerie)
        let winPlayes = 0;
        let lossedPlayes = 0;
        const moves = 9;
        let uPositions = [];
        let cPositions = [];
        let $mark
        const $table = document.getElementById('table');
        const $figureSelect = document.getElementById('figures')
        let figureSelected = 'img-c'
        let figureConsole = 'img-x'
        
        $table.addEventListener('click',detect)
        //$table.addEventListener('tab',detect)
        $figureSelect.addEventListener('click',selection)
        //$figureSelect.addEventListener('tab',selection)

        function selection(ev) {
            let actualTarget = ev.target
            if (actualTarget.id != '') {
                let i = 1
                do {
                    if (document.getElementById(`${i}`).innerHTML != '') {
                        full = true
                        i +=9
                    } else {
                        full = false
                        i++
                    }
                } while (i < 9)

                if (full) {
                    box(`El Juego ya Empezo :/`,``)
                } else {
                    figureSelected = actualTarget.value
                    if (figureSelected == 'img-c') {
                        figureConsole = 'img-x'
                    } else {
                        figureConsole = 'img-c'
                    }
                }
            } else {
                setTimeout(()=>{
                    listObjects = document.getElementsByClassName('mark-select')
                    listObjects[0].classList.remove('active-sel')
                    listObjects[1].classList.remove('active-sel')
                    actualTarget.classList.add('active-sel')
                },100)
            }
        }

        function detect(ev) {
            
            if (ev.target.id !=="") {
                let actualTarget = ev.target
                if (actualTarget.className != 'full') {
                    newDiv = document.createElement('div')
                    newDiv.classList.add(figureSelected)
                    actualTarget.appendChild(newDiv)    
                    actualTarget.className = "full"
                    uPositions.push(actualTarget.id)
                    tableEvaluation(uPositions,false)
                } else {
                    return message('mark')
                }
            } else {
                return message('mark')
            }
            var consoleTurn = setTimeout(()=>{
                myTurn();
            },250)
        }

        function myTurn() {
            let consoleTurn = consoleMove()
            if (consoleTurn) {
                newDiv = document.createElement('div')
                newDiv.classList.add(figureConsole)
                consoleTurn.appendChild(newDiv) 
                consoleTurn.className = "full"
                cPositions.push(consoleTurn.id)
                tableEvaluation(false,cPositions)
            } else {
                console.log(`Hubo un error`)
            }
        }

        function consoleMove() {
            let movement = aleatoryMoves()
            let preSelectedBlock = document.getElementById(`${movement}`)

            if (preSelectedBlock.className == "full" || preSelectedBlock === undefined) {
                return newSelectedBlock = consoleMove()
            } else {
                return preSelectedBlock
            }
        }

        function aleatoryMoves() {
            const min = 1
            return Math.round(Math.random() * (moves - min) + min)
        }

        function tableEvaluation(uMoves,cMoves) {
            (uMoves) ? xMoves = uMoves : xMoves = cMoves;
            if (xMoves.length < 5 && xMoves==uMoves) {
                let conca = ''
                orderM = xMoves.sort()
                orderM.map((nmove)=>{
                    conca += nmove
                })
                PlayerWin = casesWinOrLoss(conca,'win')
                if (PlayerWin) {
                    clearTimeout(consoleTurn)
                }
            } else if(xMoves.length < 5 && xMoves==cMoves) {
                let conca = ''
                orderM = xMoves.sort()
                orderM.map((nmove)=>{
                    conca += nmove
                })
                casesWinOrLoss(conca,'loss')
            } else {
                let conca = ''
                orderM = xMoves.sort()
                orderM.map((nmove)=>{
                    conca += nmove
                })
                PlayerWin = casesWinOrLoss(conca,'win')
                if (PlayerWin) {
                    clearTimeout(consoleTurn)
                } else {
                    messageSend('equal')
                    clearTimeout(consoleTurn)
                }
            }
        }

        function mark(markSelect) {
            switch (markSelect != '') {
                case markSelect == 1:
                    $mark = document.createElement('div')
                    $mark.classList.add('myMark')
                    $mark.style.top = '75px'
                    mediaQuerie(markSelect,$mark)
                    table.appendChild($mark)
                    break;
                case markSelect == 2:
                    $mark = document.createElement('div')
                    $mark.classList.add('myMark')
                    $mark.style.top = '240px'
                    mediaQuerie(markSelect,$mark)
                    table.appendChild($mark)
                    break;
                case markSelect == 3:
                    $mark = document.createElement('div')
                    $mark.classList.add('myMark')
                    $mark.style.top = '405px'
                    mediaQuerie(markSelect,$mark)
                    table.appendChild($mark)
                    break;
                case markSelect == 4:
                    $mark = document.createElement('div')
                    $mark.classList.add('myMark')
                    $mark.style.top = '240px'
                    $mark.style.left = '-70px'
                    $mark.style.width = '650px'
                    $mark.style.transform = 'rotateZ(45deg)'
                    $mark.style.animation = 'line_mark2 .5s'
                    mediaQuerie(markSelect,$mark)
                    table.appendChild($mark)
                    break;
                case markSelect == 5:
                    $mark = document.createElement('div')
                    $mark.classList.add('myMark')
                    $mark.style.top = '240px'
                    $mark.style.left = '-70px'
                    $mark.style.width = '650px'
                    $mark.style.transform = 'rotateZ(135deg)'
                    $mark.style.animation = 'line_mark2 .5s'
                    mediaQuerie(markSelect,$mark)
                    table.appendChild($mark)
                    break;
                case markSelect == 6:
                    $mark = document.createElement('div')
                    $mark.classList.add('myMark')
                    $mark.style.top = '0'
                    $mark.style.left = '75px'
                    $mark.style.width = '15px'
                    $mark.style.height = '500px'
                    $mark.style.animation = 'line_mark3 1s'
                    mediaQuerie(markSelect,$mark)
                    table.appendChild($mark)
                    break;
                case markSelect == 7:
                    $mark = document.createElement('div')
                    $mark.classList.add('myMark')
                    $mark.style.top = '0'
                    $mark.style.left = '240px'
                    $mark.style.width = '15px'
                    $mark.style.height = '500px'
                    $mark.style.animation = 'line_mark3 1s'
                    mediaQuerie(markSelect,$mark)
                    table.appendChild($mark)
                    break;
                case markSelect == 8:
                    $mark = document.createElement('div')
                    $mark.classList.add('myMark')
                    $mark.style.top = '0'
                    $mark.style.left = '405px'
                    $mark.style.width = '15px'
                    $mark.style.height = '500px'
                    $mark.style.animation = 'line_mark3 1s'
                    mediaQuerie(markSelect,$mark)
                    table.appendChild($mark)
                    break;
            }
        }

        function casesWinOrLoss(conca,message) {
            switch (conca != "") {
                case conca.indexOf('123') != -1:
                    mark(1)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('456') != -1:
                    mark(2)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('789') != -1:
                    mark(3)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('159') != -1:
                    mark(4)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('357') != -1:
                    mark(5)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('147') != -1:
                    mark(6)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('258') != -1:
                    mark(7)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('369') != -1:
                    mark(8)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('1259') != -1:
                    mark(4)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('1247') != -1:
                    mark(6)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('1347') != -1:
                    mark(6)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('1457') != -1:
                    mark(6)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('1569') != -1:
                    mark(4)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('3569') != -1:
                    mark(8)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('1359') != -1:
                    mark(4)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('1459') != -1:
                    mark(4)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('2458') != -1:
                    mark(7)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('1467') != -1:
                    mark(6)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('1579') != -1:
                    mark(4)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('3567') != -1:
                    mark(5)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('3469') != -1:
                    mark(8)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('12459') != -1:
                    mark(4)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('3689') != -1:
                    mark(8)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('12579') != -1:
                    mark(4)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('3679') != -1:
                    mark(8)
                    messageSend(message)
                    return true
                    break;
                case conca.indexOf('14589') != -1:
                    mark(4)
                    messageSend(message)
                    return true
                    break;
            }
        }

        function messageSend(m) {
            message(m,['¡Jugar de Nuevo!','No Gracias'],()=>{
                setTimeout(()=>{
                    const xMessageBox = document.getElementById('message')
                    let celd
                    for (let i = 0; i < moves; i++) {
                        celd = document.getElementById(`${i+1}`)
                        celd.innerHTML = ''
                        celd.classList.remove('full')
                    }
                    uPositions = []
                    cPositions = []
                    doc.removeChild(xMessageBox)
                    $table.addEventListener('click',detect)
                    $table.addEventListener('tab',detect)
                    $table.removeChild($mark)
                },0)
            },()=>{
                setTimeout(()=>{
                    const xMessageBox = document.getElementById('message')
                    $table.removeEventListener('click',detect)
                    $table.removeEventListener('tab',detect)
                    $table.addEventListener('click',pleaseRecharge)
                    box(`Juego Terminado`,`Partidas ganadas : ${winPlayes} Partidas Perdidas: ${lossedPlayes}`,['RECARGAR PAGINA',''],()=>{
                        setTimeout(()=>{location.reload();},0)
                    })
                    doc.removeChild(xMessageBox)
                })
            })
            table.removeEventListener('click',detect)
        }

        function message(m,buttons = false,fun = false,funC = false) {
            setTimeout(()=>{
                    switch (m !='') {

                    case m == 'win':
                        box('¡Enhorabuena Ganaste!','¿Quieres Jugar de Nuevo?',buttons,fun,funC)
                        winPlayes++
                        break;
                    case m == 'loss':
                        box('Haz Perdido :(','¿Quieres Jugar de Nuevo?',buttons,fun,funC)
                        lossedPlayes++
                        break;
                    case m == 'equal':
                        box('Fue un Empate','¿Quieres Jugar de Nuevo?',buttons,fun,funC)
                        break;
                    case m == 'mark':
                        box('Esa posicion ya fue marcada',' ',buttons,fun,funC)
                        break;
                }
            },100)
        }

        function box(m,m2,buttons = false,bFuncts = false,cancelFuncts = false) {
            const messageBox = document.createElement('div')
            messageBox.classList.add('message')
            messageBox.id = 'message'
            const title = document.createElement('p')
            const text = document.createElement('p')
            title.classList.add('title')
            text.classList.add('text')
            title.innerHTML = m
            text.innerHTML = m2
            messageBox.appendChild(title)
            messageBox.appendChild(text)
            if (buttons) {
                let uButtonOk = document.createElement('button')
                uButtonOk.classList.add('buttonOk')
                uButtonOk.innerHTML = buttons[0]
                messageBox.appendChild(uButtonOk)
                let uButtonNotOK = document.createElement('button')
                uButtonNotOK.classList.add('buttonNotOk')
                uButtonNotOK.innerHTML = buttons[1]
                messageBox.appendChild(uButtonNotOK)
                if (bFuncts) {
                    uButtonOk.addEventListener('click',bFuncts)
                } else {
                    uButtonOk.addEventListener('click',()=>{
                        setTimeout(()=>{
                            doc.removeChild(messageBox)
                        },0)
                    })
                }

                if(cancelFuncts){
                    uButtonNotOK.addEventListener('click',cancelFuncts)
                } else {
                    uButtonNotOK.addEventListener('click',()=>{
                        setTimeout(()=>{
                            doc.removeChild(messageBox)
                        })
                    })
                }

            } else {
                let dButton = document.createElement('button')
                dButton.classList.add('buttonOk')
                dButton.innerHTML = 'Ok'
                dButton.addEventListener('click',()=>{
                    setTimeout(()=>{
                        doc.removeChild(messageBox)
                    },0)
                })
                messageBox.appendChild(dButton)
            }
            doc = document.getElementById('myBody')
            doc.appendChild(messageBox)
        }