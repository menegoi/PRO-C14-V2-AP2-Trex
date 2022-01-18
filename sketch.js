//Criar variáveis
var trex, trexCorrendo;
var solo, imgSolo;
var soloInvisivel;
var imgNuvem;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var score = 0;

function preload(){

  //Adicionar animação do T-Rex Correndo
  trexCorrendo = loadAnimation("trex1.png", "trex2.png","trex3.png" );

  //Carregar imagens
  imgSolo = loadImage("ground2.png");
  imgNuvem = loadImage("cloud2.png");

  //Imagens dos obstáculos
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");

}

function setup(){
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("correndo", trexCorrendo);
  trex.scale = 0.5;

  //Criar sprite do solo
  solo = createSprite(300,180,600,20);
  solo.addImage("solo",imgSolo);

  //Criar Sprite do Solo Invisível
  soloInvisivel = createSprite(200,195,400,20);
  soloInvisivel.visible = false;
      
  
  
}
 
function draw(){

  //Definir fundo e limpar a tela
  background("white");

  //Marcar pontuação do Jogo
  text("Pontuação: " + score, 500, 50);
  score = score + Math.round(frameCount/60);

  //Fazer o T-Rex saltar na tela
  if(keyDown("space") && trex.y > 150){
    trex.velocityY = -10;

  }

  //Atribuir velocidade ao T-Rex
  trex.velocityY = trex.velocityY + 0.5;

  //Fazer o Trex colidir com o solo
  trex.collide(soloInvisivel);

  //Atribuir velocidade ao T-Rex a partir do movimento do solo
  solo.velocityX = -3;

  //Reiniciar posição do solo
  if(solo.x < 0){
    solo.x = width/2;
  }

  //Gerar nuvens
  gerarNuvens();

  //Gerar obstáculos do solo
  gerarObstaculos();

  //Desenhar sprites na tela
  drawSprites();

}
function gerarNuvens(){
  //Escrever aqui o código para gerar as nuvens
  if(frameCount % 60 === 0){
    var nuvem = createSprite(600,100,40,10);
    nuvem.velocityX = -3;
    
    //Adicionar imagem da nuvem nos sprites
    nuvem.addImage(imgNuvem);
    nuvem.scale = Math.round(random(3,6))/10;
    
    //Tornar posição Y da nuvem aleatória
    nuvem.y = Math.round(random(10,100));
    
    //Garantir que profundidade da nuvem seja maior que a do T-Rex
    nuvem.depth = trex.depth;
    trex.depth = trex.depth +1;

    //Definir tempo de vida
    nuvem.lifetime = 300;
   
    
  } 
}
function gerarObstaculos(){
  if(frameCount % 60 === 0){
    var obstaculo = createSprite(600,165,10,40);
    obstaculo.velocityX = -5;
    
    //Criar Obstáculos aleatórios
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
              default: break;
    }
    
    // Alterar escala e vida útil
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;
    
  }
  
}