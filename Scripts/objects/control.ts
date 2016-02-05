/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
       
       public rotationSpeedx:number;
       public rotationSpeedy:number;
       public rotationSpeedz:number;
      
       
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed:number) {
           this.rotationSpeedx = rotationSpeed;
           this.rotationSpeedy = rotationSpeed;
           this.rotationSpeedz = rotationSpeed;
        }
        
         public changeColorsToRandom(): void {
              cube.material.setValues({color: Math.floor(Math.random()*16777215)});
              head.material.setValues({color: Math.floor(Math.random()*16777215)});
              lLeg.material.setValues({color: Math.floor(Math.random()*16777215)});
              rLeg.material.setValues({color: Math.floor(Math.random()*16777215)});
              lArm.material.setValues({color: Math.floor(Math.random()*16777215)});
              rArm.material.setValues({color: Math.floor(Math.random()*16777215)});
         }
         
         public returnColors (): void {
             cube.material.setValues({color:0x5F43E7});
             head.material.setValues({color:0x2DE7B4});
             lLeg.material.setValues({color:0x3B3B3B});
             rLeg.material.setValues({color:0x3B3B3B});
             lArm.material.setValues({color:0xE7AED0});
             rArm.material.setValues({color:0xE7AED0});
             
         }
         
         public stopRotations():void {
             this.rotationSpeedx = 0;
             this.rotationSpeedy = 0;
             this.rotationSpeedz = 0;
         }
         
         
         public defaultRotations(): void {
             gui.__controllers[0].setValue(0.02);
             gui.__controllers[1].setValue(0.02);
             gui.__controllers[2].setValue(0.02);
             
             this.rotationSpeedx = 0.02;
             this.rotationSpeedy = 0.02;
             this.rotationSpeedz = 0.02;
         }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       
    }
}
