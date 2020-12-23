var hero_1 = document.getElementById("heros1");
var hero_2 = document.getElementById("heros2");
var hero_3 = document.getElementById("heros3");
var hero_4 = document.getElementById("heros4");
var hp_hero_1 = document.getElementById("hpheros1");
var hp_hero_2 = document.getElementById("hpheros2");
var hp_hero_3 = document.getElementById("hpheros3");
var hp_hero_4 = document.getElementById("hpheros4");
var hp_heros = [hp_hero_1,hp_hero_2,hp_hero_3,hp_hero_4];
var mp_hero_1 = document.getElementById("mpheros1");
var mp_hero_2 = document.getElementById("mpheros2");
var mp_hero_3 = document.getElementById("mpheros3");
var mp_hero_4 = document.getElementById("mpheros4");
var mp_heros = [mp_hero_1,mp_hero_2,mp_hero_3,mp_hero_4];
var att_hero_1 = document.getElementById("attheros1");
var att_hero_2 = document.getElementById("attheros2");
var att_hero_3 = document.getElementById("attheros3");
var att_hero_4 = document.getElementById("attheros4");
var att_heros = [att_hero_1,att_hero_2,att_hero_3,att_hero_4];
var def_hero_1 = document.getElementById("defheros1");
var def_hero_2 = document.getElementById("defheros2");
var def_hero_3 = document.getElementById("defheros3");
var def_hero_4 = document.getElementById("defheros4");
var def_heros = [def_hero_1,def_hero_2,def_hero_3,def_hero_4];
var cout_hero_1 = document.getElementById("coutheros1");
var cout_hero_2 = document.getElementById("coutheros2");
var cout_hero_3 = document.getElementById("coutheros3");
var cout_hero_4 = document.getElementById("coutheros4");
var cout_heros = [cout_hero_1,cout_hero_2,cout_hero_3,cout_hero_4];
var attaque_hero = 20;
var def_init_hero = 10;
var heros_en_vie = [true,true,true,true];
var nb_heros = 4;

var monstre_1 = document.getElementById("monstre1");
var monstre_2 = document.getElementById("monstre2");
var monstre_3 = document.getElementById("monstre3");
var image_monstre_1 = document.getElementById("image_monstre1");
var image_monstre_2 = document.getElementById("image_monstre2");
var image_monstre_3 = document.getElementById("image_monstre3");
var hp_monstre_1 = document.getElementById("hpmonstre1");
var hp_monstre_2 = document.getElementById("hpmonstre2");
var hp_monstre_3 = document.getElementById("hpmonstre3");
var hp_monstres = [hp_monstre_1,hp_monstre_2,hp_monstre_3];
var attaque_monstre = 55;
var monstres_en_vie = [true,true,true];
var nb_monstres = 3;
var poison_m = [0,0,0];

var action_active;
var heros_actif;
var cible_active;
var tour = 0;
var actions_faites = [false,false,false,false];

// Boutons d'attaque
var b_att1 = document.getElementById("AttaqueH1");
var b_att2 = document.getElementById("AttaqueH2");
var b_att3 = document.getElementById("AttaqueH3");
var b_att4 = document.getElementById("AttaqueH4");
// Boutons de défense
var b_def1 = document.getElementById("DefenseH1");
var b_def2 = document.getElementById("DefenseH2");
var b_def3 = document.getElementById("DefenseH3");
var b_def4 = document.getElementById("DefenseH4");
// Bountons d'action spéciale
var b_spe1 = document.getElementById("SpecialH1");
var b_spe2 = document.getElementById("SpecialH2");
var b_spe3 = document.getElementById("SpecialH3");
var b_spe4 = document.getElementById("SpecialH4");
// Boutons de ciblage de monstres
var cibl1 = document.getElementById("Cible1");
var cibl2 = document.getElementById("Cible2");
var cibl3 = document.getElementById("Cible3");
// Gestion des boutons
var boutons_h = [b_att1,b_def1,b_spe1,b_att2,b_def2,b_spe2,b_att3,b_def3,b_spe3,b_att4,b_def4,b_spe4];
var tours_boutons = [1,1,1,1,1,1,1,1,1,1,1,1];
var boutons_m = [cibl1,cibl2,cibl3];
var cibles_boutons = [1,1,1];

var texte_info = document.getElementById("infos");
var texte_debug = document.getElementById("debug");

// ******* Fonctions d'affichages *******

function afficher_debug(texte){
    texte_debug.innerHTML += texte;
}

function afficher(texte,durée){
    texte_info.innerHTML = texte;
    //setTimeout(() => {texte_info.innerHTML = "";}, durée);
}

function afficher_simple(texte){
    texte_info.innerHTML = texte;
}

// ******* Fonctions utilitaires *******

// Renvoie un nombre entier aléatoire entre min inclus et max inclus
function randomInt(min,max){
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

// Renvoie l'indice du j-ème héros à être en vie
function get_ind_heros(j){
    var nb = 0;
    for(ii=0; ii<4; ii++){
        if(heros_en_vie[ii]){
            nb += 1;
            if(nb == j){
                return ii;
            }
        }
    }
}

// Vérifie si tous les héros en vie ont réalisé leurs actions pour ce tour
function toutes_actions_faites(){
    var tour_suivant = true;
    for(t=0; t<4; t++){
        if(heros_en_vie[t] && !(actions_faites[t])){
            tour_suivant = false;
        }
    }
    return tour_suivant;
}

// Fonction qui renvoie l'indice du héros ayant le moins d'HP parmi ceux étant encore en vie
function hero_moins_hp(){
    var ind_moins;
    var pas_trouve = true;
    var ind_inc = 0;
    while(pas_trouve){
        if(heros_en_vie[ind_inc]){
            pas_trouve = false;
            ind_moins = ind_inc;
        }
        ind_inc += 1;
    }
    for(moins=ind_inc-1; moins<4; moins++){
        if(heros_en_vie[moins]){
            if(Number(hp_heros[moins].innerHTML) < Number(hp_heros[ind_moins].innerHTML)){
                ind_moins = moins;
            }
        }
    }
    return ind_moins;
}

// Ajoute 1 ou 2 au tableau qui gère les désactivations de boutons, selon quelle action a été réalisée
function gestion_tours_boutons(){
    tours_boutons[3*heros_actif+action_active] = 2;
    if(action_active == 0){
        tours_boutons[3*heros_actif+1] = 1;
        tours_boutons[3*heros_actif+2] = 1;
    }
    else{
        tours_boutons[3*heros_actif+0] = 1;
        if(action_active == 1){
            tours_boutons[3*heros_actif+2] = 1;
        }
        else{
            tours_boutons[3*heros_actif+1] = 1;
        }
    }
}

// Fonctions pour les attaques de héros sur des monstres
function action_attaque_heros(){
    hp_monstres[cible_active].innerHTML = Math.max(hp_monstres[cible_active].innerHTML - att_heros[heros_actif].innerHTML,0);
    if(hp_monstres[cible_active].innerHTML == 0){
        monstres_en_vie[cible_active] = false;
        nb_monstres -= 1;
        cibles_boutons[cible_active] = 1;
    }
}

// Fonctions pour les attaques de monstres sur des héros
function action_attaque_monstre(monst){
    var degats = Math.max(hp_heros[heros_actif].innerHTML - Math.max(attaque_monstre - def_heros[heros_actif].innerHTML,0),0);
    hp_heros[heros_actif].innerHTML = degats;
    afficher("Le monstre "+monst+" inflige "+degats+" au héros "+(heros_actif+1),3000);
    if(hp_heros[heros_actif].innerHTML == 0){
        heros_en_vie[heros_actif] = false;
        nb_heros -= 1;
        for(al=0; al<3; al++){
            tours_boutons[3*heros_actif+al] = 1;
        }
    }
}

// La fonction place 4 marqueurs poison sur le héros sélectionné, les dégats du poison sont gérés dans debut_tour_monstres()
// et font un nombre de dégats égal au nombre de marqueurs poisons restants, avec un marqueur qui disparait chaque tour.
function poison(){
    poison_m[cible_active] += 7;
}

// Fonction appelée lorsqu'un bouton d'attaque est utilisé, et gère les boutons à désactiver ou activer en conséquence
function att_cible(h_actif){
    heros_actif = h_actif;
    action_active = 0;
    for(but1=0; but1<12; but1++){
        boutons_h[but1].disabled = true;
    }
    for(but2=0; but2<3; but2++){
        if(monstres_en_vie[but2]){
            cibles_boutons[but2] = 0;
        }
    }
    gestion_boutons_m();
}

// Pouvoir du héros 3 qui échange ses HP avec un monstre au choix, sans qu'il puisse gagner plus d'HP que sa valeur de départ
function swap(){
    var aux_hp = Number(hp_heros[heros_actif].innerHTML);
    hp_heros[heros_actif].innerHTML = Math.min(hp_monstres[cible_active].innerHTML,100);
    hp_monstres[cible_active].innerHTML = aux_hp;
}

// Fonction appelée lorsqu'un bouton de défense est utilisé, change la valeur de défense, gère les boutons,
// et vérifie si toutes les actions ont été réalisées, auquel cas c'est au tour des monstres
function defense(bh){
    heros_actif = bh;
    action_active = 1;
    def_heros[heros_actif].innerHTML = 10 + Number(def_heros[heros_actif].innerHTML);
    gestion_tours_boutons();
    /*tours_boutons[3*heros_actif+action_active] = 2;
    tours_boutons[3*heros_actif+0] = 1;
    tours_boutons[3*heros_actif+2] = 1;*/
    actions_faites[heros_actif] = true;
    gestion_boutons_h();
    if(toutes_actions_faites()){
        setTimeout(() => {debut_tour_monstres();}, 3000);
    }
}

function soin(){
    heros_actif = 0;
    action_active = 2;
    mp_heros[heros_actif].innerHTML = Number(mp_heros[heros_actif].innerHTML) - Number(cout_heros[heros_actif].innerHTML);
    hp_heros[hero_moins_hp()].innerHTML = Math.min(30 + Number(hp_heros[hero_moins_hp()].innerHTML),100);
    gestion_tours_boutons();
    actions_faites[heros_actif] = true;
    gestion_boutons_h();
    if(toutes_actions_faites()){
        setTimeout(() => {debut_tour_monstres();}, 3000);
    }
}

function tente_def(){
    heros_actif = 3;
    action_active = 2;
    mp_heros[heros_actif].innerHTML = Number(mp_heros[heros_actif].innerHTML) - Number(cout_heros[heros_actif].innerHTML);
    for(ho=0; ho<3; ho++){
        def_heros[ho].innerHTML = Number(def_heros[ho].innerHTML) + randomInt(-5,10);
    }
    gestion_tours_boutons();
    actions_faites[heros_actif] = true;
    gestion_boutons_h();
    if(toutes_actions_faites()){
        setTimeout(() => {debut_tour_monstres();}, 3000);
    }
}

function poi_cible(){
    heros_actif = 1;
    action_active = 2;
    mp_heros[heros_actif].innerHTML = Number(mp_heros[heros_actif].innerHTML) - Number(cout_heros[heros_actif].innerHTML);
    for(but1=0; but1<12; but1++){
        boutons_h[but1].disabled = true;
    }
    for(but2=0; but2<3; but2++){
        if(monstres_en_vie[but2]){
            cibles_boutons[but2] = 0;
        }
    }
    gestion_boutons_m();
}

function swap_hp(){
    heros_actif = 2;
    action_active = 2;
    mp_heros[heros_actif].innerHTML = Number(mp_heros[heros_actif].innerHTML) - Number(cout_heros[heros_actif].innerHTML);
    for(but1=0; but1<12; but1++){
        boutons_h[but1].disabled = true;
    }
    for(but2=0; but2<3; but2++){
        if(monstres_en_vie[but2]){
            cibles_boutons[but2] = 0;
        }
    }
    gestion_boutons_m();
}

function choix_cible(cib_m){
    cible_active = cib_m;
    if(action_active == 0){
        action_attaque_heros();
        if(nb_monstres == 0){
            afficher_simple("Félicitation, vous triomphez des monstres !");
            texte_info.style.backgroundColor = F0B4B4;
            return;
        }
    }
    else{
        if(heros_actif == 1){
            poison();
        }
        else{
            swap();
        }
    }
    for(bu=0; bu<3; bu++){
        cibles_boutons[bu] = 1;
    }
    gestion_boutons_m();
    gestion_tours_boutons();
    actions_faites[heros_actif] = true;
    if(toutes_actions_faites()){
        setTimeout(() => {debut_tour_monstres();}, 3000);
    }
    else{
        gestion_boutons_h();
    }
}

function gestion_boutons_h(){
    for(elem=0; elem<12; elem++){
        if(tours_boutons[elem] == 0){
            boutons_h[elem].disabled = false;
        }
        else{
            boutons_h[elem].disabled = true;
        }
    }
}

function gestion_boutons_m(){
    for(ele=0; ele<3; ele++){
        if(cibles_boutons[ele] == 0){
            boutons_m[ele].disabled = false;
        }
        else{
            boutons_m[ele].disabled = true;
        }
    }
}

function debut_tour_heros(){
    afficher("C'est au tour des héros d'agir.",3000);
    for(d=0; d<4; d++){
        def_heros[d].innerHTML = def_init_hero;
    }
    actions_faites = [false,false,false,false];
    boutons_debut_tour();
}

function boutons_debut_tour(){
    for(heroo=0; heroo<4; heroo++){
        if(heros_en_vie[heroo]){
            for(k=0; k<2; k++){
                decremente_bouton(heroo,k);
            }
            if(Number(mp_heros[heroo].innerHTML) >= Number(cout_heros[heroo].innerHTML)){
                decremente_bouton(heroo,2);
            }
        }
    }
}

function decremente_bouton(hr,ac){
    tours_boutons[3*hr+ac] = Math.max(tours_boutons[3*hr+ac] - 1,0);
    if(tours_boutons[3*hr+ac] == 0){
        boutons_h[3*hr+ac].disabled = false;
    }
}

function debut_tour_monstres(){
    afficher("C'est au tour des monstres d'agir.",3000);
    for(po=0; po<3; po++){
        if(monstres_en_vie[po] && poison_m[po]>0){
            hp_monstres[po].innerHTML = Math.max(hp_monstres[po].innerHTML - poison_m[po],0);
            poison_m[po] -= 1;
            if(hp_monstres[po].innerHTML == 0){
                monstres_en_vie[po] = false;
                nb_monstres -= 1;
                cibles_boutons[po] = 1;
            }
        }
    }
    if(nb_monstres == 0){
        afficher_simple("Félicitation, vous triomphez des monstres !");
        texte_info.style.backgroundColor = F0B4B4;
        return;
    }
    for(i=0; i<3; i++){
        if(monstres_en_vie[i]){
            var ind_hero = randomInt(1,nb_heros);
            heros_actif = get_ind_heros(ind_hero);            
            //setTimeout(() => {action_attaque_monstre(i);}, 2000);
            action_attaque_monstre(i);
            if(nb_heros == 0){
                afficher_simple("Malheureusement, les monstres vous ont vaincu !");
                return;
            }
        }
    }
    setTimeout(() => {debut_tour_heros();}, 3000);
}

//Affichage des infos des monstres lorsque l'on passe le curseur sur eux

function over_monstre1() {
    monstre_1.style.opacity = "1";
    //afficher("Ceci est gobelin de niveau 4 !",1500);
    image_monstre_1.onmouseout = function(){
        monstre_1.style.opacity = "0";
    }
}

function over_monstre2() {
    monstre_2.style.opacity = "1";
    //afficher("Ceci est un chef gobelin de niveau 6 !",1500);
    image_monstre_2.onmouseout = function(){
        monstre_2.style.opacity = "0";
    }
}

function over_monstre3() {
    monstre_3.style.opacity = "1";
    //afficher("Ceci est un apprenti gobelin de niveau 4 !",1500);
    image_monstre_3.onmouseout = function(){
        monstre_3.style.opacity = "0";
    }
}

// Lancement du jeu et du premier tour
onload = afficher("Le jeu commence !",4000);
onload = setTimeout(() => {debut_tour_heros();}, 3000);

// Affichage des informations des monstres lorsque l'on passe la souris au-dessus
image_monstre_1.onmouseover = over_monstre1;
image_monstre_2.onmouseover = over_monstre2;
image_monstre_3.onmouseover = over_monstre3;

/*b_att1.onclick = attente_cible();
b_att2.onclick = attente_cible();
b_att3.onclick = attente_cible();
b_att4.onclick = attente_cible();*/

/*b_att1.addEventListener("click",attente_cible(1));
b_att2.addEventListener("click",attente_cible(2));
b_att3.addEventListener("click",attente_cible(3));
b_att4.addEventListener("click",attente_cible(4));*/





//POUBELLE

/*function change_opac(champ,val){
    champ.style.opacity = val;
}*/

/*function change_opac(champ){
    champ.style.opacity = "1";
    champ.onmouseout = function(){
        champ.style.opacity = "0";
    }
}*/

/*monstre_1.onmouseover = function () {
    monstre_1.style.opacity = "1";
    afficher("Ceci est le monstre 1");
    monstre_1.onmouseout = function(){
        monstre_1.style.opacity = "0";
    }
}*/

//monstre_3.onmouseover = change_opac(monstre_3);

//monstre_1.addEventListener("onmouseover",afficher("Ceci est le monstre 1"));
//monstre_1.onmouseover = change_opac(monstre_1);

/*function fin_jeu(n){
    if(n == 1){
        afficher("Malheureusement, les monstres vous ont vaincu !",300000);
    }
    else{
        afficher("Félicitation, vous triomphez des monstres !",300000);
    }
}*/

/*tours_boutons[3*heros_actif+action_active] = 2;
tours_boutons[3*heros_actif+1] = 1;
if(action_active == 0){
    tours_boutons[3*heros_actif+2] = 1;
}
else{
    tours_boutons[3*heros_actif+0] = 1;
}*/