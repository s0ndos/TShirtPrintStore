/**
 * Created by gpnissar on 2015-02-13.
 */

/**
 * La page doit contenir un élément du type
 * <div id="toto" class="volet_controles">
 *     <div class="languette">Youhhhou</div>
 * </div>
 */
var timer = null;

function desarmerTimer() {
    if (null !== timer) {
        clearTimeout(timer);
        timer = null;
    }
}

function rearmerTimer(volet) {
    desarmerTimer();
    timer = setTimeout(function(){
        volet.classList.remove('ouvert');
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded');
    var volets_controle = document.getElementsByClassName('volet_controles');
    if (volets_controle.length > 0) {
        var volet = volets_controle[0];
        if (null !== volet) {
            volet.addEventListener('mouseenter', function () {
                console.log('volet mouse enter');
                volet.classList.add('ouvert');
                desarmerTimer();
            });

            volet.addEventListener('mouseout', function () {
                console.log('volet mouse exit');
                rearmerTimer(volet);
            });

            var languettes = volet.getElementsByClassName('languette');
            if (languettes.length > 0) {
                var languette = languettes[0];
                if (null !== languette) {
                    languette.addEventListener('mouseenter', function () {
                        console.log('languette mouse enter');
                        volet.classList.add('ouvert');
                        desarmerTimer();
                    });
                    languette.addEventListener('mouseout', function () {
                        console.log('languette mouse exit');
                        rearmerTimer(volet);
                    });
                }
            }
        }
    }
});

/**
 * Function for frequencing drawing tasks (or any tasks) over time using a timer
 * so that it makes a kind of animation
 * @param drawings
 * @param delay
 */
function run_drawings(drawings, delay) {
    const DEFAULT_DELAY = 1000;
    var timer = null;
    var index = 0;
    if ('undefined' === typeof delay) {
        delay = DEFAULT_DELAY;
    }
    // Callback drawing, incrementing and triggering next tick
    function draw_next() {
        timer = null; // Reseting timer
        if (index < drawings.length) {
            drawings[index]();
            index++;
            if (index < drawings.length) {
                timer = setTimeout(draw_next, delay);
            }
        }
    }
    // Ignition
    timer = setTimeout(draw_next, delay);
}