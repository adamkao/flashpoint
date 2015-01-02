function show( s ) {document.getElementById( 'output' ).value = s;}
function d( s ) {return Math.floor( Math.random() * s ) + 1;}

var building = [
   ['*******************'],
   ['**+*+*+*+*+*o*+*+**'],
   ['*+.....c..P+.....+*'],
   ['**.*.*.*.*.*.*.*.**'],
   ['*+.....+...+.....+*'],
   ['**.*.*+*+*c*+*+*c**'],
   ['*o...cf.f.f.f+...+*'],
   ['**.*.*.*.*.*.*.*.**'],
   ['*+...+f.f.f.fc...o*'],
   ['**+*+*+*c*+*+*+*+**'],
   ['*+P........+...+.+*'],
   ['**.*.*.*.*.*.*.*.**'],
   ['*+.........c..Pc.+*'],
   ['**+*+*o*+*+*+*+*+**'],
   ['*******************'],
   ];

function is( row, col, chr ) {
	return (building[row].CharAt( col ) === chr)
}
function isBlocked( row, col ) {
	var chr = building[row].CharAt( col );
	return ((chr === 'o') || (chr === '.'))
}
function setChar( row, col, chr ) {
	building[row] = building[row].substr( 0, col ) + chr + building[row].substr( col + 1 );
}

function Nfire( row, col ) {
	if (isBlocked( row - 1, col )) return false;
	return is( row - 2, col, 'f' )
}
function Sfire() {
	if (isBlocked( row + 1, col )) return false;
	return is( row + 2, col, 'f' )
}
function Efire() {
	if (isBlocked( row, col + 1 )) return false;
	return is( row, col + 2, 'f' )
}
function Wfire() {
	if (isBlocked( row, col - 1 )) return false;
	return is( row, col - 2, 'f' )
}
function adjacentonfire( row, col ) {
	return (Nfire( row, col ) || Sfire( row, col )
			|| Efire( row, col ) || Wfire( row, col))
}
function setonfire( row, col ) {
	if (is( row, col, 's' ) {
		$( 'img.col' + col +'.row' + row + '.smoke' ).hide();
	} else if (is( row, col, 'p' ) {
		$( 'img.col' + col +'.row' + row + '.POI' ).hide();
	}
	setChar( row, col, 'f' );
	$( 'img.col' + col +'.row' + row + '.fire' ).show();
}

function advance() {
	var row = d( 6 ) * 2, col = d( 8 ) * 2;

	if (is( row, col, 's' )) {
		show( col + ', ' + row + ' smoke to fire' );
		setonfire( row, col );
		smokecount--;
	} else if (row, col, 'f') {
		show( col + ', ' + row + ' explosion' );
		explosion( row, col );
	} else if (adjacentonfire( row, col )) {
		show( col + ', ' + row + ' adj to fire' );
		setonfire( row, col );
	} else {
		show( col + ', ' + row + ' smoke' );
		setChar( row, col, 's' )
		smokecount++;
		$( 'img.col' + col +'.row' + row + '.smoke' ).show();
	}
	flashover();
}

function explosion( row, col ) {
	var nwall, swall, ewall, wwall;

	while (true) {
		nwall = building[brow - 1][bcol];
		if ((nwall === '+') || (nwall === 'c')) {
			building[brow - 1][bcol] = '-'
			break;
		}
		if (nwall === '-') {
			building[brow - 1][bcol] = '='
			break;
		}
		brow -= 2;
		if (building[brow][bcol] === '*') {break;}
		if (building[brow][bcol] === '.') {
			setonfire( row, col );
			break;
		}
	}
	while (true) {
		swall = building[brow + 1][bcol];
		if ((swall === '+') || (swall === 'c')) {break;}
		brow += 2;
		if (building[brow][bcol] === '*') {break;}
		if (building[brow][bcol] === '.') {
			setonfire( row, col );
			break;
		}
		swall = brow + 1;
	}
	while (true) {
		ewall = building[brow][bcol + 1];
		if ((ewall === '+') || (ewall === 'c')) {break;}
		bcol += 2;
		if (building[brow][bcol] === '*') {break;}
		if (building[brow][bcol] === '.') {
			setonfire( row, col );
			break;
		}
	}
	while (true) {
		wwall = building[brow][bcol - 1];
		if ((wwall === '+') || (wwall === 'c')) {break;}
		bcol -= 2;
		if (building[brow][bcol] === '*') {break;}
		if (building[brow][bcol] === '.') {
			setonfire( row, col );
			break;
		}
	}
}

function flashover() {
	var newsmokecount = smokecount;
	while (true) {
		for (row = 1; row < 7; row++) {
			for (col = 1; col < 9; col++) {
				if (building[2 * row][2 * col] === 's') {
					if (adjacentonfire( row, col )) {
						setonfire( row, col );
						newsmokecount--;
					}
				}
			}
		}
		if (newsmokecount === smokecount) {break;}
		smokecount = newsmokecount;
	}
}

$(document).ready(function(){
	show( '' );
});