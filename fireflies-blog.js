var Fireflyblog = /** @class */ (function () {
    function Fireflyblog(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.radius = Math.random() * 1.5 + 0.3;
        this.speed = Math.random() * 0.5 + 0.2;
        this.angle = Math.random() * 2 * Math.PI;
        this.opacity = 0;
        this.targetOpacity = Math.random() * 0.8 + 0.5;
    }
    Fireflyblog.prototype.update = function (canvasWidth, canvasHeight) {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        // Reposiciona la luciérnaga si sale del canvas
        if (this.x < 0)
            this.x = canvasWidth;
        if (this.x > canvasWidth)
            this.x = 0;
        if (this.y < 0)
            this.y = canvasHeight;
        if (this.y > canvasHeight)
            this.y = 0;
        // Cambia la opacidad para simular el brillo intermitente
        if (this.opacity < this.targetOpacity) {
            this.opacity += 0.01;
        }
        else {
            this.opacity -= 0.01;
        }
        // Cambia la opacidad objetivo aleatoriamente
        if (Math.random() < 0.01) {
            this.targetOpacity = Math.random() * 0.8 + 0.5;
        }
    };
    Fireflyblog.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255, 255, 200, ".concat(this.opacity, ")");
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255, 255, 200, 1)";
        ctx.fill();
    };
    return Fireflyblog;
}());
var FirefliesSimulationblog = /** @class */ (function () {
    function FirefliesSimulationblog() {
        var _this = this;
        this.canvas = document.getElementById('firefliesCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.fireflies = [];
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        // Ajusta el tamaño del canvas al cargar la página
        this.resizeCanvas();
        // Crea las luciérnagas
        this.createFireflies(15);
        // Inicia la animación
        this.animate();
        // Escucha el evento de redimensionamiento de la ventana
        window.addEventListener('resize', function () { return _this.resizeCanvas(); });
    }
    FirefliesSimulationblog.prototype.resizeCanvas = function () {
        var _this = this;
        // Actualiza el tamaño del canvas
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        // Reposiciona las luciérnagas para que no se salgan del canvas
        this.fireflies.forEach(function (Fireflyblog) {
            Fireflyblog.x = Math.min(Fireflyblog.x, _this.canvasWidth);
            Fireflyblog.y = Math.min(Fireflyblog.y, _this.canvasHeight);
        });
    };
    FirefliesSimulationblog.prototype.createFireflies = function (count) {
        for (var i = 0; i < count; i++) {
            this.fireflies.push(new Fireflyblog(this.canvasWidth, this.canvasHeight));
        }
    };
    FirefliesSimulationblog.prototype.animate = function () {
        var _this = this;
        // Limpia el canvas en cada frame
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        // Actualiza y dibuja cada luciérnaga
        this.fireflies.forEach(function (Fireflyblog) {
            Fireflyblog.update(_this.canvasWidth, _this.canvasHeight);
            Fireflyblog.draw(_this.ctx);
        });
        // Solicita el siguiente frame
        requestAnimationFrame(function () { return _this.animate(); });
    };
    return FirefliesSimulationblog;
}());
// Inicia la simulación cuando la página se carga
window.addEventListener('load', function () {
    new FirefliesSimulationblog();
});
