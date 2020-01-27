import * as Three from '../node_modules/three/build/three.module.js'
import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js'
import { colors } from './components/constants.js';

const colors = {
    background: 0x000000,
    light: 0xffffff,
    player: 0x99ccff,
    playerEmissive: 0x6699ff,
    playerSpecular: 0x050505,
    floor: 0xffffff,
    floorEmissive: 0xffff99,
    floorSpecular: 0x050505
}

// const UP_ARROWKEY = 87;
// const DOWN_ARROWKEY = 83;
// const LEFT_ARROWKEY = 65;
// const RIGHT_ARROWKEY = 68;
// const SPACE = 32;
// const ESC = 27;

// const add = .08;
// const descentRate = .1;
// const jumpDistance = 1;
// const vector = {x: 0, y: 0, z: 0}

const state = {
    pause: false,
    standing: false
}

const camera = new Three.PerspectiveCamera()
camera.position.z = 20
camera.position.y = 10

const scene = new Three.Scene()
scene.background = new Three.Color(colors.background)

const renderer = new Three.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement)

const controls = new TrackballControls(camera, renderer.domElement)

window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    controls.handleResize()
}


document.onkeydown = e => {
    console.log(e)
    // e.preventDefault()
    if (e.keyCode == UP_ARROWKEY && !upFired) {
        vector.z = -add;
        upFired = true;
    }
    if (e.keyCode == DOWN_ARROWKEY && !downFired) {
        vector.z = add;
        downFired = true;
    }
    if (e.keyCode == LEFT_ARROWKEY && !leftFired) {
        vector.x = -add;
        leftFired = true;
    }
    if (e.keyCode == RIGHT_ARROWKEY && !rightFired) {
        vector.x = add;
        rightFired = true;
    }
    if (e.keyCode == SPACE && standing && !spaceFired) {
        vector.y = jumpDistance;
        spaceFired = true;
    }
    if(e.keyCode == ESC && !spaceFired) {
        escFired = true;
    }
}

document.onkeyup = e => {
    // e.preventDefault()
    if (e.keyCode == UP_ARROWKEY && upFired) {
        vector.z = 0;
        upFired = false;
    }
    if (e.keyCode == DOWN_ARROWKEY && downFired) {
        vector.z = 0;
        downFired = false;
    }
    if (e.keyCode == LEFT_ARROWKEY && leftFired) {
        vector.x = 0;
        leftFired = false;
    }
    if (e.keyCode == RIGHT_ARROWKEY && rightFired) {
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




const videoLoop = () => {
    let standing = isStanding(player)
    
    if(standing) {
        vector.y = 0
    }
    
    if(!standing) {
        vector.y -= descentRate;
    }

    player.position.x += vector.x;
    player.position.y += vector.y;
    player.position.z += vector.z;

    camera.lookAt(player.position)
    
    renderer.render(scene, camera)
    const requestId = requestAnimationFrame(videoLoop)
    if(pause) {
        cancelAnimationFrame(requestId)
    }
    controls.update()
}

const directionalLight = new Three.DirectionalLight(0xffffff)
scene.add(directionalLight)

// const ambientLight  = new Three.AmbientLight(0xffffff, .9)
// scene.add(ambientLight)

// const createPlayer = () => {
    const playerGeometry = new Three.BoxGeometry(1,1,1)
    const playerMaterial = new Three.MeshPhongMaterial({
                                                    color: colors.player,
                                                    emissive: colors.playerEmissive,
                                                    side: Three.DoubleSide ,
                                                    wireframe: false,
                                                    specular: colors.playerSpecular,
                                                    shininess: 100,
                                                    emissiveIntensity: .5,
                                                    opacity: 0
                                                })
    const player = new Three.Mesh(playerGeometry, playerMaterial)
    player.position.y = 5
    scene.add(player)
// }

// createPlayer()

const generateFloor = ({x = 0, y = 0 ,z = 0} = {x: 0, y: 0, z: 0}, {dx = 10, dy = 10, dz = 10} = {dx: 10, dy: 10, dz: 10}) => {
    const floorGeometry = new Three.BoxGeometry(dx, dy, dz)
    const floorMaterial = new Three.MeshPhongMaterial({
                                                        color: colors.floor,
                                                        emissive: colors.floorEmissive,
                                                        side: Three.DoubleSide,
                                                        specular: colors.floorSpecular,
                                                        shininess: 100,
                                                        opacity: 0,
                                                        emissiveIntensity: .5,
                                                        wireframe: false
                                                    })
    const floor = new Three.Mesh(floorGeometry, floorMaterial)
    floor.position.x = x;
    floor.position.y = y;
    floor.position.z = z;
    scene.add(floor)
}

generateFloor({y: -5.5})
generateFloor({x: 10,y: -5.5})
generateFloor({x: -10,y: -5.5})
generateFloor({z: 10,y: -5.5})
generateFloor({z: -10,y: -5.5})

const isStanding = (player, collidableObjectList) => {
    return player.position.y < .5;
    // const originPoint = player.position.clone()
    // for(let i = 0; i < player.geometry.vertices.length; i++) {
    //     const localVertex = player.geometry.vertices[i].clone()
    //     const globalVertex = localVertex.applyMatrix4(player.matrix)
    //     const directionVector = globalVertex.sub(player.position)

    //     const ray = new Three.Raycaster(player.position, directionVector.clone().normalize())
    //     const collisionResults = ray.intersectObjects(collidableObjectList)
    //     console.log(collisionResults)
    //     if(collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
    //         return true;
    //     }
    // }
    // return false;
}

videoLoop()
