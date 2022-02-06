let els = {
    'sides': document.querySelector('#polygon-sides'),
    'density': document.querySelector('#polygon-density'),
    'angle_offset': document.querySelector('#angle-offset'),
    'direct_connections': document.querySelector('#direct-connections'),
    'inverse_connections': document.querySelector('#inverse-connections'),
};
let radius;

function setup(){
    createCanvas(windowWidth, windowHeight);
    radius = min(windowWidth, windowHeight) / 2;
    angleMode(DEGREES);
    stroke(255);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    radius = min(windowWidth, windowHeight) / 2;
}

function draw(){
    translate(windowWidth / 2, windowHeight / 2);
    background(0);
    let density = parseInt(els.density.value);
    let sides = parseInt(els.sides.value);
    let angle_offset = parseFloat(els.angle_offset.value);
    let first = null;
    let prev = null;
    for(let i = 0; i < sides; i++){
        let angle = (i / sides * 360 + angle_offset) % 360;
        let points = points_at_angle(angle, density);
        if(prev != null)
            connect_points(prev, points);
        if(first == null)
            first = points;
        prev = points;
    };
    connect_points(prev, first);
}

function points_at_angle(angle, density = 15){
    let result = [];
    for(let i = 0; i < density; i++) {
        let r = i / (density - 1) * radius;
        result.push(createVector(
            cos(angle) * r,
            sin(angle) * r,
        ));
    }
    return result;
}

function connect_points(vec_a, vec_b) {
    if(vec_a.length != vec_b.length)
        throw 'Vecs must be same length';
    for(let i = 0; i < vec_a.length; i++){
        if(els.inverse_connections.checked)
            line(
                vec_a[vec_a.length - 1 - i].x,
                vec_a[vec_a.length - 1 - i].y,
                vec_b[i].x,
                vec_b[i].y,
            );
        if(els.direct_connections.checked)
            line(
                vec_a[i].x,
                vec_a[i].y,
                vec_b[i].x,
                vec_b[i].y,
            );
    }
}
