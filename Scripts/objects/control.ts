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
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       
    }
}
