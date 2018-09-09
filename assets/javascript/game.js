



var megaX = new fighter(150, 5, 20, "X");

function fighter(health, attack, counter, name){
    this.health = health;
    this.attack = attack;
    this.counterPower = counter;
    this.name = name;
    this.timesAttacked = 0;
    this.isUser = false;
    this.isDead = false;
    this.isDefending = false;
    this.createElem = function () {
        var newDiv = document.createElement("div");
        var image = $("<img>", {
            src : "../images/1stcharplaceholder.png"
        });
        var name = this.name;
        var hp = this.health;

        newDiv.append(name).append(image).append(hp);

        $("#box1").html(newDiv);

    }
    this.moveElemToDef = function () {
     
        var newDiv = document.createElement("div");
        var image = $("<img>", {
            src : "../assets/images/1stcharplaceholder.png"
        });
        var name = this.name;
        var hp = this.health;

        $(newDiv).append(name).append(image).append(hp);

        $("#defend-space").html(newDiv);

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


}

$(document).ready(function() {
    render();
});