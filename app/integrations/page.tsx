'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {createClient} from '@/lib/supabase/client';
import {ArrowLeft,ExternalLink,ShieldCheck,Plug,Mail,Code2,Cloud,CreditCard,Palette,Video} from 'lucide-react';

type Service={name:string;purpose:string;mode:string;env:string[];url:string;icon:any};
const services:Service[]=[
{name:'GitHub',purpose:'Repository access, issues and code activity',mode:'Read-only first',env:['GITHUB_CLIENT_ID','GITHUB_CLIENT_SECRET'],url:'https://github.com/settings/developers',icon:Code2},
{name:'Vercel',purpose:'Deployment health, build status and project monitoring',mode:'Read-only first',env:['VERCEL_CLIENT_ID','VERCEL_CLIENT_SECRET'],url:'https://vercel.com/account/tokens',icon:Cloud},
{name:'Supabase',purpose:'Project health, Auth and security-advisor monitoring',mode:'Read-only first',env:['SUPABASE_ACCESS_TOKEN'],url:'https://supabase.com/dashboard/account/tokens',icon:ShieldCheck},
{name:'Gmail',purpose:'Inbox summaries and draft preparation',mode:'Read-only first; sending requires approval',env:['GOOGLE_CLIENT_ID','GOOGLE_CLIENT_SECRET'],url:'https://console.cloud.google.com/apis/credentials',icon:Mail},
{name:'Stripe',purpose:'Revenue, payments and subscription reporting',mode:'Read-only first; refunds and changes disabled',env:['STRIPE_SECRET_KEY'],url:'https://dashboard.stripe.com/apikeys',icon:CreditCard},
{name:'PayPal',purpose:'Payment and transaction reporting',mode:'Read-only first; transfers disabled',env:['PAYPAL_CLIENT_ID','PAYPAL_CLIENT_SECRET'],url:'https://developer.paypal.com/dashboard/applications',icon:CreditCard},
{name:'Canva',purpose:'Brand assets and marketing design workflows',mode:'Approval before publishing',env:['CANVA_CLIENT_ID','CANVA_CLIENT_SECRET'],url:'https://www.canva.com/developers/',icon:Palette},
{name:'HeyGen',purpose:'Video creation and voice content workflows',mode:'Approval before generation or publishing',env:['HEYGEN_API_KEY'],url:'https://app.heygen.com/settings',icon:Video}
];
export default function IntegrationsPage(){
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{createClient().auth.getSession().then(({data})=>{if(!data.session)location.href='/login';else setLoaded(true);});},[]);
 if(!loaded)return <main className="integrations"><p>Checking your secure session…</p><style jsx global>{`
nav a{display:block;padding:13px;color:#9eacc1;border-radius:9px;font-size:13px;text-decoration:none}nav a:hover{background:#17263a;color:#8be9ff}
.integrations{min-height:100vh;max-width:1200px;margin:auto;padding:38px 28px;background:radial-gradient(ellipse at 80% 0%,#173052,transparent 38%),#080d18;color:#edf5ff}.integration-head>a{color:#8be9ff;text-decoration:none;font-size:13px}.integration-head>small{display:block;margin-top:28px;color:#79cce7;letter-spacing:2px;font-size:10px}.integration-head h1{font-size:34px;margin:12px 0}.integration-head p{color:#91a1b9;max-width:720px;line-height:1.6}.security-note{display:flex;gap:15px;padding:18px 20px;margin:25px 0;border:1px solid #31536b;border-radius:13px;background:#10243a;color:#8be9ff}.security-note p{margin:6px 0 0;color:#a8bbcf;font-size:13px;line-height:1.6}.integration-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.integration-card{padding:20px;border:1px solid #243950;border-radius:14px;background:#0e1727}.service-title{display:flex;align-items:center;gap:12px}.service-title>span{display:grid;place-items:center;width:42px;height:42px;border:1px solid #31516a;border-radius:11px;color:#8be9ff}.service-title h2{font-size:17px;margin:0}.service-title small{color:#e3bd75;font-size:11px}.integration-card>p{color:#a2b2c7;font-size:13px;min-height:36px;line-height:1.5}.mode{font-size:11px;color:#8be9ff;background:#12283a;padding:8px 10px;border-radius:7px;display:inline-block}.integration-card details{margin:14px 0;color:#b9c8d9;font-size:12px}.integration-card summary{cursor:pointer;color:#d7e8f7}.integration-card code{color:#8be9ff}.integration-card ul{padding-left:20px}.provider-link{display:inline-flex;align-items:center;gap:7px;color:#8be9ff;font-size:12px;text-decoration:none;margin-top:8px}.integration-foot{display:flex;align-items:center;gap:8px;color:#8295ac;font-size:12px;margin-top:24px}@media(max-width:700px){.integration-grid{grid-template-columns:1fr}.integrations{padding:25px 16px}}
`}</style></main>;
 return <main className="integrations">
 <header className="integration-head"><Link href="/">← Back to JARVIS</Link><small>STARIUXE ENTERPRISES / CONTROL PANEL</small><h1>Connected services</h1><p>Choose which services JARVIS may access. Connections are not active until each provider is configured and authorised.</p></header>
 <div className="security-note"><ShieldCheck/><div><b>Security by default</b><p>Start with read-only permissions. Keep credentials in Vercel Environment Variables, never in chat or browser code. JARVIS will request approval before sending, publishing, spending, refunding or changing settings.</p></div></div>
 <section className="integration-grid">{services.map(s=>{const Icon=s.icon;return <article className="integration-card" key={s.name}><div className="service-title"><span><Icon size={20}/></span><div><h2>{s.name}</h2><small>Not configured</small></div></div><p>{s.purpose}</p><div className="mode">{s.mode}</div><details><summary>Setup requirements</summary><p>Add these as server-side Vercel environment variables only:</p><ul>{s.env.map(e=><li key={e}><code>{e}</code></li>)}</ul><p>OAuth redirect URLs and least-privilege scopes must be registered before a live connection can be activated.</p></details><a className="provider-link" href={s.url} target="_blank" rel="noreferrer">Open provider setup <ExternalLink size={14}/></a></article>})}</section>
 <p className="integration-foot"><Plug size={15}/> These are setup guides, not live connections. No provider has been authorised by this page.</p>
 
 </main>;
}</main>;
 return <main className="integrations">
 <header className="integration-head"><Link href="/">← Back to JARVIS</Link><small>STARIUXE ENTERPRISES / CONTROL PANEL</small><h1>Connected services</h1><p>Choose which services JARVIS may access. Connections are not active until each provider is configured and authorised.</p></header>
 <div className="security-note"><ShieldCheck/><div><b>Security by default</b><p>Start with read-only permissions. Keep credentials in Vercel Environment Variables, never in chat or browser code. JARVIS will request approval before sending, publishing, spending, refunding or changing settings.</p></div></div>
 <section className="integration-grid">{services.map(s=>{const Icon=s.icon;return <article className="integration-card" key={s.name}><div className="service-title"><span><Icon size={20}/></span><div><h2>{s.name}</h2><small>Not configured</small></div></div><p>{s.purpose}</p><div className="mode">{s.mode}</div><details><summary>Setup requirements</summary><p>Add these as server-side Vercel environment variables only:</p><ul>{s.env.map(e=><li key={e}><code>{e}</code></li>)}</ul><p>OAuth redirect URLs and least-privilege scopes must be registered before a live connection can be activated.</p></details><a className="provider-link" href={s.url} target="_blank" rel="noreferrer">Open provider setup <ExternalLink size={14}/></a></article>})}</section>
 <p className="integration-foot"><Plug size={15}/> These are setup guides, not live connections. No provider has been authorised by this page.</p>
 </main>;
}
