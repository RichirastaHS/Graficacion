var canvas = document.getElementById("canvasId");
var ctx = canvas.getContext('2d');
var maxX = canvas.width;
var maxY = canvas.height;
var canvasxCenter = maxX / 2;
var canvasyCenter = maxY / 2;
var side = .95 * maxY;
var xA = canvasxCenter - side / 2, yA = canvasyCenter - side / 2;
var xB = canvasxCenter + side / 2, yB = canvasyCenter - side / 2;
var xC = canvasxCenter + side / 2, yC = canvasyCenter + side / 2;
var xD = canvasxCenter - side / 2, yD = canvasyCenter + side / 2;
var xA1, yA2, xB1, yB1, xC1, yC1, xD1, yD1;
var p = 0.95, q = 0.05;
for (var i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.moveTo(iX(xA), iY(yA));
    ctx.lineTo(iX(xB), iY(yB));
    ctx.lineTo(iX(xC), iY(yC));
    ctx.lineTo(iX(xD), iY(yD));
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();
    xA1 = p * xA + q * xB;
    yA2 = p * yA + q * yB;
    xB1 = p * xB + q * xC;
    yB1 = p * yB + q * yC;
    xC1 = p * xC + q * xD;
    yC1 = p * yC + q * yD;
    xD1 = p * xD + q * xA;
    yD1 = p * yD + q * yA;
    xA = xA1;
    xB = xB1;
    xC = xC1;
    xD = xD1;
    yA = yA2;
    yB = yB1;
    yC = yC1;
    yD = yD1;
}
function iX(x) {
    return Math.round(x);
}
function iY(y) {
    return maxY - Math.round(y);
}
