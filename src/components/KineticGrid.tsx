import { useEffect, useRef } from 'react';

const KineticGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let cols = 0;
        let mouseX = -1000;
        let mouseY = -1000;

        const spacing = 50; // Grid spacing
        let points: { x: number; y: number; originX: number; originY: number }[] = [];

        const init = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            
            // Set canvas size to match the scrollable height of the parent container
            width = canvas.width = parent.offsetWidth;
            height = canvas.height = parent.offsetHeight;

            cols = Math.floor(width / spacing) + 1;
            const rows = Math.floor(height / spacing) + 1;

            points = [];
            for (let r = 0; r <= rows; r++) {
                for (let c = 0; c <= cols; c++) {
                    const x = c * spacing;
                    const y = r * spacing;
                    points.push({ x, y, originX: x, originY: y });
                }
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            // Viewport local coordinates converted to canvas local coordinates
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        window.addEventListener('resize', init);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            const interactionRadius = 250;
            
            // Update points
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                const dx = mouseX - point.originX;
                const dy = mouseY - point.originY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < interactionRadius) {
                    // Repel behavior
                    const force = Math.pow((interactionRadius - dist) / interactionRadius, 2);
                    point.x = point.originX - (dx * force * 0.6);
                    point.y = point.originY - (dy * force * 0.6);
                } else {
                    // Return to origin with a spring effect
                    point.x += (point.originX - point.x) * 0.1;
                    point.y += (point.originY - point.y) * 0.1;
                }
            }

            // Draw grid lines
            ctx.beginPath();
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                const col = i % (cols + 1);
                
                // Right neighbor
                if (col !== cols && i + 1 < points.length) {
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(points[i + 1].x, points[i + 1].y);
                }
                
                // Bottom neighbor
                if (i + (cols + 1) < points.length) {
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(points[i + cols + 1].x, points[i + cols + 1].y);
                }
            }
            
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'; // Black color with low opacity for aesthetic
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw small dots at intersections
            ctx.beginPath();
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                ctx.moveTo(point.x, point.y);
                ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
            }
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.fill();

            animationFrameId = requestAnimationFrame(animate);
        };

        // Delay initialization sequentially to ensure parent is properly sized first
        setTimeout(init, 100);

        // Re-initialize to handle dynamic content height changes
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(init);
        });
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        animate();

        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10"
        />
    );
};

export default KineticGrid;
