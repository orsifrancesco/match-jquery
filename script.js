const tileSize = 64;
const shadeColor = '#6495ED';
const images = [
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    'images/5.png',
    'images/6.png',
    'images/7.png',
    'images/8.png',
    'images/9.png',
    'images/10.png',
    'images/11.png',
    'images/12.png',
    'images/13.png',
    'images/14.png',
    'images/15.png'
];

function game() {

    const tiles = [...images, ...images].sort(() => .5 - Math.random());
    const boardSize = Math.sqrt(tiles.length) % 1 === 0 ? Math.sqrt(tiles.length) : parseInt(Math.sqrt(tiles.length) + 1);

    const shades = generateShades(shadeColor, images.length);
    const shadesRandom = [...shades, ...shades].sort(() => .5 - Math.random());

    const shadesImages = generateShades('#dddddd', images.length);
    const shadesImagesRandom = [...shadesImages, ...shadesImages].sort(() => .5 - Math.random());

    $('#game').width(boardSize * tileSize);
    $('body').css({ minWidth: (boardSize * tileSize) + 20 });

    for (let i = 0; i < tiles.length; i++) {
        const tile = $(`
            <div class="tile" style="background: ${shadesRandom[i]}; width: ${tileSize}px; height: ${tileSize}px">
                <span style="background-color: ${shadesImagesRandom[i]}; background-image: url(${tiles[i]});"></span>
            </div>
        `);
        $('#game').append(tile);
    }

    let clicked = false;

    $('.tile').on('click', function () {

        if (clicked) return;

        clicked = true;

        const el = $(this);

        if (el.hasClass('in-progress')) return;
        if (el.hasClass('flipped')) return;

        el.addClass('in-progress');

        if ($('.tile.in-progress').length == 2) {
            if ($('.tile.in-progress').eq(0).find('span').css('background-image') == $('.tile.in-progress').eq(1).find('span').css('background-image')) {
                $('.tile.in-progress').addClass('flipped');
                setTimeout(() => {
                    $('.tile.flipped').removeClass('in-progress');
                    clicked = false;
                }, 500);
            } else {
                setTimeout(() => {
                    $('.tile.in-progress').removeClass('in-progress');
                    clicked = false;
                }, 500);
            }
        } else {
            setTimeout(() => {
                clicked = false;
            }, 250);
        }

    });

}

game();