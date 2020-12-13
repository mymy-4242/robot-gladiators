
//function to start game
var startGame = function() {

    //reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60);

            console.log(pickedEnemyObj);

            //call fight function with enemy-root
            fight(pickedEnemyObj);

        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    } 
    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

//function to end the game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    //if player is still alive, player wins!
    if (playerInfo.heatlh > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");    
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

//fight function
var fight = function(enemy) {
    
    //repeat and execute as long as the enemy-robot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

            //if player chooses to skip
            if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
                //confirm player wants to skip
                var confirmSkip = window.confirm("Are you sure you'd like to quit?");
                           
                //if yes (true), leave fight
                if (confirmSkip) {
                    window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                    //subtract money from playerInfo.money for skipping
                    playerInfo.money = Math.max(0, playerInfo.money - 1);
                    console.log("playerInfo.money", playerInfo.money);  
                    shop(); 
                    break;
                }
            } 

            //generate random damage value based on player's attack
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            
            enemy.health = Math.max(0, enemy.health - damage);

            console.log(
               playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            //check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                //award player money for winning
                playerInfo.money = playerInfo.money + 20;

                //ask if player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, would you like to visit the store?");

                if (storeConfirm) {
                    shop();
                }

                //leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

            //generate random value based on enemy's attack power
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
          
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            console.log(
               enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            ); 

            //check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
                
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
    }
};

//shop function
var shop = function() {
    //ask player what they would like to do
    var shopOptionPrompt = window.prompt (
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
        switch (shopOptionPrompt) {
            case "refill":
            case "REFILL":    
                playerInfo.refillHealth();
                break;
            
            case "upgrade":
            case "UPGRADE":    
                playerInfo.upgradeAttack();
                break;

            case "leave":
            case "LEAVE":    
                window.alert("Leaving the store.");
                
                //do nothing, function will end
                break;

            default:
                window.alert("You did not pick a valid option. Try again.");

                //call shop() again to force player to pick a valid option
                shop();
                break;
        }
};

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

/*GAME INFORMATION / VARIABLES */

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What's your robot's name?");
    }

    console.log ("Your robot's name is " + name);
    return name;
};

//player information
var playerInfo = {
    name: getPlayerName(),
    health: 20,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 20;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

//enemy information
var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

//start t9e game when the page loads
startGame();

