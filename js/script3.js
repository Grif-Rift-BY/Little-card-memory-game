let faces = [
    'images/00.png',
    'images/01.png',
    'images/02.png',
    'images/03.png',
    'images/04.png',
    'images/05.png',
    'images/06.png',
    'images/07.png',
    'images/08.png',
    'images/09.png',
    'images/10.png',
    'images/11.png',
    'images/12.png',
    'images/13.png',
    'images/14.png',
    'images/15.png',
]

let cards = [];
while ( faces.length > 0 ) {
    let randomNumber = Math.floor( Math.random() * faces.length );
    cards.push( faces[ randomNumber ] );
    faces.splice( randomNumber, 1 );
    CONTAINER.innerHTML += '<img src="images/back.png" class="card">';
}
$( '.card' ).bind( 'click', checkCards );

SHOW_FACE.onclick = showFaces;
function showFaces() {
    $( '.card' ).each( function( index ) {
        $( this ).attr( 'src', cards [ index ] );
        } );

    setTimeout ( function() {

        $( '.card' ).each( function(){
            $( this ).attr( 'src', 'images/back.png' );
        } );

    }, 5000 ); 
}

let cardPairs = [];
let cardIndexes = [];
let attemptCounter = 0;
let rightAttemtCounter = 0;

function checkCards() {
    console.log( '==================== START checkCards()' );

    $( '.card' ).bind( 'click', checkCards );
    $( '.card-hidden').unbind( 'click', checkCards );

    let cardIndex = ( $( this ).index() );
    $( this ).attr( 'src', cards [ cardIndex ] );
    $( this ).css( {'border': '2px solid red', 'border-radius': '3px'} )
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

            let firstCardValue = Number( cardPairs[ 0 ].slice( 7, 9 ) );
            let secondCardValue = Number( cardPairs[ 1 ].slice( 7, 9 ) );

            console.log ( 'firstCardValue = ' + firstCardValue );
            console.log ( 'secondCardValue = ' + secondCardValue );

            for ( let i = 0; i <= 12; i += 4 ) {
                
                    if ( ( firstCardValue >= i && firstCardValue <= i + 3 ) && 
                        ( secondCardValue >= i && secondCardValue <= i + 3 ) && 
                        firstCardValue != secondCardValue ) {

                        setTimeout( function() { hideRightPair( cardIndexes[ 0 ], cardIndexes[ 1 ] ) }, 1000 );
                        break;

                    }   else {

                        setTimeout( function() { showPairBacks( cardIndexes[ 0 ], cardIndexes[ 1 ] ) }, 2000 );

                        }
                    
                
            }

        

    }

    console.log( '==================== FINISH checkCards()' );
    console.log( '' );

}

function hideRightPair( firstCardIndex, secondCardIndex ) {
    console.log( '==================== START hideRightPair()' );
    $( '.card' ).eq( firstCardIndex ).addClass( 'card-hidden' );
    $( '.card' ).eq( secondCardIndex ).addClass( 'card-hidden' );
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

    
    $( '.card' ).eq( firstCardIndex ).attr( 'src', 'images/back.png' );
    $( '.card' ).eq( secondCardIndex ).attr( 'src', 'images/back.png' );
    $( '.card' ).eq( firstCardIndex ).css( {'border': '0px solid red'} );
    $( '.card' ).eq( secondCardIndex ).css( {'border': '0px solid red'} );
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