function fighter(health, attack, counter, name){
    this.health = health;
    this.attack = attack;
    this.counterPower = counter;
    this.name = name;
    this.timesAttacked = 0;
    this.isUser = false;
    
    this.incUserMulti = function (){
        this.timesAttacked += 5;
    }
    this.battlePower = function (){
        if(this.name === "marsh" && (isUser)){
            var userAttackPower = this.attack + (Math.floor(Math.random * 10) + this.timesAttacked);
            return userAttackPower;
        }

    }
    

}

function battleField (user, opponent){
    user.health += -opponent.counterPower;
    opponent.health += -user.battlePower();
    user.incUserMulti();
}