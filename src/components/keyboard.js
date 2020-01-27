import { keyCodes, keyPresses, gameConstants } from './constants.js'

const { vector } = gameConstants;

export const handleKeydown = e => {

    // e.preventDefault()
    if(!keyPresses[e.key]) {
        if (e.keyCode == keyCodes.up && !keyPresses[e.key]) {
            vector.z = -add;
            upFired = true;
        }
        if (e.keyCode == keyCodes.down && !downFired) {
            vector.z = add;
            downFired = true;
        }
        if (e.keyCode == keyCodes.left && !leftFired) {
            vector.x = -add;
            leftFired = true;
        }
        if (e.keyCode == keyCodes.right && !rightFired) {
            vector.x = add;
            rightFired = true;
        }
        if (e.keyCode == keyCodes.space && standing && !spaceFired) {
            vector.y = jumpDistance;
            spaceFired = true;
        }
        if(e.keyCode == keyCodes.esc && !escFired) {
            escFired = true;
        }
        // keyPresses[e.key] = true;
    }
}

export const handleKeyup = e => {
    // e.preventDefault()
    if (e.keyCode == keyCodes.up && upFired) {
        vector.z = 0;
        upFired = false;
    }
    if (e.keyCode == keyCodes.down && downFired) {
        vector.z = 0;
        downFired = false;
    }
    if (e.keyCode == keyCodes.left && leftFired) {
        vector.x = 0;
        leftFired = false;
    }
    if (e.keyCode == keyCodes.right && rightFired) {
        vector.x = 0;
        rightFired = false;
    }
    if (e.keyCode == SPACE && spaceFired) {
        vector.y = 0;
        spaceFired = false;
    }
    if (e.keyCode == ESC && escFired) {
        escFired = false;
        if(pause) {
            pause = false; 
            videoLoop();
        } else {
            pause = true;
        }
    }
}