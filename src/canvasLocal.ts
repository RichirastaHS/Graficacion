interface PC {
  barraPorcentaje: number;
  barraColor: string;
}

export class CanvasLocal {
  //atributos
  protected graphics: CanvasRenderingContext2D;
  protected rWidth:number;
  protected rHeight:number;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;
  protected topdelabarra: String
      
  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    this.graphics = g;
    this.rWidth = 14;
    this.rHeight= 10;
    this.maxX = canvas.width - 1
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX/4;
    this.centerY = this.maxY/8*7;
  }

  iX(x: number):number{return Math.round(this.centerX + x/this.pixelSize);}
  iY(y: number):number{return Math.round(this.centerY - y / this.pixelSize); }
  drawLine(x1: number, y1: number, x2: number, y2:number) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
    this.graphics.fill();
    
  }
  
  Color(colorHex: string, matiz: number):string {
    let r: number = parseInt(colorHex.substring(1,3), 16);
    let g: number = parseInt(colorHex.substring(3,5), 16);
    let b: number = parseInt(colorHex.substring(5,7), 16);

    r = Math.round(Math.min(255, Math.max(0, r + (r * matiz / 100))));
    g = Math.round(Math.min(255, Math.max(0, g + (g * matiz / 100))));
    b = Math.round(Math.min(255, Math.max(0, b + (b * matiz / 100))));
    return `#${this.RGBaHex(r, g, b)}`;
  }

  RGBaHex(r: number, g: number, b: number): string {
    return (
      (1 << 24) +
      (r << 16) +
      (g << 8) +
      b
    ).toString(16).slice(1);
  }

  drawRmboide(x1: number, y1: number, x2: number, y2: number,
    x3:number, y3:number, x4:number, y4:number, color:string) {
    
      // Color de relleno
      this.graphics.fillStyle = color;
      // Comenzamos la ruta de dibujo, o path
      this.graphics.beginPath();
      // Mover a la esquina superior izquierda
      this.graphics.moveTo(x1, y1);
      // Dibujar la línea hacia la derecha
      this.graphics.lineTo(x2, y2);
      // Ahora la que va hacia abajo
      this.graphics.lineTo(x3, y3); // A 80 porque esa es la altura
      // La que va hacia la izquierda
      this.graphics.lineTo(x4, y4);
      // Y dejamos que la última línea la dibuje sola
      // Hacemos que se dibuje
      this.graphics.stroke();
      // Lo rellenamos
      this.graphics.fill();
    }

  fx(x:number):number {
    return Math.sin(x*2.5);
  }

  maxH(h: number[]): number{
    let max = h[0];
    for (let i = 1; i < h.length; i++) {
      if (max < h[i])
        max = h[i];
    }
    //
    let res:number;
    let pot: number = 10;
    //se calcula la potencia de 10 mayor al max para redondear el maximo de la grafica.
    while (pot<max) {
      pot *= 10;
    }
    pot /= 10;
    res = Math.ceil(max / pot) * pot;
    return res;
  }
  
  barra(x:number, y:number, alt:number, colorS: string):void{
    this.graphics.strokeStyle = colorS;
    this.topdelabarra = "#FDF0D5";
    //Si la barra es muy alta, se cambia el color de la cara de la parte superior por el color de la barra
    if(y+alt == this.rHeight-2)
    this.topdelabarra = this.Color(colorS, -20);
    
    console.log("y="+y);
    if(alt !== 0){
      this.drawRmboide(
        this.iX(x), this.iY(0),   
        this.iX(x-0.5), this.iY(0.25), 
        this.iX(x-0.5), this.iY(y + alt),
        this.iX(x), this.iY(y + alt-.25),
        this.Color(colorS, -20)
      );
      this.drawRmboide(
        this.iX(x), this.iY(0),
        this.iX(x+0.5), this.iY(0.25),
        this.iX(x+0.5), this.iY(y + alt),
        this.iX(x), this.iY(y + alt-.25),
        colorS
      );
    }

    
    //Partes "Grises" de la barra
    this.graphics.strokeStyle = this.Color(this.topdelabarra.toString(), -20);
    this.drawRmboide(
      this.iX(x), this.iY(y + alt-0.25), 
      this.iX(x-0.5), this.iY(y + alt), 
      this.iX(x-0.5), this.iY(this.rHeight-2), 
      this.iX(x), this.iY(this.rHeight-2.25), 
      this.Color(this.topdelabarra.toString(), -20)
    );

    this.graphics.strokeStyle = this.topdelabarra.toString();
    this.drawRmboide(
      this.iX(x), this.iY(y + alt-0.25), 
      this.iX(x+0.5), this.iY(y + alt), 
      this.iX(x+0.5), this.iY(this.rHeight-2), 
      this.iX(x), this.iY(this.rHeight-2.25),
      this.topdelabarra.toString()
    );
    
    //Dibujar parte superior de la barra
    this.graphics.strokeStyle = this.Color(this.topdelabarra.toString(), -5);
    this.drawRmboide(
      this.iX(x), this.iY(this.rHeight - 1.75),
      this.iX(x + 0.5), this.iY(this.rHeight - 2), 
      this.iX(x), this.iY(this.rHeight - 2.25), 
      this.iX(x - 0.5), this.iY(this.rHeight - 2),
      this.Color(this.topdelabarra.toString(), -5)
    );
  }


  paint(dataBarra: PC[]) {
    let h: number[] = dataBarra.map((dataBarra) => dataBarra.barraPorcentaje);
    let colors: string[]= dataBarra.map((dataBarra) => dataBarra.barraColor);
    let maxEsc: number;
    maxEsc = this.maxH(h);
    let i=0;

    for(let x= 0, y=0; x < 8; x+=(8/(h.length)) ){
      let color= colors[y];
      if(i<h.length){
        if(h[y]!==0){
          this.barra(x,0, h[y]*(this.rHeight-2)/maxEsc, color);
        }else{
          this.barra(x,0, 0, color);
        }
      }
      y++;
    }
    i=0;
    for (let x = 0; x < 8; x += (8/(h.length*1)) ){
      this.graphics.strokeStyle = colors[i%colors.length];
      if(i<h.length)
        this.graphics.strokeText(h[i++]+"%", this.iX(x-.2), this.iY(-.50));
    }
  }
}