import {createUsageClient} from './usage-client.b1f71eb7a396.mjs';
const config={"project":"nivika-nara-concept","origins":["https://nivika-nara-concept.vercel.app","https://nivika-nara-concept-chris-projects-b862c028.vercel.app"],"controls":true};
const usage=createUsageClient(config);
function mount(){
 if(!usage.active())return;
 globalThis.portfolioUsage=Object.freeze({send:usage.send});
 let section;
 if(config.controls!==false){
  const sv=document.documentElement.lang==='sv',ar=document.documentElement.lang==='ar';
  const element=(tag,text)=>{const node=document.createElement(tag);if(text)node.textContent=text;return node;};
  const words=ar?{
   title:'قياس الاستخدام اختياري',intro:'بإذن منك، نعد الزيارات وإجراءات المنتج لتحسين هذه الخدمة. لا نرسل هويتك أو رسائلك أو بيانات النماذج أو بيانات الدفع.',
   details:'الخصوصية وبيانات القياس',allow:'السماح بالقياس الاختياري',deny:'الرفض أو سحب الموافقة',on:'القياس الاختياري مسموح.',off:'القياس الاختياري متوقف.',signal:'إشارة الخصوصية في متصفحك توقف القياس.',error:'تعذر حفظ اختيارك. يبقى القياس متوقفاً.'
  }:sv?{
   title:'Valfri användningsmätning',intro:'Med ditt tillstånd räknar vi besök och produktåtgärder för att förbättra tjänsten. Din identitet, dina meddelanden, formuläruppgifter och betalningsuppgifter skickas inte.',
   details:'Integritet och mätuppgifter',allow:'Tillåt valfri mätning',deny:'Avstå eller återkalla',on:'Valfri mätning är tillåten.',off:'Valfri mätning är avstängd.',signal:'Din integritetssignal håller mätning avstängd.',error:'Valet kunde inte sparas. Mätning förblir avstängd.'
  }:{
   title:'Optional usage measurement',intro:'With your permission, we count visits and product actions to improve this service. Your identity, messages, form contents and payment details are not sent.',
   details:'Privacy and measurement details',allow:'Allow optional measurement',deny:'Decline or withdraw',on:'Optional measurement is allowed.',off:'Optional measurement is off.',signal:'Your browser privacy signal keeps measurement off.',error:'Could not save your choice. Measurement remains off.'
  };
  section=element('section');section.className='portfolio-usage';section.setAttribute('aria-label',words.title);
  section.append(element('h2',words.title),element('p',words.intro));
  const details=element('details');details.append(element('summary',words.details));
  details.append(element('p',ar?
   'مزود القياس هو Cloudflare, Inc. في الولايات المتحدة. نخزن عدادات مجمعة حسب الساعة في قاعدة بيانات داخل الاتحاد الأوروبي لمدة 30 يوماً، دون معرفات للزوار. يعالج Cloudflare عنوان IP عند نقل الطلب، ولا نخزنه في العدادات. يعتمد القياس على موافقتك. يحفظ المتصفح اختيارك لمدة 90 يوماً. يمكنك سحب الموافقة هنا في أي وقت دون فقدان الوصول. تُحترم إشارات Do Not Track وGlobal Privacy Control. لا توجد ملفات تعريف ارتباط للإعلانات أو تسجيل للجلسات.':sv?
   'Leverantör är Cloudflare, Inc. i USA. Vi lagrar sammanräknade timräknare i en databas inom EU i 30 dagar, utan besökaridentifierare. Cloudflare behandlar IP adressen när anropet överförs; den lagras inte i räknarna. Mätningen grundas på ditt samtycke. Webbläsaren sparar ditt val i 90 dagar. Återkalla här när som helst utan att förlora åtkomst. Do Not Track och Global Privacy Control respekteras. Inga annonskakor eller sessionsinspelningar används.':
   'Provider: Cloudflare, Inc., USA. We store aggregate hourly counters in an EU database for 30 days, without visitor identifiers. Cloudflare processes your IP address when handling the request; our counters do not store it. Measurement relies on your consent. Your browser remembers your choice for 90 days. Withdraw here at any time without losing access. Do Not Track and Global Privacy Control are respected. No advertising cookies or session recording are used.'));
  const policy=element('a',ar?'سياسة خصوصية Cloudflare':sv?'Cloudflares integritetspolicy':'Cloudflare privacy and international transfers');policy.href='https://www.cloudflare.com/privacypolicy/';details.append(policy);section.append(details);
  const status=element('p');status.setAttribute('role','status');section.append(status);
  const buttons=element('div');buttons.className='portfolio-usage-buttons';
  const deny=element('button',words.deny),allow=element('button',words.allow);deny.type=allow.type='button';buttons.append(deny,allow);section.append(buttons);document.body.append(section);
  const update=()=>{status.textContent=usage.blocked()?words.signal:usage.read()==='allow'?words.on:words.off;allow.disabled=usage.blocked();if(usage.read()==='allow')void usage.send();};
  deny.addEventListener('click',()=>{if(!usage.choose('deny'))status.textContent=words.error;else update();});
  allow.addEventListener('click',()=>{if(!usage.choose('allow'))status.textContent=words.error;else update();});
  globalThis.addEventListener('portfolio:usage-choice',update);globalThis.addEventListener('storage',update);update();
  const css=element('link');css.rel='stylesheet';css.href='/usage-style.11bc62efbee5.css';document.head.append(css);
 }else{
  const update=()=>{if(usage.read()==='allow')void usage.send();else usage.cancel();};
  globalThis.addEventListener('portfolio:usage-choice',update);globalThis.addEventListener('storage',update);update();
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
