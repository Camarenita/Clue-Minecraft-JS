let listCharacters = ['Alex', 'Ahogado', 'PiglinZombi', 'Esqueleto', 'Zombi'];
let listLotations = ['House', 'Mineshaft', 'Nether', 'Outpost', 'Stronghold'];
let listGuns = ['Hacha', 'Arco', 'Pocion', 'Espada', 'TNT'];

let randomCharacters;
let randomLocations;
let randomGuns;

let stories = [];

let crime = [];

let trys = 0;

let setTrys = 5;

let opt, sLocation, sSuspicious, sGun;

let content= document.getElementById('content');//Revisado
let display = document.getElementById('text');//Revisado
let displayDiv = document.querySelector('#text div');//Revisado
let cont = document.getElementById('cont');//Revisado
let next = document.querySelector('#cont button');
let back = document.getElementById('back');//Revisado
let img = document.createElement('img');//Revisado
let characters = document.querySelectorAll('.characters');
let locations = document.querySelectorAll('.locations');
let guns = document.querySelectorAll('.guns');
let menu = document.querySelectorAll('.menu');
let options = document.querySelectorAll('.options');

let music = new Audio('Songs/otherside.mp3');
music.volume = 0.1;
let click = new Audio('Songs/minecraft_click.mp3');
click.volume = 0.5;

let addText = function(txt){
    let text = document.createElement('p');
    text.innerHTML = txt;
    displayDiv.append(text);
}

let button = function (txt) {
    let btn = document.createElement('button');
    let br = document.createElement('br');
    btn.innerHTML = txt;
    displayDiv.append(br);
    displayDiv.append(btn);
}

let changeImage = function (nameImg) { 
    let img = document.createElement('img');
    let source = document.createElement('source');
    content.innerHTML = '';
    img.setAttribute('src',nameImg);
    content.append(img);
}

let Start = function(){
    music.play();

    for(const men of menu){
        men.style.display = 'none';
    }

    randomCharacters = listCharacters.sort(function() { return Math.random() - 0.5 });
    randomLocations = listLotations.sort(function() { return Math.random() - 0.5 });
    randomGuns = listGuns.sort(function() { return Math.random() - 0.5 });

    changeImage('Beginning/Begin.png');
    addText('Alguien ha matado a Steve, tenemos que encontrar al culpable, la escena del crimen y el arma homicida');
    display.style.display = 'block';
    cont.style.display = 'block';

    stories = [];
    for(let i = 0; i < 5; i++){
        let story = {
            character: randomCharacters[i],
            location: randomLocations[i],
            gun: randomGuns[i]
        }
        stories.push(story);
    }

    crime = {
        character: randomCharacters[Math.floor(Math.random() * 5)],
        location: randomLocations[Math.floor(Math.random() * 5)],
        gun: randomGuns[Math.floor(Math.random() * 5)]
    }
    //console.log(crime);
    //console.log(setTrys);
    next.onclick = function(){
        click.play();
        displayDiv.innerHTML = '';
        cont.style.display = 'none';
        startGame();
    }
}

let instructions = function(){
    for(const men of menu){
        men.style.display = 'none';
    }
    display.style.display = 'block';
    back.style.display = 'block';
    changeImage('Menu/Background.png');
    addText('Han matado a Steve, pero para poder vengar su muerte debemos encontrar al culpable, el arma del homicidio y la escena del crimen.');
    addText('Los sospechosos son: Alex, Ahogado, Piglin Zombificado, Esqueleto o Zombi');
    addText('Las posibles escenas del crimen son: Casa de Alex, Mina abandonada, Nether, Puesto de saqueadores o Fortaleza');
    addText('Las posibles armas homicidas son: Hacha, Arco, Pocion de veneno, Espada o Dinamita')
    addText('Tendras varias oportunidades para encontrar al culpable, la escena del crimen y el arma homicida, para ello habra pistas.');
    addText('Las pistas las encontraras al pinchar en algun personaje, lugar o arma, las pistas estan relacionadas entre si asi que si una pista te dice que Alex estaba en el Nether con el arco, si picas al Nether o al arco te dira lo mismo.');
    addText('Una vez que hayas agotado tus intentos tendras que adivinar y el juego termina.')
    back.onclick = function(){
        click.play();
        displayDiv.innerHTML = '';  
        back.style.display = 'none';
        main();
    }
}

let Options = function(){
    for(const men of menu){
        men.style.display = 'none';
    }
    changeImage('Menu/Options.png');
    for(const optns of options){
        back.style.display = 'block';
        optns.style.display = 'block';
        optns.addEventListener('click', function(event){
            click.play();
            let op = optns.getAttribute('id');
            displayDiv.innerHTML = '';
            switch(op){
                case 'high':
                    music.volume = 0.5;
                    break;
                case 'low':
                    music.volume = 0.1;
                    break;
                case 'easy':
                    setTrys = 5;
                    break;
                case 'hard':
                    setTrys = 3;
                    break;
            }
        });
        back.onclick = function(){
            click.play();
            displayDiv.innerHTML = '';
            back.style.display = 'none';
            main();
        }
    }
    
}

let Credits = function(){
    for(const men of menu){
        men.style.display = 'none';
    }
    display.style.display = 'block';
    back.style.display = 'block';
    changeImage('Menu/Background.png');
    addText('Este juego fue creado varias veces, pero esta es su version final (la mejor claramente), tiene muchas cosas copeadas de empresas muy grandes pero solo es con fines educativos.');
    addText('El autor es Eduardo Camarena Orozo, estudiante de Ingenieria Mecatronia en CETI Colomos, hecho para la materia de Sistemas Expertos.')
    addText('Gracias por jugar, no se aceptan comentarios ni reclamaciones (excepto que los comentarios sean buenos BD)')
    back.onclick = function(){
        click.play();
        displayDiv.innerHTML = '';
        back.style.display = 'none';
        main();
    }   
}  

let startGame = function(){
    trys++;
    changeImage('Menu/Background.png');
    if(trys <= setTrys){
        addText('Pistas:');
        button('Sospechosos');
        button('Locaciones');
        button('Armas');
        opt = document.querySelectorAll('#text div button');
        for(const opti of opt){
            opti.addEventListener('click', function(event){
                click.play();
                let selec = opti.innerHTML;
                displayDiv.innerHTML = '';
                switch(selec){
                    case 'Sospechosos':
                        display.style.display = 'none';
                        selectSuspicious();
                        break;
                    case 'Locaciones':
                        display.style.display = 'none';
                        selectLocation();
                        break;
                    case 'Armas':
                        display.style.display = 'none';
                        selectGun();
                        break;
                }
            });
        }
    }else{
        addText('Ya no hay mas pistas');
        addText('Llego el momento de elegir al culpable');
        cont.style.display = 'block';
        
        next.onclick = function(){
            click.play();
            displayDiv.innerHTML = '';
            display.style.display = 'none';
            cont.style.display = 'none';
            selectSuspicious();
        }
    }
}

let selectSuspicious = function(){
    changeImage('Selecciones/Sospechosos_B.png');
    for(const character of characters){
        character.style.display = 'block';
        character.addEventListener('click', function (event){
            click.play();
            let sS = character.getAttribute('id');
            if(trys <= setTrys){
                tracks(sS);
            }else{
                sSuspicious = sS;
                selectLocation();
            }
        });
    }
}

let selectLocation = function(){
    changeImage('Selecciones/Locaciones_B.png');
    for(const character of characters){
        character.style.display = 'none';
    }
    for(const location of locations){
        location.style.display = 'block';
        location.addEventListener('click', function (event){
            click.play();
            let sL = location.getAttribute('id');
            if(trys <= setTrys){
                tracks(sL);
            }else{
                sLocation = sL;
                selectGun();
            }
        });
    }
}

let selectGun = function(){
    changeImage('Selecciones/Armas_B.png'); 
    for(const location of locations){
        location.style.display = 'none';
    }
    displayDiv.innerHTML = '';
    for(const gun of guns){
        gun.style.display = 'block';
        gun.addEventListener('click', function (event){
            click.play();
            let sG = gun.getAttribute('id');
            displayDiv.innerHTML = '';
            display.style.display = 'none';
            if(trys <= setTrys){
                tracks(sG);
            }else{
                sendEvidence(sSuspicious,sLocation,sG);
            }
        });
    }
}

let tracks = function(slc){
    let flag;
    for(const character of characters){
        character.style.display = 'none';
    }
    for(const location of locations){
        location.style.display = 'none';
    }
    for(const gun of guns){
        gun.style.display = 'none';
    }
    for(i of stories){
        for(j in i){
            if(slc == i[j]){
                flag = i;
                if(i.character == crime.character){
                    changeImage('Selecciones/No_Track.png');
                }else{
                    if(i.location === crime.location){
                        changeImage('Selecciones/No_Track_2.png');
                    }else{
                        changeImage(`Locations/${i.location}.png`);
                    }
                }
                displayDiv.innerHTML = '';
                addText(`${flag.character} dice que estuvo en ${flag.location} y vio el arma ${flag.gun}`);
                if(flag.character == crime.character){
                    addText(`No hay pistas del sospechoso ${flag.character}`);
                }else{
                    addText(`Tenemos pistas de ${flag.character} en ese lugar`);
                }
                if(flag.location == crime.location){
                    addText(`No hay pistas del lugar ${flag.location}`);
                }else{
                    addText(`Hay fotos del lugar ${flag.location}`);
                }
                if(flag.gun == crime.gun){
                    addText(`No hay pistas del arma ${flag.gun}`);
                }else{
                    addText(`Hay pistas del arma ${flag.gun}`);
                }
                display.style.display = 'block';
                cont.style.display = 'block';
                next.onclick = function(){
                    click.play();
                    displayDiv.innerHTML = '';
                    cont.style.display = 'none';
                    startGame();
                }
            }
        }
    }
}

let sendEvidence = function(char, loc, gn){
    for(const gun of guns){
        gun.style.display = 'none';
    }
    display.style.display = 'block';
    cont.style.display = 'block';
    if(char == crime.character && loc == crime.location && gn == crime.gun){
        addText('Encontraste al culpable, la arma homicida y la escena del crimen');
        changeImage('Selecciones/Fireworks.jpg');
    }else{
        changeImage('Selecciones/Sad.png');
        addText('No lograste atrapar al asesino de Steve');
        if(char != crime.character){
            addText(`Las pistas nos dicen que ${char} es inocente`);
        }
        if(loc == crime.location){
            addText(`Las pistas nos dicen que ${loc} no es la escena del crimen`);
        }
        if(gn == crime.gun){
            addText(`Las pistas nos dicen que ${gn} no era el arma homicida`);
        }
        addText(`El homicida fue ${crime.character}, la escena del crimen fue ${crime.location} y el arma homicida fue ${crime.gun}`);
    }
    cont.style.display = 'block';
    next.onclick = function(){
        trys = 0;
        click.play();
        displayDiv.innerHTML = '';
        cont.style.display = 'none';
        main();
    }
}
let main = function(){
    changeImage('Menu/Main_Menu_Clue_2.png');
    for(const men of menu){
        cont.style.display = 'none';
        men.style.display = 'block';
        men.addEventListener('click', function(event){
            click.play();
            let sM = men.getAttribute('id');
            switch(sM){
                case 'inicio':
                    Start();
                    break;
                case 'howplay':
                    instructions();
                    break;
                case 'creditos':
                    Credits();
                    break;
                case 'opciones':
                    Options();
                    break;
                case 'salir':
                    return 0;
                    break;
            }
        });
    }
}
main();