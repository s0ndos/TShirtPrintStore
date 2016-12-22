/**
 * Created by gilles on 14-02-15.
 */
"use strict";

/**
 * Définit un lasso :
 *  - sélection rectangulaire
 *  - déplaçable (MOVING)
 *  - dimensionnable (RESIZING)
 *
 */


function Lasso(canvas) {
    const LINE_WIDTH = 1;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d'); // Le contexte du canvas où s'applique le lasso
    this.MODE_OFF = -1;         // Inactif
    this.MODE_DISPLAYING = 0;   // Affiché
    this.MODE_RESIZING = 1;     // En dimensionnement
    this.MODE_MOVING = 2;       // En déplacement
    this.mode = this.MODE_OFF;  // Le mode actif
    this.rect = new Rectangle(canvas.width / 4, canvas.height / 4, canvas.width * 3 / 4, canvas.height * 3 / 4);
    this.lineWidth = LINE_WIDTH;         // Épaisseur du tracé
    this.backupData = null;        // backup of the area covered by the lasso plus a 2 times the lineWidth
    this.backup_pos = new Point(0,0);
    this.lastPointerPos = null; // Le décalage entre le coin supérieur gauche et le pointeur de souris à suivre

    // Bouton souris enfoncé sur le canvas
    canvas.addEventListener('mousedown', this.listenTo_mousedown.bind(this), false);

    // Bouton souris relaché sur le canvas
    canvas.addEventListener('mouseup', this.listenTo_mouseup.bind(this), false);

    // Souris déplacée sur le canvas
    canvas.addEventListener('mousemove', this.listenTo_mousemove.bind(this), false);

    document.addEventListener('keydown', function (ev) {
        console.log(ev.keyCode);
        switch (ev.keyCode) {
            case 40:
                break;
            case 37:
                break;
            case 39:
                break;
            case 38:
                break;
        }
    });

    return this;
}


// The "constructor" of Points_shape refers to the above Points_shape() function
Lasso.prototype.constructor = Lasso;

/**
 * Wipes the selection by
 */
Lasso.prototype.clear = function () {
    // Restituer l'image d'après les paramètres du rectangle de sélection
    if (this.backupData != null) {
        this.ctx.putImageData(this.backupData, this.backup_pos.get_x1(), this.backup_pos.get_y1());
    }
};

/**
 * Draws selection
 */
Lasso.prototype.draw = function () {
    // Save canvas zone before stroking
    console.log(this.lineWidth);
    this.backup_pos.set_x(0, Math.max(this.rect.get_min_x() - 2 * this.lineWidth, 0));
    this.backup_pos.set_y(0, Math.max(this.rect.get_min_y() - 2 * this.lineWidth, 0));
    this.backupData = this.ctx.getImageData(
        this.backup_pos.get_x1(),
        this.backup_pos.get_y1(),
        this.rect.get_width() + 4 * this.lineWidth,
        this.rect.get_height() + 4 * this.lineWidth);
    this.ctx.beginPath();
/*
    this.ctx.moveTo(this.rect.get_x1(), this.rect.get_y1());
    this.ctx.moveTo(this.rect.get_x2(), this.rect.get_y1());
    this.ctx.moveTo(this.rect.get_x2(), this.rect.get_y2());
    this.ctx.moveTo(this.rect.get_x1(), this.rect.get_y2());
    this.ctx.closePath();
*/
    this.ctx.rect(this.rect.get_min_x(), this.rect.get_min_y(), this.rect.get_width(), this.rect.get_height());
    this.ctx.setLineDash([5,5]);
    this.ctx.stroke();
};

/**
 * Indicates that the lasso is in one of the modes which follows the mouse
 */
Lasso.prototype.isFollowing = function () {
    return ((this.MODE_MOVING === this.mode) || (this.MODE_RESIZING === this.mode)) ;
};

/**
 * Starts the MODE_MOVING mode at a given mouse position
 */
Lasso.prototype.startMoving = function (pointerPos) {
    console.log('Début MODE_MOVING');
    this.mode = this.MODE_MOVING;
    this.clear();
    // Savinbg pointer offset qui va servir à définir les déplacements à effectuer
    this.lastPointerPos = pointerPos;
    //console.log(this.moveOffset);
    this.draw();
};

/**
 * Déclenche le mode MODE_RESIZING à partir d'une position de pointeur
 */
Lasso.prototype.startResizing = function (pointerPos) {
    console.log('Starting MODE_RESIZING mode');
    this.mode = this.MODE_RESIZING;
    this.clear();
    // Le rectangle est remis à zéro
    this.rect.set_x(0,pointerPos.get_x1());
    this.rect.set_y(0,pointerPos.get_y1());
    this.rect.set_width(0);
    this.rect.set_height(0);
    this.draw();
};

/**
 * Suivant la position du pointeur par rapport à la sélection, déclenche le mode approprié:
 *  - RESIZING si le poineur est à l'EXTÉRIEUR de la sélection
 *  - MOVING si le poineur est à l'INTÉRIEUR de la sélection<
 */
Lasso.prototype.startFollowing = function (pointerPos) {
    if ( ! this.isFollowing()) {
        if (this.rect.point_is_in(pointerPos.get_x1(), pointerPos.get_y1())) {
            this.startMoving(pointerPos);
        } else {
            this.startResizing(pointerPos);
        }
    } else {
        // Déclencher Exception
    }
};

/**
 * Termine l'un des deux modes (MODE_MOVING ou MODE_RESIZING) de suivi du pointeur de souris
 */
Lasso.prototype.stopFollowing = function () {
    if (this.isFollowing()) {
        if (this.MODE_MOVING === this.mode) {
            this.lastPointerPos = null; // Supprime l'objet offset (type Point) créé pour le MODE_MOVING
        }
        this.mode = this.MODE_DISPLAYING;
    } else {
        // Déclencher Exception
    }
};

/**
 * Suit le point pos (en mode MOVING ou RESIZING)
 */
Lasso.prototype.doFollow = function (posXY) {
    this.clear();
    switch (this.mode) {
        case this.MODE_MOVING:
            this.rect.move_of(posXY.get_x1() - this.lastPointerPos.get_x1(), posXY.get_y1() - this.lastPointerPos.get_y1());
            this.lastPointerPos = posXY;
            break;
        case this.MODE_RESIZING:
            this.rect.set_x(1, posXY.get_x1());
            this.rect.set_y(1, posXY.get_y1());
            break;
        default :
        // Déclencher Exception
    }
    this.draw();
};

/**
 * Écouteur sur mousedown
 */
Lasso.prototype.listenTo_mousedown = function (event) {
    if (! this.isFollowing()) {
        var pointerPos = eventToCanvasXY(this.canvas, event);
        this.startFollowing(pointerPos);
    }
};

/**
 * Écouteur sur mouseup
 */
Lasso.prototype.listenTo_mouseup = function (event) {
    if (this.isFollowing()) {
        this.stopFollowing()
    }
};

/**
 * Écouteur sur mousemove
 */
Lasso.prototype.listenTo_mousemove = function (event) {
    if (this.isFollowing()) {
        var pointerPos = eventToCanvasXY(this.canvas, event);
        this.doFollow(pointerPos);
    }
};
