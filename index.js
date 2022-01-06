var i=0;
if(localStorage.getItem("DM_SLD")===null) localStorage.setItem("DM_SLD", i); else i=localStorage.getItem("DM_SLD"); // slide
var ansa=["||","||","||","||","||","||","|","|","|","|","|","|"];
if(localStorage.getItem("DM_DATA")===null) localStorage.setItem("DM_DATA", JSON.stringify(ansa)); else ansa=JSON.parse(localStorage.getItem("DM_DATA")); // data
i=parseInt(i);
if(i<0) i=0;
var lng=localStorage.getItem("DM_LNG")===null?0:localStorage.getItem("DM_LNG") // 0 kur 1 ara 2 eng 
lng=parseInt(lng);
var dir="rtl";
// var cnt=cnta[lng];
var step=0;
var steps;
var subs=0; // subslide eg select worst then best food or more than once cause...
var qno=0;
var sid=0;  // selected id
var afn=""; // audio file name
var afp=0;  // audio file poistion
var qsa=[0,0];
var stai=[]; // sta[i]
// var ansa=[];//localStorage.getItem("DM_DATA")===null?[]:JSON.parse(localStorage.getItem("DM_DATA")); //cause treatment food age gender dm duration ymd highest blood sugar hba1c
const aud=document.getElementById("aud");
const aud2=document.getElementById("aud2");
const vid=document.getElementById("vid");
const ftr=document.getElementById("ftr");
const stt=document.getElementById("txt");
const bp=document.getElementById("bpl");
var rt=document.querySelector(':root');

const BPC=`<div id=dimg><img id=title_img src=dm_test.jpg><svg id="vpb" viewBox="0 0 200 200" alt="Play video">
  <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#000"></circle>
  <polygon points="70, 55 70, 145 145, 100" fill="#000"></polygon></svg></div>`;
const BPL=`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M8 5v14l11-7z"></path></svg>`;
const BPR=`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 5v14l-11-7z"></path></svg>`;
const BPS=`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
const CK1=`<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 0 24 24" width="34px" fill="#090"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`;
const CK0=`<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 20 20" width="28px" fill="#f00"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>`;
const FTB=`<div id=ftb><button id=more onclick="get_more()">
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
</button>
<button onclick="get_mind_map()">
 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path></svg>
</button>
<button id=bpl onclick="play_slides()">${BPL}</button></div>`;
// <button onclick="cs()">
//   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
// </button>
// <button onclick="prev_slide()">
//  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
// </button>
const FLA=[`<svg onclick="clf(-1)" style="width: 36px; height: undefined" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">    <g fillrule="evenodd">      <path d="M0 0h900v600H0z" fill="#fff"></path>      <path d="M0 0h900v200H0z" fill="#ed2024"></path>      <path d="M0 400h900v200H0z" fill="#278e43"></path>    </g>    <path d="M450 150l11.24 76.264 33.222-69.563-11.738 76.19 52.249-56.68-33.674 69.344 66.634-38.761-52.616 56.338 75.098-17.399-66.885 38.327 76.89 5.51-75.21 16.909 71.85 27.929-76.852-6.011 60.425 47.867-71.666-28.397 43.632 63.55-60.113-48.259 22.962 73.589-43.217-63.834.25 77.087L450 376.264 427.518 450l.251-77.087-43.217 63.834 22.962-73.589-60.113 48.26 43.632-63.551-71.666 28.397 60.425-47.867-76.852 6.011 71.85-27.93-75.21-16.908 76.89-5.51-66.885-38.327 75.098 17.399-52.616-56.338 66.634 38.76-33.674-69.343 52.249 56.68-11.738-76.19 33.221 69.563z" fill="#febd11" fillrule="evenodd"></path></svg>`,`<svg onclick="clf(-1)" style="width: 36px; height: undefined" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" fill:="" forcefill="" }}="">      <g transform="matrix(2.1739127,0,0,2.1818755,0,441.82309)"> <path d="M 0,-202.49693 H 414.00007 V 72.495845 H 0 Z" fill="#ce1126"></path> <path d="M 0,-110.83272 H 414.00007 V 72.495777 H 0 Z" fill="#fff"></path>        <path d="M 0,-19.168521 H 414.00007 V 72.495728 H 0 Z"></path>        <g transform="matrix(1.0072994,0,0,1.0036232,-0.46414865,-202.7648)" fill="#007a3d"><path d="m 246.026,120.178 c -0.558,-0.295 -1.186,-0.768 -1.395,-1.054 -0.314,-0.438 -0.132,-0.456 1.163,-0.104 2.318,0.629 3.814,0.383 5.298,-0.873 l 1.308,-1.103 1.54,0.784 c 0.848,0.428 1.748,0.725 2.008,0.656 0.667,-0.176 2.05,-1.95 2.005,-2.564 -0.054,-0.759 0.587,-0.568 0.896,0.264 0.615,1.631 -0.281,3.502 -1.865,3.918 -0.773,0.201 -1.488,0.127 -2.659,-0.281 -1.438,-0.502 -1.684,-0.494 -2.405,0.058 -1.618,1.239 -3.869,1.355 -5.894,0.299 z"></path>          <path d="m 251.76,114.936 c -0.563,-0.717 -1.239,-3.424 -1.021,-4.088 0.192,-0.576 0.391,-0.691 0.914,-0.527 0.918,0.287 1.13,0.92 0.993,3.064 -0.107,1.747 -0.366,2.206 -0.886,1.551 z"></path>          <path d="m 184.244,112.99 c -0.185,1.311 2.325,4.568 3.458,5.158 -0.77,0.345 -1.728,0.188 -2.434,0.576 -3.948,3.948 -18.367,18.006 -21,21.366 7.799,0.154 16.448,-0.106 23.761,-0.44 -0.007,-5.299 5.018,-5.572 8.381,-7.502 1.73,2.725 6.075,2.516 6.618,6.617 0,4.91 0.009,12.307 0.009,17.646 -22.059,0 -44.565,0 -66.625,0 -1.172,5.176 -5.844,9.125 -12.354,7.5 2.014,-2.104 5.405,-2.827 6.619,-5.734 1.024,-6.365 -2.046,-10.296 -4.031,-13.906 3.284,-1.195 3.782,-1.494 7.121,-3.737 -2.344,7.12 6.091,6.338 12.353,6.175 0.211,-2.417 0.089,-5.271 -1.766,-5.624 2.396,-0.87 2.794,-1.168 6.619,-4.412 v 9.593 c 14.886,0 30.942,-0.111 46.139,-0.111 0,-3.002 0.795,-7.824 -1.581,-7.824 -2.269,0 -0.107,6.173 -1.87,6.173 -1.763,0 -23.719,0 -35.63,0 0,-1.328 -0.034,-4.104 -0.034,-6.104 1.51,-1.51 1.331,-1.379 11.648,-11.697 1.028,-1.031 8.266,-7.568 14.599,-13.713 z"></path>          <path d="m 273.304,112.736 c 2.487,1.339 4.457,3.191 7.502,3.972 -0.354,1.261 -1.476,1.759 -1.77,3.087 v 26.91 c 3.402,0.75 4.118,-1.178 5.737,-2.205 0.442,4.307 3.186,8.529 3.088,11.91 -4.851,0 -9.706,0 -14.559,0 0.002,-14.555 0.002,-29.114 0.002,-43.674 z"></path>          <path d="m 253.892,127.148 c 0,0 5.296,-4.471 5.296,-4.643 v 23.484 l 3.814,-0.006 c 0,-8.947 -0.118,-18.022 -0.118,-26.338 1.548,-1.549 4.58,-3.791 5.338,-5.358 v 42.06 c -10.746,0 -30.793,0.012 -33.443,0.012 -0.493,-8.729 -0.577,-17.771 9.6,-15.826 0,-1.488 0,-2.369 0,-3.563 -0.311,-0.609 -0.868,0.147 -0.998,-0.645 1.615,-1.617 2.163,-2.029 6.538,-5.852 0,4.612 0.08,15.5 0.08,15.5 1.07,0 3.153,0.004 3.857,0.004 0.001,0.002 0.036,-18.227 0.036,-18.829 z m -12.553,18.603 c 0.716,1.075 3.154,1.056 3.04,-0.755 -0.411,-1.493 -3.616,-0.924 -3.04,0.755 z"></path>          <circle cx="144.527" cy="161.369" r="2.042"></circle>          <path d="m 207.549,112.779 c 2.488,1.339 4.457,3.191 7.502,3.971 -0.353,1.26 -1.476,1.76 -1.768,3.087 v 26.911 c 3.401,0.749 4.117,-1.18 5.736,-2.206 0.441,4.308 3.185,8.528 3.088,11.91 -4.852,0 -9.706,0 -14.56,0 0.002,-14.556 0.002,-29.114 0.002,-43.673 z"></path></g></g></svg>`, `<svg onclick="clf(-1)" style="width: 36px; height: undefined" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5850 3900"><rect width="5850" height="3900" fill="#b22234"></rect><path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" stroke-width="300"></path><rect width="2964" height="2100" fill="#3c3b6e"></rect><g fill="#fff"><g id="s18"><g id="s9"><g id="s5"><g id="s4"><path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"></path><use xlink:href="#s" y="420"></use><use xlink:href="#s" y="840"></use><use xlink:href="#s" y="1260"></use></g><use xlink:href="#s" y="1680"></use></g><use xlink:href="#s4" x="247" y="210"></use></g><use xlink:href="#s9" x="494"></use></g><use xlink:href="#s18" x="988"></use><use xlink:href="#s9" x="1976"></use><use xlink:href="#s5" x="2470"></use></g></svg>`];
// var flg=FLA[lng];
window.onload=load_page(0);

function load_page(f){
  var qs=window.location.search;
  qs=qs.replaceAll("?","");
  qsa=qs.split("=");
  if(typeof qsa[1]!=="undefined"){
    if(isNaN(qsa[1])) {
      if(qsa[1]=="o") get_content_overview(0); 
      if(qsa[1]=="c") get_content_overview(1);
      if(qsa[1]=="m") get_mind_map(); 
      if(qsa[1]!="t") return true;
      } else i=qsa[1];
    }
  var rv="";
  var i0=i.toString().padStart(2,"0");
  afn=`a0040${i0}.mp3`;
  var sla=cnta[lng].split("\n\n");
  if(subs==1){
    sla=cnta1[lng].split("\n\n");
    sta[4]=[0,2.6,4,4.2,4.4,4.6,6.6]
    sta[6]=[0,2.8,4,4.1,4.2,4.3,4.4,4.5,4.6]
    afn=`a0040${i0}_${subs}.mp3`;
    }
  if(subs==2){
    sla=cnta2[lng].split("\n\n");
    sta[4]=[0,0.2,0.5,0.8,1.1,1.4]
    afn=`a0040${i0}_${subs}.mp3`;
    }
  // console.log(i,subs,cnta1[lng].split("\n\n")[i]);
  console.log(i,subs);
  rv=format_text(sla[i],i,f,0,0);
  if(lng==2){
    // document.body.style="direction:ltr;";
    rt.style.setProperty('--bd', 'ltr');
    var a=document.getElementsByClassName("lt");
    Array.from(a).forEach(v=>{
      v.classList.remove("lt");
      v.classList.add("rt");
      });
      // rt.style.setProperty('--lt', window.innerWidth-window.innerWidth*0.5-60+'px');
    // rt.style.removeProperty('--lt');
    
    }else{
    rt.style.setProperty('--bd', 'rtl');
    var a=document.getElementsByClassName("rt");
    Array.from(a).forEach(v=>{
      // console.log(v);
      v.classList.remove("rt");
      v.classList.add("lt");
      });
    // rt.style.setProperty('--lt', '40px');
    }
    // else document.body.style="direction:rtl;";
  // if(lng==2) document.body.style="font-family:noto;direction:ltr;"; else document.body.style="font-family:amiri;direction:rtl;";
  rt.style.setProperty('--bb', '0px');
  rt.style.setProperty('--ps', 'absolute');
  if(f==0) rt.style.setProperty('--ps', 'inline-block');
  vid.innerHTML=rv;
  ftr.innerHTML="<p-b><div id=pbt></div><div id=pbw><a id=pbr></a></div></p-b>"+FTB;
  document.getElementById("lng").innerHTML="";
  if(i==0){
    document.getElementById("vpb").addEventListener("click", play_slides);
    }
  stt.addEventListener("dblclick", edit_subtitles);
  if(f==0 && i==0){
    document.getElementById("lng").innerHTML=FLA[lng];
    }
  ftr.style.bottom="-80px";
  if(i>0 && f==0) show_related_link();
  steps=document.getElementsByClassName("h");
  if(qsa[1]=="t") get_subtitles();
  // let taa=sta[i];
  // console.log(i,taa,stai);
  stai=Array.from(sta[i]);
  // console.log(i,taa,stai);
  // console.log(id,ansa);
  let id=0;
  switch (i) {
    case 4:
      if(subs==1){
        id=ansa[0].split("|")[0];
        // console.log(ansa);
        document.getElementById(id).className="d";
        id="2"+id.substr(1);
        document.getElementById(id).disabled=true;
        }
      if(subs==2){
        id=ansa[0].split("|")[0];
        document.getElementById(id).className="d";
        id="2"+id.substr(1);
        document.getElementById(id).disabled=true;
        id=ansa[1].split("|")[0];
        document.getElementById(id).className="d";
        id="2"+id.substr(1);
        document.getElementById(id).disabled=true;
        }
      break;
    case 6:
      if(subs==1){
        id=ansa[4].split("|")[0];
        document.getElementById(id).className="d";
        id="2"+id.substr(1);
        document.getElementById(id).disabled=true;
        }
      break;
    default:
      break;
  }
  }

document.addEventListener("keydown",event=>{
  // console.log(event.key, event.keyCode);
  // console.log(event.target.id, event.target.type);
  if(event.target.id!="") return false;
  if(event.target.type!=undefined) return false;
  if(event.key==="ArrowRight") next_slide(0);
  if(event.ctrlKey && event.key==="ArrowRight") next_step();
  if(event.ctrlKey && event.key==="ArrowLeft") prev_step();
  if(event.key==="ArrowLeft") prev_slide(0);
  if(event.key==="Escape") hide_menu();

  if(event.key===" ") play_slides();
  if(event.key==="p") play_slides();
  if(event.key==="h") gohome();
  
  if(event.key==="l") clf(-1);
  if(event.key==="k") clf(0);
  if(event.key==="a") clf(1);
  if(event.key==="e") clf(2);

  if(event.key==="o") get_content_overview(0);
  if(event.key==="c") get_content_overview(1);
  if(event.key==="m") get_mind_map();
  if(event.key==="t") get_subtitles();
  if(event.key==="j") get_slide_contents();
  if(event.key==="r") toggle_related();

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
  // cnt=cnta[lng];
  load_page(0)
  }

function next_step(ta){
  if(isNaN(ta[2])) ta[2]=step-1;
  // console.log(ta,step,steps);
  if(ta[1]==2) {
    steps[ta[2]].classList.remove("c");
    steps[ta[2]].classList.add("n");
    } else{
      if(step==steps.length) next_slide(1);
      steps[step].classList.add("c");
      if(step<steps.length) step++; 
    }
  }

function play_slides(){
  if(aud.currentTime || !aud.paused) location.reload();
  load_page(1);
  var i0=i.toString().padStart(2,"0");
  afn=`a0040${i0}.mp3`;
  if(i==0) document.getElementById("vpb").style="visibility:hidden;";
  ps(1,0);
  }
  
function next_slide(f){
  // console.log(i,subs,ansa);
  if(i<cnta[0].split("\n\n").length-1) {
    switch (i) {
      case 4:
        if(subs==2 && i==4) {subs=0;i++;}
        if(subs==1 && i==4) subs++;
        if(subs==0 && i==4) {
          if(ansa[0].split("|")[0]=="10407") {i++;break;}
          if(ansa[0].split("|")[0]=="10408") {i++;break;}
          subs++;
          }
        break;
      case 6:
        if(subs==1 && i==6) {subs=0;i++;}
        if(subs==0 && i==6) subs++;
        break;
      default:
        i++;
        break;
      }
    }
  localStorage.setItem("DM_SLD", i);
  step=0;
  load_page(f);
  if(qsa[1]=="t") get_subtitles(); else stt.style.bottom="-360px";
  // var i0=i.toString().padStart(2,"0");
  // afn=`a0040${i0}.mp3`;
  ps(f,0);
  }

function prev_slide(f){
  if(i>0) {subs=0; i--; localStorage.setItem("DM_SLD", i);}
  step=0;
  load_page(f);
  stt.style.bottom="-360px";
  if(i==0) document.getElementById("vpb").style="visibility:hidden;";
  ps(f,0);
  }

function goto(n,p) {
    // console.log(n);
    i=n;
    if(p==0) localStorage.setItem("DM_SLD", i);
    step=0;
    load_page(1);
    if(p==0) location.reload();
    var i0=i.toString().padStart(2,"0");
    afn=`a0040${i0}.mp3`;
    if(p==1) ps(1,0);
    }

function gohome(){
  aud.pause();
  aud.currentTime=0;
  i=0;
  localStorage.setItem("DM_SLD", i);
  step=0;
  // localStorage.setItem("DM_DATA", "");
  location.reload();
  load_page(0);
  }

function vid_click(){
  // console.log(this.id);
  if(ftr.style.bottom=="-80px") {
    ftr.style.bottom="0px";
    stt.style.bottom="-360px";
    setTimeout(()=>{hide_menu();}, 3000);
    } else hide_menu();
  if(aud.paused) document.getElementById("bpl").innerHTML=BPL; else document.getElementById("bpl").innerHTML=BPS;
  }

  function cb(){
  var inpa=Array.from(document.getElementsByTagName("input"));
  if(inpa.length==0){
    next_slide(1);
    if(aud.paused) aud.play();
    return true;
    }
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
    next_slide(1);
    if(aud.paused) aud.play();
    }
  }

function format_text(t,ii,f,ll,m){ // text, slide no, flag: play or show text, link, mode: slide or mindmap
  var rv="";
  var hd="";
  var rl=lng==2?"rt":"lt";
  var fcpp=0;
  var i0=ii.toString().padStart(2,"0");
  // console.log(ii,i0,f);
  t=t.split("<notes>")[0].trim();
  t=t.replaceAll("ک","ك");
  var lnk=ll==1?` onclick="goto(${ii},0)"`:"";
  if(m==0) rv+=`<s-l>`;
  const sna=t.split("\n"); // sentence array
  sna.forEach((s,j)=>{
    var j0=j.toString().padStart(2,"0");
    var fcl=s.substring(0,1)=="<"?1:0; // first char less than
    var fch=s.substring(0,2)=="# "?1:0; // first char hash
    var fcd=s.substring(0,3)=="## "?1:0; // first 2 hash
    var fce=s.substring(0,3)=="@@ "?1:0; // first 2 at sign: emphasis
    var fca=s.substring(0,2)=="* "?1:0; // first char asterisk
    var fcs=s.substring(0,3)=="** "?1:0; // first char asterisk
    var fcp=s.substring(0,3)=="() "?1:0; // first 2 char parenthesis
    var fcf=fch+fca+fcp+fcd+fcl+fce+fcs;
    s=s.replaceAll("## ","");
    s=s.replaceAll("# ","");
    s=s.replaceAll("@@ ","");
    s=s.replaceAll("** ","");
    s=s.replaceAll("* ","");
    s=s.replaceAll("()","");
    var cls=f==1&&i>-1?" h":"";
    s=s.replaceAll("<img_ans0>",CK0);
    s=s.replaceAll("<img_ans1>",CK1);
    let img="";
    if(s.includes("<img")){
      img=get_file_name(j);
      // console.log(s,img);
      }
    s=s.replaceAll("<img_40>",`<img class="w40 ${rl} ${cls}" src=${img} id=1${i0}${j0}>`);
    s=s.replaceAll("<img_50>",`<img class="w50 ${rl} ${cls}" src=${img} id=1${i0}${j0}>`);
    s=s.replaceAll("<img_60>",`<img class="w60 ${rl} ${cls}" src=${img} id=1${i0}${j0}>`);
    s=s.replaceAll("<img>",`<img src=${img} id=1${i0}${j0}>`);
    s=s.replaceAll("___",`<input id=3${i0}${j0} type=text onclick="tbf(2${i0}${j0})">`);
    s=s.replaceAll("<ymd_combo>",`<select id=4${i0}${j0}><option>${dica[1][lng]}</option><option>${dica[2][lng]}</option><option>${dica[3][lng]}</option></select>`);
    cls=f==1&&i>-1?" class=h":"";
    s=s.replaceAll(" @",` <s${cls}>`);
    s=s.replaceAll("@ ",`</s>`);
    // s=s.replaceAll("_"," ");
    if(fch==1){
      if(ii==0) hd=`<h1${cls}${lnk}>${s}</h1>`; else hd=`<h2${cls}${lnk}>${s}</h2><div id=sb>`;
      var bpm=`<u>&#9679;</u>`;lng==2?BPL:BPR;
      if(m>0) {
        var sp="<i>&nbsp;</i>".repeat(m-1);
        hd=`<m-m id=${i0}${j0}>${sp}${bpm} <a ${lnk}>${s}</a></m-m>`;
        }
      rv+=hd;
      } 
    if(fcd==1){
      if(ii==0) rv+=`<s-t${cls}>${s}</s-t>`;
      }
    if(fcl==1) rv+=s;
    if(fce==1) rv+=`<em${cls} id=1${i0}${j0}>${s}</em>`;
     // add ul
    // if(j>0 && sna[j].substring(0,1)=="*"  && sna[j-1].substring(0,1)!="*") rv+="<ul>";
    // if(j>0 && sna[j].substring(0,1)!="*"  && sna[j-1].substring(0,1)=="*") rv+="</ul>";
    if(fca==1) rv+=`<ul><li${cls} id=1${i0}${j0}>${s}</li></ul>`;
    if(fcs==1) rv+=`<ul><ul><li${cls} id=1${i0}${j0}>${s}</li></ul></ul>`;
    if(fcp==1) rv+=`<label id=1${i0}${j0} ${cls} onclick="rbc(1${i0}${j0})"><input id=2${i0}${j0} type=radio name=q${i}>${s}</label><br>`;
    if(fcp==1) fcpp=1;
    if(fcf==0 && ii==0){
      rv+=`<a-u${cls}>${s}</a-u>`;
      }
    if(fcf==0 && ii>0){
      rv+=`<p${cls} id=1${i0}${j0}>${s}</p>`;
      }
    // console.log(i,j,fch,fca,fcp,s);
    if(ii==9||ii==11||ii==12||ii==13){
      rv=rv.replaceAll("<svg>",get_chart(f,ii,j));
      }
    });
  if(ii==0) {
    rv=rv.replaceAll("<BPC>",BPC);
    }
  if(ii==2){
    rv=rv.replaceAll("<svg>",get_overview(f));
    // fcpp=1;
    }
  if(ii==8){
    rv=rv.replaceAll("<answers>",get_answers(f));
    }
  if(m==0) rv+="</div>";
  if(stsa.includes(i)){
    if(ll==0) rv+=`<button id=cb onclick="cb()" disabled>${dica[0][lng]}</button>`;      
    }
  if(m==0) rv+=`</s-l>`;
  return rv;
  }

function get_subtitles(){
  var rv=cnta[lng].split("\n\n")[i];
  if(subs==1){
    rv=cnta1[lng].split("\n\n")[i];
  }
  if(rv.indexOf("<notes>")==-1) return false;
  rv=rv.split("<notes>")[1];
  rv=rv.replaceAll("ک","ك");
  rv=rv.replaceAll("\n","<p>");
  stt.innerHTML=rv;
  stt.style.bottom="0px";
  }

function get_related(){
  var rv=cnta[lng].split("\n\n")[i];
  if(rv.split("<notes>").length<3) return false;
  rv=rv.split("<notes>")[2];
  rv=rv.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target=_blank>$1</a>");
  rv=rv.replaceAll("ک","ك");
  rv="<p>"+rv.trim();
  rv=rv.replaceAll("\n","</p><p>");
  stt.innerHTML=rv;
  // stt.style.bottom="0px";
  }

function toggle_related(){
  if(stt.style.bottom=="0px") stt.style.bottom="-360px"; else stt.style.bottom="0px";
  }

function get_slide_contents(){
  var rv="";
  if(aud.paused) load_page(1);
  // stai=sta[i];
  var a=[];
  Array.from(steps).forEach(v=> {
    // v.classList.remove("c");
    let vv=v.textContent;
    if(v.tagName=="svg") vv="[graph]";
    if(v.tagName=="image") vv="[image]";
    if(v.tagName=="IMG") vv="[image]";
    a.push(vv);
    });
  // var b=sta[i];
  var b=[];
  Array.from(sta[i]).forEach(v=> {
    if(!isNaN(v)) b.push(v);
    });
  // console.log(a,b);
  a.forEach((v,j)=> {
    let ts=b[j];
    // console.log(j,v,ts);
    // if(isNaN(ts)) ts=parseFloat(ts.split(":")[0]);
    let tt=new Date(ts*1000).toISOString().substr(15,4);
    rv+=`<c-t onclick="ps(1,${ts})">${tt} ${v}</c-t>`;
    });
  stt.innerHTML=rv;
  stt.style.bottom="0px";
  }

function get_file_name(j){
  var rv=j;
  let a=cnta[2].split("\n\n")[i].split("\n");
  // console.log(a);
  // if(a[j].indexOf("<img_ans0")!=-1) return "ans0.jpg";
  // if(a[j].indexOf("<img_ans1")!=-1) return "ans1.jpg";
  let b=a[j].split(" ");
  imgi=a[j].indexOf("<img");
  if(imgi==0) rv=get_prev_word(a[j-1]);
  if(imgi>0) rv=get_prev_word(a[j]);
  // console.log(rv,imgi,a[j],a);
  return rv;
  }

function get_prev_word(t){
  var rv="";
  rv=t.toLowerCase(t);
  // rv=rv.replaceAll("# ","");
  rv=rv.replaceAll("-","_");
  rv=rv.replaceAll(":","");
  // rv=rv.replaceAll("@","");
  rv=rv.replaceAll("&","and");
  rv=clean_text(rv);
  rv=rv.replaceAll(" <img>","");
  rv=rv.replaceAll("<img_ans0>","");
  rv=rv.replaceAll("<img_ans1>","");
  rv=rv.replaceAll("  "," ");
  rv=rv.trim();
  rv=rv.replaceAll(" ","_");
  rv=rv+".jpg";
  return rv;
  }

function clean_text(t){
  var rv=t;
  rv=rv.replaceAll("()","");
  rv=rv.replaceAll("*","");
  rv=rv.replaceAll("#","");
  rv=rv.replaceAll("@","");
  rv=rv.replaceAll("  "," ");
  rv=rv.trim();
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
  }

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
      rv=2;
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

function ps(f,t){
  if(f==0) {aud.pause(); aud.currentTime=0; return false;}
  if(i>14) afn="a000000.mp3";
  if(t>0){
    var j=0;
    a=Array.from(sta[i]);
    while(t>a[j]){
      j++;
      }
    // stai=Array.from(sta[i]).filter((a,k)=>k>j);
    // stai=Array.from(sta[i]).splice(j);
    // console.log(t,j,stai);
    var i0=i.toString().padStart(2,"0");
    afn=`a0040${i0}.mp3#t=${t}`;  
    // load_page(i);
    var b=[];
    Array.from(sta[i]).forEach(v=> {
      if(!isNaN(v)) b.push(v);
      });
    Array.from(steps).forEach((v,j)=> {
      if(b[j]>t) v.classList.remove("c"); else v.classList.add("c")
      });
    }
  // aud.src=f;
  aud.src=afn;
  // aud.currentTime=t;
  // console.log(i,t,f,afn,aud.currentTime);
  var playPromise = aud.play();
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      aud.src=afn;
      aud.play();
    })
    .catch(error => {
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
  // console.log(sid,typeof sid, sidv,ansa);
  switch (sid) {
    case 10402:
    case 10403:
    case 10404:
    case 10405:
    case 10406:
    case 10407:
      ansa[subs]=`${sid}|${sidv}`;
      // ansa[1]=`${10408}|`;
      break;
    case 10408:
      // ansa[0]=`${sid}|${sidv}`;
      v=document.getElementById(30408)
      ansa[subs]=`${sid}|${v.value}`;
      break;
    case 10502:
      ansa[3]=`${sid}|${sidv}`;
      // ansa[3]=`${10503}|`;
      break;
    case 10503:
      // ansa[2]=`${sid}|${sidv}`;
      v=document.getElementById(30503)
      ansa[3]=`${sid}|${v.value}`;
      break;
    case 10602:
    case 10603:
    case 10604:
    case 10605:
    case 10606:
    case 10607:
    case 10608:
      ansa[4+subs]=`${sid}|${sidv}`;
      break;  
    case 10704:
    case 10705:
      ansa[6]=`${sid}|${sidv}`;
    case 10702:
      v=document.getElementById(30702)
      ansa[7]=`${v.id}|${v.value}`;
    case 10707:
      v=document.getElementById(30707)
      ansa[8]=`${v.id}|${v.value}`;
      v=document.getElementById(40707)
      ansa[11]=`${v.id}|${v.value}`;
    case 10709:
      v=document.getElementById(30709)
      ansa[9]=`${v.id}|${v.value}`;
    case 10711:
      v=document.getElementById(30711)
      ansa[10]=`${v.id}|${v.value}`;
    }
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
  document.getElementById("cb").disabled=false;
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

function get_content_array(){
  let t=cnta[lng].replaceAll("* ","");
  let a=t.split("\n\n"); // sentence array
  let rv=[];
  a.forEach(v=>{
    rv.push(v.split("<notes>")[0]);
    });
  a=rv.join("\n");
  rv=a.split("\n");
  return rv;
  }

function get_content_overview(ll){
  aud.pause();
  aud.currentTime=0;
  var rv="";
  // cnt=cnta[lng];
  var sla=cnta[lng].split("\n\n");
  // const sna=t.split("\n"); // sentence array
  sla.forEach((v,j)=> {
    if(ll==1){
      var va=v.split("\n");
      v=va[0];
      console.log(j,v);
    }
    var ft=format_text(v,j,0,1,0);
    rv+=ft;
    });
  // console.log(sla);
  if(lng==2) document.body.style="direction:ltr;"; else document.body.style="direction:rtl;";
  rt.style.setProperty('--bb', '1px');
  rt.style.setProperty('--ps', 'none');
  rt.style.setProperty('--cr', 'pointer');
  vid.innerHTML=rv;
  ftr.innerHTML="<p-b><div id=pbt></div><div id=pbw><a id=pbr></a></div></p-b>"+FTB; 
  document.getElementById("lng").innerHTML=FLA[lng];
  }

var rvr="";
var lv=-1;
var jj=0;

function get_recursive(a,p){
  cnt=cnta[lng];
  var sla=cnta[lng].split("\n\n");
  lv++;
  a
  .filter(a=>a[0]==p)
  .forEach(e=>{
    jj++;
    var av=e[1];
    v=sla[av];
    var va=v.split("\n");
    v=va[0];
    console.log(lv,jj,v,e);
    rvr+=format_text(v,av,0,1,lv);
    get_recursive(a,jj);
    lv--;
    });
    return rvr;
  }

function get_mind_map(){
    aud.pause();
    aud.currentTime=0;
    rvr="";
    lv=-1;
    jj=0;
    rv=get_recursive(mmpa,0);
    if(lng==2) document.body.style="direction:ltr;"; else document.body.style="direction:rtl;";
    rt.style.setProperty('--bb', '0px');
    rt.style.setProperty('--ps', 'none');
    rt.style.setProperty('--cr', 'pointer');
    vid.innerHTML=rv;
    ftr.innerHTML="<p-b><div id=pbt></div><div id=pbw><a id=pbr></a></div></p-b>"+FTB; 
    document.getElementById("lng").innerHTML=FLA[lng];
    stt.style.bottom="-360px";
    }

function audio_update() {
  var t=aud.currentTime;
  let d=aud.duration;
  // console.log(t,stai);
  let da=[9,6,3,1,1,42]; // duration array for multiple mp3 per slide
  if(i==8) d=da.reduce(array_sum,0);
  if(afn=="a004008_1.mp3"||afn=="a004008_2.mp3"||afn=="a004008_3.mp3") t=t+da[0];
  if(afn=="a004008_4.mp3") t=t+da[0]+da[1];
  if(afn.charAt(0)=="n") t=t+da[0]+da[1]+da[2];
  if(afn.charAt(0)=="t") t=t+da[0]+da[1]+da[2]+da[3];
  if(afn=="a004008_5.mp3") t=t+da[0]+da[1]+da[2]+da[3]+da[4];
  let tt=new Date(t * 1000).toISOString().substr(15,4);
  let dd=isNaN(d)?"0:00":new Date(d * 1000).toISOString().substr(15,4);
  document.getElementById("pbr").style.width=t/d*100+"%";
  document.getElementById("pbt").innerHTML=tt+" / "+dd;
  // document.getElementById("time").innerHTML=i+":"+step+":"+t.toFixed(1);
  // var tav=ta[0]; // time array value
  var tava=[stai[0],0,0]; // time array (time,type: 0 step, 1 check answer,hide step by id)
  if(typeof stai[0]=="string"){
    var tava=stai[0].split(":");
    tava[0]=parseFloat(tava[0]); 
    tava[1]=parseInt(tava[1]); 
    tava[2]=parseInt(tava[2]); 
    }
  // console.log(t,ta[0],tava);
  if(t>tava[0]){
    stai.shift();
    // console.log(t, tava, stai, sta[i]);
    if(tava[1]!=1) next_step(tava);
    if(tava[1]==1) check_answers();
    }
  }

function check_answers(){
  const qa=[10801,10802,10803];
  fana=[ansa[0],ansa[2],ansa[4]];
  // console.log(fana[qno],fana);
  var qu1=document.getElementById(qa[qno]).innerHTML;
  var a=get_correct_answers(); 
  // qu1=qu1.replaceAll("<img>", `<img src=ans${a[qno]}.jpg>`);
  var img=a[qno]==1?CK1:CK0;
  qu1=qu1.replaceAll("<img>", img);
  document.getElementById(qa[qno]).innerHTML=qu1;
  qno++;
  }

function get_answers(f){
  // edit answer array
  // console.log(ansa);
  // if(ansa[0].length>6) ansa[0]+="|"+ansa[0].split("|")[1]; else ansa[0]+="|"+ansa[0].split("|")[1];
  // if(ansa[1].length>6) ansa[1]+="|"+ansa[3].split("|")[1]; else ansa[2]+="|"+ansa[2].split("|")[1];
  // if(ansa[2].length>6) ansa[2]+="|"+ansa[3].split("|")[1]; else ansa[2]+="|"+ansa[2].split("|")[1];
  // if(ansa[3].length>6) ansa[4]+="|"+ansa[4].split("|")[1];
  // if(ansa[5].length>6) ansa[4]+="|"+ansa[5].split("|")[1];
  if(typeof ansa[6]!=='undefined') ansa[6]+="|"+ar_to_en(ansa[6].split("|")[1]);
  if(typeof ansa[7]!=='undefined') ansa[7]+="|"+ar_to_en(ansa[7].split("|")[1]);
  if(typeof ansa[8]!=='undefined') ansa[8]+="|"+ar_to_en(ansa[8].split("|")[1]);
  if(typeof ansa[9]!=='undefined') ansa[9]+="|"+ar_to_en(ansa[9].split("|")[1]);
  if(typeof ansa[10]!=='undefined') ansa[10]+="|"+time_to_no(ansa[10].split("|")[1]);
  if(typeof ansa[11]!=='undefined') ansa[11]+="|"+time_to_no(ansa[11].split("|")[1]);

  var ans="";
  var qus="";
  var rv="";
  var i0=i.toString().padStart(2,"0");
  var ja=[22,23,24];
  var aa=[9,12,13];
  var cntva=get_content_array();
  var cls=f==1&&i>-1?" class=h":"";
  fana=[ansa[0],ansa[3],ansa[4]];
  // console.log(fana,cntva);
  fana.forEach((v,j)=>{
    ans=v.split("|")[1];
    qus=cntva[ja[j]];
    var k=j+1;
    var j0=k.toString().padStart(2,"0");
    if(lng<2) k=en_to_ar(k);
    var a=get_correct_answers();
    // let img=f==1?"<img>":`<img src=ans${a[j]}.jpg>`;
    let img="<img>";
    if(f==0) img=a[j]==1?CK1:CK0;
    rv+=`<p id=1${i0}${j0}${cls} onclick="goto(${aa[j]},1)" class=p>${k}. ${qus}<br><a>${ans}</a> ${img}</p><br>`;
    });
  return rv;
  }

function get_correct_answers(){ // get array of 
  const aa=[ansa[0].toLowerCase(),ansa[3].toLowerCase(),ansa[4]];
  var rv=[0,0,0];
  var g=[0,0,0]; // grade
  var s=""; // string
  // q1
  a=aa[0].split("|");
  if(a[0]=="10408"){
    s="خۆرا";
    if(a[1].indexOf(s)!==-1) g[0]=1;
    s="خؤرا";
    if(a[1].indexOf(s)!==-1) g[0]=1;
    s="خواردن";
    if(a[1].indexOf(s)!==-1) g[0]=1;
    s="food";
    if(a[1].indexOf(s)!==-1) g[0]=1;
    s="eating";
    if(a[1].indexOf(s)!==-1) g[0]=1;
    s="diet";
    if(a[1].indexOf(s)!==-1) g[0]=1;

    s="نا";
    if(a[1].indexOf(s)!==-1) g[1]=1;
    s="نه‌";
    if(a[1].indexOf(s)!==-1) g[1]=1;

    s="دروست";
    if(a[1].indexOf(s)!==-1) g[2]=1;
    s="شیاو";
    if(a[1].indexOf(s)!==-1) g[2]=1;
    s="گونجاو";
    if(a[1].indexOf(s)!==-1) g[2]=1;

    s="خراپ";
    if(a[1].indexOf(s)!==-1) g[1]=2;
    s="unhealthy";
    if(a[1].indexOf(s)!==-1) g[1]=2;
    s="bad";
    if(a[1].indexOf(s)!==-1) g[1]=2;

    var as=g.reduce(array_sum,0);
    rv[0]=as==3?1:0;
    }
  // q2
  a=aa[1].split("|");
  if(a[0]=="10503"){
    if((a[1].indexOf("خۆرا")!==-1 || a[1].indexOf("خواردن")!==-1) && a[1].indexOf("نا")===-1 && a[1].indexOf("دروست")!==-1) rv[1]=1;
    s="خۆرا";
    if(a[1].indexOf(s)!==-1) g[0]=1;
    s="خؤرا";
    if(a[1].indexOf(s)!==-1) g[0]=1;
    s="خواردن";
    if(a[1].indexOf(s)!==-1) g[0]=1;
    s="eating";
    if(a[1].indexOf(s)!==-1) g[0]=1;
    s="food";
    if(a[1].indexOf(s)!==-1) g[0]=1;
    s="diet";
    if(a[1].indexOf(s)!==-1) g[0]=1;

    s="نا";
    if(a[1].indexOf(s)===-1) g[1]=1;
    s="نه‌";
    if(a[1].indexOf(s)===-1) g[1]=1;
    s=" un";
    if(a[1].indexOf(s)===-1) g[1]=1;
    s=" non";
    if(a[1].indexOf(s)===-1) g[1]=1;

    s="دروست";
    if(a[1].indexOf(s)!==-1) g[2]=1;
    s="شیاو";
    if(a[1].indexOf(s)!==-1) g[2]=1;
    s="گونجاو";
    if(a[1].indexOf(s)!==-1) g[2]=1;
    s="باش";
    if(a[1].indexOf(s)!==-1) g[2]=1;
    s="healthy";
    if(a[1].indexOf(s)!==-1) g[2]=1;
    s="good";
    if(a[1].indexOf(s)!==-1) g[2]=1;
  
    var as=g.reduce(array_sum,0);
    rv[1]=as==3?1:0;
    // console.log(rv,g);
    }
  // q3
  a=aa[2].split("|");
  if(a[0]=="10607" || a[0]=="10605") rv[2]=1;
  return rv;
  }

function show_related_link(){
  ftr.style.bottom="-80px";
  if(get_related()!=false) document.getElementById("lng").innerHTML=`<a onclick="toggle_related()">${dica[11][lng]}</a>`;
  }
function audio_ended() {
  if(stsa.includes(i)) {
    document.getElementById("cb").style="opacity:1;";
    document.getElementById("cb").disabled=false;
    show_related_link();
    return true;
    }
  if(afn.charAt(0)=="n"||afn.charAt(0)=="t") afn=afn.charAt(0);
  // console.log(afn);
  var l0=1;
  l0=l0<10?"0"+l0:l0;  
  // if(i==7) location.reload();
  switch (afn) {
    // case "a004002.mp3":
    // case "a004012.mp3":
    // case "a004013.mp3":
    //   document.getElementById("cb").style="opacity:1;";
    //   break;
    case "a004004.mp3": // cause
    case "a004005.mp3": // treatment
    case "a004006.mp3": // food
    case "a004007.mp3": // info
      // console.log("Continue");
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
      ps(1,0);
      // aud.src=`${afn}.mp3`;
      // aud.play();
      break;
    case "a004008_1.mp3":
    case "a004008_2.mp3":
    case "a004008_3.mp3":
      afn="a004008_4.mp3";
      ps(1,0);
      // aud.src=`${afn}.mp3`;
      // aud.play();
      break;
    case "a004008_4.mp3":
      var d=ansa[8].split("|")[2];
      if(d>20) d=20;
      d0=d.length==1?"0"+d:d;
      afn="n"+d0+l0+".mp3";
      ps(1,0);
      // aud.src=`${afn}.mp3`;
      // aud.play();
      break;
    case "n":
      var d=ansa[11].split("|")[2];
      d0=d.length==1?"0"+d:d;
      afn="t"+d0+l0+".mp3";
      ps(1,0);
      // aud.src=`${afn}.mp3`;
      // aud.play();
      break;
    case "t":
    afn="a004008_5.mp3";
      ps(1,0);
      // aud.src=`${afn}.mp3`;
      // aud.play();
      break;
    case "a000000.mp3":
      if(i>cnta[lng].split("\n\n").length-2){
        i=8;
        localStorage.setItem("DM_SLD", i);
        goto(i,0); // go to answers slide
        break;  
      }
    default:
      next_slide(1);
      ps(1,0);
      // aud.play();
      break;
    }
  afp=0;
  }

function audio_ended2() {
  // console.log(afp);
  // if(afp<19) aud.play();
  }

function get_chart(f,ii,j) {
  const w=window.innerWidth>600?360:window.innerWidth-20;
  const bh=35; // bar width
  const hs=6; // h space
  const xo=80;
  let a=[],b=[];
  var lvm, vlc;
  var rl=lng==2?"rt":"lt";
  if(ii==9) {a=dmca[lng]; lvm=70; vlc=7;};
  if(ii==11) {a=dmpa[lng]; lvm=25; vlc=5;};
  if(ii==12) {a=dmta[lng]; lvm=100; vlc=10;};
  if(ii==13 && j==3) {a=dmfa[lng]; lvm=100; vlc=10;};
  if(ii==13 && j==6) {a=dmba[lng]; lvm=100; vlc=10;};
  a.forEach(v=>{
    let va=v.split("|");
    b.push(va[1]);
    });
  var vm=Math.max(...b);
  
  const mp=(w-xo-36)/vm;
  const hl=(w-xo-18)/vlc;
  // console.log(vm,w,w/vm,mp,b);
  const h=(bh+hs)*a.length+hs;
  const ta=lng==2?"end":"start";
  var clss=f==1&&i>-1?` class="w60 h ${rl}"`:"";
  var cls=f==1&&i>-1?" class=h":"";
  var rv=`<svg xmlns="http://www.w3.org/2000/svg"${clss} height=${h+50} width=${w}>`;
  // rv+=`<line x1=0 y1=${h-3} x2=${w} y2=${h-3} />`;
  for(j=0;j<vlc+1;j++){
    rv+=`<line x1=${xo+(j*hl)} y1=0 x2=${xo+(j*hl)} y2=${h} />`;
    rv+=`<text x=${xo+(j*hl)} y=${h+2} class=n>${j*lvm/vlc}</text>`;
    }
  var y=hs;
  a.forEach((v,j)=>{
    let va=v.split("|");
    // console.log(v,j,va);
    let x=va[1]*mp;
    let lxo=va[1]<10?24:34;
    rv+=`<rect x=${xo} y=${y} width=${x} height=${bh} />`;
    rv+=`<text text-anchor=${ta} x=${xo-2} y=${y+24}${cls}>${va[0]}</text>`;
    rv+=`<text text-anchor=${ta} x=${xo+x+lxo} y=${y+24}${cls}>${va[1]}</text>`;
    y+=bh+hs;
    });
  if(ii==9||ii==12||ii==13){
    cls=f==1&&i>-1?" class='h r'":" class=r";
    rv+=`<line x1=${w} y1=0 x2=0 y2=${h}${cls} />`;
    rv+=`<line x1=0 y1=0 x2=${w} y2=${h}${cls} />`;
    }
  rv+="</svg>";
  return rv;
  }

function get_overview(f) {
  const w=window.innerWidth>600?360:window.innerWidth-20;
  const bw=w*0.45; // box width
  const bh=50; // box height
  const h=420;
  var cls=f==1&&i>-1?" class=h":"";
  var rv=`<svg xmlns="http://www.w3.org/2000/svg" id=ov${cls} height=${h+50} width=${w}>`;
  const xo=80; // x offset
  const a=[
  [w/2-bw/2,1,''],
  [bw+w*0.1-1,100,`M${w/2} ${bh} L${w/2} ${bh+bh/2} L${bw+w*0.1+bw/2} ${bh+bh/2} L${bw+w*0.1+bw/2} ${bh*2}`],
  [bw+w*0.1-1,200,`M${bw+w*0.1+bw/2} ${bh*3} L${bw+w*0.1+bw/2} ${bh*4}`],
  [1,100,`M${w/2} ${bh} L${w/2} ${bh+bh/2} L${bw/2} ${bh+bh/2} L${bw/2} ${bh*2}`],
  [1,200,`M${bw/2} ${bh*3} L${bw/2} ${bh*4}`],
  [1,300,`M${bw/2} ${bh*5} L${bw/2} ${bh*6}`],
  [1,400,`M${bw/2} ${bh*7} L${bw/2} ${bh*8}`]
  ];
  a.forEach((v,j)=>{
    // console.log(j,v);
    rv+=`<g${cls}>`;
    if(v[2].length) rv+=`<path d="${v[2]}" />`;
    rv+=`<rect x=${v[0]} y=${v[1]} width=${bw} height=${bh} />`;
    rv+=`<text x=${v[0]+bw/2} y=${v[1]+bh/2} dominant-baseline=middle text-anchor=middle>${dica[j+4][lng]}</text>`;
    rv=rv.replaceAll("<img_ans0>","<a class=r>&#x2715;</a>");
    rv=rv.replaceAll("<img_ans1>","<a class=g>&#x2713;</a>");
    // var ho=lng==2?4:18;
    // if(j==1) rv+=`<image${cls} href=ans1.jpg height=26 x=${v[0]+18} y=${v[1]+12} />`;
    // if(j==3) rv+=`<image${cls} href=ans0.jpg height=20 x=${v[0]+ho} y=${v[1]+15} />`;
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
  ftr.style.bottom="-80px";
  stt.style.bottom="-360px";
  }

function edit_subtitles(){
  stt.contentEditable=true;
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
class MindMap extends HTMLElement{
  constructor(){super();}
  }
class ImageBig extends HTMLElement{
  constructor(){super();}
  }
class ProgressBar extends HTMLElement{
  constructor(){super();}
  }
class ContentsTable extends HTMLElement{
  constructor(){super();}
  }
window.customElements.define("s-l", Slide);
window.customElements.define("s-t", SubTitle);
window.customElements.define("a-u", SlideAuthor);
window.customElements.define("s-b", SlideBody);
window.customElements.define("m-m", MindMap);
window.customElements.define("i-b", ImageBig);
window.customElements.define("p-b", ProgressBar);
window.customElements.define("c-t", ContentsTable);