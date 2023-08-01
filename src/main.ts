import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: 600,
    height:400,
    background:'#000000',
});

const bg = new PIXI.Sprite(PIXI.Texture.WHITE)
bg.width = app.view.width;
bg.height = app.view.height;
bg.tint = '#000000'

bg.eventMode = 'static';
bg.cursor = 'pointer'
bg.on('pointerdown', function(e){
  generateShape(e.clientX,e.clientY)
  
});
app.stage.addChild(bg)

document.body.appendChild(app.view)
 



const gravity = 1

let shapesArray:PIXI.Graphics[] = []



const generateShape = (x = Math.random()* app.view.width,y = -100) => {
  const circle = new PIXI.Graphics();

  circle.beginFill("#FFFFFF").drawCircle(0, 0, 50).endFill();
  circle.position.set(x, y);

  circle.eventMode = 'static'
  circle.cursor = 'none'

  shapesArray.push(circle);
}


let spawnInterval = 1;
let passedTime = 0;
// generateShape()

app.ticker.add((delta)=>{

    // if (Date.now() > passedTime) {
    //     passedTime = Date.now() + 1000 / spawnInterval;
    //     generateShape()
    //   }
    
  
    
    for(let i = 0; i < shapesArray.length; i++){
      const shape = shapesArray[i]

      
      
      app.stage.addChild(shape)
        shape.y += gravity * delta
        console.log(shape.y);
        
        if (checkOutOfContainer(shape)){
        removeShape(shapesArray,shape)
        
       } 
        
        }


})


function checkOutOfContainer(shape:PIXI.Graphics){
  
  
  if  (shape.y - (shape.height/2) > app.view.height )  //radius 
  {
    return true
  }else
      return false
}

export function removeShape(arr:PIXI.Graphics[], elm:PIXI.Graphics) {
    app.stage.removeChild(elm)
    let i = arr.indexOf(elm);
    return arr.splice(i, 1);
  }
