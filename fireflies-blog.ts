class Fireflyblog {
    x: number;
    y: number;
    radius: number;
    speed: number;
    angle: number;
    opacity: number;
    targetOpacity: number;

    constructor(private canvasWidth: number, private canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.radius = Math.random() * 1.5 + 0.3;
        this.speed = Math.random() * 0.5 + 0.2;
        this.angle = Math.random() * 2 * Math.PI;
        this.opacity = 0;
        this.targetOpacity = Math.random() * 0.8 + 0.5;
    }

    update(canvasWidth: number, canvasHeight: number) {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Reposiciona la luciérnaga si sale del canvas
        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;

        // Cambia la opacidad para simular el brillo intermitente
        if (this.opacity < this.targetOpacity) {
            this.opacity += 0.01;
        } else {
            this.opacity -= 0.01;
        }

        // Cambia la opacidad objetivo aleatoriamente
        if (Math.random() < 0.01) {
            this.targetOpacity = Math.random() * 0.8 + 0.5;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 200, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255, 255, 200, 1)";
        ctx.fill();
    }
}

class FirefliesSimulationblog {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private fireflies: Fireflyblog[];
    private canvasWidth: number;
    private canvasHeight: number;

    constructor() {
        this.canvas = document.getElementById('firefliesCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
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
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        // Actualiza el tamaño del canvas
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        // Reposiciona las luciérnagas para que no se salgan del canvas
        this.fireflies.forEach(Fireflyblog => {
            Fireflyblog.x = Math.min(Fireflyblog.x, this.canvasWidth);
            Fireflyblog.y = Math.min(Fireflyblog.y, this.canvasHeight);
        });
    }

    createFireflies(count: number) {
        for (let i = 0; i < count; i++) {
            this.fireflies.push(new Fireflyblog(this.canvasWidth, this.canvasHeight));
        }
    }

    animate() {
        // Limpia el canvas en cada frame
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Actualiza y dibuja cada luciérnaga
        this.fireflies.forEach(Fireflyblog => {
            Fireflyblog.update(this.canvasWidth, this.canvasHeight);
            Fireflyblog.draw(this.ctx);
        });

        // Solicita el siguiente frame
        requestAnimationFrame(() => this.animate());
    }
}

// Inicia la simulación cuando la página se carga
window.addEventListener('load', () => {
    new FirefliesSimulationblog();
});