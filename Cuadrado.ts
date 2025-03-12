const canvas = document.getElementById("canvasId") as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let maxX = canvas.width;
let maxY = canvas.height ;
let canvasxCenter = maxX / 2;
let canvasyCenter = maxY / 2;
let minMaxXY = Math.min(maxX, maxY);
let side = 0.95 * minMaxXY;

let xA = canvasxCenter - side / 2;
let yA = canvasyCenter - side / 2;
let xB = canvasxCenter + side / 2;
let yB = canvasyCenter - side / 2;
let xC = canvasxCenter + side / 2; 
let yC = canvasyCenter + side / 2;
let xD = canvasxCenter - side / 2; 
let yD = canvasyCenter + side / 2;

let xA1, yA2, xB1, yB1, xC1, yC1, xD1, yD1;

const p = 0.95, q = 0.05;

for (let i = 0; i < 75; i++) {
    ctx.beginPath();
    ctx.moveTo(iX(xA), iY(yA));
    ctx.lineTo(iX(xB), iY(yB));
    ctx.lineTo(iX(xC), iY(yC));
    ctx.lineTo(iX(xD), iY(yD));
    ctx.closePath();
    ctx.strokeStyle = `rgb(${255}, ${255}, ${255})`; 
    ctx.stroke();

    xA1 = p * xA + q * xB;
    yA2 = p * yA + q * yB;
    xB1 = p * xB + q * xC;
    yB1 = p * yB + q * yC;
    xC1 = p * xC + q * xD;
    yC1 = p * yC + q * yD;
    xD1 = p * xD + q * xA;
    yD1 = p * yD + q * yA;

    xA = xA1; xB = xB1; xC = xC1; xD = xD1;
    yA = yA2; yB = yB1; yC = yC1; yD = yD1;
} 

function iX(x: number): number {
    return Math.round(x);
}

function iY(y: number): number {
    return maxY - Math.round(y);
}