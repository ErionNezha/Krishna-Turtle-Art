
// Simulim canvas i artit "Krishna" me turtle (origjinali: krishna.py) — nga Erion Nezha, © 2026
(function(){
const cv = document.getElementById('art'), ctx = cv.getContext('2d');
const W = cv.width, H = cv.height;
const GOLD = '#ffcf4d';
ctx.lineCap = 'round'; ctx.lineJoin = 'round';
function P(x,y){return [x,y];}
function arcPts(cx,cy,r,a1,a2,n){const p=[];for(let i=0;i<=n;i++){const a=a1+(a2-a1)*i/n;p.push([cx+r*Math.cos(a),cy+r*Math.sin(a)]);}return p;}
function linePts(x1,y1,x2,y2,n){const p=[];for(let i=0;i<=n;i++)p.push([x1+(x2-x1)*i/n,y1+(y2-y1)*i/n]);return p;}
function qPts(x1,y1,cx,cy,x2,y2,n){const p=[];for(let i=0;i<=n;i++){const t=i/n,u=1-t;p.push([u*u*x1+2*u*t*cx+t*t*x2,u*u*y1+2*u*t*cy+t*t*y2]);}return p;}
const paths=[]; // {pts, w, color, fillAfter}
function addPath(pts,w,color){paths.push({pts,w:w||3,color:color||GOLD,fillAfter:null});}
function addFill(kind,args,color){paths.push({fill:kind,args,color});}
// --- Kompozimi ---
addPath(linePts(480,70,480,140,12),5);                       // tilak
addPath(arcPts(480,150,26,Math.PI*1.1,Math.PI*1.9,16),3);    // hark tilak
addPath(arcPts(395,205,58,Math.PI*1.12,Math.PI*1.88,22),5);  // vetull majtas
addPath(arcPts(565,205,58,Math.PI*1.12,Math.PI*1.88,22),5);  // vetull djathtas
addPath(qPts(345,265,395,235,445,265,20).concat(qPts(445,265,395,285,345,265,20)),4); // syri majtas
addFill('circle',[395,262,9],'#ffcf4d');
addPath(qPts(515,265,565,235,615,265,20).concat(qPts(615,265,565,285,515,265,20)),4); // syri djathtas
addFill('circle',[565,262,9],'#ffcf4d');
addPath(qPts(480,290,472,320,462,338,14),3);                 // hunda
addPath(arcPts(480,350,62,Math.PI*0.18,Math.PI*0.82,24),4);  // buzëqeshja
addPath(arcPts(480,300,178,Math.PI*0.12,Math.PI*0.88,40),4); // kontura e fytyrës
addPath(arcPts(300,330,26,Math.PI*0.4,Math.PI*1.6,16),3);    // veshi majtas
addPath(arcPts(660,330,26,Math.PI*1.4,Math.PI*0.6,16),3);    // veshi djathtas
// kurora (mukut)
addPath(arcPts(480,180,120,Math.PI*1.15,Math.PI*1.85,30),4);
for(let i=0;i<5;i++){const a=Math.PI*(1.2+i*0.15);const x=480+120*Math.cos(a),y=180+120*Math.sin(a);
  addPath(linePts(x,y,x+22*Math.cos(a),y+22*Math.sin(a)-14,8),3);}
addFill('circle',[480,44,7],'#ff9d2e');
// fyelli
addPath(linePts(300,520,660,520,30),14,'#e8a33d');
for(let i=0;i<7;i++) addFill('circle',[350+i*44,520,8],'#0a0a0a');
addPath(arcPts(300,560,34,Math.PI*0.5,Math.PI*1.5,18),3);    // dora majtas
addPath(arcPts(660,560,34,Math.PI*1.5,Math.PI*0.5,18),3);    // dora djathtas
// pendë palloi
addPath(qPts(760,620,800,420,760,220,30),3,'#2ea8ff');
addFill('ellipse',[760,190,46,60],'#1c6dd9');
addFill('ellipse',[760,190,30,40],'#2ed97b');
addFill('ellipse',[760,190,15,20],GOLD);
// harqe dekorative
addPath(arcPts(480,330,250,Math.PI*1.05,Math.PI*1.95,36),2,'#8a6a1f');
addPath(arcPts(480,330,286,Math.PI*1.05,Math.PI*1.95,36),2,'#8a6a1f');

let animId=null;
function drawFrame(progress){
  ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H);
  ctx.shadowColor=GOLD; ctx.shadowBlur=12;
  let remaining=progress*paths.length;
  for(let i=0;i<paths.length;i++){
    const p=paths[i];
    if(p.fill){
      if(remaining>=i+1){
        ctx.fillStyle=p.color; ctx.shadowBlur=10; ctx.beginPath();
        if(p.fill==='circle') ctx.arc(p.args[0],p.args[1],p.args[2],0,7);
        else ctx.ellipse(p.args[0],p.args[1],p.args[2],p.args[3],0,0,7);
        ctx.fill();
      }
      continue;
    }
    const frac=Math.min(1,Math.max(0,remaining-i));
    if(frac<=0) continue;
    const n=Math.max(2,Math.floor(p.pts.length*frac));
    ctx.strokeStyle=p.color; ctx.lineWidth=p.w; ctx.beginPath();
    ctx.moveTo(p.pts[0][0],p.pts[0][1]);
    for(let k=1;k<n;k++) ctx.lineTo(p.pts[k][0],p.pts[k][1]);
    ctx.stroke();
  }
  ctx.shadowBlur=0;
  if(progress>=1){
    ctx.fillStyle=GOLD; ctx.textAlign='center';
    ctx.font='bold 44px Georgia,serif';
    ctx.shadowColor=GOLD; ctx.shadowBlur=18;
    ctx.fillText('Jai Shri Krishna',480,672);
    ctx.shadowBlur=0;
  }
}
function play(){
  cancelAnimationFrame(animId);
  const t0=performance.now(), DUR=14000;
  function step(t){
    const pr=Math.min(1,(t-t0)/DUR);
    drawFrame(pr);
    if(pr<1) animId=requestAnimationFrame(step);
  }
  animId=requestAnimationFrame(step);
}
document.getElementById('replay').addEventListener('click',play);
play();
})();
