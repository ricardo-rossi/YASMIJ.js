/*
* @project YASMIJ.js, "Yet another simplex method implementation in Javascript"
* @author Larry Battle
* @license MIT License <http://www.opensource.org/licenses/mit-license>
* @date 07/02/2012
*/

tests.runMatrixTests = function(){
	module( "YASMIJ.Matrix Class" );
	test( "test YASMIJ.Matrix.inverseArray()", function(){
		var func = function(arr){
			return YASMIJ.Matrix.inverseArray(arr);
		};
		deepEqual( func([1,2,3]), [-1,-2,-3]);
	});
	test( "test YASMIJ.Matrix.parse()", function(){
		var func = function(obj){
			return YASMIJ.Matrix.parse(obj).toString();
		};
		equal( func(1), "[1]" );
		equal( func([1,2,3]), "[1,2,3]" );
		equal( func([[1,2,3],[1,2,3]]), "[[1,2,3],[1,2,3]]" );
	});
	test( "test YASMIJ.Matrix.isArray()", function(){
		var func = YASMIJ.Matrix.isArray;
		equal( func([]), true );
		equal( func([[]]), true );
		equal( func({}), false );
		equal( func(Math), false );
		equal( func(false), false );
	});
	test( "test YASMIJ.Matrix.prototype.addRow()", function(){
		var func = function( obj, rowObj ){
			return YASMIJ.Matrix.parse(obj).addRow(rowObj).toString();
		};
		equal( func( 1, 2 ), "[[1],[2]]" );
		equal( func( [1,2], [1,2] ), "[[1,2],[1,2]]" );
	});
	test( "test YASMIJ.Matrix.prototype.getRow()", function(){
		var func = function( obj, i ){
			return YASMIJ.Matrix.parse( obj ).getRow(i);
		};
		deepEqual(func([[1],[2]], 1), [2] );
	});
	test( "test YASMIJ.Matrix.prototype.forEachRow()", function(){
		var func = function( obj, fn ){
			return YASMIJ.Matrix.parse( obj ).forEachRow(fn);
		};
		var arr = [];
		func( [[1],[2],[3]], function(i,row){ 
			arr.push( row[0] ); 
		});
		deepEqual( arr, [1,2,3] );
	});
	test( "test YASMIJ.Matrix.prototype.getColumn()", function(){
		var func = function( obj, j ){
			return YASMIJ.Matrix.parse( obj ).getColumn( j );
		};
		deepEqual( func( [[1,2],[3,4]], 0 ), [1,3] );
	});
	test( "test YASMIJ.Matrix.prototype.getElement()", function(){
		var func = function( obj, i, j ){
			return YASMIJ.Matrix.parse( obj ).getElement(i, j);
		};
		equal( func( [[1,2],[3,4]], 0, 0 ), 1 );
		equal( func( [[1,2],[3,4]], 0, 1 ), 2 );
		equal( func( [[1,2],[3,4]], 1, 1 ), 4 );
	});
	test( "test YASMIJ.Matrix.prototype.get()", function(){
		var func = function( obj, i, j ){
			return YASMIJ.Matrix.parse( obj ).get( i, j );
		};
		equal( func( [[1,2],[3,4]], 1, 1), 4 );
		deepEqual( func( [[1,2],[3,4]], 1 ), [3,4] );
		deepEqual( func( [[1,2],[3,4]], null, 1 ), [2,4] );
	});
	test( "test YASMIJ.Matrix.prototype.getMinElementInRow()", function(){
		var func = function(obj, i){
			return YASMIJ.Matrix.parse(obj).getMinElementInRow( i );
		};
		deepEqual( func([-2,-1,0,1,2], 0), [0,-2] );
		deepEqual( func([2,1,-3], 0), [2,-3] );
	});
	test("test YASMIJ.Matrix.prototype.toString()", function(){
		var func = function(obj){
			return YASMIJ.Matrix.parse(obj).toString();
		};
		equal( func([]), "[]");
		equal( func([1,2,3]), "[1,2,3]");
		equal( func([[1,2,3]]), "[1,2,3]");
		equal( func([
			[1,2,3],
			[1,2,3],
			[1,2,3]
		]), "[[1,2,3],[1,2,3],[1,2,3]]");
	});
	test("test YASMIJ.Matrix.prototype.getSize()", function(){
		var func = function(obj){
			return YASMIJ.Matrix.parse(obj).getSize();
		};
		deepEqual(func(),[0,0]);
		deepEqual(func([]),[0,0]);
		deepEqual(func([1]),[1,1]);
		deepEqual(func([[1,2],[1,2]]),[2,2]);
		deepEqual(func([[1],[2]]),[1,2]);
	});
	test("test YASMIJ.Matrix.prototype.scaleRow()", function(){
		var func = function(obj, factor, rowI){
			return YASMIJ.Matrix.parse(obj).scaleRow(factor, rowI ).toString();
		};	
		equal( func([1,2,3], 2, 0), "[2,4,6]");
		equal( func([[1],[2],[3]], 2, 2), "[[1],[2],[6]]");
	});
	test( "test YASMIJ.Matrix.getMaxArray()", function(){
		var func = YASMIJ.Matrix.getMaxArray;
		equal( func(), null );
		deepEqual( func( [[]] ), [0,0] );
		deepEqual( func( [[],[]] ), [0,0] );
		deepEqual( func( [[1],[]] ), [0,1] );
		deepEqual( func( [[1],[1,2]] ), [1,2] );
		deepEqual( func( [[1],[1,2],[1,2,3]] ), [2,3] );
	});
	test("test YASMIJ.Matrix.prototype.addToRow()", function(){
		var func = function( arr, iRow, els ){
			return YASMIJ.Matrix.parse(arr).addToRow( iRow, els ).array;
		};
		deepEqual(func([], 0, [1,2,3]), [[1,2,3]] );
		deepEqual(func([], 1, [1,2,3]), [[1,2,3]] );
		deepEqual(func([[1],[2]], 0, [2,3,4] ), [[1,2,3,4],[2]]);
	});
	test( "test YASMIJ.Matrix.prototype.getMostNegIndexFromLastRow()", function(){
		var func = function(arr){
			return YASMIJ.Matrix.parse(arr).getMostNegIndexFromLastRow();
		};
		equal( func([1,2,3]), -1 );
		equal( func([1,2,-3, -4]), 2 );
		equal( func([[1,2,3],[1,-3,-1]]), 1 );
		equal( func([[1,2,3],[1,-3,-1,-9]]), 1 );
	});
	test( "test YASMIJ.Matrix.prototype.getRowIndexWithPosMinColumnRatio()", function(){
		var func = function(arr, colI){
			return YASMIJ.Matrix.parse(arr).getRowIndexWithPosMinColumnRatio(colI);
		};
		equal( func([[-2,1],[-1,2]], 0), -1 );
		equal( func([[1,1],[2,1],[3,2]], 0), 1 );
		equal( func([[1,1],[1,2],[1,0.1]], 0), 0 );
		equal( func([[1,0,1,1,4],[0,1,2,1,5],[0,0,-3,-4,0]], 3), 0 );
	});
	test( "test YASMIJ.Matrix.prototype.pivot()", function(){
		var func = function( arr, pRow, pCol ){
			return YASMIJ.Matrix.parse(arr).pivot(pRow, pCol).toString();
		};
		equal( func( [], 0, 0 ), "[]" );
		equal( func( [1,2], 0, 0 ), "[1,2]" );
		equal( func( [[1,2],[3,4]], 0, 0 ), "[[1,2],[0,-2]]" );
		equal( func( [[1,2],[2,4]], 0, 0 ), "[[1,2],[0,0]]" );
		equal( func( [[1,2],[2,4]], 1, 1 ), "[[0,0],[0.5,1]]" );
	});
	test( "test YASMIJ.Matrix.prototype.getUnitValueForColumn()", function(){
		var func = function(arr, colI){
			return YASMIJ.Matrix.parse(arr).getUnitValueForColumn(colI);
		};
		equal(func([2,4], 0), 0);
		equal(func([1,4], 0), 4);
		equal(func([[1,4],[0,1]], 0), 4);
		equal(func([[1,4],[1,1]], 0), 0);
		equal(func([[1,-1],[1,1],[1,0]], 0), 0);
		equal(func([[1,-1],[1,1],[1,0]], 1), 0);
	});
	test( "test YASMIJ.Matrix.prototype.getLastElementOnLastRow()", function(){
		var func = function( arr ){
			return YASMIJ.Matrix.parse( arr ).getLastElementOnLastRow();
		};
		equal( func( [1] ), 1 );
		equal( func( [1,2,3,4] ), 4 );
		equal( func( [[1,2,3],[4,5,6]] ), 6 );
	});
	test( "test YASMIJ.Matrix.transpose()", function(){
		var fn = function( arr ){
			return YASMIJ.Matrix.transpose( arr );
		};
		deepEqual( fn(), undefined );
		deepEqual( fn([]), [] );
		deepEqual( fn([1,2,3]), [[1],[2],[3]] );
		deepEqual( fn([[1],[2],[3]]), [1,2,3]  );
		deepEqual( fn(
			[
				[1,2,3],
				[4,5,6],
				[7,8,9]
			]),
			[
				[1,4,7],
				[2,5,8],
				[3,6,9]
			]
		);
	});
};
















