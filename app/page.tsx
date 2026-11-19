'use client';
import {useEffect,useRef,useState} from 'react';
import {Mic,MicOff,Send,Volume2,Square,Activity,ShieldCheck,Bot,Plug,Command,Radio,AudioLines,Zap} from 'lucide-react';
import {createClient} from '@/lib/supabase/client';

type Message={role:'user'|'assistant';text:string};
export default function Home(){
 const [messages,setMessages]=useState<Message[]>([{role:'assistant',text:"At your service. Systems are standing by. What shall we work on?"}]);
 const [busy,setBusy]=useState(false),[input,setInput]=useState(''),[listening,setListening]=useState(false),[latency,setLatency]=useState<number|null>(null);
 const abortRef=useRef<AbortController|null>(null);
 useEffect(()=>{if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{});try{const supabase=createClient();supabase.auth.getSession().then(({data})=>{if(!data.session)window.location.href='/login';});}catch{window.location.href='/login';}},[]);
 function say(t:string){if(!('speechSynthesis'in window)||!t)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-GB';u.pitch=1.08;const v=speechSynthesis.getVoices().find(x=>/female|zira|samantha|aria|jenny/i.test(x.name));if(v)u.voice=v;speechSynthesis.speak(u);}
 async function send(q=input){
  if(!q.trim()||busy)return;
  const started=performance.now(),next:Message[]=[...messages,{role:'user',text:q},{role:'assistant',text:''}];
  setMessages(next);setInput('');setBusy(true);setLatency(null);
  const controller=new AbortController();abortRef.current=controller;
  try{
   const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:next.slice(0,-1).map(m=>({role:m.role,content:m.text}))}),signal:controller.signal});
   if(!res.ok){const data=await res.json().catch(()=>({}));throw new Error(data.error||'The assistant could not complete that request.');}
   if(!res.body)throw new Error('Streaming is unavailable in this browser.');
   const reader=res.body.getReader(),decoder=new TextDecoder();let buffer='',reply='';
   const append=(line:string)=>{if(!line.startsWith('data:'))return;const raw=line.slice(5).trim();if(!raw||raw==='[DONE]')return;try{const evt=JSON.parse(raw);if(evt.type==='response.output_text.delta'&&typeof evt.delta==='string'){reply+=evt.delta;setMessages(m=>{const copy=[...m];copy[copy.length-1]={role:'assistant',text:reply};return copy;});}if(evt.type==='error'||evt.type==='response.failed')throw new Error(evt.error?.message||evt.message||'The AI service returned an error.');}catch(e){if(e instanceof Error&&e.message!=='Unexpected end of JSON input')throw e;}};
   while(true){const part=await reader.read();if(part.done)break;buffer+=decoder.decode(part.value,{stream:true});const lines=buffer.split('\n');buffer=lines.pop()||'';for(const line of lines)append(line.trim());}
   if(buffer.trim())append(buffer.trim());
   if(!reply)throw new Error('No response text was received.');
   setLatency(Math.round(performance.now()-started));say(reply);
  }catch(e){if((e as Error).name!=='AbortError'){const message=(e as Error).message||'Connection failed. Please try again.';setMessages(m=>[...m.slice(0,-1),{role:'assistant',text:message}]);}}
  finally{setBusy(false);abortRef.current=null;}
 }
 function listen(){
  const SR=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
  if(!SR){setMessages(m=>[...m,{role:'assistant',text:'Voice input is not supported here. Please use Chrome or Edge.'}]);return;}
  if(listening){setListening(false);return;}
  const r=new SR();r.lang='en-GB';r.continuous=false;r.interimResults=true;
  r.onresult=(e:any)=>{const result=e.results[e.results.length-1];if(result.isFinal)send(result[0].transcript);};
  r.onend=()=>setListening(false);r.onerror=()=>setListening(false);r.start();setListening(true);
 }
 function stop(){abortRef.current?.abort();if('speechSynthesis'in window)window.speechSynthesis.cancel();setBusy(false);setListening(false);}
 return <main className="iron-shell">
  <aside className="iron-side"><div className="iron-brand"><b>J</b><span><strong>JARVIS</strong><small>STARIUXE INTELLIGENCE</small></span></div>
   <nav><a className="selected" href="/"> <Command/> Command centre</a><a href="/integrations"><Plug/> Connected services</a><a href="/"><Activity/> Intelligence</a><a href="/"><Bot/> AI workforce</a><a href="/"><ShieldCheck/> Security & approvals</a></nav>
   <div className="side-status"><i/> CORE ONLINE <small>SECURE SESSION</small></div>
  </aside>
  <article className="iron-main">
   <header className="iron-header"><div><small>STARIUXE ENTERPRISES / PERSONAL AI</small><h1>Command centre</h1><p>Your intelligent operations system.</p></div><div className="system-chip"><i/> ALL SYSTEMS READY</div></header>
   <section className="iron-hero">
    <div className="reactor-stage"><div className="reactor-grid"/><div className="reactor-orbit orbit-a"/><div className="reactor-orbit orbit-b"/><div className="reactor-orbit orbit-c"/><div className="reactor-core"><span/></div><div className="reactor-crosshair"/></div>
    <div className="hero-copy"><small><Zap size={13}/> PERSONAL AI SYSTEM</small><h2>At your service.</h2><p>Speak naturally. I can help you plan, research, build and coordinate your work.</p>
     <div className="hero-actions"><button onClick={listen} className={listening?'active':''}>{listening?<MicOff/>:<Mic/>}{listening?'Listening':'Voice command'}</button><button className="ghost" onClick={()=>say(String(messages[messages.length-1]?.text||''))}><Volume2/> Speak response</button><button className="stop-btn" onClick={stop} aria-label="Stop"><Square/></button></div>
     <div className="telemetry"><span><i className={busy?'pulse':''}/>{busy?'PROCESSING':'READY'}</span><span><AudioLines/> {latency===null?'LATENCY --':latency+' MS'}</span><span><Radio/> STREAMING</span></div>
    </div>
   </section>
   <section className="iron-grid">
    <div className="iron-panel conversation"><div className="panel-head"><h3><AudioLines/> Live interaction</h3><small>{busy?'GENERATING RESPONSE':'VOICE / TEXT'}</small></div>
     <div className="iron-messages">{messages.map((m,i)=><div className={'message '+m.role} key={i}><b>{m.role==='assistant'?'JARVIS':'YOU'}</b><p>{m.text||' '}{m.role==='assistant'&&busy&&i===messages.length-1?<span className="cursor"/>:null}</p></div>)}</div>
     <form onSubmit={e=>{e.preventDefault();send();}}><input value={input} onChange={e=>setInput(e.target.value)} placeholder={busy?'Processing…':'Enter a command…'} aria-label="Command input"/><button disabled={busy||!input.trim()} aria-label="Send command"><Send/></button></form>
    </div>
    <div className="iron-panel"><div className="panel-head"><h3><Activity/> Systems</h3><small>LIVE MODULES</small></div>
     <div className="module-row"><span><Bot/></span><div><b>AI reasoning</b><small>Vercel AI Gateway</small></div><i/></div>
     <div className="module-row"><span><ShieldCheck/></span><div><b>Authentication</b><small>Supabase secure session</small></div><i/></div>
     <div className="module-row"><span><Plug/></span><div><b>Integrations</b><small>Permission-based connections</small></div><i/></div>
     <div className="module-row"><span><Radio/></span><div><b>Response stream</b><small>Incremental output</small></div><i/></div>
     <div className="safety-note"><ShieldCheck/><span>External actions remain approval-gated. No secrets are exposed in the browser.</span></div>
    </div>
   </section>
   <footer>JARVIS · STARIUXE ENTERPRISES <span>SECURE SESSION · HUMAN APPROVAL REQUIRED</span></footer>
  </article>
 </main>;
}
