
export const colors = {
    background: 0x000000,
    light: 0xffffff,
    player: 0x99ccff,
    playerEmissive: 0x6699ff,
    playerSpecular: 0x050505,
    floor: 0xffffff,
    floorEmissive: 0xffff99,
    floorSpecular: 0x050505
}

export const keyCodes = {
    up: 87,
    down: 83,
    left: 65,
    right: 68,
    space: 32,
    esc: 27
}

export const keyPresses = {
    w: false,
    a: false,
    s: false,
    d: false,
    [" "]: false,
}

export const gameConstants = {
    add: .08,
    descentRate: .1,
    jumpDistance: 1,
    vector: {x: 0, y: 0, z: 0}
}
