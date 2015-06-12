
function generateNewBoard() {
			var grid = new Array(8);
	for (var i = 0; i < grid.length; i++) {
		grid[i] = new Array(8);
	} 
}

function getRandomCrystal() {
    return Math.round(Math.random() * 5);
}

function assignCrystalsToMap (map) {
    for (var col = 0; col < map.length; col++) {
        for (var row = 0; row < map[col].length; row++) {
            map[col][row] = getRandomCrystal();
        } 
    }
    return map;
}

function destroy(cell) {
	cell = null;
}


function findMatchRow (map) {
	for (var col = 2; col < map.length; col++) {
		for (var row = 0; row < map[col].length; row++) {
			if (map[col][row] == map[col-1][row] && map[col][row] == map[col-2][row]) {
        // if player made match: award points here
        // if player made match: damage enemy here
        map[col][row] = null;
        map[col-1][row] = null;
        map[col-2][row] = null;
      }
    } 
  }
  return map;
}

function findMatchCol (map) {
	for (var col = 0; col < map.length; col++) {
		for (var row = 2; row < map[col].length; row++) {
			if (map[col][row] == map[col][row-1] && map[col][row] == map[col][row-2]) {
        // if player made match: award points here
        // if player made match: damage enemy here
        map[col][row] = null;
        map[col][row-1] = null;
        map[col][row-2] = null;
      }
    } 
  }
  return map;
}

function findAllMatches(map) {
	findMatchRow(map);
	findMatchCol(map);
	return map;
}

function dropIntoNullSpace(map) {
	var col = map[7];
	var row = map[col][7];
	for (row; row >= 0; row--) {
		for (col; col >= 0; col--) {
			if (map[col][row] == null) {
				for (row; row >= 0; row--) {
					map[col][row++];
				}
			}
		}
	} return map;
}

function boardLogic(map) {
	generateNewBoard(map);
	assignCrystalsToMap(map);
	findAllMatches(map);
}