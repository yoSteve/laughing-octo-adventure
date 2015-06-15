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

    function meleAttack(cell) {
        switch (cell) {
            case 0 :
                enemyHP = enemyHP - meleRed;
                break;
            case 1 :
                enemyHP = enemyHP - meleBlue;
                break;
            case 2 :
                enemyHP = enemyHP - meleGreen;
                break;
            case 3 :
                enemyHP = enemyHP - meleYellow;
                break;
            case 4 :
                enemyHP = enemyHP - meleBlack;
                break;
            case 5 :
                enemyHP = enemyHP - meleWhite;
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