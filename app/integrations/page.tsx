'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {createClient} from '@/lib/supabase/client';
import {ExternalLink,ShieldCheck,Plug,Mail,Code2,Cloud,CreditCard,Palette,Video} from 'lucide-react';

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
 useEffect(()=>{createClient().auth.getSession().then(({data})=>{if(!data.session)location.href='/login';else setLoaded(true);}).catch(()=>location.href='/login');},[]);
 if(!loaded)return <main className="integrations"><p>Checking your secure session…</p></main>;
 return <main className="integrations">
 <header className="integration-head"><Link href="/">← Back to JARVIS</Link><small>STARIUXE ENTERPRISES / CONTROL PANEL</small><h1>Connected services</h1><p>Choose which services JARVIS may access. Connections are not active until each provider is configured and authorised.</p></header>
 <div className="security-note"><ShieldCheck/><div><b>Security by default</b><p>Start with read-only permissions. Keep credentials in Vercel Environment Variables, never in chat or browser code. JARVIS will request approval before sending, publishing, spending, refunding or changing settings.</p></div></div>
 <section className="integration-grid">{services.map(s=>{const Icon=s.icon;return <article className="integration-card" key={s.name}><div className="service-title"><span><Icon size={20}/></span><div><h2>{s.name}</h2><small>Not configured</small></div></div><p>{s.purpose}</p><div className="mode">{s.mode}</div><details><summary>Setup requirements</summary><p>Add these as server-side Vercel environment variables only:</p><ul>{s.env.map(e=><li key={e}><code>{e}</code></li>)}</ul><p>OAuth redirect URLs and least-privilege scopes must be registered before a live connection can be activated.</p></details><a className="provider-link" href={s.url} target="_blank" rel="noreferrer">Open provider setup <ExternalLink size={14}/></a></article>})}</section>
 <p className="integration-foot"><Plug size={15}/> These are setup guides, not live connections. No provider has been authorised by this page.</p>
 </main>;
}
