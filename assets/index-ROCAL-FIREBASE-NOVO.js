import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAXUhOYBGUGYd5_DjkwlEZfezyzk4ow8W0",
  authDomain: "rocal-98332.firebaseapp.com",
  projectId: "rocal-98332",
  storageBucket: "rocal-98332.firebasestorage.app",
  messagingSenderId: "747786696119",
  appId: "1:747786696119:web:50a1b6c6beab2e2cd32432",
  measurementId: "G-WZVMEC51PP"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const bancoRef = doc(db, "rocal", "producao_noturno");

(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`vinicius123`,t=`rocal_producoes_ts_v2`,n=[`m1`,`m2`,`m3`,`m4`,`m5`,`div`,`almox`],r={m1:`Máquina M1`,m2:`Máquina M2`,m3:`Máquina M3`,m4:`Máquina M4`,m5:`Máquina M5`,div:`Diversos`,almox:`Almoxarifado`},i=null,a=null,o=null,s=null,c=document.querySelector(`#app`);if(!c)throw Error(`Elemento #app não encontrado.`);var l=c;function u(){let e=new Date,t=e.getTimezoneOffset();return new Date(e.getTime()-t*6e4).toISOString().slice(0,10)}function d(e=`id`){return`${e}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function f(e){let t=document.querySelector(e);if(!t)throw Error(`Elemento não encontrado: ${e}`);return t}async function p(){try{let e=await getDoc(bancoRef);return e.exists()&&Array.isArray(e.data().registros)?e.data().registros:[]}catch(e){console.error(`Erro ao carregar Firebase:`,e),z?.(`Erro ao carregar dados do Firebase. Confira internet e regras do Firestore.`);return[]}}async function m(e){try{await setDoc(bancoRef,{registros:e,atualizadoEm:new Date().toISOString()},{merge:true})}catch(t){console.error(`Erro ao salvar Firebase:`,t),z?.(`Erro ao salvar no Firebase. Confira internet e regras do Firestore.`);throw t}}function h(e){let t=Number(String(e).replace(`,`,`.`));return Number.isFinite(t)?t:0}function g(e){return{date:new Intl.DateTimeFormat(`pt-BR`,{weekday:`long`,day:`2-digit`,month:`2-digit`,year:`numeric`}).format(e),time:new Intl.DateTimeFormat(`pt-BR`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}).format(e)}}function _(){l.innerHTML=`
    <div class="circuit">
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 100H300L400 200V500L450 550H600" stroke="#fde047" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="100" r="10" fill="#fde047"/><circle cx="600" cy="550" r="10" fill="#fde047"/>
        <path d="M200 100L300 200V400L350 450H500" stroke="#fde047" stroke-width="4" stroke-dasharray="10 15"/><circle cx="500" cy="450" r="6" fill="#fde047"/>
        <path d="M800 150L950 300H1200L1300 400V600" stroke="#fde047" stroke-width="4" stroke-linecap="round"/><circle cx="800" cy="150" r="10" fill="#fde047"/><circle cx="1300" cy="600" r="10" fill="#fde047"/>
        <rect x="900" y="450" width="120" height="120" rx="10" stroke="#fde047" stroke-width="4"/><line x1="900" y1="480" x2="860" y2="480" stroke="#fde047" stroke-width="4"/><line x1="1020" y1="480" x2="1060" y2="480" stroke="#fde047" stroke-width="4"/>
        <path d="M1400 800H1600L1750 650V300H1850" stroke="#fde047" stroke-width="4" stroke-linecap="round"/><circle cx="1400" cy="800" r="10" fill="#fde047"/><circle cx="1850" cy="300" r="10" fill="#fde047"/>
      </svg>
    </div>
    <div class="wrap">
      <header class="header">
        <div class="top">
          <div class="brand">ROCAL ELETRÔNICA</div>
          <aside class="clockBox">
            <div class="clockLabel">Data e horário atual</div>
            <div id="clock-date" class="clockDate">--</div>
            <div id="clock-time" class="clockTime">--:--:--</div>
          </aside>
        </div>
        <div class="sep"></div>
        <div class="bottom">
          <div class="title"><h1>NOTURNO</h1><p>Controle de produção</p></div>
          <nav class="tabs">
            <button id="tab-lancamento" class="tab active" data-tab="lancamento">Painel de Lançamento</button>
            <button id="tab-historico" class="tab" data-tab="historico">Datas Salvas (Histórico)</button>
          </nav>
        </div>
      </header>
      <div class="globalLine"></div>
      <main>
        <section id="view-lancamento" class="panel"></section>
        <section id="view-historico" class="panel hidden"></section>
      </main>
    </div>
    <div id="password-modal" class="modal hidden">
      <div class="modalBox">
        <h2 style="margin:0;color:#fde047;text-transform:uppercase">Confirmação de Segurança</h2>
        <p style="color:#a1a1aa;font-size:13px">Digite a senha para concluir esta operação.</p>
        <input id="password-input" type="password" placeholder="Senha de acesso" />
        <p id="password-error" class="hidden" style="color:#f87171;font-size:12px;font-weight:900">Senha inválida.</p>
        <div class="actions" style="margin-top:10px">
          <button id="cancel-password" class="secondary" type="button">Cancelar</button>
          <button id="confirm-password" class="primary" type="button">Confirmar</button>
        </div>
      </div>
    </div>
    <div id="toast" class="toast off"><span id="toast-text"></span> <button id="undo-delete" class="miniBtn hidden">Desfazer</button></div>
  `}function v(){let e=f(`#view-lancamento`);e.innerHTML=`
    <div class="panelHead">
      <div class="panelTitle"><h2 id="form-title">Registrar Lançamento</h2><p>Informe códigos, quantidades, materiais e ocorrências do turno.</p></div>
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
        <div class="turnDate"><span>Data do turno:</span><input id="turn-date" type="date" value="${u()}"></div>
        <span id="edit-badge" class="badgeEdit hidden">● MODO EDIÇÃO</span>
      </div>
    </div>
    <div id="machine-grid" class="grid"></div>
    <section class="almox">
      <h3>Controle de Almoxarifado — Insumos Retirados</h3>
      <div id="almox-card"></div>
    </section>
    <section class="notes">
      <h3>Bloco de Notas — Observações e Ocorrências do Turno</h3>
      <textarea id="turn-notes" placeholder="Exemplo: máquina parada, falta de material, retrabalho, manutenção, funcionário realocado, ocorrência de segurança, divergência de produção..."></textarea>
      <div class="noteHint">Esse campo será salvo no histórico, exportado no CSV e enviado no relatório do WhatsApp.</div>
    </section>
    <div class="actions">
      <button id="save-btn" class="primary">Gravar Produção no Banco</button>
      <button id="cancel-edit-btn" class="secondary hidden">Cancelar Edição</button>
    </div>
  `;let t=f(`#machine-grid`);n.filter(e=>e!==`almox`).forEach(e=>t.appendChild(y(e))),f(`#almox-card`).appendChild(y(`almox`)),n.forEach(e=>b(e,2))}function y(e){let t=document.createElement(`div`);return t.className=`card`,t.innerHTML=`
    <div class="cardHead">
      <div class="cardTitle">${r[e]}</div>
      <button class="miniBtn" data-add-row="${e}">+ Linha</button>
    </div>
    <div id="${e}-rows" class="rows"></div>
  `,t}function b(e,t){let n=f(`#${e}-rows`);n.innerHTML=``;for(let n=0;n<t;n++)x(e)}function x(e,t){let n=f(`#${e}-rows`),r=d(`${e}_row`),i=e===`almox`,a=document.createElement(`div`);a.id=r,a.className=`rowItem`,a.innerHTML=`
    <div class="rowTop">
      <span>${i?`Material retirado`:`Linha de produção`}</span>
      <button class="remove" data-remove-row="${r}" data-machine="${e}">× Remover</button>
    </div>
    <div class="inputGrid">
      <input class="input-code" type="text" placeholder="${i?`Cód. Material`:`Cód. Prod.`}" value="${t?.cod||``}" />
      <input class="input-qty" type="number" min="0" step="1" placeholder="Qtd." value="${t?.qtd||``}" />
    </div>
  `,n.appendChild(a)}function S(){let e=f(`#turn-date`).value,t=f(`#turn-notes`).value.trim(),r={},i=t.length>0;return n.forEach(e=>{let t=Array.from(f(`#${e}-rows`).querySelectorAll(`.rowItem`)).map(e=>{let t=e.querySelector(`.input-code`)?.value.trim().toUpperCase()||``,n=h(e.querySelector(`.input-qty`)?.value||`0`);return(t||n>0)&&(i=!0),{cod:t||`S/ COD`,qtd:n}});r[e]={total:t.reduce((e,t)=>e+t.qtd,0),detalhes:t}}),{record:{data:e,observacoes:t,valores:r},hasAnyData:i}}async function C(){let{record:e,hasAnyData:t}=S();if(!e.data)return z(`Defina uma data válida para o turno.`);if(!t)return z(`Preencha pelo menos uma produção, material ou observação.`);let n=await p();if(i){let t=n.findIndex(e=>e.id===i);if(t===-1)return z(`Registro de edição não localizado.`);n[t]={...n[t],...e,atualizadoEm:new Date().toISOString()},await m(n),j(),z(`Registro atualizado com sucesso.`)}else n.push({...e,id:d(`turno`),criadoEm:new Date().toISOString()}),await m(n),z(`Produção gravada com sucesso.`);w(),T(),k(`historico`)}function w(){f(`#turn-date`).value=u(),f(`#turn-notes`).value=``,n.forEach(e=>b(e,2))}async function T(){let e=f(`#view-historico`),t=await p();e.innerHTML=`
    <div class="panelHead">
      <div class="panelTitle"><h2>Datas Salvas</h2><p>Histórico consolidado dos turnos noturnos.</p></div>
      <button id="export-csv" class="secondary">Exportar CSV Detalhado</button>
    </div>
    <div id="history-list" class="historyList"></div>
  `;let n=f(`#history-list`);if(!t.length){n.innerHTML=`<div class="historyItem" style="padding:28px;text-align:center;color:#71717a;font-family:monospace">Nenhum turno registrado até o momento.</div>`;return}n.innerHTML=t.slice().reverse().map(e=>E(e)).join(``)}function E(e){let t=n.map(t=>({machine:t,total:e.valores?.[t]?.total||0})).filter(e=>e.total>0).map(e=>`<span>${e.machine.toUpperCase()}: ${e.total}</span>`).join(``);return`
    <article class="historyItem">
      <button class="historyHeader" data-toggle-details="${e.id}">
        <div style="display:flex;gap:12px;align-items:center">
          <div class="dateIcon">📅</div>
          <div><b style="color:#fff;font-family:monospace">Turno: ${e.data}</b><p style="margin:4px 0 0;color:#71717a;font-size:11px;text-transform:uppercase">Clique para ver detalhes completos</p></div>
        </div>
        <div class="summaryBadges">${t||`<span>Sem produção</span>`}</div>
      </button>
      <div id="details-${e.id}" class="details hidden">
        <div class="detailGrid">${n.map(t=>D(e,t)).join(``)}</div>
        <div class="detailCard" style="margin-top:14px">
          <div class="detailHead"><b>Observações e ocorrências</b></div>
          <p style="white-space:pre-wrap;margin:0;color:#d4d4d8;font-size:13px;line-height:1.55">${O(e.observacoes||`Sem observações registradas.`)}</p>
        </div>
        <div class="historyActions">
          <button class="smallAction whats" data-whatsapp="${e.id}">WhatsApp</button>
          <button class="smallAction edit" data-edit="${e.id}">Editar</button>
          <button class="smallAction delete" data-delete="${e.id}">Excluir</button>
        </div>
      </div>
    </article>
  `}function D(e,t){let n=e.valores?.[t]||{total:0,detalhes:[]},i=n.detalhes.filter(e=>e.cod!==`S/ COD`||e.qtd>0).map((e,t)=>`<div class="detailLine"><span>${t+1}. <b style="color:#fde047">${O(e.cod)}</b></span><b>${e.qtd}</b></div>`).join(``)||`<p style="color:#71717a;font-size:12px;font-style:italic">Sem movimentações</p>`;return`<div class="detailCard"><div class="detailHead"><b>${r[t]}</b><span>${n.total}</span></div>${i}</div>`}function O(e){return e.replace(/[&<>'"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,"'":`&#039;`,'"':`&quot;`})[e]||e)}function k(e){f(`#view-lancamento`).classList.toggle(`hidden`,e!==`lancamento`),f(`#view-historico`).classList.toggle(`hidden`,e!==`historico`),f(`#tab-lancamento`).classList.toggle(`active`,e===`lancamento`),f(`#tab-historico`).classList.toggle(`active`,e===`historico`),e===`historico`&&T()}async function A(e){let t=(await p()).find(t=>t.id===e);if(!t)return z(`Registro não localizado.`);i=e,f(`#turn-date`).value=t.data,f(`#turn-notes`).value=t.observacoes||``,f(`#form-title`).innerText=`Editar Registro de Turno`,f(`#edit-badge`).classList.remove(`hidden`),f(`#save-btn`).innerText=`Atualizar Lançamento no Banco`,f(`#cancel-edit-btn`).classList.remove(`hidden`),n.forEach(e=>{f(`#${e}-rows`).innerHTML=``;let n=t.valores?.[e]?.detalhes||[],r=Math.max(2,n.length);for(let t=0;t<r;t++)x(e,n[t])}),k(`lancamento`),window.scrollTo({top:0,behavior:`smooth`}),z(`Registro carregado para edição.`)}function j(){i=null,f(`#form-title`).innerText=`Registrar Lançamento`,f(`#edit-badge`).classList.add(`hidden`),f(`#save-btn`).innerText=`Gravar Produção no Banco`,f(`#cancel-edit-btn`).classList.add(`hidden`)}async function M(e){let t=await p(),n=t.findIndex(t=>t.id===e);if(n===-1)return z(`Registro não localizado.`);a={record:t[n],index:n},t.splice(n,1),await m(t),T(),z(`Lançamento apagado do histórico.`,!0)}async function N(){if(!a)return;let e=await p();e.splice(a.index,0,a.record),await m(e),a=null,T(),z(`Ação desfeita. Lançamento recuperado.`)}async function P(){let e=await p();if(!e.length)return z(`Não há lançamentos para exportar.`);let t=`Data,Criado em,Atualizado em,Maquina/Setor,Codigo,Quantidade,Total do Setor,Observacoes
`;e.forEach(e=>{n.forEach(n=>{let i=e.valores?.[n];if(!i)return;let a=i.detalhes.filter(e=>e.cod!==`S/ COD`||e.qtd>0);!a.length&&i.total<=0||a.forEach(a=>{t+=[e.data,e.criadoEm,e.atualizadoEm||``,r[n],a.cod,a.qtd,i.total,e.observacoes.replace(/\n/g,` `)].map(F).join(`,`)+`
`})})});let i=new Blob([`﻿`+t],{type:`text/csv;charset=utf-8;`}),a=URL.createObjectURL(i),o=document.createElement(`a`);o.href=a,o.download=`ROCAL_NOTURNO_${u()}.csv`,o.click(),URL.revokeObjectURL(a),z(`Arquivo CSV exportado.`)}function F(e){return`"${String(e??``).replace(/"/g,`""`)}"`}async function I(e){let t=(await p()).find(t=>t.id===e);if(!t)return z(`Registro não localizado.`);let i=`*⚙️ ROCAL NOTURNO - Relatório*\n*📅 Data:* ${t.data}\n*🕒 Gerado em:* ${g(new Date).date} - ${g(new Date).time}\n=============================\n\n`,a=!1;n.forEach(e=>{let n=t.valores?.[e];!n||n.total<=0||(a=!0,i+=`*${r[e].toUpperCase()}* (Total: *${n.total}*)\n`,n.detalhes.filter(e=>e.qtd>0).forEach((e,t)=>i+=`   └─ ${t+1}. [${e.cod}] Qtd: *${e.qtd}*\n`),i+=`
`)}),a||(i+=`_Sem produção registrada._

`),i+=`*📝 Observações/Ocorrências:*\n${t.observacoes||`Sem observações.`}\n\n=============================\n_Painel ROCAL ELETRÔNICA._`,window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(i)}`,`_blank`)}function L(e){o=e,f(`#password-input`).value=``,f(`#password-error`).classList.add(`hidden`),f(`#password-modal`).classList.remove(`hidden`),setTimeout(()=>f(`#password-input`).focus(),80)}function R(){let t=f(`#password-input`);if(t.value.trim()!==e){f(`#password-error`).classList.remove(`hidden`),t.select();return}f(`#password-modal`).classList.add(`hidden`);let n=o;o=null,n?.()}function z(e,t=!1){let n=f(`#toast`);f(`#toast-text`).textContent=e,f(`#undo-delete`).classList.toggle(`hidden`,!t),n.classList.remove(`off`),s&&window.clearTimeout(s),s=window.setTimeout(()=>n.classList.add(`off`),6e3)}function B(){let e=g(new Date);f(`#clock-date`).textContent=e.date,f(`#clock-time`).textContent=e.time}function V(){document.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`[data-tab]`)?.dataset.tab;n&&k(n);let r=t.closest(`[data-add-row]`)?.dataset.addRow;r&&x(r);let i=t.closest(`[data-remove-row]`);if(i){let e=i.dataset.machine,t=i.dataset.removeRow||``;if(f(`#${e}-rows`).querySelectorAll(`.rowItem`).length<=1)return z(`É necessário manter pelo menos uma linha ativa.`);document.getElementById(t)?.remove()}let a=t.closest(`[data-toggle-details]`)?.dataset.toggleDetails;a&&f(`#details-${a}`)?.classList.toggle(`hidden`);let o=t.closest(`[data-edit]`)?.dataset.edit;o&&L(()=>A(o));let s=t.closest(`[data-delete]`)?.dataset.delete;s&&L(()=>M(s));let c=t.closest(`[data-whatsapp]`)?.dataset.whatsapp;c&&I(c);t.closest(`#export-csv`)&&P()}),document.querySelector(`#save-btn`)?.addEventListener(`click`,()=>L(C)),document.querySelector(`#cancel-edit-btn`)?.addEventListener(`click`,()=>{j(),w()}),document.querySelector(`#cancel-password`)?.addEventListener(`click`,()=>f(`#password-modal`).classList.add(`hidden`)),document.querySelector(`#confirm-password`)?.addEventListener(`click`,R),document.querySelector(`#undo-delete`)?.addEventListener(`click`,()=>L(N)),document.querySelector(`#password-input`)?.addEventListener(`keydown`,e=>{e.key===`Enter`&&R()})}async function H(){try{_(),v(),B(),setInterval(B,1e3),V(),await T()}catch(e){console.error(`Erro ao iniciar o aplicativo:`,e);try{z(`Erro ao iniciar: ${e.message||e}`)}catch(t){}}}H();