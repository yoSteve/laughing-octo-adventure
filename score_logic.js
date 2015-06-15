        var PLAYER1_DEFAULT_HP = 250,
            PLAYER2_DEFAULT_HP = 250,
            ENEMY_DEFAULT_HP   = 250;

        var player1HP = PLAYER1_DEFAULT_HP,
            player2HP = PLAYER2_DEFAULT_HP,
            enemyHP   = ENEMY_DEFAULT_HP;

       // MANA POOL //
       var  manaRed    = 0,
            manaBlue   = 0,
            manaGreen  = 0,
            manaYellow = 0,
            manaBlack  = 0,
            manaWhite  = 0;

        var meleeRed    = 15,
            meleeBlue   = 15,
            meleeGreen  = 10,
            meleeYellow = 10,
            meleeBlack  =  5,
            meleeWhite  =  5;

////////////// ///////////////////// ////////////////////

    function awardMana(cell) {
        switch (cell) {
            case 0 :
                manaRed++;
                break;
            case 1 :
                manaBlue++;
                break;
            case 2 :
                manaGreen++;
                break;
            case 3 :
                manaYellow++;
                break;
            case 4 :
                manaBlack++;
                break;
            case 5 :
                manaWhite++;
                break;
        }
    }

    function zeroAllMana() {
        manaRed    = 0,
        manaBlue   = 0,
        manaGreen  = 0,
        manaYellow = 0,
        manaBlack  = 0,
        manaWhite  = 0;    
    }

    function updateManaPool() {
        $("#mana-red").text(manaRed);
        $("#mana-blue").text(manaBlue);
        $("#mana-green").text(manaGreen);
        $("#mana-yellow").text(manaYellow);
        $("#mana-black").text(manaBlack);
        $("#mana-white").text(manaWhite);
    }

    function meleeAttack(cell) {
        switch (cell) {
            case 0 :
                enemyHP = enemyHP - meleeRed;
                break;
            case 1 :
                enemyHP = enemyHP - meleeBlue;
                break;
            case 2 :
                enemyHP = enemyHP - meleeGreen;
                break;
            case 3 :
                enemyHP = enemyHP - meleeYellow;
                break;
            case 4 :
                enemyHP = enemyHP - meleeBlack;
                break;
            case 5 :
                enemyHP = enemyHP - meleeWhite;
                break;
        }
    }

    function updateEnemyHP() {
        $("#enemy-hp").text(enemyHP);
    }

    function setHPtoDefault() {
        enemyHP = ENEMY_DEFAULT_HP;
        playerHP = PLAYER1_DEFAULT_HP;
    }