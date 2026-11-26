(function(){
  var SRC="data:audio/mpeg;base64,"+(window.__bgm||[]).join(""), VOL=0.25, KEY="bgm_muted";
  var a=new Audio(SRC); a.loop=true; a.volume=VOL; a.preload="auto";
  var b=document.createElement("button");
  b.type="button"; b.setAttribute("aria-label","Music");
  b.style.cssText="position:fixed;left:14px;bottom:14px;z-index:9999;width:46px;height:46px;border-radius:50%;border:0;cursor:pointer;font-size:22px;line-height:46px;padding:0;background:rgba(20,20,30,.85);color:#fff;box-shadow:0 2px 10px rgba(0,0,0,.35)";
  document.body.appendChild(b);
  var c=document.createElement("div");
  c.style.cssText="position:fixed;left:68px;bottom:20px;z-index:9998;font:11px system-ui,sans-serif;color:#888;max-width:60vw";
  c.innerHTML='Music: Dreamer by Kevin MacLeod (<a href="https://incompetech.com" style="color:inherit">incompetech.com</a>), CC BY (<a href="https://creativecommons.org/licenses/by/4.0/" style="color:inherit">license</a>)';
  document.body.appendChild(c);
  var muted=localStorage.getItem(KEY)==="1";
  function ui(){ b.textContent=(a.paused||muted)?"\u{1F507}":"\u{1F50A}"; }
  function play(){ if(muted) return; var p=a.play(); if(p&&p.then) p.then(ui,function(){}); }
  b.addEventListener("click",function(e){ e.stopPropagation(); if(!a.paused){a.pause();muted=true;localStorage.setItem(KEY,"1");} else {muted=false;localStorage.setItem(KEY,"0");a.play();} ui(); });
  ["click","touchstart","keydown","scroll","pointerdown"].forEach(function(ev){
    var h=function(){ if(a.paused&&!muted) play(); if(!a.paused){ ["click","touchstart","keydown","scroll","pointerdown"].forEach(function(x){window.removeEventListener(x,h,true);}); } };
    window.addEventListener(ev,h,true);
  });
  a.addEventListener("play",ui); a.addEventListener("pause",ui);
  ui(); play();
})();
