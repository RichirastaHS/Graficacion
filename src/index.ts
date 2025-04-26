import { CanvasLocal } from './canvasLocal.js';

export interface PC /*PC de PickerColor*/ {
    barraPorcentaje: number;
    barraColor: string;
}
const form = (document.querySelector('#formulario') as HTMLFormElement)!;
const agregar = (document.querySelector('#agregar') as HTMLButtonElement)!;
const fieldsetContainer = (document.querySelector('#fieldset-container') as HTMLDivElement)!;
let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;
let dataBarra: PC[] = [];
let i = 1;
canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

const miCanvas:CanvasLocal = new CanvasLocal(graphics, canvas);

agregar.addEventListener('click', (e) => {
  if(i < 8){
    const  newFieldset = document.createElement('fieldset');

    const newColorInput = document.createElement('input');
    newColorInput.type = 'color';
    newColorInput.id = 'color-'+ i;
    newColorInput.name = 'color-'+ i;
  
    const newPorcentajeInput = document.createElement('input');
    newPorcentajeInput.type = 'number';
    newPorcentajeInput.className = 'form-control';
    newPorcentajeInput.id = 'porcentaje-'+ i;
    newPorcentajeInput.name = 'porcentaje-'+ i;
    newPorcentajeInput.min = '0';
    newPorcentajeInput.max = '100';
    newPorcentajeInput.value = '0';
  
    newFieldset.appendChild(newColorInput);
    newFieldset.appendChild(newPorcentajeInput);
    fieldsetContainer.appendChild(newFieldset);
    i++;
  }
  else{
    agregar.disabled = true;
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(i);
  dataBarra = []; // Limpiar datos anteriores

  for (let j = 0; j < i; j++) {
    const colorInput = form.querySelector(`#color-${j}`) as HTMLInputElement;
    const numberInput = form.querySelector(`#porcentaje-${j}`) as HTMLInputElement;
    const pc: PC = {
      barraColor: colorInput.value,
      barraPorcentaje: parseFloat(numberInput.value)
    };
    dataBarra.push(pc);
  }
  graphics.clearRect(0, 0, canvas.width, canvas.height);
  console.log(dataBarra);
  miCanvas.paint(dataBarra);
});
