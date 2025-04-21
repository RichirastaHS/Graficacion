export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.rWidth = 25;
        this.rHeight = 25;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = 0;
        this.centerY = this.maxY;
        this.verAnatomia = false;
        this.binaryArray = [];
        this.binaryIndex = 0;
        this.guardarUrl = "";
    }
    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y) { return Math.round(this.centerY - y / this.pixelSize); }
    marcadoresPosicion(x, y, color) {
        this.mcxray(0, 0, "#332C23", 7);
        this.mcxray(1, 1, "#F3EFE0", 5);
        this.mcxray(2, 2, "#332C23", 3);
        this.mcxray(0, 18, "#332C23", 7);
        this.mcxray(1, 19, "#F3EFE0", 5);
        this.mcxray(2, 20, "#332C23", 3);
        this.mcxray(18, 18, "#332C23", 7);
        this.mcxray(19, 19, "#F3EFE0", 5);
        this.mcxray(20, 20, "#332C23", 3);
    }
    patronAlineacion(cx, cy, color) {
        this.mcxray(16, 4, "#332C23", 5);
        this.mcxray(17, 5, "#F3EFE0", 3);
        this.mcxray(18, 6, "#332C23", 1);
    }
    patronTemporizacionV(x, y, color) {
        for (let i = 0; i < 9; i++) {
            this.graphics.fillStyle = i % 2 === 0 ? color : "#F3EFE0";
            this.dibujarPixel(x, y + i);
        }
    }
    patronTemporizacionH(x, y, color) {
        for (let i = 0; i < 9; i++) {
            this.graphics.fillStyle = i % 2 === 0 ? color : "#F3EFE0";
            this.dibujarPixel(x + i, y);
        }
    }
    franjasFormato(color, bitsFormato) {
        let index = 0;
        //11101111//1000100
        this.graphics.fillStyle = "#332C23";
        this.dibujarPixel(8, 0);
        this.dibujarPixel(8, 1);
        this.dibujarPixel(8, 2);
        this.dibujarPixel(8, 4);
        this.dibujarPixel(8, 5);
        this.dibujarPixel(8, 6);
        this.dibujarPixel(17, 16);
        this.dibujarPixel(18, 16);
        this.dibujarPixel(22, 16);
        //dasdasdasdasda
        this.dibujarPixel(0, 16);
        this.dibujarPixel(1, 16);
        this.dibujarPixel(2, 16);
        this.dibujarPixel(4, 16);
        this.dibujarPixel(5, 16);
        this.dibujarPixel(7, 16);
        this.dibujarPixel(8, 16);
        this.dibujarPixel(8, 17);
        this.dibujarPixel(8, 22);
        this.graphics.fillStyle = "#F3EFE0";
        this.dibujarPixel(8, 3);
        this.dibujarPixel(19, 16);
        this.dibujarPixel(20, 16);
        this.dibujarPixel(21, 16);
        this.dibujarPixel(23, 16);
        this.dibujarPixel(24, 16);
        this.dibujarPixel(3, 16);
        this.dibujarPixel(8, 19);
        this.dibujarPixel(8, 20);
        this.dibujarPixel(8, 21);
        this.dibujarPixel(8, 23);
        this.dibujarPixel(8, 24);
    }
    formatoInformacion(color) {
        this.graphics.fillStyle = "#F3EFE0";
        this.dibujarPixel(24, 0);
        this.dibujarPixel(24, 1);
        this.dibujarPixel(23, 1);
        this.graphics.fillStyle = color;
        this.dibujarPixel(23, 0);
    }
    numCaracteres(num, color) {
        let bin = num.toString(2);
        while (bin.length < 8) {
            bin = "0" + bin;
        }
        let pares = [];
        for (let i = 0; i < 8; i += 2) {
            pares.push(bin[i] + bin[i + 1]);
        }
        pares = pares.reverse();
        for (let i = 0; i < pares.length; i++) {
            pares[i] = pares[i][1] + pares[i][0];
        }
        let resultadoFinal = pares.join('');
        let posX = 23;
        let posY = 5;
        for (let i = 0; i < 8; i++) {
            const bit = resultadoFinal[i];
            this.graphics.fillStyle = bit === '1' ? color : '#F3EFE0';
            this.dibujarPixel(posX, posY);
            if (posX === 23) {
                posX = 24;
            }
            else {
                posX = 23;
                posY--;
            }
        }
    }
    urlToBinaryAscii(url) {
        // Función interna para convertir un número a binario de 8 bits
        function to8BitBinary(n) {
            let bin = n.toString(2);
            while (bin.length < 8) {
                bin = '0' + bin;
            }
            return bin;
        }
        // Paso 1: Convertir cada carácter de la URL a 8 bits
        let binary = '';
        for (let i = 0; i < url.length; i++) {
            binary += to8BitBinary(url.charCodeAt(i));
        }
        // Paso 2: Agregar el terminador de 4 ceros 
        binary += '0000';
        // Se define la capacidad total en bits para este QR (34 bytes * 8 = 272 bits)
        const capacity = 340; //272 
        // Paso 3: Si la longitud no es múltiplo de 8, completar con ceros
        while (binary.length % 8 !== 0) {
            binary += '0';
        }
        // Paso 4: Agregar padding alternando los bytes "11101100" y "00010001"
        const padBytes = ["11101100", "00010001"];
        let padIndex = 0;
        while (binary.length < capacity) {
            binary += padBytes[padIndex];
            padIndex = (padIndex + 1) % padBytes.length;
        }
        // En caso de que se exceda la capacidad, se recorta a la longitud deseada.
        if (binary.length > capacity) {
            binary = binary.substring(0, capacity);
        }
        this.binaryArray = binary;
        return binary;
    }
    anatomia() {
        this.mcxray(23, 0, "#FF6201CC", 2);
        this.mcxray(0, 0, "#e8314fCC", 7);
        this.mcxray(0, 18, "#e8314fCC", 7);
        this.mcxray(18, 18, "#e8314fCC", 7);
        this.lhxray(0, 7, "#21FA90", 8);
        this.lvxray(7, 0, "#21FA90", 7);
        this.lhxray(0, 17, "#21FA90", 8);
        this.lvxray(7, 18, "#21FA90", 7);
        this.lhxray(17, 17, "#21FA90", 8);
        this.lvxray(17, 18, "#21FA90", 7);
        this.mcxray(16, 4, "#00ffb370", 5);
        this.lhxray(0, 16, "#FFC8577f", 6);
        this.lhxray(7, 16, "#FFC8577f", 2);
        this.lhxray(17, 16, "#FFC8577f", 8);
        this.lvxray(8, 0, "#FFC8577f", 8);
        this.lvxray(8, 17, "#FFC8577f", 1);
        this.lvxray(8, 19, "#FFC8577f", 6);
        this.lhxray(8, 18, "#00ccff96", 9);
        this.lvxray(6, 8, "#00ccff96", 9);
    }
    lhxray(x, y, color, tam) {
        let hi = x;
        this.graphics.fillStyle = color;
        for (let index = 0; index < tam; index++) {
            this.dibujarPixel(hi, y); // Dibuja un píxel en (x, y)
            hi++;
        }
    }
    lvxray(x, y, color, tam) {
        let hv = y;
        for (let index = 0; index < tam; index++) {
            this.dibujarPixel(x, hv); // Dibuja un píxel en (x, y
            hv++;
        }
    }
    mcxray(x, y, color, area) {
        let areatotal = area * area;
        let valorx = x;
        for (let index = 0; index < areatotal; index++) {
            this.graphics.fillStyle = color;
            this.dibujarPixel(x, y); // Dibuja un píxel en (x, y)
            x++; // Avanza horizontalmente
            if (index % area === area - 1) {
                x = valorx; // Reinicia x al llegar al borde
                y++; // Pasa a la siguiente fila
            }
        }
    }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    /*fx(x:number):number {
      return Math.sin(x*2.5);
    }*/
    dibujarPixel(x, y) {
        this.graphics.fillRect(this.iX(x), this.iY(y + 1), this.iX(1) - this.iX(0), this.iX(1) - this.iX(0));
    }
    pintarColumnaU(x, y, color, cantBits) {
        let x2 = x - 1;
        let altura = y;
        for (let i = 0; i < cantBits; i++) {
            this.binaryIndex--;
            this.graphics.fillStyle = (Number(this.binaryArray[this.binaryIndex]) === 0 ? "#F3EFE0" : "#332C23");
            this.dibujarPixel((i % 2 === 0 ? x : x2), altura);
            if (this.verAnatomia) {
                this.graphics.fillStyle = ("#af3b6da4");
                this.dibujarPixel((i % 2 === 0 ? x : x2), altura);
            }
            altura = altura + (i % 2 === 0 ? 0 : 1);
        }
    }
    pintarColumnaD(x, y, color, cantBits) {
        let altura = y;
        let x2 = x - 1;
        for (let i = cantBits; i > 0; i--) {
            this.binaryIndex--;
            this.graphics.fillStyle = (Number(this.binaryArray[this.binaryIndex]) === 0 ? "#F3EFE0" : "#442F38");
            if (this.binaryIndex < 0)
                this.graphics.fillStyle = "#F3EFE0";
            this.dibujarPixel((i % 2 === 0 ? x : x2), altura);
            if (this.verAnatomia) {
                this.graphics.fillStyle = ("#af3b6da4");
                this.dibujarPixel((i % 2 === 0 ? x : x2), altura);
            }
            altura = altura + (i % 2 === 0 ? 0 : -1);
        }
    }
    pintar1columna(x, y, color, cantBits) {
        let altura = y;
        for (let i = 0; i < cantBits; i++) {
            this.binaryIndex--;
            this.graphics.fillStyle = (Number(this.binaryArray[this.binaryIndex]) === 0 ? "#332C23" : "#F3EFE0");
            this.dibujarPixel(x, altura);
            if (this.verAnatomia) {
                this.graphics.fillStyle = ("#af3b6da4");
                this.dibujarPixel(x, altura);
            }
            altura++;
        }
    }
    buttonVerAnatomia() {
        this.verAnatomia = !this.verAnatomia;
        this.paint(this.guardarUrl);
    }
    paint(url) {
        let tamX = 25;
        let tamY = 25;
        //#2E282A
        //#32292f
        this.guardarUrl = url;
        this.graphics.fillStyle = "#32292f";
        //Separadores
        this.mcxray(0, 0, "#F3EFE0", 8);
        this.mcxray(0, 17, "#F3EFE0", 8);
        this.mcxray(17, 17, "#F3EFE0", 8);
        this.marcadoresPosicion(0, 18, "#32292f");
        this.marcadoresPosicion(18, 18, "#32292f");
        this.marcadoresPosicion(0, 0, "#32292f");
        //Patron de cuadrado mas pequeño de alineacion
        this.patronAlineacion(18, 6, "#32292f");
        //Patrones de temporizacion
        this.patronTemporizacionV(6, 8, "#32292f");
        this.patronTemporizacionH(8, 18, "#32292f");
        //Franjas de formato 
        this.franjasFormato("black", "111011111000100");
        //Pixel que siempre se dibuja al lado de la linea blanca que separa a los marcadores de posicion del cuadrado abajo izquierda
        this.graphics.fillStyle = "#32292f";
        this.dibujarPixel(8, 7);
        //Primeros 4 bits que especifican el formato de la informacion (numerico, alfanumerico, binario, kaji)
        this.formatoInformacion("#32292f");
        //Siguientes 8 bits que especifican el numero de caracteres
        this.numCaracteres(url.length, "#32292f");
        this.urlToBinaryAscii(url);
        this.binaryIndex = this.binaryArray.length;
        //Dibujar la data en el qr y la redundancia
        this.pintarColumnaU(24, 6, "red", 20);
        this.pintarColumnaD(22, 15, "red", 32);
        this.pintarColumnaU(20, 0, "red", 8);
        this.pintarColumnaU(20, 9, "red", 14);
        this.pintarColumnaD(18, 15, "red", 14);
        this.pintarColumnaD(18, 3, "red", 8);
        this.pintarColumnaU(16, 0, "red", 8);
        this.pintar1columna(15, 4, "red", 5);
        this.pintarColumnaU(16, 9, "red", 18);
        this.pintarColumnaU(16, 19, "red", 12);
        this.pintarColumnaD(14, 24, "red", 12);
        this.pintarColumnaD(14, 17, "red", 36);
        this.pintarColumnaU(12, 0, "red", 36);
        this.pintarColumnaU(12, 19, "red", 12);
        this.pintarColumnaD(10, 24, "red", 12);
        this.pintarColumnaD(10, 17, "red", 36);
        this.pintarColumnaU(8, 8, "red", 16);
        this.pintarColumnaD(5, 15, "red", 16);
        this.pintarColumnaU(3, 8, "red", 16);
        this.pintarColumnaD(1, 15, "red", 16);
        if (this.verAnatomia)
            this.anatomia();
    }
}
