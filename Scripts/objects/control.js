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
        Control.prototype.changeColorsToRandom = function () {
            cube.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            head.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            lLeg.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            rLeg.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            lArm.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            rArm.material.setValues({ color: Math.floor(Math.random() * 16777215) });
        };
        Control.prototype.returnColors = function () {
            cube.material.setValues({ color: 0x5F43E7 });
            head.material.setValues({ color: 0x2DE7B4 });
            lLeg.material.setValues({ color: 0x3B3B3B });
            rLeg.material.setValues({ color: 0x3B3B3B });
            lArm.material.setValues({ color: 0xE7AED0 });
            rArm.material.setValues({ color: 0xE7AED0 });
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map