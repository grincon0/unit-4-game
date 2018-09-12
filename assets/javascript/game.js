var instancesLoaded = 1;
var hasUserChosen = false;
var isDefenderChosen = false;
var whoIsUser = [];
var whoIsEnemy = [];
var fighterz = [];

var userWeightedPower = 0;
var Xonce = false;
var Zonce = false;
var Sonce = false;
var Conce = false;
var isUserDead = false;

var defX = false;
var defZ = false;
var defS = false;
var defC = false;



var megaX = new fighter(150, 5, 20, "X", 1);
var zero = new fighter(135, 16, 30, "Zero", 2);
var sigma = new fighter(175, 15, 35, "Sigma", 3);
var colonel = new fighter(160, 12, 32, "Colonel", 4);


function fighter(health, attack, counter, name, id){
    this.health = health;
    this.attack = attack;
    this.counterPower = counter;
    this.name = name;
    this.timesAttacked = 0;
    this.iD = id;
   
    this.isUser = false;
    this.isDead = false;
    this.isDefending = false;
    this.alreadyChosen = false;
    
    this.createElem = function () {
        var newDiv = document.createElement("div");


        var image = $("<img>", {
            src : `assets/images/${instancesLoaded}charplaceholder.png`
        });
        var name = this.name;
        var hp = $("<p>", {
            id : `hp-${this.iD}`
        });

        $(hp).text(this.health);

        $(newDiv).append(name).append(image).append(hp);
        $(newDiv).attr("id" , `cr-${instancesLoaded}`).attr("class", 'charBlock');

        
        fighterz.push(newDiv);
        instancesLoaded++;

    }
    this.moveUserSpace = function () {
        //var whichID = this.iD;
        if(!hasUserChosen){
            var newDiv = document.createElement("div");
            var image = $("<img>", {
                src : `assets/images/${this.iD}charplaceholder.png`
            });
            var name = this.name;
            var hp = $("<p>", {
                id : `hp-${this.iD}`
            });

            $(hp).text(this.health);
    
            $(newDiv).append(name).append(image).append(hp);
            $(newDiv).attr("id" , `cr-${this.iD}`);
    
            $("#user-space").append(newDiv);
            this.isUser = true;
            this.alreadyChosen = true;
            hasUserChosen = true;
            
        }else if (hasUserChosen || this.isUser){
            return;
        }else{
            return;
        }
    }
    this.moveElemToDef = function () {
        //var whichID = this.iD;
        if(hasUserChosen && !isDefenderChosen){
            var newDiv = document.createElement("div");
            var image = $("<img>", {
                src : `assets/images/${this.iD}charplaceholder.png`
            });
            var name = this.name;
            var hp = $("<p>", {
                id : `hp-${this.iD}`
            });

            $(hp).text(this.health);
    
            $(newDiv).append(name).append(image).append(hp);
            $(newDiv).attr("id", `cr-${this.iD}`);

            $("#defend-space").append(newDiv);

            this.alreadyChosen = true;
            isDefenderChosen = true;

            
        }else if(!hasUserChosen){
            return;
        }else{
            return;
        }
    }
    this.incUserMulti = function (){
        this.timesAttacked += 5;
    }
    this.battlePower = function (){
            var userAttackPower = 0;
            userAttackPower = this.attack + ((Math.floor(Math.random() * 10))) + this.timesAttacked;
            userWeightedPower = userAttackPower;
            return userAttackPower;
    }
    this.printHP = function () {
        $(`#hp-${this.iD}`).text(this.health);
    }

    this.testLog = function (){
        console.log(this.name);
        console.log(this.health);
        console.log(this.attack);
        console.log(this.isUser);
    }
}


function appendElems () {
    megaX.createElem();
    zero.createElem();
    sigma.createElem();
    colonel.createElem();

    for(var i = 0; i < fighterz.length; i++){
        $(`#box${i}`).append(fighterz[i]);
    }

    
}

var gameInterval = function () {
    setInterval(runtimeChecker, 60);
}



function runtimeChecker(){
    megaX.printHP();
    zero.printHP();
    sigma.printHP();
    colonel.printHP();

    if((!Xonce) && megaX.health <= 0){
        alert("X HAS BEEN KILLED");
        $("#cr-1").html("");
        if(!megaX.isUser){
            isDefenderChosen = false;
        }
        Xonce = true;
    }else if((!Zonce) && zero.health <= 0){
        alert("Zero HAS BEEN KILLED");
        $("#cr-2").html("");
        if(!zero.isUser){
            isDefenderChosen = false;
        }
        Zonce = true;
    }else if((!Sonce) && sigma.health <= 0){
        alert("Sigma HAS BEEN KILLED");
        $("#cr-3").html("");
        if(!sigma.isUser){
            isDefenderChosen = false;
        }
        Sonce = true;
    }else if((!Conce) && colonel.health <= 0){
        alert("Colonel HAS BEEN KILLED");
        $("#cr-4").html("");
        if(!colonel.isUser){
            isDefenderChosen = false;
        }
        Conce = true;
    }
    checkUserDeath();
}

function checkUserDeath(){
    if((megaX.isUser === true) && (megaX.health <= 0)){
        isUserDead = true;
    }else if((zero.isUser === true) && (zero.health <= 0)){
        isUserDead = true;
    }else if((sigma.isUser === true) && (sigma.health <= 0)){
        isUserDead = true;
    }else if ((colonel.isUser === true) && (colonel.health <= 0)){
        isUserDead = true;
    }
}

function battleField (user, opponent){
    user.battlePower();
    var userAtk = userWeightedPower;
    opponent.health += -userAtk;
    document.getElementById("user-feed").innerText = `${user.name} attacks ${opponent.name}...${opponent.name} suffered ${userAtk} points of damage!`;
    user.health += -opponent.counterPower;
    document.getElementById("enemy-feed").innerText = `${opponent.name} counters... ${user.name} suffered ${opponent.counterPower} points of damage!`;

    user.incUserMulti();
}

function defenderHasBeenDefeated(){
    isDefenderChosen = false;
}

function render(){
    appendElems();


    
    

    console.log(instancesLoaded);


}

$(document).ready(function() {
    startScene();
    render();
    gameInterval();
    $("#cr-1").on("click", function (){
        if(!hasUserChosen){
            $("#box0").html("");
            megaX.moveUserSpace();
            whoIsUser = megaX;
        }else if(hasUserChosen && (!isUserDead) && (!isDefenderChosen)){
            $("#box0").html("");
            megaX.moveElemToDef();
            whoIsEnemy = megaX; 
        }else if(hasUserChosen && isUserDead){
            return;
        }else{
            return;
        }
    });
    $("#cr-2").on("click", function () {
        if(!hasUserChosen){
            $("#box1").html("");
            zero.moveUserSpace();
            whoIsUser = zero;
        }else if(hasUserChosen && (!isUserDead) && (!isDefenderChosen)){
            $("#box1").html("")
            zero.moveElemToDef();
            whoIsEnemy = zero;

        }else if(hasUserChosen && isUserDead){
            return;
        }else{
            return;
        }

    });
    $("#cr-3").on("click", function (){
        if(!hasUserChosen){
            $("#box2").html("");
            sigma.moveUserSpace();
            whoIsUser = sigma;
        }else if(hasUserChosen && (!isUserDead) && (!isDefenderChosen)){
            $("#box2").html("");
            sigma.moveElemToDef();
            whoIsEnemy = sigma;
        }else if(hasUserChosen && isUserDead){
            return;
        }else{
            return;
        }
    });
    $("#cr-4").on("click", function (){
        if(!hasUserChosen){
            $("#box3").html("");
            colonel.moveUserSpace();
            whoIsUser = colonel;
        }else if(hasUserChosen && (!isUserDead) && (!isDefenderChosen)){
            $("#box3").html("")
            colonel.moveElemToDef();
            whoIsEnemy = colonel;
        }else if(hasUserChosen && isUserDead){
            return;
        }else{
            return;
        }
    });
    $("#attackbtn").on("click", function () {

        if(!isUserDead){
            battleField(whoIsUser, whoIsEnemy);
        }else{
            return;
        }
        

    });

});

function startScene(){
    myScene.start();
}
var myScene = {
    canvas : document.createElement("canvas"),
    start : function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function component(width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myScene.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

}

console.log(megaX.battlePower());
console.log(fighterz);