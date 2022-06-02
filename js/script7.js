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
dealDeck();

function dealDeck() {

    while ( faces.length > 0 ) {
        let randomIndex = Math.floor( Math.random() * faces.length );
        cards.push( faces[ randomIndex ] );
        faces.splice( randomIndex, 1 );
        CONTAINER.innerHTML +=  '<div class="card flip">' +
                                    '<div class="front">' +
                                        '<img src="images/back.png" class="image image-front">' +
                                    '</div>' +
                                    '<div class="back">' +
                                        '<img src="" class="image image-back">' +
                                    '</div>' +
                                '</div>'
    }
    
    $( '.image-back' ).each( function( index ) {
        $( this ).attr( 'src', cards [ index ] );
    } );

}


$('#SHOW_FACES').one( 'click', showFaces );
function showFaces() {

    $( '.card' ).each( function( index ) {
        $( this ).delay( index * 50).animate( { opacity: 1 }, 200 );
    } );
    $( '#SHOW_FACES' ).animate( { opacity: 0, left: '-12vw' }, 1500 );

    setTimeout ( () => {
        $( '.card' ).flip( { trigger: 'manual' } );
        $( '.card' ).flip( true );
    }, 3000 );

    setTimeout ( () => {
        $( '.card' ).flip( false );
        $( '.card' ).bind( 'click', checkCards );
    }, 10000 );
    
}

let pairCards = [];
let pairCardsIndexes = [];
let attemptCounter = 0;
let rightAttemtCounter = 0;

function checkCards() {
console.log( '==================== START checkCards()' );

    $( this ).flip( true );

    let currentCardIndex = ( $( this ).index() );
    pairCards.push ( cards [ currentCardIndex ] );
    pairCardsIndexes.push( currentCardIndex );
    
    if ( pairCards.length == 2 ) {

        $( '.card' ).unbind( 'click', checkCards );
        let firstCardFace = pairCards[ 0 ].slice( 9, 10 );
        let secondCardFace = pairCards[ 1 ].slice( 9, 10 );

        console.log( 'pairCards = ' + pairCards );
        console.log( 'pairCards.length = ' + pairCards.length );
        console.log( 'pairCardsIndexes = ' + pairCardsIndexes );
        console.log( 'pairCardsIndexes.length = ' + pairCardsIndexes.length );
        console.log( 'firstCardFace = ' + firstCardFace );
        console.log( 'secondCardFace = ' + secondCardFace );
    
        if ( firstCardFace == secondCardFace && pairCardsIndexes[ 0 ] != pairCardsIndexes[ 1 ] ) {
            setTimeout( () => { hideRightPair( pairCardsIndexes[ 0 ], pairCardsIndexes[ 1 ] ) }, 700 );
            return;
        }   
        else {
            setTimeout( () => { showPairBacks( pairCardsIndexes[ 0 ], pairCardsIndexes[ 1 ]) }, 1100 );
        }
    }

console.log( '==================== FINISH checkCards()' );
console.log( '' );
}

function hideRightPair( firstCardIndex, secondCardIndex ) {
console.log( '==================== START hideRightPair()' );

    $( '.card' ).eq( firstCardIndex ).flip( false ).delay(100).animate({opacity: 0}, 500);
    $( '.card' ).eq( secondCardIndex ).flip( false ).delay(200).animate({opacity: 0}, 500);
    $( '.card' ).bind( 'click', checkCards );
    $( '.card-hidden').unbind( 'click', checkCards );

    pairCards.length = 0;
    pairCardsIndexes.length = 0;
    rightAttemtCounter++;
    attemptCounter++;
    OUTPUT.innerHTML =  '<p class="info">ATTEMPTS&nbsp&nbsp&nbsp' + attemptCounter + '</p>' +
                        '<p class="info">MISTAKES&nbsp&nbsp&nbsp' + ( attemptCounter - rightAttemtCounter ) + '</p>'

    if ( rightAttemtCounter == 8 ) {
        setTimeout( () => {
            CONTAINER.innerHTML = '';
            CONTAINER.innerHTML =   '<p class="end">GAME</p>' +
                                    '<p class="end">OVER</p>';            ;
        }, 1000 );
        $( '#SHOW_FACES' ).html( 'OK' );
        $( '#SHOW_FACES' ).animate( { opacity: 1, left: '2vw' }, 1500 );
        $( '#SHOW_FACES' ).one( 'click', () => { window.location.reload(); } );
    }

    console.log ( 'attemptCounter = ' + attemptCounter );
    console.log ( 'rightAttemtCounter = ' + rightAttemtCounter );
console.log( '==================== FINISH hideRightPair()' );
console.log( '' );
}

function showPairBacks( firstCardIndex, secondCardIndex ) {
console.log( '==================== START showPairBacks()');

    $( '.card' ).eq( firstCardIndex ).flip( false );
    $( '.card' ).eq( secondCardIndex ).flip( false );
    $( '.card' ).bind( 'click', checkCards );
    $( '.card-hidden').unbind( 'click', checkCards );
    pairCards.length = 0;
    pairCardsIndexes.length = 0;
    attemptCounter++;
    OUTPUT.innerHTML =  '<p class="info">ATTEMPTS&nbsp&nbsp&nbsp' + attemptCounter + '</p>' +
                        '<p class="info">MISTAKES&nbsp&nbsp&nbsp' + ( attemptCounter - rightAttemtCounter ) + '</p>'

    console.log ( 'attemptCounter = ' + attemptCounter );
console.log( '==================== FINISH showPairBacks()' );
console.log( '' );
}

let parallaxBackground = document.querySelector( '.mouse-parallax-bg' );
window.addEventListener( 'mousemove', ( event ) => {
    let x = event.clientX / window.innerWidth;
    let y = event.clientY / window.innerHeight; 
    parallaxBackground.style.transform = 'translate( -' + x * 200 + 'px, -' + y * 200 + 'px)';
} );