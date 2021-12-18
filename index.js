var i=0;
if(localStorage.getItem("DM_SLD")===null) localStorage.setItem("DM_SLD", i); else i=localStorage.getItem("DM_SLD"); // slide
i=parseInt(i);
if(i<0) i=0;
console.log(i);
var lng=localStorage.getItem("DM_LNG")===null?0:localStorage.getItem("DM_LNG") // 0 kur 1 ara 2 eng 
lng=parseInt(lng);
var dir="rtl";
var cnt=cnta[lng];
var step=0;
var steps;
var qno=0;
var sid=0;  // selected id
var afn=""; // audio file name
var afp=0;  // audio file poistion
var ansa=[];//localStorage.getItem("DM_DATA")===null?[]:JSON.parse(localStorage.getItem("DM_DATA")); //cause treatment food age gender dm duration ymd highest blood sugar hba1c
const aud=document.getElementById("aud");
const aud2=document.getElementById("aud2");
const vid=document.getElementById("vid");
const ft=document.getElementById("ft");
const bp=document.getElementById("bpl");
var rt=document.querySelector(':root');

const BPC=`<div id=dimg><img id=title_img src=dm_test.jpg><svg id="vpb" viewBox="0 0 200 200" alt="Play video">
  <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#000"></circle>
  <polygon points="70, 55 70, 145 145, 100" fill="#000"></polygon></svg></div>`;
const BPL=`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M8 5v14l11-7z"></path></svg>`;
const BPS=`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
const FTB=`<button id=more onclick="get_more()">
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
</button>
<button onclick="gohome()">
 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path></svg>
</button>
<button id=bpl onclick="play_slides()">${BPL}</button>`;
// <button onclick="cs()">
//   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
// </button>
// <button onclick="prev_slide()">
//  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
// </button>
const FLA=[`<svg style="width: 36px; height: undefined" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">    <g fillrule="evenodd">      <path d="M0 0h900v600H0z" fill="#fff"></path>      <path d="M0 0h900v200H0z" fill="#ed2024"></path>      <path d="M0 400h900v200H0z" fill="#278e43"></path>    </g>    <path d="M450 150l11.24 76.264 33.222-69.563-11.738 76.19 52.249-56.68-33.674 69.344 66.634-38.761-52.616 56.338 75.098-17.399-66.885 38.327 76.89 5.51-75.21 16.909 71.85 27.929-76.852-6.011 60.425 47.867-71.666-28.397 43.632 63.55-60.113-48.259 22.962 73.589-43.217-63.834.25 77.087L450 376.264 427.518 450l.251-77.087-43.217 63.834 22.962-73.589-60.113 48.26 43.632-63.551-71.666 28.397 60.425-47.867-76.852 6.011 71.85-27.93-75.21-16.908 76.89-5.51-66.885-38.327 75.098 17.399-52.616-56.338 66.634 38.76-33.674-69.343 52.249 56.68-11.738-76.19 33.221 69.563z" fill="#febd11" fillrule="evenodd"></path></svg>`,`<svg style="width: 36px; height: undefined" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" fill:="" forcefill="" }}="">      <g transform="matrix(2.1739127,0,0,2.1818755,0,441.82309)">        <path d="M 0,-202.49693 H 414.00007 V 72.495845 H 0 Z" fill="#ce1126"></path>        <path d="M 0,-110.83272 H 414.00007 V 72.495777 H 0 Z" fill="#fff"></path>        <path d="M 0,-19.168521 H 414.00007 V 72.495728 H 0 Z"></path>        <g transform="matrix(1.0072994,0,0,1.0036232,-0.46414865,-202.7648)" fill="#007a3d">          <path d="m 246.026,120.178 c -0.558,-0.295 -1.186,-0.768 -1.395,-1.054 -0.314,-0.438 -0.132,-0.456 1.163,-0.104 2.318,0.629 3.814,0.383 5.298,-0.873 l 1.308,-1.103 1.54,0.784 c 0.848,0.428 1.748,0.725 2.008,0.656 0.667,-0.176 2.05,-1.95 2.005,-2.564 -0.054,-0.759 0.587,-0.568 0.896,0.264 0.615,1.631 -0.281,3.502 -1.865,3.918 -0.773,0.201 -1.488,0.127 -2.659,-0.281 -1.438,-0.502 -1.684,-0.494 -2.405,0.058 -1.618,1.239 -3.869,1.355 -5.894,0.299 z"></path>          <path d="m 251.76,114.936 c -0.563,-0.717 -1.239,-3.424 -1.021,-4.088 0.192,-0.576 0.391,-0.691 0.914,-0.527 0.918,0.287 1.13,0.92 0.993,3.064 -0.107,1.747 -0.366,2.206 -0.886,1.551 z"></path>          <path d="m 184.244,112.99 c -0.185,1.311 2.325,4.568 3.458,5.158 -0.77,0.345 -1.728,0.188 -2.434,0.576 -3.948,3.948 -18.367,18.006 -21,21.366 7.799,0.154 16.448,-0.106 23.761,-0.44 -0.007,-5.299 5.018,-5.572 8.381,-7.502 1.73,2.725 6.075,2.516 6.618,6.617 0,4.91 0.009,12.307 0.009,17.646 -22.059,0 -44.565,0 -66.625,0 -1.172,5.176 -5.844,9.125 -12.354,7.5 2.014,-2.104 5.405,-2.827 6.619,-5.734 1.024,-6.365 -2.046,-10.296 -4.031,-13.906 3.284,-1.195 3.782,-1.494 7.121,-3.737 -2.344,7.12 6.091,6.338 12.353,6.175 0.211,-2.417 0.089,-5.271 -1.766,-5.624 2.396,-0.87 2.794,-1.168 6.619,-4.412 v 9.593 c 14.886,0 30.942,-0.111 46.139,-0.111 0,-3.002 0.795,-7.824 -1.581,-7.824 -2.269,0 -0.107,6.173 -1.87,6.173 -1.763,0 -23.719,0 -35.63,0 0,-1.328 -0.034,-4.104 -0.034,-6.104 1.51,-1.51 1.331,-1.379 11.648,-11.697 1.028,-1.031 8.266,-7.568 14.599,-13.713 z"></path>          <path d="m 273.304,112.736 c 2.487,1.339 4.457,3.191 7.502,3.972 -0.354,1.261 -1.476,1.759 -1.77,3.087 v 26.91 c 3.402,0.75 4.118,-1.178 5.737,-2.205 0.442,4.307 3.186,8.529 3.088,11.91 -4.851,0 -9.706,0 -14.559,0 0.002,-14.555 0.002,-29.114 0.002,-43.674 z"></path>          <path d="m 253.892,127.148 c 0,0 5.296,-4.471 5.296,-4.643 v 23.484 l 3.814,-0.006 c 0,-8.947 -0.118,-18.022 -0.118,-26.338 1.548,-1.549 4.58,-3.791 5.338,-5.358 v 42.06 c -10.746,0 -30.793,0.012 -33.443,0.012 -0.493,-8.729 -0.577,-17.771 9.6,-15.826 0,-1.488 0,-2.369 0,-3.563 -0.311,-0.609 -0.868,0.147 -0.998,-0.645 1.615,-1.617 2.163,-2.029 6.538,-5.852 0,4.612 0.08,15.5 0.08,15.5 1.07,0 3.153,0.004 3.857,0.004 0.001,0.002 0.036,-18.227 0.036,-18.829 z m -12.553,18.603 c 0.716,1.075 3.154,1.056 3.04,-0.755 -0.411,-1.493 -3.616,-0.924 -3.04,0.755 z"></path>          <circle cx="144.527" cy="161.369" r="2.042"></circle>          <path d="m 207.549,112.779 c 2.488,1.339 4.457,3.191 7.502,3.971 -0.353,1.26 -1.476,1.76 -1.768,3.087 v 26.911 c 3.401,0.749 4.117,-1.18 5.736,-2.206 0.441,4.308 3.185,8.528 3.088,11.91 -4.852,0 -9.706,0 -14.56,0 0.002,-14.556 0.002,-29.114 0.002,-43.673 z"></path></g></g></svg>`, `<svg style="width: 36px; height: undefined" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5850 3900"><rect width="5850" height="3900" fill="#b22234"></rect><path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" stroke-width="300"></path><rect width="2964" height="2100" fill="#3c3b6e"></rect><g fill="#fff"><g id="s18"><g id="s9"><g id="s5"><g id="s4"><path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"></path><use xlink:href="#s" y="420"></use><use xlink:href="#s" y="840"></use><use xlink:href="#s" y="1260"></use></g><use xlink:href="#s" y="1680"></use></g><use xlink:href="#s4" x="247" y="210"></use></g><use xlink:href="#s9" x="494"></use></g><use xlink:href="#s18" x="988"></use><use xlink:href="#s9" x="1976"></use><use xlink:href="#s5" x="2470"></use></g></svg>`]; 
// var flg=FLA[lng];
window.onload=load_page(0);

function load_page(f){
  var qs=window.location.search;
  qs=qs.replaceAll("?","");
  var qsa=qs.split("=");
  if(typeof qsa[1]!=="undefined"){
    if(isNaN(qsa[1])) {get_content_overview(); return true;} else i=qsa[1];
    }
  var rv="";
  var sla=cnt.split("\n\n");
  rv=format_text(sla[i],i,f);
  // console.log(i, sla[i]);
  if(lng==2) document.body.style="direction:ltr;"; else document.body.style="direction:rtl;";
  // if(lng==2) document.body.style="font-family:noto;direction:ltr;"; else document.body.style="font-family:amiri;direction:rtl;";
  rt.style.setProperty('--bb', '0px');
  rt.style.setProperty('--ps', 'absolute');
  vid.innerHTML=rv;
  ft.innerHTML=FTB;
  document.getElementById("lng").innerHTML="";
  if(i==0){
    document.getElementById("vpb").addEventListener("click", play_slides);
    }
  if(f==0 && i==0){
    document.getElementById("lng").innerHTML=FLA[lng];
    }
  ft.style.bottom="-70px";
  steps=document.getElementsByClassName("h");
  }

document.addEventListener("keydown",event=>{
  // console.log(event.key, event.keyCode);
  // console.log(event.target.type);
  if(event.target.type!=undefined) return false;
  if(event.key==="ArrowRight") next_slide();
  if(event.ctrlKey && event.key==="ArrowRight") next_step();
  if(event.ctrlKey && event.key==="ArrowLeft") prev_step();
  if(event.key==="ArrowLeft") prev_slide();
  // if(event.key==="Escape") document.getElementById("ftb").style.bottom = "-50px";
  if(event.key===" ") play_slides();
  if(event.key==="p") play_slides();
  if(event.key==="h") gohome();
  
  if(event.key==="l") clf(-1);
  if(event.key==="k") clf(0);
  if(event.key==="a") clf(1);
  if(event.key==="e") clf(2);

  if(event.key==="o") get_content_overview();

  if(event.key==="1") aud.playbackRate=1.0;
  if(event.key==="2") aud.playbackRate=1.25;
  if(event.key==="3") aud.playbackRate=1.5;
  if(event.key==="4") aud.playbackRate=2.0;
  if(event.key==="5") aud.playbackRate=0.75;
  if(event.key==="9") aud.playbackRate=16.0;
  });

function clf(f){ // change lang
  if(f<0) lng++; else lng=f;
  if(lng>2) lng=0;
  localStorage.setItem("DM_LNG", lng);
  cnt=cnta[lng];
  load_page(0)
  }

function next_step(){
  if(step==steps.length) next_slide();
  steps[step].classList.add("c");
  if(step<steps.length) step++; 
  }

function play_slides(){
  if(aud.currentTime || !aud.paused) location.reload();
  load_page(1);
  var i0=i.toString().padStart(2,"0");
  afn=`a0040${i0}.mp3`;
  // var f=afn+".mp3";
  // if(i>13) afn="0.mp3"; 
  // aud.src=f;
  if(i==0) document.getElementById("vpb").style="visibility:hidden;";
  // aud.playbackRate=1.0;
  // if(aud.paused) aud.play();
  ps();
  hide_menu();
  }
  
function next_slide(){
  if(i<cnt.split("\n\n").length-1) {i++; localStorage.setItem("DM_SLD", i);}
  step=0;
  load_page(1);
  var i0=i.toString().padStart(2,"0");
  afn=`a0040${i0}.mp3`;
  // var f=afn+".mp3";
  // if(i>13) afn="0.mp3"; 
  // aud.src=f;
  // if(aud.paused) aud.play();
  ps();
  // cb();
  // console.log(i,step,steps.length,steps);
  }

function prev_slide(){
  if(i>0) {i--; localStorage.setItem("DM_SLD", i);}
  step=0;
  console.log(i,step,steps.length,steps);
  // if(i==0) load_page(0); else 
  load_page(0);
  if(i==0) document.getElementById("vpb").style="visibility:hidden;";
  location.reload();
  // if(aud.paused) aud.play();
  }

function goto(n,p) {
    console.log(n);
    i=n;
    step=0;
    load_page(1);
    if(p==0) location.reload();
    var i0=i.toString().padStart(2,"0");
    afn=`a0040${i0}.mp3`;
    // var f=afn+".mp3";
    // if(i>13) afn="0.mp3"; 
    // aud.src=f;
    // if(p==1 && aud.paused) aud.play();
    if(p==1) ps();
    }

function gohome(){
  aud.pause();
  aud.currentTime=0;
  i=0;
  localStorage.setItem("DM_SLD", i);
  step=0;
  localStorage.setItem("DM_DATA", "");
  location.reload();
  load_page(0);
  }

function vid_click(){
  // console.log(this.id);
  if(ft.style.bottom=="-70px") {
    ft.style.bottom="0px";
    setTimeout(()=>{hide_menu();}, 3000);
    } else hide_menu();
  if(aud.paused) document.getElementById("bpl").innerHTML=BPL; else document.getElementById("bpl").innerHTML=BPS;
  }

  function cb(){
  if(i==2){
    next_slide();
    if(aud.paused) aud.play();
    return true;
    }
  var inpa=Array.from(document.getElementsByTagName("input"));
  var slca=Array.from(document.getElementsByTagName("select"));
  var ic=[0,0,0,slca.length];
  for(v of inpa){
    // console.log(v);
    if(v.type=="radio") ic[0]++;
    if(v.type=="text"){ 
      ic[1]++;
      if(input_feedback(v.id)) ic[2]++; else break;
      }
    }
  // console.log(ic);
  if(ic[1]==ic[2]){
    save_answer();
    next_slide();
    if(aud.paused) aud.play();
    }
  }

function format_text(t,ii,f){
  var rv="";
  var fcpp=0;
  var i0=ii.toString().padStart(2,"0");
  console.log(ii,i0,f);
  t=t.replaceAll("ک","ك");
  rv+=`<s-l>`;
  const sna=t.split("\n"); // sentence array
  sna.forEach((s,j)=>{
    var j0=j.toString().padStart(2,"0");
    var fcl=s.substring(0,1)=="<"?1:0; // first char less than
    var fch=s.substring(0,2)=="# "?1:0; // first char hash
    var fcd=s.substring(0,3)=="## "?1:0; // first 2 hash
    var fce=s.substring(0,3)=="@@ "?1:0; // first 2 at sign: emphasis
    var fca=s.substring(0,2)=="* "?1:0; // first char asterisk
    var fcp=s.substring(0,3)=="() "?1:0; // first 2 char parenthesis
    var fcf=fch+fca+fcp+fcd+fcl+fce;
    s=s.replaceAll("## ","");
    s=s.replaceAll("# ","");
    s=s.replaceAll("@@ ","");
    s=s.replaceAll("* ","");
    s=s.replaceAll("()","");
    s=s.replaceAll("<img>",`<img src=p${i0}${j0}.jpg id=1${i0}${j0}>`);
    s=s.replaceAll("<img_ans1>",`<img src=ans1.jpg>`);
    s=s.replaceAll("___",`<input id=3${i0}${j0} type=text onclick="tbf(2${i0}${j0})">`);
    s=s.replaceAll("<ymd_combo>",`<select id=3${i0}${j0}><option>${dica[1][lng]}</option><option>${dica[2][lng]}</option><option>${dica[3][lng]}</option></select>`);
    var cls=f==1&&i>-1?" class=h":"";
    if(fch==1){
      if(ii==0) rv+=`<h1${cls}>${s}</h1>`; else rv+=`<h2${cls}>${s}</h2><div id=sb>`;
      } 
    if(fcd==1){
      if(ii==0) rv+=`<s-t${cls}>${s}</s-t>`;
      }
    if(fcl==1) rv+=s;
    if(fce==1) rv+=`<em${cls} id=1${i0}${j0}>${s}</em>`;
     // add ul
    if(j>0 && sna[j].substring(0,1)=="*"  && sna[j-1].substring(0,1)!="*") rv+="<ul>";
    if(j>0 && sna[j].substring(0,1)!="*"  && sna[j-1].substring(0,1)=="*") rv+="</ul>";
    if(fca==1) rv+=`<li${cls} id=1${i0}${j0}>${s}</li>`;
    if(fcp==1) rv+=`<label id=1${i0}${j0} ${cls} onclick="rbc(1${i0}${j0})"><input id=2${i0}${j0} type=radio name=q${i}>${s}</label><br>`;
    if(fcp==1) fcpp=1;
    if(fcf==0 && ii==0){
      rv+=`<a-u${cls}>${s}</a-u>`;
      }
    if(fcf==0 && ii>0){
      rv+=`<p${cls} id=1${i0}${j0}>${s}</p>`;
      }
    // console.log(i,j,fch,fca,fcp,s);
    });
  if(ii==0) {
    rv=rv.replaceAll("<BPC>",BPC);
    }
  if(ii==2){
    rv=rv.replaceAll("<svg>",get_overview(f));
    fcpp=1;
    }
  if(ii==8){
    rv=rv.replaceAll("<answers>",get_answers(f));
    }
  if(ii==9){
    rv=rv.replaceAll("<svg>",get_chart(f));
    }
  rv+="</div>";
  if(fcpp==1) rv+=`<button id=cb onclick="cb()">${dica[0][lng]}</button>`;
  rv+="</s-l>";
  return rv;
  }

function tbf(id){ // text box focus
  switch (id) {
    case 20408:
    case 20503:
      document.getElementById(id).checked=true;    
      break;
    default:
      break;
  }
  }

function array_sum(a,c){
  return a+c;
  } // < Start with 0

function en_to_ar(n) {
  return n.toString().replace(/\d/g, d=>'٠١٢٣٤٥٦٧٨٩'[d]);
  }  

function ar_to_en(n){
  return n.toString().replace(/[\u0660-\u0669]/g, d=>d.charCodeAt()-1632);
  }

function time_to_no(t){
  rv=1;
  switch (t) {
    case "ساڵ":
    case "سنوات":
    case "Years":
      rv=3;
      break;
    case "مانگ":
    case "اشهر":
    case "Month":
      rv=3;
      break;
    }
  return rv;
  }

function file_exists(url){
  var http=new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status!=404;
  }

function ps(){
  // var f=`${afn}.mp3`;
  if(i>13) afn="a000000.mp3";
  // aud.src=f;
  aud.src=afn;
  // if(aud.paused) aud.play();
  var playPromise = aud.play();
  // console.log(1, playPromise);
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      aud.src=afn;
      aud.play();
      // console.log(2, playPromise);
      // Automatic playback started!
      // Show playing UI.
    })
    .catch(error => {
      // console.log(3, playPromise);
      // f="0.mp3";
      // aud.src=f;
      // aud.play();
      // Auto-play was prevented
      // Show paused UI.
    });
  }

	}

function input_feedback(id){ // validate answers
  var tb=document.getElementById(id);
  var s=tb.value;
  var v=s.length==0?0:parseInt(ar_to_en(s));
  id=parseInt(id);
  // console.log(id, sid, s, v);
  switch (id){
    case 30408:
      if(sid==10408 && s.length<3){
        tb.placeholder="لێره‌ هۆکار بنووسه‌";
        pfs(id);
        return false;
        }
      break;
    case 30503:
      if(sid==10503 && s.length<3){
        tb.placeholder="لێره‌ چاره‌سه‌رى بنووسه‌";
        pfs(id);
        return false;
        }
      break;
    case 30702:
      var y=new Date().getFullYear();
      if(v==0 || v>y || v<y-100){
        tb.placeholder="ساڵى له‌دایك بوون";
        pfs(id);
        return false;
        break;
        }
      break;
    case 30707:
      var y=new Date().getFullYear();
      var age=y-parseInt(ar_to_en(document.getElementById(30702).value));
      // console.log(y,age,s,v);
      if(v==0 || v>age){
        tb.placeholder="ماوەی نەخۆشی";
        pfs(id);
        return false;
        }
      break;
    case 30709:
      if(s.length<3 || v<100 || v>1000){
        tb.placeholder="شه‌کره‌ى خوێن";
        pfs(id);
        return false;
        }
      break;
    case 30711:
      if(s.length<1 || v<4 || v>25){
        tb.placeholder="فه‌حسى سێ مانگى";
        pfs(id);
        return false;
        }
      break;
    }
    return true;
 }
  
 function save_answer(){
  if(localStorage.getItem("DM_DATA")===null||localStorage.getItem("DM_DATA")=="") ansa=[]; else ansa=JSON.parse(localStorage.getItem("DM_DATA"));
  var sidv=document.getElementById(sid).innerText.trim();
  // console.log(sid,sidv,ansa);
  ansa.push(`${sid}|${sidv}`);
  var inpa=document.getElementsByTagName("input");
  Array.from(inpa).forEach(v=>{
    if(v.type=="text") ansa.push(`${v.id}|${v.value}`);
    });
  inpa=document.getElementsByTagName("select");
  Array.from(inpa).forEach((v,i)=>{
    ansa.push(`${v.id}|${v.value}`);
    });
  localStorage.setItem("DM_DATA", JSON.stringify(ansa));
  }

function pfs(id){
  document.getElementById(id).focus();
  // var audio=new Audio("f"+id+".mp3");
  aud.pause();
  afp=aud.currentTime;
  aud2.src=`f${id}.mp3`;
  aud2.play();
  // audio.play();
	}

function rbc(id){ // radio button clicked
  sid=id;
  document.getElementById("cb").style="opacity:1;";
  // console.log(id,sidv);
  switch (sid) {
    case 10408:
      document.getElementById(30408).focus();
      break;
    case 10503:
      document.getElementById(30503).focus();
      break;
    default:
      break;
    }
  }

function get_content_array(t){
  var rv=[];
  t=t.replaceAll("ک","ك");
  t=t.replaceAll("* ","");
  const sna=t.split("\n"); // sentence array
  return sna;
  }

function get_content_overview(){
  var rv="";
  var cnt=cnta[lng];
  var sla=cnt.split("\n\n");
  // const sna=t.split("\n"); // sentence array
  sla.forEach((v,j)=> {
    var ft=format_text(v,j,0);
    // console.log(ft);
    rv+=ft;
    });
  // console.log(sna);
  if(lng==2) document.body.style="direction:ltr;"; else document.body.style="direction:rtl;";
  rt.style.setProperty('--bb', '1px');
  rt.style.setProperty('--ps', 'none');
  vid.innerHTML=rv;
  ft.innerHTML=FTB; 
  document.getElementById("lng").innerHTML=FLA[lng];
  }

const sta=[ // slide time array
  [0.2,3.2,4.7], // 0: title
  [0.2,1.2,5.1,11,12.7,14.4,16,17.8,20,25.4,27.5,31.7], // 1: dm complications
  [2.6,5,6.3,9.5,10.2,11.8,20.2,21,30,36.8], // 2: overview
  [0.6,3.3,6.5,10.4], // 3: 3 questions
  [0.2,1.4,4,6.6,14,15.8,17.7,19.1,26.8], // 4: q1 cause
  [0.2,1.5,37.2,41.1], // 5: q2 treatment
  [0.2,2,8.6,11.2,12.5,13.7,16.3,20.5,21.6], // 6: q3 food
  [3.1,6.4,6.8,8.1,8.3,8.5,9.5,9.7,12.1,12.3,16.5,16.7], // 7: information
  [0.7,4.3,5.3,6.3,'7.5:1','8.5:1','9.5:1'], // 8: answers
  [0.2,1.8,14.5,22.4,26.7,29,30.8,31.8,41.1,41.7,44.2,47.3], // 9: cause
  [0.2,2,3,4], // 10: psychology
  [0.2,2,3,4], // 11: genetics
  [0.2,2,3], // 12: treatment
  [0.2,1], // 13: food
  [0.2,1,2,3,4,5], // 14: 
  [0.2,1,2,3,4,5], // 15: 
  [0.2,1,2,3,4,5], // 16: 
  [0.2,1,2,3,4,5], // 17: 
  [0.2,1,2,3,4,5], // 18: 
  [0.2,1,2,3,4,5], // 19: 
  [0.2,1,2,3,4,5], // 20: 
  [0.2,1,2,3,4,5], // 20: 
  [0.2,1,2,3]  // 21: 
  ];
// console.log(sta);
function audio_update() {
  var ta=sta[i];
  var t=aud.currentTime;
  // document.getElementById("time").innerHTML=i+":"+step+":"+t.toFixed(1);
  var tav=ta[0]; // time array value
  var tat=0; // time array type: 0 step, 1 check answer
  if(typeof ta[0]==="string"){
    var tava=ta[0].split(":");
    tav=parseFloat(tava[0]); 
    tat=parseInt(tava[1]); 
    }
  if(t>tav){
    ta.shift();
    // console.log(t, tav, tat);
    if(tat==0) next_step();
    if(tat==1) check_answers();
    }
  }

function check_answers(){
  const qa=[10801,10802,10803];
  fana=[ansa[0],ansa[2],ansa[4]];
  // console.log(fana[qno],fana);
  var qu1=document.getElementById(qa[qno]).innerHTML;
  var a=get_correct_answers(); 
  qu1=qu1.replaceAll("<img>", `<img src=ans${a[qno]}.jpg>`);
  document.getElementById(qa[qno]).innerHTML=qu1;
  qno++;
  }

function get_answers(f){
  if(localStorage.getItem("DM_DATA")=="") ansa=["|","|","|","|","|","|","|","|","|","|2","|ساڵ"]; else ansa=JSON.parse(localStorage.getItem("DM_DATA"));
  // edit answer array
  if(ansa[1].length>6) ansa[0]+="|"+ansa[1].split("|")[1]; else ansa[0]+="|"+ansa[0].split("|")[1];
  if(ansa[3].length>6) ansa[2]+="|"+ansa[3].split("|")[1]; else ansa[2]+="|"+ansa[2].split("|")[1];
  ansa[4]+="|"+ansa[4].split("|")[1];
  ansa[6]+="|"+ar_to_en(ansa[6].split("|")[1]);
  ansa[7]+="|"+ar_to_en(ansa[7].split("|")[1]);
  ansa[8]+="|"+ar_to_en(ansa[8].split("|")[1]);
  ansa[9]+="|"+ar_to_en(ansa[9].split("|")[1]);
  ansa[10]+="|"+time_to_no(ansa[10].split("|")[1]);

  var ans="";
  var qus="";
  var rv="";
  var i0=i.toString().padStart(2,"0");
  var ja=[22,23,24];
  var aa=[9,12,13];
  var cntva=get_content_array(cnt);
  // console.log(cntva);
  var cls=f==1&&i>-1?" class=h":"";
  fana=[ansa[0],ansa[2],ansa[4]];
  fana.forEach((v,j)=>{
    ans=v.split("|")[2];
    qus=cntva[ja[j]];
    var k=j+1;
    var j0=k.toString().padStart(2,"0");
    if(lng<2) k=en_to_ar(k);
    var a=get_correct_answers();
    var img=f==1?"<img>":`<img src=ans${a[j]}.jpg>`;
    rv+=`<p id=1${i0}${j0}${cls} onclick="goto(${aa[j]},1)" class=p>${k}. ${qus}<br><a>${ans}</a> ${img}</p><br>`;
    });
  return rv;
  }

function get_correct_answers(){ // get array of 
  const aa=[ansa[0],ansa[2],ansa[4]];
  var rv=[0,0,0];
  var g=[0,0,0]; // grade
  var s=""; // string
  // q1
  a=aa[0].split("|");
  if(a[0]=="10408"){
    s="خۆرا";
    if(a[2].indexOf(s)!==-1) g[0]=1;
    s="خؤرا";
    if(a[2].indexOf(s)!==-1) g[0]=1;
    s="خواردن";
    if(a[2].indexOf(s)!==-1) g[0]=1;

    s="نا";
    if(a[2].indexOf(s)!==-1) g[1]=1;
    s="نه‌";
    if(a[2].indexOf(s)!==-1) g[1]=1;

    s="دروست";
    if(a[2].indexOf(s)!==-1) g[2]=1;
    s="شیاو";
    if(a[2].indexOf(s)!==-1) g[2]=1;
    s="گونجاو";
    if(a[2].indexOf(s)!==-1) g[2]=1;

    s="خراپ";
    if(a[2].indexOf(s)!==-1) g[1]=2;

    var as=g.reduce(array_sum,0);
    rv[0]=as==3?1:0;
    }
  // q2
  a=aa[1].split("|");
  if(a[0]=="10503"){
    if((a[2].indexOf("خۆرا")!==-1 || a[2].indexOf("خواردن")!==-1) && a[2].indexOf("نا")===-1 && a[2].indexOf("دروست")!==-1) rv[1]=1;
    s="خۆرا";
    if(a[2].indexOf(s)!==-1) g[0]=1;
    s="خؤرا";
    if(a[2].indexOf(s)!==-1) g[0]=1;
    s="خواردن";
    if(a[2].indexOf(s)!==-1) g[0]=1;

    s="نا";
    if(a[2].indexOf(s)===-1) g[1]=1;
    s="نه‌";
    if(a[2].indexOf(s)===-1) g[1]=1;

    s="دروست";
    if(a[2].indexOf(s)!==-1) g[2]=1;
    s="شیاو";
    if(a[2].indexOf(s)!==-1) g[2]=1;
    s="گونجاو";
    if(a[2].indexOf(s)!==-1) g[2]=1;
    s="باش";
    if(a[2].indexOf(s)!==-1) g[2]=1;
  
    var as=g.reduce(array_sum,0);
    rv[1]=as==3?1:0;
    // console.log(rv,g);
    }
  // q3
  a=aa[2].split("|");
  if(a[0]=="10607" || a[0]=="10605") rv[2]=1;
  return rv;
  }

function audio_ended() {
  if(afn.charAt(0)=="n"||afn.charAt(0)=="t") afn=afn.charAt(0);
  // console.log(afn);
  var l0=1;
  l0=l0<10?"0"+l0:l0;  
  // if(i==7) location.reload();
  switch (afn) {
    case "a004002.mp3":
      document.getElementById("cb").style="opacity:1;";
      break;
    case "a004004.mp3": // cause
    case "a004005.mp3": // treatment
    case "a004006.mp3": // food
    case "a004007.mp3": // info
      console.log("Continue");
      break;  
    case "a004008_0.mp3": 
    case "a004008_5.mp3": // answers
      console.log("Continue");
      const aa=[10801,10802,10803];
      aa.forEach(v=>{
        document.getElementById(v).style="cursor:pointer;";
        });
      break;  
      case "a004008.mp3":
      const a=get_correct_answers();
      const s=3-a.reduce(array_sum,0);
      afn=`a004008_${s}.mp3`;
      ps();
      // aud.src=`${afn}.mp3`;
      // aud.play();
      break;
    case "a004008_1.mp3":
    case "a004008_2.mp3":
    case "a004008_3.mp3":
      afn="a004008_4.mp3";
      ps();
      // aud.src=`${afn}.mp3`;
      // aud.play();
      break;
    case "a004008_4.mp3":
      var d=ansa[7].split("|")[2];
      if(d>20) d=20;
      d0=d.length==1?"0"+d:d;
      afn="n"+d0+l0+".mp3";
      ps();
      // aud.src=`${afn}.mp3`;
      // aud.play();
      break;
    case "n":
      var d=ansa[10].split("|")[2];
      d0=d.length==1?"0"+d:d;
      afn="t"+d0+l0+".mp3";
      ps();
      // aud.src=`${afn}.mp3`;
      // aud.play();
      break;
    case "t":
    afn="a004008_5.mp3";
      ps();
      // aud.src=`${afn}.mp3`;
      // aud.play();
      break;
    case "a000000.mp3":
      if(i>21){
        console.log("Continue");
        i=8;
        localStorage.setItem("DM_SLD", i);
        goto(i,0); // go to answers slide
        break;  
      }
    default:
      next_slide();
      ps();
      // aud.play();
      break;
    }
  afp=0;
  }

function audio_ended2() {
  console.log(afp);
  // if(afp<19) aud.play();
  }

function get_chart(f) {
  const w=window.innerWidth>600?360:window.innerWidth-20;
  const bh=40;
  const hs=10;
  const h=(bh+hs)*6+hs;
  const ta=lng==2?"end":"start";
  var cls=f==1&&i>-1?" class=h":"";
  var rv=`<svg xmlns="http://www.w3.org/2000/svg"${cls} height=${h+50} width=${w}>`;
  const xo=80;
  const hl=34.5;
  // rv+=`<line x1=0 y1=${h-3} x2=${w} y2=${h-3} />`;
  for(j=0;j<8;j++){
    rv+=`<line x1=${xo+(j*hl)} y1=0 x2=${xo+(j*hl)} y2=${h} />`;
    rv+=`<text x=${xo+(j*hl)} y=${h+2} class=n>${j*10}</text>`;
    }
  const a=grpa[lng];
  var y=hs;
  a.forEach((v,j)=>{
    var va=v.split("|");
    // console.log(v,j,va);
    var x=va[1]*0.5;
    rv+=`<rect x=${xo} y=${y} width=${x} height=${bh} />`;
    rv+=`<text text-anchor=${ta} x=${xo-2} y=${y+24}${cls}>${va[0]}</text>`;
    y+=bh+hs;
    });
  cls=f==1&&i>-1?" class='h r'":" class=r";
  rv+=`<line x1=${w} y1=0 x2=0 y2=${h}${cls} />`;
  rv+=`<line x1=0 y1=0 x2=${w} y2=${h}${cls} />`;
  rv+="</svg>";
  return rv;
  }

function get_overview(f) {
  const w=window.innerWidth>600?360:window.innerWidth-20;
  const bw=w*0.45; // box width
  const bh=50; // box height
  const h=320;
  var cls=f==1&&i>-1?" class=h":"";
  var rv=`<svg xmlns="http://www.w3.org/2000/svg" id=ov${cls} height=${h+50} width=${w}>`;
  const xo=80; // x offset
  const a=[
  [w/2-bw/2,1,''],
  [bw+w*0.1-1,100,`M${w/2} ${bh} L${w/2} ${bh+bh/2} L${bw+w*0.1+bw/2} ${bh+bh/2} L${bw+w*0.1+bw/2} ${bh*2}`],
  [bw+w*0.1-1,200,`M${bw+w*0.1+bw/2} ${bh*3} L${bw+w*0.1+bw/2} ${bh*4}`],
  [1,100,`M${w/2} ${bh} L${w/2} ${bh+bh/2} L${bw/2} ${bh+bh/2} L${bw/2} ${bh*2}`],
  [1,200,`M${bw/2} ${bh*3} L${bw/2} ${bh*4}`],
  [1,300,`M${bw/2} ${bh*5} L${bw/2} ${bh*6}`]
  ];
  a.forEach((v,j)=>{
    // console.log(j,v);
    rv+=`<g${cls}>`;
    if(v[2].length) rv+=`<path d="${v[2]}" />`;
    rv+=`<rect x=${v[0]} y=${v[1]} width=${bw} height=${bh} />`;
    rv+=`<text x=${v[0]+bw/2} y=${v[1]+bh/2} dominant-baseline=middle text-anchor=middle>${dica[j+4][lng]}</text>`;
    var ho=lng==2?4:18;
    if(j==1) rv+=`<image${cls} href=ans1.jpg height=26 x=${v[0]+18} y=${v[1]+12} />`;
    if(j==3) rv+=`<image${cls} href=ans0.jpg height=20 x=${v[0]+ho} y=${v[1]+15} />`;
    rv+=`</g>`;
    });
  rv+="</svg>";
  return rv;
  }

function get_more(){
  aud.playbackRate=1.25;
  console.log("more");
  }

function hide_menu(){
  ft.style.bottom="-70px";
  }

class Slide extends HTMLElement{
  constructor(){super();}
  }
class SubTitle extends HTMLElement{
  constructor(){super();}
  }
class SlideAuthor extends HTMLElement{
  constructor(){super();}
  }
class SlideBody extends HTMLElement{
  constructor(){super();}
  }
window.customElements.define("s-l", Slide);
window.customElements.define("s-t", SubTitle);
window.customElements.define("a-u", SlideAuthor);
window.customElements.define("s-b", SlideBody);