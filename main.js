!function(){var e={663:function(e,t,a){"use strict";a.d(t,{Z:function(){return s}});class s{constructor(e,t,a,s="generic"){if("Character"===new.target.name)throw Error("Direct call to new Character() is not allowed");if(e<1)throw new Error("Invalid level");this.level=e,this.attack=t,this.defence=a,this.health=50,this.type=s,this.setLevelStats(e)}levelUp(){this.level++,this.attack=Math.floor(Math.max(this.attack,this.attack*((80+this.health)/100))),this.health=this.health+80<100?this.health+80:100}setLevelStats(e){this.attack=Math.floor(this.attack*(1+(e-1)/10)),this.defence=Math.floor(this.defence*(1+(e-1)/10))}}},450:function(e,t,a){"use strict";a.r(t);var s=a(663);class i extends s.Z{constructor(e){super(e,25,25,"Bowman"),this.moveDistance=2,this.attackDistance=2}}t.default=i},217:function(e,t,a){"use strict";a.r(t);var s=a(663);class i extends s.Z{constructor(e){super(e,10,10,"Daemon"),this.moveDistance=1,this.attackDistance=4}}t.default=i},856:function(e,t,a){"use strict";a.r(t);var s=a(663);class i extends s.Z{constructor(e){super(e,10,40,"Magician"),this.moveDistance=1,this.attackDistance=4}}t.default=i},269:function(e,t,a){"use strict";a.r(t);var s=a(663);class i extends s.Z{constructor(e){super(e,40,10,"Swordsman"),this.moveDistance=4,this.attackDistance=1}}t.default=i},242:function(e,t,a){"use strict";a.r(t);var s=a(663);class i extends s.Z{constructor(e){super(e,40,10,"Undead"),this.moveDistance=4,this.attackDistance=1}}t.default=i},427:function(e,t,a){"use strict";a.r(t);var s=a(663);class i extends s.Z{constructor(e){super(e,25,25,"Vampire"),this.moveDistance=2,this.attackDistance=2}}t.default=i},926:function(e,t,a){"use strict";a.r(t);var s=a(663);class i extends s.Z{constructor(e){super(e,10,25,"Zombie"),this.moveDistance=1,this.attackDistance=1}}t.default=i},831:function(e,t,a){var s={"./Bowman":450,"./Bowman.js":450,"./Daemon":217,"./Daemon.js":217,"./Magician":856,"./Magician.js":856,"./Swordsman":269,"./Swordsman.js":269,"./Undead":242,"./Undead.js":242,"./Vampire":427,"./Vampire.js":427,"./Zombie":926,"./Zombie.js":926};function i(e){var t=r(e);return a(t)}function r(e){if(!a.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}i.keys=function(){return Object.keys(s)},i.resolve=r,e.exports=i,i.id=831}},t={};function a(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={exports:{}};return e[s](r,r.exports,a),r.exports}a.d=function(e,t){for(var s in t)a.o(t,s)&&!a.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},function(){"use strict";class e{constructor(){this.boardSize=8,this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[],this.score=0,this.level=0}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}drawUi(e){this.checkBinding(),this.container.innerHTML=`\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n        <div class="score">Your level: ${this.level} Your score: ${Math.floor(this.score)}</div>\n      </div>\n      \n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    `,this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(e=>this.onNewGameClick(e))),this.saveGameEl.addEventListener("click",(e=>this.onSaveGameClick(e))),this.loadGameEl.addEventListener("click",(e=>this.onLoadGameClick(e))),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(e),this.boardEl.style.setProperty("--grid-columns",this.boardSize);for(let e=0;e<this.boardSize**2;e+=1){const s=document.createElement("div");s.classList.add("cell","map-tile","map-tile-"+(t=e,a=this.boardSize,0===t?"top-left":(t+1)/a===a?"bottom-right":(t+1)/a==1?"top-right":t/a==a-1?"bottom-left":(t+1)%a==0?"right":t%a==0?"left":t<a?"top":t>a*(a-1)?"bottom":"center")),s.addEventListener("mouseenter",(e=>this.onCellEnter(e))),s.addEventListener("mouseleave",(e=>this.onCellLeave(e))),s.addEventListener("click",(e=>this.onCellClick(e))),this.boardEl.appendChild(s)}var t,a;this.cells=Array.from(this.boardEl.children)}redrawPositions(e){for(const e of this.cells)e.innerHTML="";for(const a of e){const e=this.boardEl.children[a.position],s=document.createElement("div");s.classList.add("character",a.character.type);const i=document.createElement("div");i.classList.add("health-level");const r=document.createElement("div");r.classList.add("health-level-indicator","health-level-indicator-"+((t=a.character.health)<15?"critical":t<50?"normal":"high")),r.style.width=`${a.character.health}%`,i.appendChild(r),s.appendChild(i),e.appendChild(s),document.querySelector(".score").textContent=`Your level: ${this.level} Your score: ${Math.floor(this.score)}`}var t}addCellEnterListener(e){this.cellEnterListeners.push(e)}addCellLeaveListener(e){this.cellLeaveListeners.push(e)}addCellClickListener(e){this.cellClickListeners.push(e)}removeAllCellListeners(){this.cellEnterListeners=[],this.cellLeaveListeners=[],this.cellClickListeners=[]}addNewGameListener(e){this.newGameListeners.push(e)}addSaveGameListener(e){this.saveGameListeners.push(e)}addLoadGameListener(e){this.loadGameListeners.push(e)}onCellEnter(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach((e=>e.call(null,t)))}onCellLeave(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach((e=>e.call(null,t)))}onCellClick(e){const t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach((e=>e.call(null,t)))}onNewGameClick(e){e.preventDefault(),this.newGameListeners.forEach((e=>e.call(null)))}onSaveGameClick(e){e.preventDefault(),this.saveGameListeners.forEach((e=>e.call(null)))}onLoadGameClick(e){e.preventDefault(),this.loadGameListeners.forEach((e=>e.call(null)))}static showError(e){alert(e)}static showMessage(e){alert(e)}selectCell(e,t="yellow"){this.deselectCell(e),this.cells[e].classList.add("selected",`selected-${t}`)}deselectCell(e){const t=this.cells[e];t.classList.remove(...Array.from(t.classList).filter((e=>e.startsWith("selected"))))}deselectAllCells(){this.cells.forEach((e=>{e.classList.remove(...Array.from(e.classList).filter((e=>e.startsWith("selected"))))}))}showCellTooltip(e){const t=e.character;this.cells[e.position].title=`${t.type}\n🎖${t.level}⚔${t.attack}🛡${t.defence}❤${t.health}`}hideCellTooltip(e){this.cells[e].title=""}showDamage(e,t){return new Promise((a=>{const s=this.cells[e],i=document.createElement("span");i.textContent=t,i.classList.add("damage"),s.appendChild(i),i.addEventListener("animationend",(()=>{s.removeChild(i),a()}))}))}setCursor(e){this.boardEl.style.cursor=e}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}}var t={prairie:"prairie",desert:"desert",arctic:"arctic",mountain:"mountain"},s=a(663);class i{constructor(e,t){if(!(e instanceof s.Z))throw new Error("character must be instance of Character or its children");if("number"!=typeof t)throw new Error("position must be a number");this.character=e,this.position=t}}var r="auto",o="pointer",n="crosshair",l="not-allowed";function c(e,t){if("number"!=typeof t||t<4)throw new Error("There is wrong boardSize");if(!(e instanceof i))throw new Error("There must be a class type PositionedCharacter");const a=e.position,{moveDistance:s,attackDistance:r}=e.character,o=[],n=[],l=Math.floor(a/t),c=a%t;for(let e=-s;e<=s;e++)for(let a=-s;a<=s;a++)if(0===e||0===a||Math.abs(e)===Math.abs(a)){const s=l+e,i=c+a;if(s>=0&&s<t&&i>=0&&i<t){const e=s*t+i;o.push(e)}}for(let e=-r;e<=r;e++)for(let a=-r;a<=r;a++){const s=l+e,i=c+a;if(s>=0&&s<t&&i>=0&&i<t){const e=s*t+i;n.push(e)}}return{...e,move:o,attack:n}}function h(t,a){const{gamePlay:s}=a,i=a,r=c(t,s.boardSize),o=i.userPositionedCharacters.filter((e=>r.attack.includes(e.position))).sort(((e,t)=>e.character.health-t.character.health))[0];if(o){const e=Math.floor(Math.max(r.character.attack-o.character.defence,.1*r.character.attack));return void s.showDamage(o.position,e).then((()=>{o.character.health-=e,s.score-=e,o.character.health<=0&&(r.character.levelUp(),o===i.activeCharacter&&(s.score-=o.character.defence,i.activeCharacter=void 0,s.deselectAllCells()),i.userPositionedCharacters.splice(i.userPositionedCharacters.indexOf(o),1),i.userPositionedCharacters.length?s.redrawPositions([...i.userPositionedCharacters,...i.enemyPositionedCharacters]):i.nextLevel()),i.activeCharacter?s.selectCell(i.activeCharacter.position):s.deselectAllCells()}))}const n=r.move;for(;n;){const e=n.splice(Math.floor(Math.random()*n.length),1)[0];[...i.userPositionedCharacters,...i.enemyPositionedCharacters].filter((t=>t.position===e)).length||(i.enemyPositionedCharacters.find((e=>e.position===r.position)).position=e,s.redrawPositions([...i.userPositionedCharacters,...i.enemyPositionedCharacters]))}e.showMessage("Game over")}class d{constructor(e){this.characters=e}}function m(e,t,s){const i=Array.from({length:s},(()=>function*(e,t){const s=e[Math.floor(Math.random()*e.length)],i=Math.ceil(Math.random()*t),r=a(831)(`./${s}`).default;yield new r(i)}(e,t).next().value));return new d(i)}class u{constructor(e){if(!e)throw new Error("GameController instance is required");this.gameController=e}getPositionedCharacters(e){return e.map((e=>{const t=new(0,a(831)(`./${e.character.type}`).default)(e.character.level);return t.health=e.character.health,t.defence=e.character.defence,t.attack=e.character.attack,new i(t,e.position)}))}from(e){if(!e)throw new Error("Got wrong state");try{this.gameController.gamePlay.level=e.level,this.gameController.activeCharacter=void 0,this.gameController.gamePlay.boardSize=e.boardSize,this.gameController.gamePlay.score=e.score,this.gameController.userPositionedCharacters=this.getPositionedCharacters(e.userPositionedCharacters),this.gameController.enemyPositionedCharacters=this.getPositionedCharacters(e.enemyPositionedCharacters),this.gameController.gamePlay.deselectAllCells(),this.gameController.gamePlay.redrawPositions([...e.userPositionedCharacters,...e.enemyPositionedCharacters])}catch(e){throw new Error("Got wrong state data")}}}class C{constructor(e,t){this.gamePlay=e,this.userTypeCharacters=["Bowman","Swordsman","Magician"],this.enemyTypeCharacters=["Undead","Daemon","Vampire","Zombie"],this.activeCharacter=void 0,this.characterCount=5,this.stateService=t}init(){this.nextLevel(),this.gamePlay.addCellEnterListener((e=>{this.onCellEnter(e)})),this.gamePlay.addCellLeaveListener((e=>{this.onCellLeave(e)})),this.gamePlay.addCellClickListener((e=>{this.onCellClick(e)})),this.gamePlay.addNewGameListener((()=>{const t=new C(this.gamePlay,this.stateService);this.gamePlay.level=0,this.gamePlay.score=0,t.init(),e.showMessage("New Game loaded")})),this.gamePlay.addSaveGameListener((()=>{const t={level:this.gamePlay.level,boardSize:this.gamePlay.boardSize,userPositionedCharacters:this.userPositionedCharacters,enemyPositionedCharacters:this.enemyPositionedCharacters,score:this.gamePlay.score};this.stateService.save(t),e.showMessage("Game saved")})),this.gamePlay.addLoadGameListener((()=>{new u(this).from(this.stateService.load()),e.showMessage("Game loaded")}))}startPositionList(e,t,a=this.gamePlay.boardSize){const s=[];for(let e="user"===t?0:a-2;e<a**2-1;e+=a)s.push(e),s.push(e+1);return e.characters.map((e=>{const t=s[Math.floor(Math.random()*s.length)];return s.splice(s.indexOf(t),1),new i(e,t)}))}nextLevel(){this.gamePlay.level++,this.gamePlay.level>8?(e.showMessage("Game over"),this.gamePlay.removeAllCellListeners()):(this.gamePlay.drawUi(Object.values(t)[(this.gamePlay.level-1)%4]),this.userTeam=m(this.userTypeCharacters,this.gamePlay.level,this.characterCount),this.enemyTeam=m(this.enemyTypeCharacters,this.gamePlay.level,this.characterCount),this.userPositionedCharacters=this.startPositionList(this.userTeam,"user"),this.enemyPositionedCharacters=this.startPositionList(this.enemyTeam,"enemy"),this.gamePlay.deselectAllCells(),this.gamePlay.redrawPositions([...this.userPositionedCharacters,...this.enemyPositionedCharacters]))}onCellClick(e){let t=this.userPositionedCharacters.find((t=>t.position===e));const a=this.enemyPositionedCharacters.find((t=>t.position===e));if(t)this.activeCharacter===t?(this.gamePlay.deselectCell(e),this.activeCharacter=void 0):(this.gamePlay.deselectAllCells(),this.gamePlay.selectCell(e),this.activeCharacter=c(t,this.gamePlay.boardSize));else if(a){if(this.activeCharacter&&this.activeCharacter.attack.includes(e)){const t=this.activeCharacter.character.attack,s=Math.floor(Math.max(t-a.character.defence,.1*t));this.gamePlay.showDamage(e,s).then((()=>{a.character.health-=s,this.gamePlay.score+=s,a.character.health<=0&&(this.gamePlay.score+=a.character.defence,this.activeCharacter.character.levelUp(),this.enemyPositionedCharacters.splice(this.enemyPositionedCharacters.indexOf(a),1),this.enemyPositionedCharacters.length||this.nextLevel()),this.gamePlay.redrawPositions([...this.userPositionedCharacters,...this.enemyPositionedCharacters]),h(a,this)}))}}else if(this.activeCharacter&&this.activeCharacter.move.includes(e)){this.gamePlay.deselectCell(this.activeCharacter.position),t=this.userPositionedCharacters.find((e=>e.position===this.activeCharacter.position)),t.position=e,this.gamePlay.redrawPositions([...this.userPositionedCharacters,...this.enemyPositionedCharacters]),this.activeCharacter=c(t,this.gamePlay.boardSize),this.gamePlay.selectCell(e);const a=Math.floor(Math.random()*this.enemyPositionedCharacters.length);h(this.enemyPositionedCharacters[a],this)}}onCellEnter(e){const t=this.enemyPositionedCharacters.find((t=>t.position===e)),a=this.userPositionedCharacters.find((t=>t.position===e));this.activeCharacter&&(this.gamePlay.deselectAllCells(),this.gamePlay.selectCell(this.activeCharacter.position),t&&this.activeCharacter.attack.includes(e)?(this.gamePlay.setCursor(n),this.gamePlay.selectCell(e,"red")):a?this.gamePlay.setCursor(o):t||a||!this.activeCharacter.move.includes(e)?this.gamePlay.setCursor(l):(this.gamePlay.setCursor(o),this.gamePlay.selectCell(e,"green"))),t&&this.gamePlay.showCellTooltip(t),a&&this.gamePlay.showCellTooltip(a)}onCellLeave(e){this.gamePlay.hideCellTooltip(e),this.gamePlay.deselectCell(e),this.gamePlay.setCursor(r)}}const v=new e;v.bindToDOM(document.querySelector("#game-container"));const f=new class{constructor(e){this.storage=e}save(e){this.storage.setItem("state",JSON.stringify(e))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){throw new Error("Invalid state")}}}(localStorage);new C(v,f).init()}()}();