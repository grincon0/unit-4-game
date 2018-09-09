var instancesLoaded = 1;
var hasUserChosen = false;
var isDefenderChosen = false;
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
    this.moveElemToDef = function () {
        //var whichID = this.iD;
        var newDiv = document.createElement("div");
        var image = $("<img>", {
            src : `assets/images/${this.iD}charplaceholder.png`
        });
        var name = this.name;
        var hp = this.health;

        $(newDiv).append(name).append(image).append(hp);

        $("#defend-space").append(newDiv);

    }
    this.incUserMulti = function (){
        this.timesAttacked += 5;
    }
    this.battlePower = function (){
        if(this.isUser){
            var userAttackPower = this.attack + (Math.floor(Math.random * 10) + this.timesAttacked);
            return userAttackPower;
        }
    }
    this.testLog = function (){
        console.log(this.name);
        console.log(this.health);
        console.log(this.attack);
        console.log(this.isUser);
    }
}

function battleField (user, opponent){
    user.health += -opponent.counterPower;
    opponent.health += -user.battlePower();
    user.incUserMulti();
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
        megaX.moveElemToDef();


    });
});
