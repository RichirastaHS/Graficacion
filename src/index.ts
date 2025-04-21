import { CanvasLocal } from './canvasLocal.js';
import { QRService } from './qr.services.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;
let x: string;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

const miCanvas:CanvasLocal = new CanvasLocal(graphics, canvas);
const form = document.querySelector('form')!;
const input = document.querySelector('#url') as HTMLInputElement;
const xrayBtn = document.querySelector('.xray') as HTMLButtonElement;

xrayBtn.style.display = 'none';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = input.value.trim();
  if (url.length < 8 || url.length > 32) {
    alert('La URL tiene una cantidad incorrecta de caracteres (p≧w≦q)');
  }
  const regex = /[\w.-]+\.[a-z]{2,}$/i;
  if (!regex.test(url)) {
    alert('Por favor ingresa una URL válida (￣y▽￣)╭ Ohohoho.....');
    return;
  }
  miCanvas.paint(url);
  xrayBtn.style.removeProperty("display");
});

xrayBtn.addEventListener('click', (event) => {
    miCanvas.buttonVerAnatomia();
});