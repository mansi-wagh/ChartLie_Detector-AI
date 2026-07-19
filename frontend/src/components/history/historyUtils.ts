



export function generateMockChartFile(filename: string, chartType: string = "bar"): File {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 450;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Background
    ctx.fillStyle = "#0f0f15";
    ctx.fillRect(0, 0, 800, 450);
    // Grid Lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 80; i < 400; i += 60) {
      ctx.beginPath();
      ctx.moveTo(80, i);
      ctx.lineTo(750, i);
      ctx.stroke();
    }
    // Axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 50);
    ctx.lineTo(80, 400);
    ctx.lineTo(750, 400);
    ctx.stroke();

    const isLine = chartType.toLowerCase().includes("line");
    if (!isLine) {
      // Bar Chart
      const gradient = ctx.createLinearGradient(0, 400, 0, 100);
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.2)");
      gradient.addColorStop(1, "rgba(139, 92, 246, 0.8)");
      ctx.fillStyle = gradient;
      const bars = [140, 290, 190, 340, 210, 300];
      bars.forEach((height, index) => {
        const x = 120 + index * 95;
        const y = 400 - height;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, 55, height, [6, 6, 0, 0]);
        } else {
          ctx.rect(x, y, 55, height);
        }
        ctx.fill();
        ctx.strokeStyle = "rgba(139, 92, 246, 0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    } else {
      // Line Chart
      const gradient = ctx.createLinearGradient(0, 100, 0, 400);
      gradient.addColorStop(0, "rgba(6, 182, 212, 0.35)");
      gradient.addColorStop(1, "rgba(6, 182, 212, 0)");
      const points = [
        { x: 120, y: 310 },
        { x: 230, y: 190 },
        { x: 340, y: 250 },
        { x: 450, y: 110 },
        { x: 560, y: 230 },
        { x: 670, y: 150 },
      ];
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(points[0].x, 400);
      points.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.lineTo(points[points.length - 1].x, 400);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#06b6d4";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#06b6d4";
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });
    }
    // Title
    ctx.fillStyle = "#f3f4f6";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(filename, 80, 35);
  }

  const dataURL = canvas.toDataURL("image/png");
  const binary = atob(dataURL.split(",")[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  const blob = new Blob([new Uint8Array(array)], { type: "image/png" });
  return new File([blob], filename, { type: "image/png" });
}
