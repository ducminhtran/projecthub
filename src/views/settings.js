// ── SETTINGS VIEW ──

function renderSettings(){
  renderCategoryTable('stages');
  renderCategoryTable('priorities');
  renderCategoryTable('positions');
  renderCategoryTable('modules');
  renderCategoryTable('issueTypes');
  renderCategoryTable('issueStatuses');
  renderCategoryTable('confirmStatuses');
  rebuildTaskModalDropdowns();
}

function openSettingsSection(sec){
  if(sec === 'projects') sec = 'stages';
  document.querySelectorAll('.settings-nav-item').forEach(el=>el.classList.toggle('active',el.dataset.sec===sec));
  document.querySelectorAll('.settings-section').forEach(el=>el.classList.toggle('active',el.id==='sec-'+sec));
}

function renderCategoryTable(key){
  const tbody=document.getElementById(key+'-tbody');
  if(!tbody)return;
  if(key==='modules'){
    tbody.innerHTML=catalog.modules.map(item=>`<tr>
      <td><div style="display:flex;align-items:center;gap:8px"><input type="color" value="${item.color}" onchange="updateCatColor('modules','${item.id}',this.value)" style="width:28px;height:28px;padding:2px;border:1px solid var(--border2);border-radius:50%;cursor:pointer"><div class="color-dot" style="background:${item.color}"></div></div></td>
      <td><input value="${item.name}" onchange="updateCat('modules','${item.id}','name',this.value)" style="border:none;background:transparent;font-family:var(--font);font-size:13px;font-weight:600;color:var(--text);width:80px;padding:2px 4px;border-radius:var(--radius);text-transform:uppercase" onfocus="this.style.background='var(--bg2)'" onblur="this.style.background='transparent'" /></td>
      <td><input value="${item.fullName||''}" onchange="updateCat('modules','${item.id}','fullName',this.value)" style="border:none;background:transparent;font-family:var(--font);font-size:12px;color:var(--text2);width:100%;padding:2px 4px;border-radius:var(--radius)" onfocus="this.style.background='var(--bg2)'" onblur="this.style.background='transparent'" placeholder="Tên đầy đủ..." /></td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteCat('modules','${item.id}')">Xóa</button></td>
    </tr>`).join('');
    return;
  }
  tbody.innerHTML=catalog[key].map((item,i)=>`<tr>
    <td><div style="display:flex;align-items:center;gap:8px"><input type="color" value="${item.color}" onchange="updateCatColor('${key}','${item.id}',this.value)" style="width:28px;height:28px;padding:2px;border:1px solid var(--border2);border-radius:50%;cursor:pointer"><div class="color-dot" style="background:${item.color}"></div></div></td>
    <td><input value="${item.name}" onchange="updateCat('${key}','${item.id}','name',this.value)" style="border:none;background:transparent;font-family:var(--font);font-size:13px;color:var(--text);width:140px;padding:2px 4px;border-radius:var(--radius)" onfocus="this.style.background='var(--bg2)'" onblur="this.style.background='transparent'" /></td>
    <td><input value="${item.desc||''}" onchange="updateCat('${key}','${item.id}','desc',this.value)" style="border:none;background:transparent;font-family:var(--font);font-size:12px;color:var(--text2);width:100%;padding:2px 4px;border-radius:var(--radius)" onfocus="this.style.background='var(--bg2)'" onblur="this.style.background='transparent'" placeholder="Mô tả..." /></td>
    <td><button class="btn btn-sm btn-danger" onclick="deleteCat('${key}','${item.id}')">Xóa</button></td>
  </tr>`).join('');
}

function addCategory(key){
  const singular={stages:'stage',priorities:'priority',departments:'department',positions:'position',modules:'module',issueTypes:'issueType',issueStatuses:'issueStatus',confirmStatuses:'confirmStatus'}[key];
  if(!singular){ console.error('Unknown category key:', key); return; }
  const nameIn=document.getElementById(`new-${singular}-name`);
  const colorIn=document.getElementById(`new-${singular}-color`);
  const descIn=document.getElementById(`new-${singular}-desc`);
  if(!nameIn){ console.error('Input not found: new-'+singular+'-name'); return; }
  const name=(nameIn.value||'').trim();
  if(!name){ nameIn.focus(); return; }
  const newItem = {id:key+Date.now(),name,color:colorIn?colorIn.value:'#888',desc:descIn?descIn.value:''};
  if(key==='modules'){
    const fnIn = document.getElementById('new-module-fullname');
    newItem.fullName = fnIn ? fnIn.value.trim() : '';
    if(fnIn) fnIn.value='';
  }
  catalog[key].push(newItem);
  nameIn.value=''; if(descIn) descIn.value='';
  renderCategoryTable(key);
  rebuildFilterDropdowns();
  rebuildTaskModalDropdowns();
  if(key==='positions') rebuildMemberModalDropdowns();
  if(key==='modules'||key==='issueTypes'||key==='issueStatuses'||key==='confirmStatuses') rebuildIssueModalDropdowns();
  renderSidebarProjects();
  scheduleAutoSave();
  toast('Đã thêm!');
}

function updateCat(key,id,field,val){
  const item=catalog[key].find(x=>x.id===id);
  if(item){
    item[field]=val;
    rebuildFilterDropdowns();
    rebuildTaskModalDropdowns();
    if(key==='positions') rebuildMemberModalDropdowns();
  }
}

function updateCatColor(key,id,val){
  const item=catalog[key].find(x=>x.id===id);
  if(item){item.color=val;renderCategoryTable(key);}
}

async function deleteCat(key,id){
  const item=catalog[key].find(x=>x.id===id);if(!item)return;
  const ok=await confirm2('Xóa danh mục',`Bạn có chắc muốn xóa "${item.name}"? Các task đang dùng sẽ không bị ảnh hưởng.`);
  if(!ok)return;
  catalog[key]=catalog[key].filter(x=>x.id!==id);
  renderCategoryTable(key);
  rebuildFilterDropdowns();
  rebuildTaskModalDropdowns();
  if(key==='positions') rebuildMemberModalDropdowns();
  if(key==='modules'||key==='issueTypes'||key==='issueStatuses'||key==='confirmStatuses') rebuildIssueModalDropdowns();
  scheduleAutoSave();
  toast('Đã xóa!');
}
