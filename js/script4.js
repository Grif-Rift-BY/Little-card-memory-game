let faces = [
    'images/00a.png',
    'images/01a.png',
    'images/02a.png',
    'images/03a.png',
    'images/04j.png',
    'images/05j.png',
    'images/06j.png',
    'images/07j.png',
    'images/08q.png',
    'images/09q.png',
    'images/10q.png',
    'images/11q.png',
    'images/12k.png',
    'images/13k.png',
    'images/14k.png',
    'images/15k.png',
]

let cards = [];
while ( faces.length > 0 ) {
    let randomNumber = Math.floor( Math.random() * faces.length );
    cards.push( faces[ randomNumber ] );
    faces.splice( randomNumber, 1 );
    CONTAINER.innerHTML += '<img src="images/back.png" class="card">';
}

SHOW_FACE.onclick = showFaces;

function showFaces() {

    $( '.card' ).each( function( index ) {
        $( this ).attr( 'src', cards [ index ] );
        } );

    setTimeout ( function() {

        $( '.card' ).bind( 'click', checkCards );
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

        let firstCardFace = cardPairs[ 0 ].slice( 9, 10 );
        let secondCardFace = cardPairs[ 1 ].slice( 9, 10 );
        console.log ( 'firstCardFace = ' + firstCardFace );
        console.log ( 'secondCardFace = ' + secondCardFace );

                
        if ( firstCardFace == secondCardFace && cardIndexes[ 0 ] != cardIndexes[ 1 ] ) {
            setTimeout( function() { hideRightPair( cardIndexes[ 0 ], cardIndexes[ 1 ] ) }, 1000 );
            return;
        }   else {
            setTimeout( function() { showPairBacks( cardIndexes[ 0 ], cardIndexes[ 1 ]) }, 2000 );
            }
    }

    console.log( '==================== FINISH checkCards()' );
    console.log( '' );

}

function hideRightPair( firstCardIndex, secondCardIndex ) {
    console.log( '==================== START hideRightPair()' );
    $( '.card' ).eq( firstCardIndex ).addClass( 'card-hidden' );
    $( '.card' ).eq( secondCardIndex ).addClass( 'card-hidden' );
    $( '.card' ).bind( 'click', checkCards );
    $( '.card-hidden').unbind( 'click', checkCards );
    cardPairs.length = 0;
    cardIndexes.length = 0;
    rightAttemtCounter++;
    attemptCounter++;

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
    $( '.card-hidden').unbind( 'click', checkCards );
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