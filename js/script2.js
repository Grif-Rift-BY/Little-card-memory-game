let faces = [
    '00.png',
    '01.png',
    '02.png',
    '03.png',
    '04.png',
    '05.png',
    '06.png',
    '07.png',
    '08.png',
    '09.png',
    '10.png',
    '11.png',
    '12.png',
    '13.png',
    '14.png',
    '15.png',
]

let cards = [];
while ( faces.length > 0 ) {
    let randomNumber = Math.floor( Math.random() * faces.length );
    cards.push( faces[ randomNumber ] );
    faces.splice( randomNumber, 1 );
    CONTAINER.innerHTML += '<img src="images/back.png" class="card">';
}

SHOW_FACE.onclick = showFaces;
// SHOW_BACK.onclick = showBacks;
$( '.card' ).bind( 'click', checkCards );

function showFaces() {
    $( '.card' ).each( function( index ){
        $( this ).attr( 'src', 'images/' + cards [ index ] );
    } );
}

function showBacks() {
    $( '.card' ).each( function(){
        $( this ).attr( 'src', 'images/back.png' );
    } );
}

let cardPairs = [];
let cardIndexes = [];
let attemptCounter = 0;
let rightAttemtCounter = 0;

function checkCards() {
    console.log( '==================== START checkCards()' );

    let cardIndex = ( $( this ).index() );
    $( this ).attr( 'src', 'images/' + cards [ cardIndex ] );
    cardPairs.push ( cards [ cardIndex ] );
    console.log ( 'cardPairs.length = ' + cardPairs.length );
    cardIndexes.push( cardIndex );
    console.log ( 'cardIndexes.length = ' + cardIndexes.length );
    console.log( '' );
    
    if ( cardPairs.length == 2 ) {

            console.log ( 'cardPairs = ' + cardPairs );
            console.log ( 'cardPairs.length = ' + cardPairs.length );
            console.log ( 'cardIndexes = ' + cardIndexes );
            console.log ( 'cardIndexes.length = ' + cardIndexes.length );
            console.log( '' );

            $( '.card' ).unbind( 'click', checkCards );

            let firstCardValue = Number( cardPairs[ 0 ].slice( 0, 2 ) );
            let secondCardValue = Number( cardPairs[ 1 ].slice( 0, 2 ) );

            console.log ( 'firstCardValue = ' + firstCardValue );
            console.log ( 'secondCardValue = ' + secondCardValue );

            for ( let i = 0; i <= 12; i += 4 ) {
                
                    if ( ( firstCardValue >= i && firstCardValue <= i + 3 ) && 
                        ( secondCardValue >= i && secondCardValue <= i + 3 ) && 
                        firstCardValue != secondCardValue ) {

                        setTimeout( function() { hideRightPair( cardIndexes[ 0 ], cardIndexes[ 1 ] ) },1000 );
                        break;

                    }
                    
                
            }

        setTimeout( function() { showPairBacks( cardIndexes[ 0 ], cardIndexes[ 1 ]) }, 2000 );

    }

    console.log( '==================== FINISH checkCards()' );
    console.log( '' );

}

function hideRightPair( firstCardIndex, secondCardIndex ) {
    console.log( '==================== START hideRightPair()' );
    $( '.card' ).eq( firstCardIndex ).attr( 'src', '' );
    $( '.card' ).eq( secondCardIndex ).attr( 'src', '' );
    $( '.card' ).bind( 'click', checkCards );
    $( '.card' ).eq( firstCardIndex ).unbind( 'click', checkCards );
    $( '.card' ).eq( secondCardIndex ).unbind( 'click', checkCards );
    cardPairs.length = 0;
    cardIndexes.length = 0;
    rightAttemtCounter++;

    console.log ( 'cardPairs.length = ' + cardPairs.length );
    console.log ( 'cardPairs = ' + cardPairs );
    console.log ( 'cardIndexes.length = ' + cardIndexes.length );
    console.log ( 'cardIndexes = ' + cardIndexes );
    console.log ( 'rightAttemtCounter = ' + rightAttemtCounter );
    
    console.log( '==================== FINISH hideRightPair()' );
    console.log( '' );
}

function showPairBacks( firstCardIndex, secondCardIndex ) {
    console.log( '==================== START showPairBacks()' );

    $( '.card' ).bind( 'click', checkCards );
    $( '.card' ).eq( firstCardIndex ).attr( 'src', 'images/back.png' );
    $( '.card' ).eq( secondCardIndex ).attr( 'src', 'images/back.png' );
    cardPairs.length = 0;
    cardIndexes.length = 0;
    attemptCounter++;

    console.log ( 'cardPairs.length = ' + cardPairs.length );
    console.log ( 'cardPairs = ' + cardPairs );
    console.log ( 'cardIndexes.length = ' + cardIndexes.length );
    console.log ( 'cardIndexes = ' + cardIndexes );
    console.log ( 'attemptCounter = ' + attemptCounter );
    
    console.log( '==================== FINISH showPairBacks()' );
    console.log( '' );
}