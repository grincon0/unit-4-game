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
var isMusicPlaying = false;

// sprite animation checkers

var XspOnce =false;
var ZspOnce = false;


//Zero Animation triggers
var isZeroSpriteSet = false;
var isZeroAtk = false;
var isZeroHurt = false;
var isZeroEvade = false;
var isZeroIdle = false;

//X's animation triggers
var isXSpriteSet = false;
var isXAtk = false;
var isXHurt = false;
var isXEvade = false;

//Sigma animation triggers
var isSigmaSpriteSet = false;
var isSigmaAtk = false;
var isSigmaHurt = false;
var isSigmaEvade = false;

//Colonel's animation triggers
var isColSpriteSet = false;
var isColAtk = false;
var isColHurt = false;
var isColEvade = false;

//complete animations
var isUserAnimComp = false;
var isOppAnimComp = false;

//on click on the atk btn, triggers the scene animation
var startAnim = false;


var battle = new Audio('assets/audio/kraken.mp3');

//base game

var megaX = new fighter(150, 14, 13, "X", 1);
var zero = new fighter(135, 19, 18, "Zero", 2);
var sigma = new fighter(175, 18, 17, "Sigma", 3);
var colonel = new fighter(160, 15, 16, "Colonel", 4);


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
        $(hp).css({"color" : "#FFFFFF"} );
        $(newDiv).css({ "border-color" :"#FFFFFF",
        "border-width" : "2px",
        "border-style" : "solid",
        "color" : "#FFFFFF"

});
        $(newDiv).append(name).append(image).append(hp)
        $(newDiv).attr("id" , `cr-${instancesLoaded}`).attr("class", 'charBlock');

        
        fighterz.push(newDiv);
        instancesLoaded++;

    }
    this.moveUserSpace = function () {
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
            this.isDefending = true;
            isDefenderChosen = true;

            
        }else if(!hasUserChosen){
            return;
        }else{
            return;
        }
    }
    this.incUserMulti = function (){
        this.timesAttacked += 10;
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

    if(hasUserChosen && isDefenderChosen){
        document.getElementById("user-feed").innerText = "";
        document.getElementById("enemy-feed").innerText ="";
        user.battlePower();
        var userAtk = userWeightedPower;
        opponent.health += -userAtk;
        $("#user-feed").text(`${user.name} attacks ${opponent.name}...${opponent.name} suffered ${userAtk} points of damage!`);
        user.health += -opponent.counterPower;
        $("#enemy-feed").text( `${opponent.name} counters... ${user.name} suffered ${opponent.counterPower} points of damage!`);
    
        user.incUserMulti();        

    }else{
        
        $("#user-feed").text("Choose a fighter!");
        
        $("#enemy-feed").text("and an enemy!");
    }
    
}

function defenderHasBeenDefeated(){
    isDefenderChosen = false;
}

function render(){
    appendElems();
    console.log(instancesLoaded);
}
$(document).keyup(function () {
    if(!isMusicPlaying){
        battle.play();
    }
});
$(document).ready(function() {
    render();
    gameInterval();
    $("#cr-1").on("click", function (){
        if(!hasUserChosen){
            $("#box0").html("");
            megaX.moveUserSpace();
            whoIsUser = megaX;
            updateGameScene();
        }else if(hasUserChosen && (!isUserDead) && (!isDefenderChosen)){
            $("#box0").html("");
            megaX.moveElemToDef();
            whoIsEnemy = megaX; 
            updateGameScene();
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
            isZeroIdle = true;
            updateGameScene();
        }else if(hasUserChosen && (!isUserDead) && (!isDefenderChosen)){
            $("#box1").html("")
            zero.moveElemToDef();
            whoIsEnemy = zero;
            isZeroIdle = true;
            updateGameScene();

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
        if(zero.isDefending || zero.isUser){

            zeroAttack();
        }

        if(!isUserDead){
            battleField(whoIsUser, whoIsEnemy);
        }else{
            return;
        }
        

    });

});


//end of base game

//I wanted to experiement rendering sprites
//I was not able to complete this for now due to time constraints

//code for animations are below

//Warning the code below is pretty messy. I have yet to consolidate it

//                                              -----leaving base game-----

//anim variables

//sigma attack animation
var canvasWidth = 400;
var canvasHeight = 200;
var spriteWidth = 509;
var spriteHeight = 127;

//number of rows and columns in sprite sheet
var rows = 1;
var cols = 4;
var width = spriteWidth / cols;
var height = spriteHeight/ rows;
var curFrame = 0;

var frameCount = 3;

var x = 0;
var y = 0;

var srcX = 0;
var srcY = 0;

var canvas = document.getElementById('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;


var ctx = canvas.getContext("2d");
var character = new Image();

character.src = "assets/images/satk.png";
function updateFrame(){
    curFrame = ++curFrame % frameCount;

    srcX = curFrame * width;
    ctx.clearRect(x,y,width,height);
}

function draw () {
        updateFrame();
        ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
}
//setInterval(draw, 100);



//sigma neutral anim (sn prefix-)
var sNeutralWidth = 65;
var sNeutralHeight = 113;
var sNRow = 1;
var sNCol = 1;

var snwidth = sNeutralWidth / sNCol;
var snheight = sNeutralHeight/ sNRow;
var sncurFrame = 0;

var snframeCount = 1;

var snX = 0;
var snY = 0;

var snsrcX = 0;
var snsrcY = 0;

var sigmaNeutral = new Image();

sigmaNeutral.src = "assets/images/spose.png";
function snupdateFrame(){
    sncurFrame = ++sncurFrame % snframeCount;

    snsrcX = sncurFrame * snwidth;
    ctx.clearRect(snX,snY,snwidth,snheight);
}

function sndraw () {
        snupdateFrame();
        ctx.drawImage(sigmaNeutral, snsrcX, snsrcY, snwidth, snheight, snX, snY, snwidth, snheight);
}
//setInterval(sndraw, 100);

//sigma hurt anim (sh prefix)
var shWidth = 89;
var shHeight = 105;
var shRow = 1;
var shCol = 1;

var shwidth = shWidth / shCol;
var shheight = shHeight/ shRow;
var shcurFrame = 0;

var shframeCount = 1;

var shX = 0;
var shY = 0;

var shsrcX = 0;
var shsrcY = 0;

var sigmaHurt = new Image();

sigmaHurt.src = "assets/images/shurt.png";
function shupdateFrame(){
    shcurFrame = ++shcurFrame % shframeCount;

    shsrcX = shcurFrame * shwidth;
    ctx.clearRect(shX,shY,shwidth,shheight);
}

function shdraw () {
        shupdateFrame();
        ctx.drawImage(sigmaHurt, shsrcX, shsrcY, shwidth, shheight, shX, shY, shwidth, shheight);
}
//setInterval(shdraw, 100);


//X attack anim (xa -prefix)
var xaWidth = 440;
var xaHeight = 80;
var xaRow = 1;
var xaCol = 8;

var xawidth = xaWidth / xaCol;
var xaheight = xaHeight/ xaRow;
var xacurFrame = 0;

var xaframeCount = 8;

var xaX = 0;
var xaY = 0;

var xasrcX = 0;
var xasrcY = 0;

var xAttack = new Image();

xAttack.src = "assets/images/xatk2.png";
function xaupdateFrame(){
    xacurFrame = ++xacurFrame % xaframeCount;

    xasrcX = xacurFrame * xawidth;
    ctx.clearRect(xaX,xaY,xawidth,xaheight);
}

function xadraw () {
        xaupdateFrame();
        ctx.drawImage(xAttack, xasrcX, xasrcY, xawidth, xaheight, xaX, xaY, xawidth, xaheight);
}
//setInterval(xadraw, 60);

// X neutral (xn -prefix)

var xnWidth = 213;
var xnHeight = 51;
var xnRow = 1;
var xnCol = 5;

var xnwidth = xnWidth / xnCol;
var xnheight = xnHeight/ xnRow;
var xncurFrame = 0;

var xnframeCount = 5;

var xnX = 0;
var xnY = 0;

var xnsrcX = 0;
var xnsrcY = 0;

var xNeutral = new Image();

xNeutral.src = "assets/images/xpose.png";
function xnupdateFrame(){
    xncurFrame = ++xncurFrame % xnframeCount;

    xnsrcX = xncurFrame * xnwidth;
    ctx.clearRect(xnX,xnY,xnwidth,xnheight);
}

function xndraw () {
        xnupdateFrame();
        ctx.drawImage(xNeutral, xnsrcX, xnsrcY, xnwidth, xnheight, xnX, xnY, xnwidth, xnheight);
}

//setInterval(xndraw, 100);

// x hurt

var xhWidth = 244;
var xhHeight = 63;
var xhRow = 1;
var xhCol = 5;

var xhwidth = xhWidth / xhCol;
var xhheight = xhHeight/ xhRow;
var xhcurFrame = 0;

var xhframeCount = 5;

var xhX = 0;
var xhY = 0;

var xhsrcX = 0;
var xhsrcY = 0;

var xHurt = new Image();

xHurt.src = "assets/images/xhurt.png";
function xhupdateFrame(){
    xhcurFrame = ++xhcurFrame % xhframeCount;

    xhsrcX = xhcurFrame * xhwidth;
    ctx.clearRect(xhX,xhY,xhwidth,xhheight);
}

function xhdraw () {
        xhupdateFrame();
        ctx.drawImage(xHurt, xhsrcX, xhsrcY, xhwidth, xhheight, xhX, xhY, xhwidth, xhheight);
}

//setInterval(xhdraw, 100);

//colonel attack anim (ca -prefix)

var caWidth = 500;
var caHeight = 113;
var caRow = 1;
var caCol = 4;

var cawidth = caWidth / caCol;
var caheight = caHeight/ caRow;
var cacurFrame = 0;

var caframeCount = 4;

var caX = 0;
var caY = 0;

var casrcX = 0;
var casrcY = 0;

var cAtk = new Image();

cAtk.src = "assets/images/colatk.png";
function caupdateFrame(){
    cacurFrame = ++cacurFrame % caframeCount;

    casrcX = cacurFrame * cawidth;
    ctx.clearRect(caX,caY,cawidth,caheight);
}

function cadraw () {
        caupdateFrame();
        ctx.drawImage(cAtk, casrcX, casrcY, cawidth, caheight, caX, caY, cawidth, caheight);
}

//setInterval(cadraw,100);

// colonel neutral anim (cn -prefix)
var cnWidth = 78;
var cnHeight = 107;
var cnRow = 1;
var cnCol = 1;

var cnwidth = cnWidth / cnCol;
var cnheight = cnHeight/ cnRow;
var cncurFrame = 0;

var cnframeCount = 1;

var cnX = 0;
var cnY = 0;

var cnsrcX = 0;
var cnsrcY = 0;

var cNeutral = new Image();

cNeutral.src = "assets/images/colpose.png";
function cnupdateFrame(){
    cncurFrame = ++cncurFrame % cnframeCount;

    cnsrcX = cncurFrame * cnwidth;
    ctx.clearRect(cnX,cnY,cnwidth,cnheight);
}

function cndraw () {
        cnupdateFrame();
        ctx.drawImage(cNeutral, cnsrcX, cnsrcY, cnwidth, cnheight, cnX, cnY, cnwidth, cnheight);
}

//setInterval(cndraw, 100);

//zero attack anim (za -prefix)

var caWidth = 500;
var caHeight = 113;
var caRow = 1;
var caCol = 4;

var cawidth = caWidth / caCol;
var caheight = caHeight/ caRow;
var cacurFrame = 0;

var caframeCount = 4;

var caX = 0;
var caY = 0;

var casrcX = 0;
var casrcY = 0;

var cAtk = new Image();

cAtk.src = "assets/images/colatk.png";
function caupdateFrame(){
    cacurFrame = ++cacurFrame % caframeCount;

    casrcX = cacurFrame * cawidth;
    ctx.clearRect(caX,caY,cawidth,caheight);
}

function cadraw () {
        caupdateFrame();
        ctx.drawImage(cAtk, casrcX, casrcY, cawidth, caheight, caX, caY, cawidth, caheight);
}

//setInterval(cadraw,100);

// colonel neutral anim (cn -prefix)
var zaWidth = 650;
var zaHeight = 96;
var zaRow = 1;
var zaCol = 7;

var zawidth = zaWidth / zaCol;
var zaheight = zaHeight/ zaRow;
var zacurFrame = 0;

var zaframeCount = 7;

var zaX = 0;
var zaY = -50;

var zasrcX = 0;
var zasrcY = 0;

var zAttack = new Image();

zAttack.src = "assets/images/zatk3.png";
function zaupdateFrame(){
    zacurFrame = ++zacurFrame % zaframeCount;

    zasrcX = zacurFrame * zawidth;
    if(zero.isDefending){
        zasrcY = 1 * zaheight;
    }
    ctx.clearRect(zaX,zaY,zawidth,zaheight);
}

function zadraw () {
        zaupdateFrame();
        ctx.drawImage(zAttack, zasrcX, zasrcY, zawidth, zaheight, zaX, zaY, zawidth, zaheight);
}

//setInterval(zadraw, 80);


//z neutral (zn -prefix)

var znWidth = 144;
var znHeight = 100;
var znRow = 2;
var znCol = 3;

var znwidth = znWidth / znCol;
var znheight = znHeight/ znRow;
var zncurFrame = 0;

var znframeCount = 3;

var znX = 0;
var znY = 0;

var znsrcX = 0;
var znsrcY = 0;

var zNeutral = new Image();

zNeutral.src = "assets/images/zpose.png";
function znupdateFrame(){
    zncurFrame = ++zncurFrame % znframeCount;

    znsrcX = zncurFrame * znwidth;
    if(zero.isDefending){
        znsrcY = 1 * znheight;
    }
    ctx.clearRect(znX,znY,znwidth,znheight);
}

function zndraw () {
   

    
        znupdateFrame();
        ctx.drawImage(zNeutral, znsrcX, znsrcY, znwidth, znheight, znX, znY, znwidth, znheight);
    
}

//setInterval(zndraw, 300);

//z hurt ( zh -prefix)

var zhWidth = 326;
var zhHeight = 67;
var zhRow = 1;
var zhCol = 6;

var zhwidth = zhWidth / zhCol;
var zhheight = zhHeight/ zhRow;
var zhcurFrame = 0;

var zhframeCount = 6;

var zhX = 0;
var zhY = 0;

var zhsrcX = 0;
var zhsrcY = 0;

var zHurt = new Image();

zHurt.src = "assets/images/zhurt.png";
function zhupdateFrame(){
    zhcurFrame = ++zhcurFrame % zhframeCount;

    zhsrcX = zhcurFrame * zhwidth;
    ctx.clearRect(zhX,zhY,zhwidth,zhheight);
}

function zhdraw () {
        zhupdateFrame();
        ctx.drawImage(zHurt, zhsrcX, zhsrcY, zhwidth, zhheight, zhX, zhY, zhwidth, zhheight);
}

//setInterval(zhdraw, 100);

//floor sprite


var flWidth = 400;
var flHeight = 23;
var flRow = 1;
var flCol = 1;

var flwidth = flWidth / flCol;
var flheight = flHeight/ flRow;
var flcurFrame = 0;

var flframeCount = 1;

var flX = 0;
var flY =  180;

var flsrcX = 0;
var flsrcY = 0;

var floor = new Image();

floor.src = "assets/images/floor.png";
function flupdateFrame(){
    flcurFrame = ++flcurFrame % flframeCount;

    flsrcX = flcurFrame * flwidth;
    ctx.clearRect(flX,flY,flwidth,flheight);
}

function fldraw () {
        flupdateFrame();
        ctx.drawImage(floor, flsrcX, flsrcY, flwidth, flheight, flX, flY, flwidth, flheight);
}

var floory = setInterval(fldraw, 300);

var XspDefOnce = false;
var ZspOnce = false;
var ZspDefOnce = false;
function updateGameScene (){
    xIdle();
    zeroIdle();


}

//attack anims

// idle anims
//if(isZeroIdle){
   // var zeroee = setInterval(zndraw, 300);
//}

//var zIdleInterval = setInterval(zndraw, 300)
function zeroIdle (){
    if(zero.isDefending && zero.health > 0 && (!ZspDefOnce) ){
        zaX = znX = zhX = 290;
        zaY = znY = zhy = 140;
        var idle = setInterval(function(){
            zndraw();
            if(isZeroAtk || isZeroHurt || isZeroEvade){
                 clearInterval(idle);
                 console.log("wow");
            }



        }, 300);
       
        ZspDefOnce = true;
        

    }else if(zero.isUser && zero.health > 0 && (!ZspOnce)){
        zaX = znX = zhX = 60;
        zaY = znY = zhy = 140;
        setInterval(zndraw, 300);
        ZspOnce = true;
        
    }
    if(isZeroAtk || isZeroHurt || isZeroEvade){
        var idleCheck = setInterval(function(){
            if(isZeroAtk || isZeroHurt || isZeroEvade){
                erase();
            }
        },300);
        clearInterval(idle);

    }
    function erase(){
        clearInterval(idle);
        ctx.clearRect(zaX,zaY,zawidth,zaheight);
    }
}
var zaTimesRun = 0;
function zeroAttack(){
    isZeroAtk = true;

    if(zero.isDefending && zero.health > 0 && isZeroAtk){
        zaX = 70;
        zaY = 100;
        
        var attack = setInterval(function (){
            
            zadraw();
            zaTimesRun++
            if(zaTimesRun >=7){
                ZspOnce = false;
                ZspDefOnce = false;
                isZeroAtk = false;
                clearInterval(attack);
                zeroIdle();
            }

        }, 70 );
        

    }else if(zero.isUser && zero.health > 0 && isZeroAtk){
        zaX = 260;
        var attack = setInterval(function (){
            zadraw();
            zaTimesRun++
            if(zaTimesRun >= 7){
                ZspOnce = false;
                ZspDefOnce = false;
                isZeroAtk = false;
                clearInterval(attack);
                
            }


        }, 70 );
        
    }

    
}

function xIdle(){

    if(megaX.isDefending && megaX.health > 0 && (!XspDefOnce) ){
        xaX = xnX = xhX = 290;
        xaY = xnY = xhy = 140;
        var idle = setInterval(xndraw, 100);
        XspDefOnce = true;
        return idle;

    }else if(megaX.isUser && megaX.health > 0 && (!XspOnce)){
        xaX = xnX = xhX = 60;
        xaY = xnY = xhy = 140;
        setInterval(xndraw, 300);
        XspOnce = true;
        
    }



}




function tester(){
    
       clearInterval(floory);
   

}

tester();
