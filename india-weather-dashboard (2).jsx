import { useState, useEffect, useCallback, useRef } from "react";

const SD = [
  {n:"Andhra Pradesh",c:"Amaravati",r:"South",t:33,d:"Partly cloudy",ic:"⛅",h:70,w:14,uv:8,v:8,col:"sunny",rain:20,coastal:true,stormRisk:35},
  {n:"Arunachal Pradesh",c:"Itanagar",r:"Northeast",t:18,d:"Rainy",ic:"🌧️",h:90,w:8,uv:3,v:5,col:"rainy",rain:85,coastal:false,stormRisk:60},
  {n:"Assam",c:"Dispur",r:"Northeast",t:28,d:"Thunderstorm",ic:"⛈️",h:88,w:16,uv:4,v:4,col:"stormy",rain:90,coastal:false,stormRisk:85},
  {n:"Bihar",c:"Patna",r:"East",t:37,d:"Hot & sunny",ic:"☀️",h:55,w:10,uv:9,v:10,col:"sunny",rain:5,coastal:false,stormRisk:10},
  {n:"Chhattisgarh",c:"Raipur",r:"Central",t:35,d:"Mostly sunny",ic:"🌤️",h:60,w:12,uv:9,v:9,col:"sunny",rain:10,coastal:false,stormRisk:15},
  {n:"Goa",c:"Panaji",r:"West",t:31,d:"Humid & breezy",ic:"🌊",h:82,w:20,uv:7,v:8,col:"humid",rain:30,coastal:true,stormRisk:40},
  {n:"Gujarat",c:"Gandhinagar",r:"West",t:38,d:"Hot & dry",ic:"☀️",h:35,w:18,uv:10,v:12,col:"sunny",rain:2,coastal:true,stormRisk:30},
  {n:"Haryana",c:"Chandigarh",r:"North",t:34,d:"Hazy sunshine",ic:"🌫️",h:48,w:9,uv:8,v:6,col:"cloudy",rain:5,coastal:false,stormRisk:8},
  {n:"Himachal Pradesh",c:"Shimla",r:"North",t:14,d:"Cool & clear",ic:"🏔️",h:55,w:11,uv:5,v:15,col:"cold",rain:15,coastal:false,stormRisk:20},
  {n:"Jharkhand",c:"Ranchi",r:"East",t:32,d:"Partly cloudy",ic:"⛅",h:68,w:11,uv:7,v:8,col:"sunny",rain:20,coastal:false,stormRisk:25},
  {n:"Karnataka",c:"Bengaluru",r:"South",t:27,d:"Pleasant",ic:"🌤️",h:62,w:13,uv:6,v:10,col:"sunny",rain:15,coastal:true,stormRisk:20},
  {n:"Kerala",c:"Thiruvananthapuram",r:"South",t:30,d:"Heavy rain",ic:"🌧️",h:92,w:22,uv:3,v:4,col:"rainy",rain:95,coastal:true,stormRisk:75},
  {n:"Madhya Pradesh",c:"Bhopal",r:"Central",t:36,d:"Sunny & hot",ic:"☀️",h:45,w:10,uv:10,v:11,col:"sunny",rain:3,coastal:false,stormRisk:10},
  {n:"Maharashtra",c:"Mumbai",r:"West",t:32,d:"Muggy",ic:"⛅",h:80,w:17,uv:6,v:7,col:"humid",rain:25,coastal:true,stormRisk:45},
  {n:"Manipur",c:"Imphal",r:"Northeast",t:22,d:"Overcast",ic:"☁️",h:80,w:7,uv:4,v:6,col:"cloudy",rain:40,coastal:false,stormRisk:30},
  {n:"Meghalaya",c:"Shillong",r:"Northeast",t:20,d:"Drizzle",ic:"🌦️",h:91,w:9,uv:2,v:5,col:"rainy",rain:80,coastal:false,stormRisk:55},
  {n:"Mizoram",c:"Aizawl",r:"Northeast",t:21,d:"Foggy",ic:"🌫️",h:85,w:6,uv:3,v:3,col:"cloudy",rain:50,coastal:false,stormRisk:35},
  {n:"Nagaland",c:"Kohima",r:"Northeast",t:19,d:"Cloudy",ic:"☁️",h:83,w:8,uv:3,v:5,col:"cloudy",rain:45,coastal:false,stormRisk:28},
  {n:"Odisha",c:"Bhubaneswar",r:"East",t:34,d:"Hot & humid",ic:"☀️",h:78,w:12,uv:8,v:9,col:"sunny",rain:15,coastal:true,stormRisk:55},
  {n:"Punjab",c:"Chandigarh",r:"North",t:33,d:"Sunny",ic:"☀️",h:42,w:14,uv:8,v:12,col:"sunny",rain:3,coastal:false,stormRisk:5},
  {n:"Rajasthan",c:"Jaipur",r:"North",t:42,d:"Scorching hot",ic:"🌵",h:18,w:16,uv:11,v:10,col:"sunny",rain:1,coastal:false,stormRisk:5},
  {n:"Sikkim",c:"Gangtok",r:"Northeast",t:15,d:"Misty",ic:"🌫️",h:88,w:7,uv:3,v:3,col:"cold",rain:60,coastal:false,stormRisk:40},
  {n:"Tamil Nadu",c:"Chennai",r:"South",t:35,d:"Humid & sunny",ic:"☀️",h:74,w:15,uv:9,v:9,col:"humid",rain:10,coastal:true,stormRisk:50},
  {n:"Telangana",c:"Hyderabad",r:"South",t:36,d:"Hot",ic:"☀️",h:50,w:11,uv:9,v:11,col:"sunny",rain:5,coastal:false,stormRisk:12},
  {n:"Tripura",c:"Agartala",r:"Northeast",t:29,d:"Showery",ic:"🌦️",h:86,w:10,uv:5,v:6,col:"rainy",rain:70,coastal:false,stormRisk:48},
  {n:"Uttar Pradesh",c:"Lucknow",r:"North",t:38,d:"Very hot",ic:"☀️",h:40,w:8,uv:10,v:8,col:"sunny",rain:2,coastal:false,stormRisk:8},
  {n:"Uttarakhand",c:"Dehradun",r:"North",t:22,d:"Partly cloudy",ic:"⛅",h:65,w:10,uv:6,v:10,col:"cold",rain:20,coastal:false,stormRisk:25},
  {n:"West Bengal",c:"Kolkata",r:"East",t:33,d:"Humid",ic:"🌫️",h:82,w:13,uv:6,v:7,col:"humid",rain:20,coastal:true,stormRisk:65},
  {n:"A&N Islands",c:"Port Blair",r:"UT",t:29,d:"Tropical showers",ic:"🌧️",h:90,w:19,uv:5,v:6,col:"rainy",rain:80,coastal:true,stormRisk:80},
  {n:"Chandigarh",c:"Chandigarh",r:"UT",t:33,d:"Sunny",ic:"☀️",h:44,w:12,uv:8,v:12,col:"sunny",rain:3,coastal:false,stormRisk:5},
  {n:"D&NH and D&D",c:"Daman",r:"UT",t:33,d:"Coastal breeze",ic:"🌊",h:75,w:18,uv:7,v:9,col:"humid",rain:20,coastal:true,stormRisk:38},
  {n:"Delhi (NCT)",c:"New Delhi",r:"UT",t:39,d:"Hazy heat",ic:"🌫️",h:35,w:9,uv:9,v:5,col:"cloudy",rain:2,coastal:false,stormRisk:8},
  {n:"Jammu & Kashmir",c:"Srinagar",r:"UT",t:18,d:"Mild & clear",ic:"🏔️",h:52,w:11,uv:5,v:14,col:"cold",rain:15,coastal:false,stormRisk:15},
  {n:"Ladakh",c:"Leh",r:"UT",t:8,d:"Cold & clear",ic:"❄️",h:22,w:14,uv:7,v:20,col:"cold",rain:1,coastal:false,stormRisk:5},
  {n:"Lakshadweep",c:"Kavaratti",r:"UT",t:30,d:"Tropical",ic:"🌴",h:88,w:21,uv:6,v:8,col:"humid",rain:40,coastal:true,stormRisk:70},
  {n:"Puducherry",c:"Puducherry",r:"UT",t:34,d:"Hot & humid",ic:"☀️",h:76,w:16,uv:8,v:9,col:"sunny",rain:12,coastal:true,stormRisk:42},
];

const CHIP_STYLES = {
  sunny:{bg:"#FAEEDA",border:"#EF9F27",name:"#633806",temp:"#412402",desc:"#854F0B"},
  rainy:{bg:"#E6F1FB",border:"#378ADD",name:"#0C447C",temp:"#042C53",desc:"#185FA5"},
  cloudy:{bg:"#F1EFE8",border:"#888780",name:"#444441",temp:"#2C2C2A",desc:"#5F5E5A"},
  stormy:{bg:"#EEEDFE",border:"#7F77DD",name:"#3C3489",temp:"#26215C",desc:"#534AB7"},
  cold:{bg:"#E1F5EE",border:"#1D9E75",name:"#085041",temp:"#04342C",desc:"#0F6E56"},
  humid:{bg:"#FBEAF0",border:"#D4537E",name:"#72243E",temp:"#4B1528",desc:"#993556"},
};
const WEEK_BARS={sunny:"#EF9F27",rainy:"#378ADD",cloudy:"#888780",stormy:"#7F77DD",cold:"#1D9E75",humid:"#D4537E"};
const HR_T=[{t:"Now",d:0},{t:"3PM",d:2},{t:"6PM",d:-1},{t:"9PM",d:-4},{t:"12AM",d:-6},{t:"3AM",d:-7}];
const WK=[{d:"Today",h:0,l:-8},{d:"Tue",h:1,l:-7},{d:"Wed",h:-2,l:-9},{d:"Thu",h:-3,l:-10},{d:"Fri",h:1,l:-8},{d:"Sat",h:2,l:-7},{d:"Sun",h:3,l:-6}];
const REGIONS=["All","North","South","East","West","Northeast","Central","UT"];
const REG_STYLES={
  All:{bg:"#534AB7",color:"#EEEDFE",border:"transparent"},
  North:{bg:"#EAF3DE",color:"#3B6D11",border:"#97C459"},
  South:{bg:"#FAECE7",color:"#993C1D",border:"#F0997B"},
  East:{bg:"#E6F1FB",color:"#185FA5",border:"#85B7EB"},
  West:{bg:"#FAEEDA",color:"#854F0B",border:"#EF9F27"},
  Northeast:{bg:"#E1F5EE",color:"#0F6E56",border:"#5DCAA5"},
  Central:{bg:"#FBEAF0",color:"#993556",border:"#ED93B1"},
  UT:{bg:"#EEEDFE",color:"#3C3489",border:"#AFA9EC"},
};

// AI-powered alert engine
function computeAlerts(s) {
  const alerts = [];
  // Thunderstorm prediction
  const thunderScore = (s.h > 75 ? 30 : s.h > 60 ? 15 : 0) +
    (s.rain > 60 ? 30 : s.rain > 30 ? 15 : 0) +
    (s.col === "stormy" ? 25 : 0) +
    (s.w > 15 ? 10 : 0) +
    (s.v < 5 ? 10 : 0);
  if (thunderScore >= 50) {
    alerts.push({
      type: "thunderstorm",
      level: thunderScore >= 75 ? "SEVERE" : thunderScore >= 60 ? "MODERATE" : "WATCH",
      title: "Thunderstorm Alert",
      icon: "⛈️",
      probability: Math.min(95, thunderScore),
      detail: thunderScore >= 75
        ? "Severe thunderstorms likely with lightning, strong gusty winds and heavy rain. Avoid open areas."
        : "Thunderstorm conditions developing. Stay indoors and away from trees and electrical poles.",
      bg: "#3C0000", border: "#E24B4A", textColor: "#F7C1C1", badgeBg: "#A32D2D", badgeText: "#FCEBEB",
      actions: ["Stay indoors","Unplug electronics","Avoid waterlogged roads","Keep emergency kit ready"],
    });
  }
  // Cyclone prediction (coastal states + high wind + high humidity + high rain)
  const cycloneScore = (s.coastal ? 25 : 0) +
    (s.w > 20 ? 25 : s.w > 15 ? 15 : 0) +
    (s.h > 85 ? 20 : s.h > 75 ? 10 : 0) +
    (s.rain > 70 ? 20 : s.rain > 50 ? 10 : 0) +
    (s.stormRisk > 60 ? 15 : s.stormRisk > 40 ? 8 : 0);
  if (cycloneScore >= 45) {
    const cat = cycloneScore >= 75 ? "Cyclonic Storm" : cycloneScore >= 60 ? "Deep Depression" : "Low Pressure";
    alerts.push({
      type: "cyclone",
      level: cycloneScore >= 75 ? "WARNING" : cycloneScore >= 60 ? "ALERT" : "WATCH",
      title: `Cyclone ${cat}`,
      icon: "🌀",
      probability: Math.min(90, cycloneScore),
      detail: cycloneScore >= 75
        ? `A ${cat} is tracking towards coastal areas. Fishermen must not venture into sea. Evacuation may be required.`
        : `${cat} developing in the Bay of Bengal / Arabian Sea region. Monitor IMD bulletins closely.`,
      bg: "#0C0C3C", border: "#7F77DD", textColor: "#CECBF6", badgeBg: "#3C3489", badgeText: "#EEEDFE",
      actions: ["Monitor IMD alerts","Fishermen stay ashore","Stock emergency supplies","Identify evacuation routes"],
    });
  }
  // Heat wave
  if (s.t >= 40) {
    alerts.push({
      type: "heatwave",
      level: s.t >= 44 ? "EXTREME" : s.t >= 42 ? "SEVERE" : "ALERT",
      title: "Heat Wave Warning",
      icon: "🔥",
      probability: s.t >= 44 ? 95 : s.t >= 42 ? 85 : 70,
      detail: `Temperature of ${s.t}°C with heat index ${s.t + Math.round(s.h/20-2)}°C. Heat stroke risk is very high for outdoor workers.`,
      bg: "#3C1000", border: "#D85A30", textColor: "#F5C4B3", badgeBg: "#993C1D", badgeText: "#FAECE7",
      actions: ["Avoid 11AM–4PM sun","Drink water every hour","Wear light cotton clothes","Check on elderly neighbours"],
    });
  }
  // Heavy rain / flood
  if (s.rain >= 80 && s.h >= 88) {
    alerts.push({
      type: "flood",
      level: s.rain >= 90 ? "SEVERE" : "MODERATE",
      title: "Heavy Rain & Flood Risk",
      icon: "🌊",
      probability: Math.min(88, s.rain),
      detail: `Extremely heavy rainfall expected (${s.rain}% chance). Low-lying areas and river basins at risk of flooding.`,
      bg: "#001C3C", border: "#378ADD", textColor: "#B5D4F4", badgeBg: "#0C447C", badgeText: "#E6F1FB",
      actions: ["Avoid river banks","Do not cross flooded roads","Move valuables to higher floor","Keep NDRF helpline ready: 1078"],
    });
  }
  return alerts;
}

function computeAIIndices(s) {
  const comfort = Math.max(0, Math.min(100, Math.round(100 - Math.abs(s.t-24)*2.5 - (s.h>70?(s.h-70)*0.8:0) - (s.w>20?(s.w-20)*0.5:0))));
  const health = Math.max(0, Math.min(100, Math.round((s.uv>8?(s.uv-8)*12:0)+(s.h>85?(s.h-85)*1.5:0)+(s.t>38?(s.t-38)*5:0)+(s.v<5?(5-s.v)*5:0)+(s.rain>80?15:0))));
  const outdoor = Math.max(0, Math.min(100, Math.round(100-(s.rain>50?40:s.rain>20?20:0)-(s.t>38?(s.t-38)*4:0)-(s.t<10?(10-s.t)*3:0)-(s.uv>9?(s.uv-9)*5:0)-(s.w>25?15:0))));
  const agri = Math.max(0, Math.min(100, Math.round((s.rain>80?30:s.rain>40?60:s.rain>10?80:40)+(s.t>=20&&s.t<=35?20:s.t>40?-10:0)-(s.uv>10?10:0))));
  const travel = Math.max(0, Math.min(100, Math.round((s.v>=10?25:s.v*2.5)+(s.rain<20?25:s.rain<50?15:5)+(s.t>=18&&s.t<=32?25:10)+(s.w<15?25:15))));
  const sleep = Math.max(0, Math.min(100, Math.round(100-Math.abs(s.t-20)*3-(s.h>75?(s.h-75)*1.2:0)-(s.w>20?10:0))));
  return { comfort, health, outdoor, agri, travel, sleep };
}

function AlertCard({ alert }) {
  const [expanded, setExpanded] = useState(false);
  const levelColors = { SEVERE:"#E24B4A", WARNING:"#7F77DD", EXTREME:"#D85A30", MODERATE:"#EF9F27", ALERT:"#EF9F27", WATCH:"#639922" };
  const lc = levelColors[alert.level] || "#EF9F27";
  return (
    <div style={{borderRadius:14,padding:"14px 16px",background:alert.bg,border:`2px solid ${alert.border}`,marginBottom:10,cursor:"pointer"}}
      onClick={()=>setExpanded(e=>!e)}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:28,lineHeight:1,animation:alert.type==="cyclone"?"spin 3s linear infinite":alert.type==="thunderstorm"?"flash 1.5s infinite":"none"}}>{alert.icon}</span>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
              <span style={{fontSize:14,fontWeight:600,color:alert.textColor}}>{alert.title}</span>
              <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:10,background:alert.badgeBg,color:alert.badgeText,letterSpacing:"0.08em"}}>{alert.level}</span>
            </div>
            <div style={{fontSize:12,color:alert.textColor,opacity:0.7}}>Probability: {alert.probability}% · Tap for details</div>
          </div>
        </div>
        <div style={{width:42,height:42,borderRadius:"50%",border:`2px solid ${lc}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{fontSize:13,fontWeight:700,color:lc}}>{alert.probability}%</span>
        </div>
      </div>
      {expanded && (
        <div style={{marginTop:12,borderTop:`1px solid ${alert.border}`,paddingTop:12}}>
          <p style={{fontSize:13,color:alert.textColor,lineHeight:1.7,marginBottom:12}}>{alert.detail}</p>
          <div style={{fontSize:11,fontWeight:600,color:alert.textColor,opacity:0.6,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Safety actions</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {alert.actions.map((a,i)=>(
              <div key={i} style={{fontSize:12,color:alert.textColor,background:`${alert.border}22`,borderRadius:8,padding:"6px 10px",display:"flex",alignItems:"center",gap:6}}>
                <span style={{color:lc,fontSize:14}}>•</span>{a}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function IndexBar({ label, value, color, icon, desc }) {
  return (
    <div style={{marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <span style={{fontSize:15}}>{icon}</span>
          <span style={{fontSize:13,fontWeight:500,color:"var(--color-text-primary)"}}>{label}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:11,padding:"2px 8px",borderRadius:10,background:`${color}22`,color,fontWeight:500}}>{desc}</span>
          <span style={{fontSize:15,fontWeight:600,color,minWidth:28,textAlign:"right"}}>{value}</span>
        </div>
      </div>
      <div style={{height:7,borderRadius:6,background:"var(--color-background-secondary)",overflow:"hidden"}}>
        <div style={{height:"100%",width:`${value}%`,background:color,borderRadius:6,transition:"width 0.7s cubic-bezier(.4,0,.2,1)"}}/>
      </div>
    </div>
  );
}

export default function App() {
  const [cur, setCur] = useState(SD.find(s=>s.n==="Odisha"));
  const [activeReg, setActiveReg] = useState("All");
  const [activeDay, setActiveDay] = useState(0);
  const [time, setTime] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState("Click '✦ AI insight' for a personalised Claude weather analysis including storm risk assessment...");
  const [alertAiLoading, setAlertAiLoading] = useState(false);
  const [alertAiText, setAlertAiText] = useState("");
  const [showAlertAI, setShowAlertAI] = useState(false);
  const timerRef = useRef(null);

  useEffect(()=>{
    const tick=()=>{
      const n=new Date();
      setTime(n.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",timeZone:"Asia/Kolkata"})+" IST");
    };
    tick(); const id=setInterval(tick,1000); return ()=>clearInterval(id);
  },[]);

  const fetchAI = useCallback(async(state)=>{
    if(aiLoading)return;
    setAiLoading(true); setAiText("");
    const idx=computeAIIndices(state);
    const alts=computeAlerts(state);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:1000,
          messages:[{role:"user",content:`You are a sharp Indian meteorologist. Weather for ${state.c}, ${state.n}: Temp ${state.t}°C, ${state.d}, Humidity ${state.h}%, Wind ${state.w}km/h, UV ${state.uv}, Rain ${state.rain}%, Coastal: ${state.coastal}. Active alerts: ${alts.map(a=>a.title+" ("+a.level+")").join(", ")||"None"}. AI Indices: Comfort ${idx.comfort}, Health Risk ${idx.health}, Outdoor ${idx.outdoor}/100. Write 3 sharp sentences: 1) Current conditions with culturally specific ${state.n} reference. 2) Mention any active alerts and their risk level. 3) One actionable safety tip. Be punchy, specific, no clichés.`}]
        })
      });
      const data=await res.json();
      const full=data.content?.[0]?.text||"AI insight unavailable — check the storm alerts above for safety guidance.";
      if(timerRef.current)clearInterval(timerRef.current);
      let i=0; timerRef.current=setInterval(()=>{setAiText(full.slice(0,i));i+=3;if(i>full.length+3){setAiText(full);clearInterval(timerRef.current);}},14);
    }catch{setAiText("AI insight unavailable — all storm predictions and weather indices are computed live above.");}
    setAiLoading(false);
  },[aiLoading]);

  const fetchAlertAI = useCallback(async(state,alerts)=>{
    if(alertAiLoading||alerts.length===0)return;
    setAlertAiLoading(true); setAlertAiText(""); setShowAlertAI(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:1000,
          messages:[{role:"user",content:`You are an IMD (India Meteorological Department) emergency advisor. Active weather alerts for ${state.c}, ${state.n}: ${alerts.map(a=>`${a.title} (${a.level}, ${a.probability}% probability): ${a.detail}`).join(". ")}. Write a 4-sentence emergency advisory: 1) Summarise the threat severity and which areas are most at risk in ${state.n}. 2) Immediate actions people should take in the next 6 hours. 3) What to avoid doing. 4) Where to get official updates (IMD website, Disaster helpline 1078, State emergency ops). Be authoritative, clear, urgent but not panic-inducing.`}]
        })
      });
      const data=await res.json();
      const full=data.content?.[0]?.text||"Contact IMD at imd.gov.in or call 1078 for official emergency guidance.";
      let i=0; const t=setInterval(()=>{setAlertAiText(full.slice(0,i));i+=3;if(i>full.length+3){setAlertAiText(full);clearInterval(t);}},14);
    }catch{setAlertAiText("For official alerts: visit imd.gov.in or call National Disaster helpline 1078.");}
    setAlertAiLoading(false);
  },[alertAiLoading]);

  const pick=(s)=>{setCur(s);setActiveDay(0);setAiText("Click '✦ AI insight' to analyse "+s.n+"...");setShowAlertAI(false);setAlertAiText("");};
  const indices=computeAIIndices(cur);
  const alerts=computeAlerts(cur);
  const feels=cur.t+Math.round(cur.h/20-2);
  const heroBg={sunny:"#FAEEDA",rainy:"#E6F1FB",cloudy:"#F1EFE8",stormy:"#EEEDFE",cold:"#E1F5EE",humid:"#FBEAF0"}[cur.col];
  const heroBorder={sunny:"#EF9F27",rainy:"#378ADD",cloudy:"#B4B2A9",stormy:"#7F77DD",cold:"#1D9E75",humid:"#D4537E"}[cur.col];
  const filtered=activeReg==="All"?SD:SD.filter(s=>s.r===activeReg);
  const overall=Math.round((indices.comfort+indices.outdoor+(100-indices.health)+indices.agri+indices.travel+indices.sleep)/6);
  const indexMeta=[
    {label:"Comfort index",value:indices.comfort,icon:"😌",color:indices.comfort>70?"#1D9E75":indices.comfort>40?"#BA7517":"#A32D2D",desc:indices.comfort>70?"Comfortable":indices.comfort>40?"Moderate":"Uncomfortable"},
    {label:"Health risk",value:indices.health,icon:"🏥",color:indices.health<30?"#1D9E75":indices.health<60?"#BA7517":"#A32D2D",desc:indices.health<30?"Low risk":indices.health<60?"Moderate":"High risk"},
    {label:"Outdoor score",value:indices.outdoor,icon:"🏃",color:indices.outdoor>70?"#1D9E75":indices.outdoor>40?"#BA7517":"#A32D2D",desc:indices.outdoor>70?"Go outside":indices.outdoor>40?"Okay":"Stay in"},
    {label:"Agricultural",value:indices.agri,icon:"🌾",color:indices.agri>70?"#1D9E75":indices.agri>40?"#BA7517":"#A32D2D",desc:indices.agri>70?"Favourable":indices.agri>40?"Moderate":"Unfavourable"},
    {label:"Travel score",value:indices.travel,icon:"✈️",color:indices.travel>70?"#1D9E75":indices.travel>40?"#BA7517":"#A32D2D",desc:indices.travel>70?"Great to travel":indices.travel>40?"Manageable":"Avoid travel"},
    {label:"Sleep quality",value:indices.sleep,icon:"🌙",color:indices.sleep>70?"#1D9E75":indices.sleep>40?"#BA7517":"#A32D2D",desc:indices.sleep>70?"Good sleep":indices.sleep>40?"Moderate":"Poor sleep"},
  ];

  return (
    <div style={{padding:"1rem 0",fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}
        @keyframes pop{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes flash{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes alertPulse{0%,100%{opacity:1}50%{opacity:0.6}}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
        .pop{animation:pop .3s ease}
        .alert-banner{animation:alertPulse 2s infinite}
      `}</style>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:14}}>
        <div>
          <div style={{fontSize:22,fontWeight:600,color:"var(--color-text-primary)"}}>🇮🇳 India weather</div>
          <div style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:2}}>28 states · 8 UTs · AI storm alerts · 6 indices · Claude insights</div>
        </div>
        <div style={{background:"#0F6E56",color:"#9FE1CB",fontSize:12,padding:"5px 14px",borderRadius:20,fontWeight:500}}>{time}</div>
      </div>

      {/* Search */}
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        <select value={cur.n} onChange={e=>pick(SD.find(s=>s.n===e.target.value))}
          style={{flex:1,padding:"8px 12px",borderRadius:10,border:"1.5px solid #AFA9EC",background:"var(--color-background-primary)",color:"var(--color-text-primary)",fontSize:14}}>
          {SD.map(s=><option key={s.n} value={s.n}>{s.n} ({s.c})</option>)}
        </select>
        <button onClick={()=>fetchAI(cur)} disabled={aiLoading}
          style={{padding:"8px 16px",borderRadius:10,border:"none",background:aiLoading?"#888":"#534AB7",color:"#EEEDFE",fontSize:13,fontWeight:500,cursor:aiLoading?"default":"pointer",minWidth:110}}>
          {aiLoading?"⏳...":"✦ AI insight"}
        </button>
      </div>

      {/* ALERT BANNER — shown when alerts exist */}
      {alerts.length > 0 && (
        <div className="alert-banner" style={{borderRadius:14,padding:"12px 16px",background:"#1C0000",border:"2px solid #E24B4A",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22,animation:"shake 0.5s infinite"}}>⚠️</span>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"#F7C1C1"}}>
                {alerts.length} Active Alert{alerts.length>1?"s":""} for {cur.n}
              </div>
              <div style={{fontSize:11,color:"#F09595",marginTop:1}}>
                {alerts.map(a=>a.title).join(" · ")}
              </div>
            </div>
          </div>
          <button onClick={()=>fetchAlertAI(cur,alerts)} disabled={alertAiLoading}
            style={{padding:"7px 14px",borderRadius:10,border:"1.5px solid #E24B4A",background:"#3C0000",color:"#F7C1C1",fontSize:12,fontWeight:500,cursor:"pointer",whiteSpace:"nowrap"}}>
            {alertAiLoading?"Analysing...":"🤖 AI Emergency Advisory"}
          </button>
        </div>
      )}

      {/* AI Emergency Advisory */}
      {showAlertAI && alerts.length > 0 && (
        <div style={{borderRadius:14,padding:"14px 16px",background:"#0C0010",border:"2px solid #7F77DD",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:alertAiLoading?"#EF9F27":"#E24B4A",animation:alertAiLoading?"pulse 0.9s infinite":"alertPulse 2s infinite"}}/>
            <span style={{fontSize:11,color:"#AFA9EC",textTransform:"uppercase",letterSpacing:".1em",fontWeight:500}}>
              {alertAiLoading?"Generating emergency advisory...":"AI Emergency Advisory · "+cur.n}
            </span>
          </div>
          <div style={{fontSize:13,color:"#CECBF6",lineHeight:1.8}}>
            {alertAiText}
            {alertAiLoading&&<span style={{display:"inline-block",width:8,height:14,background:"#534AB7",marginLeft:3,verticalAlign:"middle",animation:"pulse 0.9s infinite"}}/>}
          </div>
          {!alertAiLoading && alertAiText && (
            <div style={{marginTop:12,display:"flex",gap:8,flexWrap:"wrap"}}>
              {[{label:"IMD Website",url:"https://imd.gov.in"},{label:"Disaster Helpline: 1078",url:null},{label:"NDRF: 011-24363260",url:null}].map((x,i)=>(
                <div key={i} style={{fontSize:11,padding:"5px 12px",borderRadius:10,background:"#26215C",color:"#CECBF6",border:"1px solid #534AB7",fontWeight:500}}>{x.label}</div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Individual Alert Cards */}
      {alerts.length > 0 && (
        <div style={{marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:500,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>⚠️ Active weather alerts</div>
          {alerts.map((a,i)=><AlertCard key={i} alert={a}/>)}
        </div>
      )}

      {/* No alerts — safe banner */}
      {alerts.length === 0 && (
        <div style={{borderRadius:12,padding:"10px 16px",background:"#E1F5EE",border:"1.5px solid #5DCAA5",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:20}}>✅</span>
          <div>
            <div style={{fontSize:13,fontWeight:500,color:"#085041"}}>No active weather alerts for {cur.n}</div>
            <div style={{fontSize:11,color:"#0F6E56",marginTop:1}}>Storm risk: {cur.stormRisk}% · Conditions are currently safe</div>
          </div>
        </div>
      )}

      {/* Hero + Stats */}
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.2fr) minmax(0,0.8fr)",gap:12,marginBottom:12}}>
        <div className="pop" style={{borderRadius:16,padding:"1.25rem",background:heroBg,border:`1.5px solid ${heroBorder}`}}>
          <div style={{fontSize:48,lineHeight:1,marginBottom:8}}>{cur.ic}</div>
          <div style={{fontSize:17,fontWeight:600,color:"var(--color-text-primary)"}}>{cur.c}</div>
          <div style={{fontSize:12,color:"var(--color-text-secondary)",marginBottom:6}}>{cur.n}{cur.r==="UT"?" (UT)":", India"}</div>
          <div style={{fontSize:50,fontWeight:600,color:"var(--color-text-primary)",lineHeight:1,marginBottom:4}}>{cur.t}°C</div>
          <div style={{fontSize:13,color:"var(--color-text-secondary)"}}>{cur.d}</div>
          <div style={{fontSize:11,color:"var(--color-text-tertiary)",marginTop:3}}>Feels {feels}°C · Rain {cur.rain}% · Storm risk {cur.stormRisk}%</div>
        </div>
        <div style={{borderRadius:16,padding:"1.25rem",display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,alignContent:"start"}}>
          {[
            {label:"Wind",val:cur.w,unit:" km/h",bg:"#E1F5EE",bd:"#5DCAA5",lc:"#0F6E56",vc:"#085041"},
            {label:"Humidity",val:cur.h,unit:"%",bg:"#E6F1FB",bd:"#85B7EB",lc:"#185FA5",vc:"#0C447C"},
            {label:"UV index",val:cur.uv,unit:cur.uv<=2?" low":cur.uv<=5?" mod":cur.uv<=7?" high":" v.hi",bg:"#FAEEDA",bd:"#EF9F27",lc:"#854F0B",vc:"#633806"},
            {label:"Storm risk",val:cur.stormRisk,unit:"%",bg:cur.stormRisk>60?"#FCEBEB":cur.stormRisk>30?"#FAEEDA":"#E1F5EE",bd:cur.stormRisk>60?"#E24B4A":cur.stormRisk>30?"#EF9F27":"#5DCAA5",lc:cur.stormRisk>60?"#A32D2D":cur.stormRisk>30?"#854F0B":"#0F6E56",vc:cur.stormRisk>60?"#501313":cur.stormRisk>30?"#633806":"#085041"},
          ].map(x=>(
            <div key={x.label} style={{borderRadius:10,padding:"10px 12px",background:x.bg,border:`1px solid ${x.bd}`}}>
              <div style={{fontSize:11,fontWeight:500,textTransform:"uppercase",letterSpacing:".07em",color:x.lc,marginBottom:4}}>{x.label}</div>
              <div style={{fontSize:19,fontWeight:600,color:x.vc}}>{x.val}<span style={{fontSize:11,fontWeight:400}}>{x.unit}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Indices */}
      <div style={{borderRadius:16,padding:"1.25rem",background:"var(--color-background-primary)",border:"1px solid var(--color-border-tertiary)",marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:500,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:14}}>✦ AI weather indices</div>
        {indexMeta.map(m=><IndexBar key={m.label} {...m}/>)}
        <div style={{marginTop:12,padding:"12px 16px",borderRadius:12,background:"#EEEDFE",border:"1px solid #AFA9EC",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {[
            {label:"Overall score",val:overall+"/100"},
            {label:"Best for",val:indices.outdoor>65?"Outdoors":indices.travel>65?"Travel":indices.sleep>65?"Rest":"Indoors"},
            {label:"Alert level",val:alerts.length>0?alerts[0].level:"Safe"},
          ].map(x=>(
            <div key={x.label} style={{textAlign:"center"}}>
              <div style={{fontSize:11,color:"#534AB7",fontWeight:500,marginBottom:3}}>{x.label}</div>
              <div style={{fontSize:15,fontWeight:600,color:x.label==="Alert level"&&alerts.length>0?"#E24B4A":"#26215C"}}>{x.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insight */}
      <div style={{borderRadius:16,padding:"1.25rem",background:"#26215C",border:"1.5px solid #534AB7",marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:aiLoading?"#EF9F27":"#9FE1CB",animation:aiLoading?"pulse 0.9s infinite":"none"}}/>
          <span style={{fontSize:11,color:"#AFA9EC",textTransform:"uppercase",letterSpacing:".1em",fontWeight:500}}>
            {aiLoading?"Generating...":"AI insight · "+cur.n}
          </span>
        </div>
        <div style={{fontSize:14,color:"#CECBF6",lineHeight:1.8,minHeight:56}}>
          {aiText}
          {aiLoading&&<span style={{display:"inline-block",width:8,height:14,background:"#534AB7",marginLeft:3,verticalAlign:"middle",animation:"pulse 0.9s infinite"}}/>}
        </div>
        <button onClick={()=>fetchAI(cur)} disabled={aiLoading}
          style={{marginTop:10,fontSize:12,color:"#9FE1CB",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",padding:0}}>↻ Refresh</button>
      </div>

      {/* Hourly */}
      <div style={{borderRadius:16,padding:"1.25rem",background:"var(--color-background-primary)",border:"1px solid var(--color-border-tertiary)",marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:500,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:12}}>Hourly forecast</div>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
          {HR_T.map((h,i)=>{
            const tmp=cur.t+h.d,ic=i===0?cur.ic:h.d>1?"☀️":h.d>-2?"⛅":h.d>-5?"☁️":"🌧️";
            const cs=[
              {bg:"#534AB7",bd:"#3C3489",tc:"#EEEDFE"},
              {bg:"#EAF3DE",bd:"#97C459",tc:"#27500A"},
              {bg:"#E1F5EE",bd:"#5DCAA5",tc:"#085041"},
              {bg:"#E6F1FB",bd:"#85B7EB",tc:"#0C447C"},
              {bg:"#FAEEDA",bd:"#EF9F27",tc:"#633806"},
              {bg:"#FBEAF0",bd:"#ED93B1",tc:"#72243E"},
            ][i];
            return(
              <div key={i} style={{flex:"0 0 auto",textAlign:"center",padding:"10px 14px",borderRadius:12,minWidth:68,background:cs.bg,border:`1.5px solid ${cs.bd}`}}>
                <div style={{fontSize:11,color:cs.tc,marginBottom:5,opacity:.8}}>{h.t}</div>
                <div style={{fontSize:20,lineHeight:1}}>{ic}</div>
                <div style={{fontSize:14,fontWeight:600,marginTop:5,color:cs.tc}}>{tmp}°</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly */}
      <div style={{borderRadius:16,padding:"1.25rem",background:"var(--color-background-primary)",border:"1px solid var(--color-border-tertiary)",marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:500,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:12}}>7-day forecast</div>
        {WK.map((d,i)=>{
          const hi=cur.t+d.h,lo=cur.t+d.l,ic=i===0?cur.ic:d.h>1?"☀️":d.h>-2?"⛅":"🌧️";
          const pct=Math.max(15,Math.min(100,((hi-lo)/15)*100)),isA=activeDay===i;
          return(
            <div key={i} onClick={()=>setActiveDay(i)}
              style={{display:"flex",alignItems:"center",padding:"7px 8px",borderRadius:10,cursor:"pointer",marginBottom:3,background:isA?"#EEEDFE":"transparent",border:`1.5px solid ${isA?"#AFA9EC":"transparent"}`}}>
              <div style={{fontSize:13,color:isA?"#534AB7":"var(--color-text-secondary)",width:42,fontWeight:isA?500:400}}>{d.d}</div>
              <div style={{fontSize:16,width:28,textAlign:"center"}}>{ic}</div>
              <div style={{flex:1}}/>
              <div style={{fontSize:12,color:"var(--color-text-tertiary)",width:28,textAlign:"right"}}>{lo}°</div>
              <div style={{width:72,height:4,background:"var(--color-background-secondary)",borderRadius:2,margin:"0 8px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:WEEK_BARS[cur.col]||"#378ADD",borderRadius:2}}/>
              </div>
              <div style={{fontSize:13,fontWeight:500,color:isA?"#534AB7":"var(--color-text-primary)",width:28,textAlign:"right"}}>{hi}°</div>
            </div>
          );
        })}
      </div>

      {/* All States */}
      <div style={{borderRadius:16,padding:"1.25rem",background:"var(--color-background-primary)",border:"1px solid var(--color-border-tertiary)"}}>
        <div style={{fontSize:11,fontWeight:500,color:"var(--color-text-secondary)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:14}}>All states & union territories</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
          {REGIONS.map(reg=>{
            const rs=REG_STYLES[reg],isA=activeReg===reg;
            return(<div key={reg} onClick={()=>setActiveReg(reg)}
              style={{padding:"5px 13px",borderRadius:20,fontSize:12,fontWeight:500,cursor:"pointer",background:isA?rs.bg:"var(--color-background-secondary)",color:isA?rs.color:"var(--color-text-secondary)",border:`1.5px solid ${isA?rs.border:"transparent"}`}}>{reg}</div>);
          })}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(128px,1fr))",gap:8}}>
          {filtered.map(s=>{
            const st=CHIP_STYLES[s.col]||CHIP_STYLES.sunny,isSel=s.n===cur.n;
            const sAlerts=computeAlerts(s);
            return(
              <div key={s.n} onClick={()=>pick(s)}
                style={{borderRadius:12,padding:"10px 12px",cursor:"pointer",background:st.bg,border:`${isSel?"2px":"1.5px"} solid ${sAlerts.length>0?"#E24B4A":st.border}`,transition:"transform 0.12s",transform:isSel?"scale(1.03)":"scale(1)",position:"relative"}}>
                {sAlerts.length>0&&<div style={{position:"absolute",top:6,right:6,width:8,height:8,borderRadius:"50%",background:"#E24B4A",animation:"pulse 1.5s infinite"}}/>}
                <div style={{fontSize:12,fontWeight:500,color:st.name,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",paddingRight:10}}>{s.n}</div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
                  <span style={{fontSize:18,fontWeight:600,color:st.temp}}>{s.t}°</span>
                  <span style={{fontSize:14}}>{s.ic}</span>
                </div>
                <div style={{fontSize:11,color:st.desc,marginTop:2}}>{s.d}</div>
                {sAlerts.length>0&&<div style={{fontSize:10,color:"#A32D2D",marginTop:3,fontWeight:500}}>⚠️ {sAlerts.length} alert{sAlerts.length>1?"s":""}</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{textAlign:"center",fontSize:11,color:"var(--color-text-tertiary)",marginTop:14,lineHeight:1.7}}>
        Demo data · AI alerts from meteorological formulas · Claude insight on demand<br/>
        For real emergencies: IMD imd.gov.in · NDRF helpline 1078
      </div>
    </div>
  );
}
