(function(){
  /* ZMĚŇTE na svůj kontaktní e-mail */
  var CONTACT="[váš e-mail]";
  document.getElementById("contactTxt").textContent=CONTACT;
  document.getElementById("contactFoot").textContent=CONTACT;

  function fmt(n){return Math.round(n).toLocaleString("cs-CZ").replace(/ /g," ")}
  function kc(n){return fmt(n)+" Kč"}
  function short(n){return n>=1e6?(n/1e6).toLocaleString("cs-CZ",{maximumFractionDigits:1})+" mil. Kč":fmt(n)+" Kč"}

  /* ---------- demo ---------- */
  var DATA={
    "Stavby":[
      {t:"Rekonstrukce tělocvičny ZŠ",z:"Obec Příkladov",typ:"Podlimitní · stavební práce",ph:4200000,days:21,s:87,
       v:"go",vt:"Jděte do toho",price:"91–97 % PH",
       c:[["ok","2 reference nad 3 mil. Kč za 5 let","str. 14"],["warn","Pojištění odpovědnosti 5 mil. Kč, máte 3 mil.","str. 31"],["ok","Záruka min. 60 měsíců","str. 42"],["ok","Hodnocení: cena 80 %, záruka 20 %","str. 42"]]},
      {t:"Oprava místních komunikací 2027",z:"Město Vzorovice",typ:"VZMR · stavební práce",ph:1800000,days:9,s:72,
       v:"maybe",vt:"Jděte do toho, pokud stihnete harmonogram",price:"85–94 % PH",
       c:[["ok","Reference silniční práce 1× nad 1 mil. Kč","str. 6"],["warn","Krátká lhůta: 9 dní na nabídku","str. 2"],["warn","Smluvní pokuta 0,5 % denně z ceny","str. 11"],["ok","Hodnocení: 100 % cena","str. 9"]]},
      {t:"Zateplení obecního úřadu",z:"Krajský úřad",typ:"Nadlimitní · stavební práce",ph:27500000,days:34,s:38,
       v:"no",vt:"Nejděte do toho",price:"93–99 % PH",
       c:[["bad","Obrat min. 50 mil. Kč ročně, máte 18 mil.","str. 19"],["bad","3 reference nad 15 mil. Kč","str. 20"],["ok","Certifikát ISO 9001","str. 21"],["warn","Možnost podat společně s partnerem","str. 23"]]}
    ],
    "IT":[
      {t:"Nový web a správa obsahu města",z:"Město Vzorovice",typ:"VZMR · služby",ph:650000,days:14,s:91,
       v:"go",vt:"Jděte do toho",price:"70–88 % PH",
       c:[["ok","2 reference weby veřejné správy","str. 4"],["ok","Přístupnost dle WCAG 2.1 AA","str. 7"],["warn","Hosting v EU, doložit smlouvou","str. 8"],["ok","Hodnocení: cena 60 %, kvalita 40 %","str. 10"]]},
      {t:"Správa IT infrastruktury ZŠ na 3 roky",z:"Obec Příkladov",typ:"Podlimitní · služby",ph:1450000,days:18,s:76,
       v:"maybe",vt:"Jděte do toho, pokud doložíte certifikaci",price:"80–95 % PH",
       c:[["ok","Reference správa sítí 2× za 3 roky","str. 12"],["warn","Technik s certifikací Microsoft","str. 13"],["ok","Doba odezvy do 4 hodin","str. 18"],["ok","Hodnocení: 100 % cena","str. 20"]]},
      {t:"Krajský informační systém sociálních služeb",z:"Krajský úřad",typ:"Nadlimitní · dodávky a služby",ph:42000000,days:40,s:22,
       v:"no",vt:"Nejděte do toho",price:"n/a",
       c:[["bad","Obrat min. 80 mil. Kč","str. 25"],["bad","Realizační tým 12 osob","str. 27"],["warn","Subdodávka možná do 30 %","str. 30"]]}
    ],
    "Úklid":[
      {t:"Úklid budov městského úřadu",z:"Město Vzorovice",typ:"Podlimitní · služby",ph:2900000,days:16,s:84,
       v:"go",vt:"Jděte do toho",price:"88–96 % PH",
       c:[["ok","Reference úklid kanceláří nad 1 mil. Kč ročně","str. 9"],["ok","Ekologické čisticí prostředky","str. 12"],["warn","Prohlídka místa povinná 12. 1.","str. 3"],["ok","Hodnocení: 100 % cena","str. 15"]]},
      {t:"Úklid a dezinfekce nemocnice",z:"Krajská nemocnice",typ:"Nadlimitní · služby",ph:18000000,days:30,s:41,
       v:"no",vt:"Nejděte do toho, zatím",price:"92–98 % PH",
       c:[["bad","Reference ve zdravotnictví 2×","str. 21"],["warn","Nepřetržitý provoz 24/7","str. 22"],["ok","Pojištění 10 mil. Kč","str. 24"]]}
    ],
    "Zeleň":[
      {t:"Údržba veřejné zeleně 2027–2028",z:"Obec Příkladov",typ:"VZMR · služby",ph:1200000,days:12,s:89,
       v:"go",vt:"Jděte do toho",price:"82–93 % PH",
       c:[["ok","Reference údržba zeleně pro obec","str. 3"],["ok","Vlastní technika: sekačka, štěpkovač","str. 5"],["ok","Hodnocení: 100 % cena","str. 7"]]},
      {t:"Kácení a výsadba alejí",z:"Správa silnic kraje",typ:"Podlimitní · služby",ph:3400000,days:22,s:63,
       v:"maybe",vt:"Jděte do toho s certifikovaným arboristou",price:"86–95 % PH",
       c:[["warn","Certifikovaný arborista v týmu","str. 8"],["ok","Reference výsadby nad 1 mil. Kč","str. 9"],["warn","Práce jen v období vegetačního klidu","str. 14"]]}
    ]
  };
  var obory=Object.keys(DATA), cur="Stavby", sel=0;
  var ob=document.getElementById("obory");
  obory.forEach(function(o){var b=document.createElement("button");b.type="button";b.className="chip";b.textContent=o==="Stavby"?"Stavby":o==="IT"?"IT a software":o==="Úklid"?"Úklid a údržba":"Zeleň";
    b.setAttribute("aria-pressed",o===cur?"true":"false");b.addEventListener("click",function(){cur=o;sel=0;ob.querySelectorAll(".chip").forEach(function(x){x.setAttribute("aria-pressed","false")});b.setAttribute("aria-pressed","true");renderDemo();});ob.appendChild(b);});
  function sc(s){return s>=80?"s-good":s>=55?"s-mid":"s-bad"}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function renderDemo(){
    var kraj=document.getElementById("kraj").value;
    var arr=DATA[cur].slice().sort(function(a,b){return b.s-a.s});
    var L=document.getElementById("list"); L.innerHTML="";
    arr.forEach(function(z,i){
      var b=document.createElement("button");b.type="button";b.className="item";b.setAttribute("role","option");b.setAttribute("aria-selected",i===sel?"true":"false");
      b.innerHTML='<span class="t">'+esc(z.t)+'</span><span class="score '+sc(z.s)+'">'+z.s+' %</span><span class="m">'+esc(z.z)+' · '+esc(z.typ)+' · '+short(z.ph)+' · lhůta '+z.days+' dní</span>';
      b.addEventListener("click",function(){sel=i;renderDemo();});L.appendChild(b);
    });
    var z=arr[sel], vc=z.v==="go"?"v-go":z.v==="maybe"?"v-maybe":"v-no";
    var icon={ok:['✓','s-good'],warn:['!','s-mid'],bad:['✕','s-bad']};
    document.getElementById("detail").innerHTML=
      '<div class="muted mono" style="font-size:12px">'+esc(kraj.toUpperCase())+' KRAJ · '+esc(z.typ.toUpperCase())+'</div>'+
      '<h3>'+esc(z.t)+'</h3>'+
      '<div class="verdict '+vc+'"><span class="mono" style="font-size:20px">'+z.s+' %</span><span>'+esc(z.vt)+'</span></div>'+
      '<div class="kv"><span>Zadavatel</span><span>'+esc(z.z)+'</span><span>Předpokládaná hodnota</span><span>'+kc(z.ph)+'</span><span>Do konce lhůty</span><span>'+z.days+' dní</span><span>Podobné zakázky vyhrály za</span><span>'+esc(z.price)+'</span></div>'+
      '<ul class="checks">'+z.c.map(function(c){return '<li><span class="i '+icon[c[0]][1]+'">'+icon[c[0]][0]+'</span><span>'+esc(c[1])+' <span class="muted mono" style="font-size:12px">· '+esc(c[2])+'</span></span></li>'}).join("")+'</ul>';
  }
  document.getElementById("kraj").addEventListener("change",renderDemo);
  renderDemo();

  /* ---------- návratnost ---------- */
  var PROFI=2990*12;
  function roi(){
    var val=+rVal.value,bids=+rBids.value,h=+rHours.value,rate=+rRate.value,mg=+rMargin.value/100;
    oVal.textContent=short(val);oBids.textContent=bids;oHours.textContent=h+" h";oRate.textContent=kc(rate);oMargin.textContent=(mg*100)+" %";
    var time=bids*h*0.4*rate;
    var extraWins=3/6;
    var win=extraWins*val*mg;
    var net=time+win-PROFI;
    roiBig.textContent=(net>=0?"+":"−")+kc(Math.abs(net));
    roiTime.textContent=kc(time)+" ("+fmt(bids*h*0.4)+" h)";
    roiWin.textContent=kc(win);
    roiCost.textContent=kc(PROFI);
    roiX.textContent=((time+win)/PROFI).toLocaleString("cs-CZ",{maximumFractionDigits:1})+"×";
  }
  var rVal=document.getElementById("rVal"),rBids=document.getElementById("rBids"),rHours=document.getElementById("rHours"),rRate=document.getElementById("rRate"),rMargin=document.getElementById("rMargin");
  var oVal=document.getElementById("oVal"),oBids=document.getElementById("oBids"),oHours=document.getElementById("oHours"),oRate=document.getElementById("oRate"),oMargin=document.getElementById("oMargin");
  var roiBig=document.getElementById("roiBig"),roiTime=document.getElementById("roiTime"),roiWin=document.getElementById("roiWin"),roiCost=document.getElementById("roiCost"),roiX=document.getElementById("roiX");
  [rVal,rBids,rHours,rRate,rMargin].forEach(function(e){e.addEventListener("input",roi)});
  roi();

  /* ---------- ceník ---------- */
  var bm=document.getElementById("bm"),by=document.getElementById("by");
  function billing(yearly){
    bm.setAttribute("aria-pressed",yearly?"false":"true");by.setAttribute("aria-pressed",yearly?"true":"false");
    document.querySelectorAll(".plan .p").forEach(function(p){var m=+p.dataset.m;
      p.innerHTML=yearly?fmt(m*10)+' Kč<small> / rok</small>':fmt(m)+' Kč<small> / měsíc</small>';});
  }
  bm.addEventListener("click",function(){billing(false)});by.addEventListener("click",function(){billing(true)});
  document.querySelectorAll("[data-plan]").forEach(function(a){a.addEventListener("click",function(){document.getElementById("fPlan").value=a.dataset.plan;});});

  /* ---------- formulář ---------- */
  var form=document.getElementById("form");
  form.addEventListener("submit",function(e){
    e.preventDefault();
    var g=function(id){return document.getElementById(id).value.trim()};
    var err=document.getElementById("fErr");
    if(!g("fName")||!g("fFirm")){err.textContent="Vyplňte prosím jméno a firmu.";return}
    if(!/^\S+@\S+\.\S+$/.test(g("fMail"))){err.textContent="Zkontrolujte prosím e-mail, chybí v něm zavináč nebo doména.";return}
    if(g("fIco") && !/^\d{8}$/.test(g("fIco"))){err.textContent="IČO má 8 číslic.";return}
    if(!document.getElementById("fOk").checked){err.textContent="Bez souhlasu se zpracováním údajů vás do pilotu přihlásit nemůžeme.";return}
    err.textContent="";
    var body="Dobrý den,\n\nmám zájem o pilotní program Tendro.\n\nJméno: "+g("fName")+"\nFirma: "+g("fFirm")+(g("fIco")?"\nIČO: "+g("fIco"):"")+"\nE-mail: "+g("fMail")+"\nObor: "+g("fObor")+"\nBalíček: "+g("fPlan")+(g("fNote")?"\nCílíme na: "+g("fNote"):"")+"\n\nDěkuji.";
    document.getElementById("msg").textContent=body;
    document.getElementById("mailLink").href="mailto:"+encodeURIComponent(CONTACT)+"?subject="+encodeURIComponent("Pilot Tendro: "+g("fFirm"))+"&body="+encodeURIComponent(body);
    document.getElementById("formFields").hidden=true;document.getElementById("done").hidden=false;
  });
  document.getElementById("copyMsg").addEventListener("click",function(){
    var b=this;try{navigator.clipboard.writeText(document.getElementById("msg").textContent).then(function(){b.textContent="Zkopírováno"},function(){b.textContent="Označte text ručně"})}catch(e){b.textContent="Označte text ručně"}
  });
})();

/* ---------- režim a graf na pozadí ---------- */
(function(){
  var root=document.documentElement, btn=document.getElementById("themeBtn");
  function label(){var l=root.getAttribute("data-theme")==="light";btn.textContent=l?"☾ Tmavý režim":"☀ Světlý režim";btn.setAttribute("aria-pressed",l?"true":"false");}
  btn.addEventListener("click",function(){
    var l=root.getAttribute("data-theme")==="light";
    if(l)root.removeAttribute("data-theme");else root.setAttribute("data-theme","light");
    try{localStorage.setItem("tendro-theme",l?"dark":"light")}catch(e){}
    label();drawBg();
  });
  label();

  var c=document.getElementById("bgchart");
  /* pevná „náhodná“ řada, aby graf vypadal pokaždé stejně */
  var seed=7;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
  var candles=[],v=100;
  for(var i=0;i<90;i++){var o=v,ch=(rnd()-.45)*4,cl=o+ch,h=Math.max(o,cl)+rnd()*2,l=Math.min(o,cl)-rnd()*2;candles.push([o,h,l,cl]);v=cl;}
  function drawBg(){
    var dpr=window.devicePixelRatio||1,w=innerWidth,h=innerHeight;
    c.width=w*dpr;c.height=h*dpr;var g=c.getContext("2d");g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);
    var st=getComputedStyle(root),up=st.getPropertyValue("--up").trim(),down=st.getPropertyValue("--down").trim(),acc=st.getPropertyValue("--acc").trim(),rule=st.getPropertyValue("--ink").trim();
    var mn=Infinity,mx=-Infinity;candles.forEach(function(k){mn=Math.min(mn,k[2]);mx=Math.max(mx,k[1])});
    var top=h*.12,bot=h*.62;function Y(p){return bot-(p-mn)/(mx-mn)*(bot-top)}
    var step=w/candles.length,bw=Math.max(2,step*.55);
    g.globalAlpha=.35;g.strokeStyle=rule;g.lineWidth=1;
    for(var k=0;k<6;k++){var y=top+k*(bot-top)/5;g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();}
    g.globalAlpha=1;
    candles.forEach(function(k,i){var x=i*step+step/2,col=k[3]>=k[0]?up:down;g.strokeStyle=col;g.fillStyle=col;
      g.beginPath();g.moveTo(x,Y(k[1]));g.lineTo(x,Y(k[2]));g.stroke();
      var y1=Y(Math.max(k[0],k[3])),y2=Y(Math.min(k[0],k[3]));g.fillRect(x-bw/2,y1,bw,Math.max(1.5,y2-y1));});
    g.beginPath();candles.forEach(function(k,i){var x=i*step+step/2,y=Y(k[3]);i?g.lineTo(x,y):g.moveTo(x,y)});g.strokeStyle=acc;g.lineWidth=2;g.stroke();
  }
  drawBg();var t;window.addEventListener("resize",function(){clearTimeout(t);t=setTimeout(drawBg,150)});
})();
