/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed) {
            this.rotationSpeedx = rotationSpeed;
            this.rotationSpeedy = rotationSpeed;
            this.rotationSpeedz = rotationSpeed;
        }
        // change cube's colors to random colors, except few cubs 
        Control.prototype.changeColorsToRandom = function () {
            cube.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            head.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            lLeg.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            rLeg.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            lArm.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            rArm.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            hat.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            hat1.material.setValues({ color: Math.floor(Math.random() * 16777215) });
        };
        // return preseted colors 
        Control.prototype.returnColors = function () {
            cube.material.setValues({ color: 0x5F43E7 });
            head.material.setValues({ color: 0x2DE7B4 });
            lLeg.material.setValues({ color: 0x3B3B3B });
            rLeg.material.setValues({ color: 0x3B3B3B });
            lArm.material.setValues({ color: 0xE7AED0 });
            rArm.material.setValues({ color: 0xE7AED0 });
            hat.material.setValues({ color: 0xFF0000 });
            hat1.material.setValues({ color: 0xFF0000 });
        };
        // stop cube's rotation
        Control.prototype.stopRotations = function () {
            this.rotationSpeedx = 0;
            this.rotationSpeedy = 0;
            this.rotationSpeedz = 0;
        };
        // make rotation speed default 
        Control.prototype.defaultRotations = function () {
            gui.__controllers[0].setValue(0.02);
            gui.__controllers[1].setValue(0.02);
            gui.__controllers[2].setValue(0.02);
            this.rotationSpeedx = 0.02;
            this.rotationSpeedy = 0.02;
            this.rotationSpeedz = 0.02;
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map