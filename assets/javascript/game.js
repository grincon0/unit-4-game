var instancesLoaded = 1;
var hasUserChosen = false;
var isDefenderChosen = false;
var whoIsUser = [];
var whoIsEnemy = [];
var userWeightedPower = 0;

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
        var hp = this.health;

        $(newDiv).append(name).append(image).append(hp);
        $(newDiv).attr("id" , `cr-${instancesLoaded}`);

        $("#box1").append(newDiv);
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
            var hp = this.health;
    
            $(newDiv).append(name).append(image).append(hp);
    
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
            var hp = this.health;
    
            $(newDiv).append(name).append(image).append(hp);
    
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
    this.testLog = function (){
        console.log(this.name);
        console.log(this.health);
        console.log(this.attack);
        console.log(this.isUser);
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
    megaX.createElem();
    megaX.testLog();

    zero.createElem();
    zero.testLog();

    sigma.createElem();
    sigma.testLog();

    colonel.createElem();
    colonel.testLog();
    

    console.log(instancesLoaded);


}

$(document).ready(function() {
    render();
    $("#cr-1").on("click", function (){
        if(!hasUserChosen){
            megaX.moveUserSpace();
            whoIsUser = megaX;
        }else if(hasUserChosen &&  (!megaX.alreadyChosen)){
            megaX.moveElemToDef(); 
        }else{
            return;
        }
    });
    $("#cr-2").on("click", function () {
        if(!hasUserChosen){
            zero.moveUserSpace();
        }else if(hasUserChosen && (!zero.alreadyChosen)){
            zero.moveElemToDef();
            whoIsEnemy = zero;

        }else{
            return;
        }

    });
    $("#cr-3").on("click", function (){
        if(!hasUserChosen){
            sigma.moveUserSpace();
            
        }else if(hasUserChosen && (!sigma.alreadyChosen)){
            sigma.moveElemToDef();
        }else{
            return;
        }
    });
    $("#attackbtn").on("click", function () {
        battleField(whoIsUser, whoIsEnemy);

    })

});

console.log(megaX.battlePower());