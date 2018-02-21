//VARIABLES ET CONSTANTES
var context = null;
var old_date = Date.now();
var tabZones = [4, 5, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 3, 2]; //tableau 1D des différents type de zone
var munitions = {x : 0, y : 0, largeur : 64, hauteur : 64, direction : 0, vitesse : 0, validite: false, lastDisplay: 0, toBeDisplayed: true}; 
var zone; //Variable où on affecte les valeurs du tableau tabZone pour les test
var carltwd = {x : 0, y : 0, largeur : 64, hauteur : 64, centre : 0, bonus : false, etat : true, couleur :"black", orientation:'H'};
var fleche = {haut: false, bas: false, gauche: false, droite:false}
var caseX = 64; //Largeur de référence
var caseY = 64; //Hauteur de référence
var vie = 2; //Nombre de vie du joueur
var obstacle = []; //Tableau d'obstacles
var nbObstacle = [0, 0, 3, 3, 3, 3, 3, 0, 3, 3, 4, 2, 4, 0] //tableau pour nombre d'obstacle suivant les lignes
var maison = []; //Tableau de maison
var timer = 40; //40 secondes
var score = {tot : 0, timer : 0, maison : 0, maisonbonus : 0, munitions : 0, munitionsbonus : 0};
var vieperdu = true;
var clic = { x: 0, y: 0 };
var partieFinie = false;
var obstacleLastDisplay = 0;


//Chargement des images
var carl = new Image();
carl.src = "image/carlH.png";

var carlD = new Image();
carlD.src = "image/carlprofilD.png";

var carlG = new Image();
carlG.src = "image/carlprofilG.png";

var carlMort = new Image();
carlMort.src = "image/carlMort.png";

var route1 = new Image();
route1.src = "image/route1.jpg";
	
var routeBas = new Image();
routeBas.src = "image/routeBas.jpg";

var munitionsimg = new Image();
munitionsimg.src = "image/munition.png";

var carlVie = new Image();
carlVie.src = "image/carlVie.png";

var zombie1_pG = new Image();
zombie1_pG.src = "image/zombie1_pG.png";

var zombie1_pD = new Image();
zombie1_pD.src = "image/zombie1_pD.png";

var zombie2_pG = new Image();
zombie2_pG.src = "image/zombie2_pG.png";

var zombie2_pD = new Image();
zombie2_pD.src = "image/zombie2_pD.png";

var zombie3_pG = new Image();
zombie3_pG.src = "image/zombie3_pG.png";

var zombie3_pD = new Image();
zombie3_pD.src = "image/zombie3_pD.png";

var camion1 = new Image();
camion1.src = "image/camion1.png";

var camion2 = new Image();
camion2.src = "image/camion2.png";

var plateforme1 = new Image();
plateforme1.src = "image/plateforme1.png";

var plateforme2 = new Image();
plateforme2.src = "image/plateforme2.png";

var plateforme3 = new Image();
plateforme3.src = "image/plateforme3.png";

var plateforme4 = new Image();
plateforme4.src = "image/plateforme4.png";

var plateforme4_2 = new Image();
plateforme4_2.src = "image/plateforme4_2.png";

var plateforme4_3 = new Image();
plateforme4_3.src = "image/plateforme4_3.png";

var plateforme4_4 = new Image();
plateforme4_4.src = "image/plateforme4_4.png";

var plateforme5 = new Image();
plateforme5.src = "image/plateforme5.png";

var plateforme5_2 = new Image();
plateforme5_2.src = "image/plateforme5_2.png";

var plateforme5_3 = new Image();
plateforme5_3.src = "image/plateforme5_3.png";

var plateforme5_4 = new Image();
plateforme5_4.src = "image/plateforme5_4.png";

var maisonOuv = new Image();
maisonOuv.src = "image/maisonOuv.png";

var maisonFer = new Image();
maisonFer.src = "image/maisonFer.png";

var trottoir = new Image();
trottoir.src = "image/trottoir.png";

var village = new Image();
village.src = "image/village.png";

spawncarltwd = function() {
    if(carltwd.etat == false){
        vie -= 1;
    }
    carltwd.bonus = false;
    timer = 40;
    carltwd.etat = true;
    carltwd.orientation = 'H';
    carltwd.x = (context.height/2)-carltwd.largeur*2;
    carltwd.y = context.width + carltwd.hauteur*2;
}

//Etat de CARL MORT
mortcarltwd = function() {
    carltwd.etat = false;
    fleche.gauche = false;
    fleche.droite = false;
    fleche.haut = false;
    fleche.bas = false;
    setTimeout(spawncarltwd, 2000); //Si mort perd une vie
}



//Spawn munitions 
spawnmunitions = function() {
	do{
		var lignemunitions = Math.floor((Math.random() * 5) + 2);//Tirage de la ligne aleatoire ou sera placcé la munitions
		var obsmunitions = Math.floor((Math.random() * nbObstacle[lignemunitions]));//Tirage aléatoire du numéro d'obstacle en fonction de la ligne ou sera placé la munitions
	}while( (lignemunitions == 3 && obsmunitions == 1) || (lignemunitions == 5 && obsmunitions == 1));
	//Apparition de la munitions
	munitions.validite = true;
	munitions.x = obstacle[lignemunitions][obsmunitions].x; 
    munitions.y = obstacle[lignemunitions][obsmunitions].y; 
    munitions.direction = obstacle[lignemunitions][obsmunitions].direction;
    munitions.vitesse = obstacle[lignemunitions][obsmunitions].vitesse;
    munitions.direction = obstacle[lignemunitions][obsmunitions].direction;
}

despawnmunitions = function() {//Disparition de la munitions
	munitions.score = 0;
	munitions.validite=false;
    munitions.toBeDisplayed = true;
}

initialisationDesVariables = function() { //initialisation
    partieFinie = false;
    vie = 2;
    timer = 40;
    vieperdu = true;
    score = {tot : 0, timer : 0, maison : 0, maisonbonus : 0, munitions : 0, munitionsbonus : 0};
    old_date = Date.now();
    munitions.lastDisplay = 0;
    munitions.toBeDisplayed = true;
    munitions.validite = false;
    obstacleLastDisplay = 0;


    //Obstacles
    //Variables de placement aléatoires des obstacles sur la carte (pour que chaque nouvelle partie soit différente des autres)
    
    var pao2 = Math.random()*100;
    var pao3 = - Math.random()*200 + context.width;
    var pao4 = Math.random()*100;
    var pao5 = Math.random()*100;
    var pao6 = - Math.random()*50 + context.width;

    var pao8 = - Math.random()*100  + context.width;
    var pao9 = Math.random()*50;
    var pao10 = - Math.random()*70  + context.width;
    var pao11 = Math.random()*100;
    var pao12 = - Math.random()*150  + context.width;
    
    for (var i = 0; i < tabZones.length; i++) {//Initialisation des parametres de l'obstacle
        obstacle[i] = [];
        for (var j = 0; j < nbObstacle[i]; j++) {
            obstacle[i][j] = {x : 0, y : 0, largeur : 0, hauteur : 0, direction : 0, distance : 0, couleur : "", vitesse : 0}; //direction : 0=gauche ; 1=droite 
        }
    }

    //Declaration de chaques obstacles OU plateformes

    //Plateformes sur la rivière
        for (var j = 0; j < nbObstacle[2]; j++) {
            obstacle[2][j] = {x : - (180 + 177)*j + pao2, y : caseY*2, largeur : 180, hauteur : 64, direction : 1, distance : 177, couleur : "yellow", vitesse : 0.06, validite : 3};
        }
    
        for (var j = 0; j < nbObstacle[3]; j++) {
            obstacle[3][j] = {x :(140 +146)*j + pao3, y : caseY*3, largeur : 140, hauteur : 64, direction : 0, distance : 146, couleur : " white", vitesse : 0.03, validite : 3};
        }
        
        for (var j = 0; j < nbObstacle[4]; j++) {
            obstacle[4][j] = {x : - (350 + 354)*j + pao4, y : caseY*4, largeur : 350, hauteur : 64, direction : 1, distance : 354, couleur : "red", vitesse : 0.10, validite : 3};
        }

        for (var j = 0; j < nbObstacle[5]; j++) {
            obstacle[5][j] = {x : - (170 +146)*j + pao5, y : caseY*5, largeur : 170, hauteur : 64, direction : 1, distance : 146, couleur : "black ", vitesse : 0.05, validite : 3};
        }
        
        for (var j = 0; j < nbObstacle[6]; j++) {
            obstacle[6][j] = {x :(180 + 290)*j + pao6, y : caseY*6, largeur : 180, hauteur : 64, direction : 0, distance : 290, couleur : "gold", vitesse : 0.03, validite : 3};
        }
        
    //Obstacles sur la route
        for (var j = 0; j < nbObstacle[8]; j++) {
            obstacle[8][j] = {x :(128+200)*j + pao8, y : caseY*8, largeur : 128, hauteur : 64, direction : 0, distance : 200, couleur : "darkred", vitesse : 0.05 };
        }
        
        for (var j = 0; j < nbObstacle[9]; j++) {
            obstacle[9][j] = {x : - (64 +200)*j + pao9, y : caseY*9, largeur : 64, hauteur : 64, direction : 1, distance : 200, couleur : "navy", vitesse : 0.03};
        }

        for (var j = 0; j < nbObstacle[10]; j++) {
            obstacle[10][j] = {x :(64 + 150)*j + pao10, y : caseY*10, largeur : 64, hauteur : 64, direction : 0, distance : 150, couleur : "fuchsia", vitesse : 0.1};
        }
        
        for (var j = 0; j < nbObstacle[11]; j++) {
            obstacle[11][j] = {x : - (128 + 300)*j + pao11, y : caseY*11, largeur : 128, hauteur : 64, direction : 1, distance : 300, couleur : "coral", vitesse : 0.08 };
        }

        for (var j = 0; j < nbObstacle[12]; j++) {
            obstacle[12][j] = {x :(64 + 150)*j + pao12, y : caseY*12, largeur : 64, hauteur : 64, direction : 0, distance : 150, couleur : "chartreuse", vitesse : 0.05};
        }

    //Création des maisons
    for (var i = 0; i < 5; i++) {
        maison[i] =  {x : ((caseX*(i+1))*2)-caseX, y : caseY, largeur : 64, hauteur : 64, etat : false};
    }

    munitions.lastDisplay = Date.now();
}

//Colision de CARL avec les obstacles sur la routes
function Colision(rect1, rect2) {
		return (rect1.x+rect1.largeur <= rect2.x || rect1.x >= rect2.x+rect2.largeur || rect1.y+rect1.hauteur <= rect2.y || rect1.y >= rect2.y+rect2.hauteur);
	} 

	//Inclusion de CARL sur les plateformes de la rivière
	function Plateforme(rect1, rect2) {
		return ( ( (rect1.x+rect1.largeur/2) >= rect2.x && (rect1.x+rect1.largeur/2)<= rect2.x + rect2.largeur)) ;
	} 
	function MaisonRemplie(point, maison) {
        return (point >= maison.x && point <= maison.x + maison.largeur);
    }
		
//Initialisation du jeu
init = function() {
    context = document.getElementById("cvs").getContext("2d");
    context.width = document.getElementById("cvs").width;
    context.height = document.getElementById("cvs").height;

    document.addEventListener("keydown", captureAppuiToucheClavier)
    document.addEventListener("keyup", captureRelacheToucheClavier)
    document.addEventListener("click", captureClicSouris)

    
    initialisationDesVariables(); //Mise a 0 du jeu
    spawncarltwd(); //Apparition de carltwd
    

	boucleDeJeu();
}

//Boucle du jeu
boucleDeJeu = function() {
    if(!partieFinie) {
        update(Date.now());   
    }
    render();
	requestAnimationFrame(boucleDeJeu);
}

update = function(d) {
	

    //Pour gerer la vitesse des obstacles 
    var dt = d - old_date;
    old_date = d;
    var deplacement

    //Ecoulement du temps
    if (timer >0) {
        timer = timer - dt/1000;
    }

	//Mort de carl si timer <= 0
    else if(timer <=0 && carltwd.etat){
    	mortcarltwd();
    	timer = 0;
    }
    

    //Affichage des munitions
    
    if(!carltwd.bonus) {
        if (munitions.toBeDisplayed && munitions.validite == false && d - munitions.lastDisplay > 7000) {
            munitions.lastDisplay = d;
            munitions.toBeDisplayed = false;
            spawnmunitions();
        }
        if (munitions.toBeDisplayed == false && munitions.validite && d - munitions.lastDisplay > 5000) {
            munitions.lastDisplay = d;        
            despawnmunitions();
        }
    }
    
	
    //Déplacement des munitions en fonction de l'obstacle
    deplacement = munitions.vitesse * dt;
    if (munitions.direction == 0) {
        munitions.x = munitions.x - deplacement;
	}
    else {
        munitions.x = munitions.x + deplacement;
    }
	
	//Si les munitions sont presents, le bonus de carl s'active
	if ( ((carltwd.x+carltwd.largeur/2) >= munitions.x ) && (carltwd.x+carltwd.largeur/2) <= ( munitions.x + munitions.largeur) && munitions.y == carltwd.y && munitions.validite == true){
		carltwd.bonus = true;
		despawnmunitions();
	}

	//Zone route, si carl touche un obstacle -> MORT
    if (carltwd.etat) {
    	for(var i = 8; i < tabZones.length -1; i++) {
    		for (var j = 0; j < nbObstacle[i]; j++) {
    			if (!Colision(carltwd, obstacle[i][j])) {
    				mortcarltwd();	
    			}
    		}
    	}
    }
	
	
    //Zone rivière
	
	var onPlateforme = false;
	
	if (carltwd.etat) {
    	if((carltwd.y < caseY*7) && (carltwd.y > caseY*1)){

    		for (var j = 0; j < nbObstacle[carltwd.y/caseY]; j++) {
    			
    			if(Plateforme(carltwd, obstacle[carltwd.y/caseY][j]) ){
    				onPlateforme = true;
    			}
            }
            if(!onPlateforme ){
                mortcarltwd();
    		  
    		}
    	}
    }
	
    if(carltwd.etat) {
        if((carltwd.y < caseY*7) && (carltwd.y > caseY*1)){
                if(obstacle[carltwd.y/caseY][1].validite == 0 && Plateforme(carltwd, obstacle[carltwd.y/caseY][1])) {
                    mortcarltwd();
                }
                  
        }
    }
    
	if ((carltwd.y < caseY*7) && (carltwd.y > caseY*1))  {
        for (var j = 0; j < 1; j++) {
            deplacement = obstacle[carltwd.y/caseY][j].vitesse * dt;
            if (onPlateforme) {
                if ((obstacle[carltwd.y/caseY][j].direction == 0)&&(carltwd.x > 0)) {
                    carltwd.x = carltwd.x - deplacement;
                }
                else if (carltwd.x + carltwd.largeur < context.width) {
                    carltwd.x = carltwd.x + deplacement;
                }
            }
        }
    }
	 
	//Cycle de génération des obstacles et direction de l'obstacle à intervalle régulier
    for (var i = 0; i < tabZones.length; i++) {
        for (var j = 0; j < nbObstacle[i]; j++) {
           if (obstacle[i][j].direction == 1) {
                deplacement = obstacle[i][j].vitesse * dt;
				obstacle[i][j].x = obstacle[i][j].x + deplacement; //vitesse de l'obstacle

                if(obstacle[i][j].x > context.width) {
                    obstacle[i][j].x = obstacle[i][j].x -(nbObstacle[i]*obstacle[i][j].distance +(nbObstacle[i])*obstacle[i][j].largeur);
               }
            }
            else {
                deplacement = obstacle[i][j].vitesse * dt;
                obstacle[i][j].x = obstacle[i][j].x - deplacement; //vitesse de l'obstacle
                if(obstacle[i][j].x + obstacle[i][j].largeur < 0) {
                   obstacle[i][j].x = (obstacle[i][j].x ) +(nbObstacle[i]*obstacle[i][j].distance +(nbObstacle[i])*obstacle[i][j].largeur);
                }
            }
        }
    }

    //Apparition et disparition de certaines plateformes dans la rivière.

        if (Math.round(timer)%5 == 0) {
            obstacle[3][1].validite = 2;
			obstacle[5][1].validite = 3;
        }
        if ( Math.round(timer)%5 == 1) {
            obstacle[3][1].validite = 3;
			obstacle[5][1].validite = 0;			
        }
        if (Math.round(timer)%5 == 2) {
            obstacle[3][1].validite = 3; 
			obstacle[5][1].validite = 1;
        }
        if (Math.round(timer)%5 == 3) {
            obstacle[3][1].validite = 0;
			obstacle[5][1].validite = 2;  
        }
        if (Math.round(timer)%5 == 4) {
            obstacle[3][1].validite = 1;
			obstacle[5][1].validite = 3;  
        }
       
	
	//Pour faire bouger CARL, touches du clavier
    if (fleche.gauche == true ) {
		carltwd.orientation = 'G';
    	if (carltwd.x - caseX >= 0) {
        	carltwd.x = carltwd.x - caseX;
        	fleche.gauche = false;
        }
        else {
        	carltwd.x = 0;
       	}
    }

    if (fleche.haut == true ) {
    	if (carltwd.y - caseY >= 0) {
			carltwd.orientation = 'H';
        	carltwd.y = carltwd.y - caseY;
        	fleche.haut = false;
    	}
    	else {
    		carltwd.y = 0;
    	}
    }

    if (fleche.droite == true ) {
		carltwd.orientation = 'D';
    	if (carltwd.x + carltwd.largeur + caseX <= context.width) {
        	carltwd.x = carltwd.x + caseX;
        	fleche.droite = false;
        }
        else {
        	carltwd.x = context.width - carltwd.largeur;
        }
    }	

    if (fleche.bas == true) {
		carltwd.orientation = 'B';
    	if (carltwd.y + carltwd.hauteur + caseY <= context.height) {
        	carltwd.y = carltwd.y + caseY;
        	fleche.bas = false;
    	}
    	else {
    		carltwd.y = context.height - carltwd.hauteur;
    	}
    }

    //calcul du point au centre du sprite de carl
    carltwd.centre = carltwd.x + (carltwd.largeur/2);
    //Remplissage des maisons et attribution du score
	// -10pts par seconde écoulé, 130 pts d'assuré si CARL va dans une maison + 20 pnts en random
	// En plus, si CARL a une munitions 300 pts d'assuré et 100 pnts en random
    if ((carltwd.y == maison[0].y) && (carltwd.etat == true)) {
        var testMaison = false;
        for (var i = 0; i < 5; i++) {
            if (MaisonRemplie(carltwd.centre, maison[i]) && (!maison[i].etat)) {
                console.log("entré");
                maison[i].etat = true;
                testMaison = true;
                if (carltwd.bonus) {
    				score.munitions = score.munitions +300;
    				score.munitionsbonus = score.munitionsbonus + Math.round((Math.random() * 100));//Si CARL a une munitions sur lui
                    munitions.etat = true;	
                }
                
    			score.timer = score.timer + Math.round(10*(timer - 1/100));
    			score.maison = score.maison + 130;
    			score.maisonbonus = score.maisonbonus + Math.round((Math.random()*20));
    			score.tot = score.timer + score.maison + score.maisonbonus + score.munitions + score.munitionsbonus;	
    		}
        }
        if (!testMaison) {
            mortcarltwd();
        }
        else {
            spawncarltwd();
        }
    }
	
	//Fin de partie si CARL n'a plus de vies
	
	if(vie == -1 || ( maison[0].etat && maison[1].etat && maison[2].etat && maison[3].etat && maison[4].etat)){

	   timer = 0.1;
	   if (score.tot > localStorage.getItem('scoresave')) {
		  localStorage.setItem('scoresave', score.tot);
	   }
	}
	

}


render = function() { 

	//RENDU DU JEU, decors, animations ...
	context.clearRect(0, 0, context.width, context.height);

	
	//Différentes zones de jeu (0 = rivière, 1 = autoroute, 2 = safezone)
	for (var i = 0; i < tabZones.length; i++) {
       	zone = tabZones[i];
		switch (zone) {
       		case 0 : //riviere
       			context.fillStyle = "steelblue";
       			context.fillRect(0, caseY*i, context.width, caseY);
       		break;
       		case 1 : //route
       			context.drawImage(route1, 0, caseY*i);
       		break;
       		case 2 : //safe zone
       			context.drawImage(trottoir,0, caseY*i);
            break;
            case 3 : //route du bas
                context.drawImage(routeBas, 0, caseY*i);
            break;
            case 4 : 
                //zone maison
                context.drawImage(village, 0, caseY*i);
       	}
    }
	
	//Affichage des obstacles


		if ( Math.round(timer)%5 == 0) {
            context.drawImage(plateforme4_2, obstacle[3][1].x, obstacle[3][1].y);
        }
		if ( Math.round(timer)%5 == 1) {
			context.drawImage(plateforme5_4, obstacle[5][1].x, obstacle[5][1].y); 
        }
		if ( Math.round(timer)%5 == 2) {
			context.drawImage(plateforme5_3, obstacle[5][1].x, obstacle[5][1].y); 
        }
        if ( Math.round(timer)%5 == 3) {
            context.drawImage(plateforme4_4, obstacle[3][1].x, obstacle[3][1].y);  
			context.drawImage(plateforme5_2, obstacle[5][1].x, obstacle[5][1].y); 			
        }
        if (Math.round(timer)%5 == 4) {
            context.drawImage(plateforme4_3, obstacle[3][1].x, obstacle[3][1].y);    
        }

		for (var j = 0; j < nbObstacle[3]; j++) {
			if(obstacle[3][j].validite ==3){
				context.drawImage(plateforme4, obstacle[3][j].x, obstacle[3][j].y);
			}
        }
		
		for (var j = 0; j < nbObstacle[5]; j++) {
			if(obstacle[5][j].validite ==3){
				context.drawImage(plateforme5, obstacle[5][j].x, obstacle[5][j].y);
			}
        }
			
		for (var j = 0; j < nbObstacle[5]; j++) {
            context.drawImage(zombie2_pD, obstacle[10][j].x, obstacle[10][j].y);
        }
        
        if(Math.round(timer)%2 ==0){
        for (var j = 0; j < nbObstacle[12]; j++) {
                context.drawImage(zombie1_pD, obstacle[12][j].x, obstacle[12][j].y);
            }
            
        for (var j = 0; j < nbObstacle[10]; j++) {
                context.drawImage(zombie2_pD, obstacle[10][j].x, obstacle[10][j].y);
            }
            
        for (var j = 0; j < nbObstacle[9]; j++) {
                context.drawImage(zombie3_pD, obstacle[9][j].x, obstacle[9][j].y);
            }
        }
        
        if(Math.round(timer)%2 ==1){
        for (var j = 0; j < nbObstacle[12]; j++) {
                context.drawImage(zombie1_pG, obstacle[12][j].x, obstacle[12][j].y);
            }
            
        for (var j = 0; j < nbObstacle[10]; j++) {
                context.drawImage(zombie2_pG, obstacle[10][j].x, obstacle[10][j].y);
            }
            
        for (var j = 0; j < nbObstacle[9]; j++) {
                context.drawImage(zombie3_pG, obstacle[9][j].x, obstacle[9][j].y);
            }
        }
       
		for (var j = 0; j < nbObstacle[8]; j++) {
                context.drawImage(camion1, obstacle[8][j].x, obstacle[8][j].y);
            }
			
		for (var j = 0; j < nbObstacle[11]; j++) {
                context.drawImage(camion2, obstacle[11][j].x, obstacle[11][j].y);
            }
			
		for (var j = 0; j < nbObstacle[2]; j++) {
                context.drawImage(plateforme1, obstacle[2][j].x, obstacle[2][j].y);
            }
			
		for (var j = 0; j < nbObstacle[4]; j++) {
                context.drawImage(plateforme2, obstacle[4][j].x, obstacle[4][j].y);
            }
			
		for (var j = 0; j < nbObstacle[8]; j++) {
                context.drawImage(plateforme3, obstacle[6][j].x, obstacle[6][j].y);
            }

    //Affichage des maisons
    for (var i = 0; i < 5; i++) {
        if(maison[i].etat) {
			context.drawImage(maisonFer, maison[i].x, maison[i].y);
        }
        else {
            context.drawImage(maisonOuv, maison[i].x, maison[i].y);
        }
    }

    //Affichage du joueur
    if(carltwd.etat) { //affichage tant que carle est en vie suivant son orientation
        switch(carltwd.orientation) {
        case 'G' :
            context.drawImage(carlG, carltwd.x, carltwd.y);
        break;
        case 'D' :
            context.drawImage(carlD, carltwd.x, carltwd.y);
        break;
        case 'H' :
            context.drawImage(carl, carltwd.x, carltwd.y);
        break;
        case 'B' :
            context.drawImage(carl, carltwd.x, carltwd.y);
        }
    }
    else { //Affichage a la mort de carl
        context.drawImage(carlMort, carltwd.x, carltwd.y);
    }
	
	//Rendu de la munitions
	if(munitions.validite){
		context.drawImage(munitionsimg, munitions.x, munitions.y);
	}
	
	//Affichage du score
	
	context.fillStyle = "white";
	context.font="30px Arial Black";
	context.fillText("Score : " + score.tot,20,40);
	
	context.fillStyle = "white";
	context.font="30px Arial Black";
	context.fillText("Timer : " + Math.round(timer) + " sec",250,40);
    for (var i = 0; i < vie; i++) {
        context.drawImage(carlVie, 640-(64*i), 0);
    };
	
	//Fin du jeu 
	if( vie == -1 || ( maison[0].etat && maison[1].etat && maison[2].etat && maison[3].etat && maison[4].etat)){
		context.fillStyle = "grey";
        context.fillRect(0, 0,  context.width,  context.height);
		context.globalAlpha = 0.7	;
		
		context.fillStyle = "white";
		context.font="45px Arial Black";
		context.fillText("Votre score est de " + score.tot,60,170);

			context.fillText("Meilleur score : " + localStorage.getItem('scoresave'),60,220);


		//Affichage du détail du score
		context.fillText("Détail du score ",60,310);
		context.fillStyle = "white";
		context.font="35px Arial Black";
		context.fillText("Temps inutilisé : " + Math.round(score.timer/10) + " sec",120,370);
		context.fillText("Score : " + score.timer,220,410);
		context.fillText("Munitions attrapés : X" + score.munitions/300,120,450);
		context.fillText("Score : "+ score.munitions,220,490);
		context.fillText("Bonus : "+ score.munitionsbonus,213,530);
		context.fillText("Maisons remplis : X"+ score.maison/130,120,570);
		context.fillText("Score : "+ score.maison,220,610);
		context.fillText("Bonus : "+ score.maisonbonus,213,650);
		context.fillText("Total : " + score.tot,360,730);
		
		context.fillStyle = "red";
		context.font="25px Arial Black";
		context.fillText("Faites clique gauche pour relancer une partie !",30,875);
	}
    else {
        context.globalAlpha = 1 ;
    }
	
	//Si le joueur a perdu
	if(vie == -1){
		context.fillStyle = "black";
		context.font="45px Arial Black";
		context.fillText("Partie perdue",180,50);
		context.fillText("Essaye encore...",160,100);
	}
	
	if( maison[0].etat && maison[1].etat && maison[2].etat && maison[3].etat && maison[4].etat){
		context.fillStyle = "black";
		context.font="45px Arial Black";
		context.fillText("Partie gagnée",180,50);
		context.fillText("Félicitations !",185,100);
	}
	
}







captureAppuiToucheClavier = function(event) {
	//Capture de l'appuie des touches du clavier
    if(event.keyCode == 32) {
        lancement = true;
    }
    if(! carltwd.etat || vie == -1 || ( maison[0].etat && maison[1].etat && maison[2].etat && maison[3].etat && maison[4].etat	)) return;
	switch (event.keyCode) {
        case 37 : 
			fleche.gauche = true;
        break;
        case 38 : 
            fleche.haut = true;
        break;
        case 39 : 
       	    fleche.droite = true;
        break;
        case 40 : 
            fleche.bas = true;
        break;
    }

}

captureRelacheToucheClavier = function(event) {
	//Capture du relachement des touches du clavier
    switch (event.keyCode) {
        case 37 : 
            fleche.gauche = false;
        break;
        case 38 : 
            fleche.haut = false;
        break;
        case 39 : 
            fleche.droite = false;
        break;
        case 40 : 
            fleche.bas = false;
	}
}


captureClicSouris = function(event) {
	if (event.target.id == "cvs") {
        clic.x = event.pageX - event.target.offsetLeft;
        clic.y = event.pageY - event.target.offsetTop;
    
		if (clic.x >= 0 && clic.x <= context.width && clic.y >= 0 && clic.y <=  context.height ){
			if (vie == -1 || ( maison[0].etat && maison[1].etat && maison[2].etat && maison[3].etat && maison[4].etat)){
                partieFinie = true;
                init();
			}
		}
	}
}