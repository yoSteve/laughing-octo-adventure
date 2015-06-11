
function generateNewBoard() {
			var grid = new Array(8);
	for (var i = 0; i < grid.length; i++) {
		grid[i] = new Array(8);
	} 
}


function assignCrystalsToMap (map) {
	for (var col = 0; col < map.length; col++) {
		for (var row = 0; row < map[col].length; row++) {
			var manaCrystal = Math.round(Math.random() * 5);
			map[col][row] = manaCrystal;
		} 
	}
}

function destroy(cell) {
	cell = null;
}


function findMatchRow (map) {
    for (var col = 2; col < map.length; col++) {
        for (var row = 0; row < map[col].length; row++) {
            if (map[col][row] == map[col-1][row] && map[col][row] == map[col-2][row]) {
                // award points/damage enemy here
                console.log(map[col][row], map[col-1][row], map[col-2][row])
                console.log("inside findMatchRow if condition")
                map[col][row] = 9;
                map[col-1][row] = 9;
                map[col-2][row] = 9;
            }
        } 
    }return map;

function findMatchCol (map) {
	for
}