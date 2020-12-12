var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
};

var enemyInfo = [
    {
        name: "Roberto",
        attack: 12
    },
    {
        name: "Amy Android",
        attack: 13
    },
    {
        name: "Robo Trumble",
        attack: 14
    }
];

var fight = function(enemyName) {
    //repeat and execute as long as the enemy-robot is alive
    while(enemyHealth > 0 && playerInfo.health > 0) {

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
                    break;
                }
            } 

            //generate random damage value based on player's attack
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            
            enemyHealth = Math.max(0, enemyHealth - damage);

            console.log(
                playerInfo.name + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            //check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");

                //award player money for winning
                playerInfo.money = playerInfo.money + 20;

                //leave while() loop since enemy is dead
                break;
                
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            //generate random value based on enemy's attack power
            var damage = randomNumber(enemyInfo.attack - 3, enemyInfo.attack);
           
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            console.log(
                enemyName + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
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

//function to start game
var startGame = function() {
    //reset player stats
    playerInfo.health = 100;
    playerInfo.attack = 10;
    playerInfo.money = 10;

    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        
            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60);

            //call fight function with enemy-root
            fight(pickedEnemyObj);

            //if we're not at the last enemy in the array
            if (playerInfo.heatlh > 0 && i < enemyInfo.name.length - 1) {
                //ask if player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, would you like to visit the store?");

                if (storeConfirm) {
                    shop();
                }
            }

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
    if (playerInfo.heatlh > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");    
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
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
                if (playerInfo.money >= 7) {
                    window.alert("Refilling player's health by 20 for 7 dollars.");

                    //increase health and decrease money
                    playerInfo.heatlh = playerInfo.heatlh + 20;
                    playerInfo.money = playerInfo.money - 7;
                }
                else {
                    window.alert("You don't have enough money!");
                }

                break;
            
            case "upgrade":
            case "UPGRADE":    
                if (playerInfo.money >= 7) {
                    window.alert("Upgrading player's attack by 6 for 7 dollars.");
                
                    //increase attack and decrease money
                    playerInfo.attack = playerInfo.attack + 6;
                    playerInfo.money = playerInfo.money - 7;
                }
                else {
                    window.alert("You don't have enough money!");
                }
                
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


//start t9e game when the page loads
startGame();


