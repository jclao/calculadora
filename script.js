
/*function classBoton(p){//esta función añade o quita una clase (si ya la tenia) a un elemento
	
	p.classList.toggle("clic");
}
function alerta(){
	alert("Un mensaje de prueba");
}
// function a(){
//     this.classList.toggle('first');
//     this.classList.toggle('sec');
// }

 
  //alert("El elemento selecionado ha sido " + tag);
}*/
/*
ar container = document.querySelectorAll('.boton');
container.addEventListener('mousedown', function() {
  this.classList.toggle('clic');
  this.classList.toggle('normal');
})
container.addEventListener('mouseup', function() {
  this.classList.toggle('clic');
  this.classList.toggle('normal');
})*/

var cadEntrada='';
var exponente='';
var potenciaFlag=false;
var modal=document.createElement('div');
    modal.id='modal';
    modal.classList.add('modal');
    modal.classList.add('hide');
var ventana=document.createElement('div');
    ventana.id='ventana';
    ventana.className='modal-contenido';
    ventana.classList.add('hide');
    ventana.innerHTML='<h1>ATENCION</h1><h2>Con esta sencilla calculadora solo podrás realizar:</h2><p>1) Operaciones unitarias (con un solo operando):&nbsp;<br>'+
    '1.1)&nbsp;x^2&nbsp;(número elevado al cuadrado)<br>1.2) 1/x&nbsp;(inverso del número)<br>'+
     '1.3) sqrt(x) (raiz cuadrada del número)<br>1.4) parte_entera(x) (parte entera de x: si x es positivo'+
     'devuelve Math.floor(x) y si es negativo devuelve -Math.ceil(x))</p><p>2) Operaciones binarias (con dos operandos):<br>'+
     '2.1) +. -. *, / (suma, resta, multiplicación y&nbsp;división)<br>2.2) x^y (x elevado a y)</p>'+
     '<h2><em>No se permiten entradas desde el teclado para un mejor comportamiento<em></h2>'+
    '<a href="#close" title="Cerrar" onClick="mostrar()">Close</a>';
modal.appendChild(ventana);
document.body.appendChild(modal);
/*----------------------------------------------*/
// document.querySelectorAll('.boton').addEventListener('mousedown',selectTag(),true);
// document.querySelectorAll('.boton').addEventListener('mouseup',selectTag(),true);
// function selectTag(elEvento){
//   if(elEvento)
//   var evento = elEvento || window.event;
//     //tag = e.srcElement || e.target;
//     else{
//       evento = document.event;
//     }
//   // var cad=tag.nodeName;
//   //   cad=cad+'.'+tag.className.substring(0,5);
//   // if (cad=='DIV.boton'){
//     evento.classList.toggle('clic');
//     evento.classList.toggle('normal');
// }
/*----------------------------------------------*/
function manejador(elEvento) {
  var evento = elEvento || window.event;
  var caracter = evento.charCode || evento.keyCode;
  //evento.cancelBubble=true;
  //alert("El carácter pulsado es: " + String.fromCharCode(caracter));
  mostrar();
  return false; //se evita que se muestren los caracteres provenientes del teclado
}
 function mostrar() {
   document.getElementById('modal').classList.toggle('hide');
   document.getElementById('ventana').classList.toggle('hide');
   document.getElementById('modal').classList.toggle('mostrar');
   document.getElementById('ventana').classList.toggle('mostrar');

 }
//document.onkeypress = manejador;
var input=document.getElementById("entrada")
input.onkeypress = manejador;




function agregarOperador(operador){

  /*
    Casos de insersión
    1- No hay nada y se aprieta un caracter
    2- No hay nada y se aprieta un caracter binario (error) o un punto
    3- Hay un numero y se aprieta un numero un caracter binario o un punto
    4- Hay un punto y se aprieta un punto(error) o un numero o un caracter binario 
    5- Hay un caracter binario y se aprieta un caracter binario(error), un punto o un numero
    6- 
  */
  var longitud=cadEntrada.length;
  var ultimaLetra=cadEntrada.charAt(longitud); 
  /*if (longitud==0 && imputTieneElementos() && !operadorBinario(operador) && operador!=='.' )
   actualizarEntrada("");
  else
    cadEntrada=valorEntrada()+operador;*/
  if (!potenciaFlag) {
  if (longitud>0)
    if (!operadorBinario(ultimaLetra)) 
      if (ultimaLetra!=='.') 
        cadEntrada=cadEntrada+operador; //inserto es un numero o un punto
      else 
        if (operador=='.') //La ultima letra es el . y se pide insertar un.
          cadEntrada=cadEntrada; // no se hace nada
        else 
          if (isNaN(operador)) //El operador no es un numero
            cadEntrada=cadEntrada+'0'+operador;
          else
            cadEntrada=cadEntrada+operador;
      
    else 
      if (!operadorBinario(operador)&&operador!=='.') 
        cadEntrada=cadEntrada+operador;
      else 
        if (!operadorBinario(operador)&&operador=='.')
          cadEntrada=cadEntrada+'0.';
        else
          cadEntrada=cadEntrada; //no se hace nada
  else
    if (operador=='.')
     cadEntrada=cadEntrada+'0.';
    else 
      if (!isNaN(operador))
         cadEntrada=cadEntrada+operador;
      else 
          cadEntrada=cadEntrada;  
  
actualizarEntrada(cadEntrada);
}
else
entrarSoloNumeros(operador);
}
function mas(){
  agregarOperador('+');
}
function menos(){
  agregarOperador('-');
}
function multiplicar(){
  agregarOperador('*');
}
function dividir(){
  agregarOperador('/');
}
function punto(){
  agregarOperador('.');
 }
 function entrarNumero(numero) {
    agregarOperador(numero);
  }
function resultado(cadena){
   var respuesta=eval(cadena);
  actualizarEntrada(respuesta);
  reiniciarCadena(respuesta);
}
function actualizarEntrada(cadena){
  document.getElementById("entrada").value=cadena;
}
function valorEntrada(){
  return document.getElementById("entrada").value.toString();
}
function imputTieneElementos(){
  return document.getElementById("entrada").value.length;
}
function operadorBinario(operador) {
  if (operador=='+'||operador=='-'||operador=='*'||operador=='/') 
    return true;
  return false;
}
function reiniciarCadena(cadena){
  cadEntrada=cadena;
  cadEntrada=cadEntrada.toString();
}

function calcular() {
  if (potenciaFlag==true) {
    potenciaFlag=false;
    cadEntrada='Math.pow('+cadEntrada+','+exponente+')';
  }
  //potenciaFlag=false;
  resultado(cadEntrada);
}

function limpiar () {
  actualizarEntrada("");
  reiniciarCadena("");
}

function cuadrado(){
  var respuesta=eval(cadEntrada);
  respuesta=Math.pow(respuesta,2);
  resultado(respuesta);
  reiniciarCadena("");
}
function inverso(){
  var respuesta=eval(cadEntrada);
  respuesta=1/respuesta;
  resultado(respuesta);
  reiniciarCadena("");
}
function raiz(){
  var respuesta=eval(cadEntrada);
  respuesta=Math.sqrt(respuesta);
  resultado(respuesta);
  reiniciarCadena("");
}
function entrarSoloNumeros(numero){
  if (!isNaN(numero)){
    exponente=exponente+numero;
    actualizarEntrada(exponente);
  }
}
function potencia(){
  var respuesta=eval(cadEntrada);
  //respuesta="Math.pow("+respuesta+", )";
  //potenciaIndice=respuesta.length-1;
  potenciaFlag=true;
  cadEntrada=respuesta.toString();
  actualizarEntrada("");
  exponente='';

}
function entero(){
  var respuesta=eval(cadEntrada);
  if(respuesta>0)
    respuesta=Math.floor(respuesta);
   respuesta=Math.ceil(respuesta)
  resultado(respuesta);
  reiniciarCadena("");
}