/* ============================================================
   admin.js – CMS Logic: Auth, CRUD, Export/Import
   ============================================================ */

// ---- Auth guard ----
if (localStorage.getItem('tlv_admin_auth') !== 'true') {
  window.location.href = 'login.html';
}

// ---- Load user info ----
const currentUser = JSON.parse(localStorage.getItem('tlv_admin_user') || '{}');
document.getElementById('userName').textContent    = currentUser.name || 'Admin';
document.getElementById('userRole').textContent    = roleLabel(currentUser.role);
document.getElementById('userAvatar').textContent  = (currentUser.name || 'A')[0].toUpperCase();

function roleLabel(r) {
  return r === 'super' ? '⭐ Super Admin' : r === 'admin' ? '🔴 Quản trị viên' : '🔵 Thành viên';
}

function logout() {
  localStorage.removeItem('tlv_admin_auth');
  localStorage.removeItem('tlv_admin_user');
  window.location.href = 'login.html';
}

/* ============================================================
   DATA STORE – Load từ localStorage, fallback về dữ liệu gốc
   ============================================================ */

// Load script gốc để lấy dữ liệu mặc định nếu localStorage chưa có
let LOCATIONS_DATA = [];
let FESTIVALS_DATA = [];

function initData() {
  // Thử load từ localStorage
  const savedLoc  = localStorage.getItem('tlv_locations');
  const savedFest = localStorage.getItem('tlv_festivals');

  if (savedLoc) {
    LOCATIONS_DATA = JSON.parse(savedLoc);
  } else {
    // Fetch từ map.js để lấy LOCATIONS mặc định
    LOCATIONS_DATA = getDefaultLocations();
    localStorage.setItem('tlv_locations', JSON.stringify(LOCATIONS_DATA));
  }

  if (savedFest) {
    FESTIVALS_DATA = JSON.parse(savedFest);
  } else {
    FESTIVALS_DATA = getDefaultFestivals();
    localStorage.setItem('tlv_festivals', JSON.stringify(FESTIVALS_DATA));
  }

  updateStats();
  renderLocations();
  renderFestivals();
  updateBadges();
}

function saveLocations() {
  localStorage.setItem('tlv_locations', JSON.stringify(LOCATIONS_DATA));
  updateStats();
  updateBadges();
  logActivity('Đã cập nhật danh sách địa điểm');
}

function saveFestivals() {
  localStorage.setItem('tlv_festivals', JSON.stringify(FESTIVALS_DATA));
  updateStats();
  updateBadges();
  logActivity('Đã cập nhật danh sách lễ hội');
}

function updateStats() {
  document.getElementById('stat-loc').textContent  = LOCATIONS_DATA.length;
  document.getElementById('stat-fest').textContent = FESTIVALS_DATA.length;
  document.getElementById('stat-den').textContent  = LOCATIONS_DATA.filter(l => l.type === 'den').length;
  document.getElementById('stat-chua').textContent = LOCATIONS_DATA.filter(l => l.type === 'chua').length;
}

function updateBadges() {
  document.getElementById('badge-loc').textContent  = LOCATIONS_DATA.length;
  document.getElementById('badge-fest').textContent = FESTIVALS_DATA.length;
}

/* ============================================================
   DEFAULT DATA – Sao chép từ map.js và calendar.js
   ============================================================ */

function getDefaultLocations() {
  // Trả về mảng rỗng – dữ liệu sẽ được tải từ ../js/map.js
  // Nếu chạy admin panel độc lập, load script động
  return [];
}

function getDefaultFestivals() {
  return [];
}

// Load dữ liệu gốc từ các file JS của website
function loadFromSourceFiles() {
  return new Promise((resolve) => {
    // Tạo iframe ẩn để load script và lấy data
    const s1 = document.createElement('script');
    s1.src = '../js/map.js';
    s1.onload = () => {
      if (typeof LOCATIONS !== 'undefined') LOCATIONS_DATA = [...LOCATIONS];
      const s2 = document.createElement('script');
      s2.src = '../js/calendar.js';
      s2.onload = () => {
        if (typeof FESTIVALS !== 'undefined') FESTIVALS_DATA = [...FESTIVALS];
        resolve();
      };
      document.head.appendChild(s2);
    };
    document.head.appendChild(s1);
  });
}

/* ============================================================
   NAVIGATION
   ============================================================ */

const PAGE_TITLES = {
  dashboard: '📊 Bảng Điều Khiển',
  locations: '📍 Quản Lý Địa Điểm',
  festivals: '🎋 Quản Lý Lễ Hội',
  rituals:   '📖 Nghi Lễ & Văn Khấn',
  users:     '👥 Tài Khoản Người Dùng',
  export:    '💾 Xuất / Nhập Dữ Liệu',
  guide:     '📚 Hướng Dẫn Sử Dụng'
};

function showPage(pageId) {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick') && n.getAttribute('onclick').includes("'" + pageId + "'")) {
      n.classList.add('active');
    }
  });

  document.getElementById('topbarTitle').textContent = PAGE_TITLES[pageId] || pageId;
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

/* ============================================================
   LOCATIONS – CRUD
   ============================================================ */

function renderLocations() {
  const search = (document.getElementById('searchLoc').value || '').toLowerCase();
  const type   = document.getElementById('filterLocType').value;
  const prov   = document.getElementById('filterLocProv').value;

  const filtered = LOCATIONS_DATA.filter(l => {
    const matchSearch = !search || l.name.toLowerCase().includes(search) || (l.address||'').toLowerCase().includes(search);
    const matchType   = type === 'all' || l.type === type;
    const matchProv   = prov === 'all' || l.province === prov;
    return matchSearch && matchType && matchProv;
  });

  const tbody = document.getElementById('locTableBody');
  document.getElementById('locCount').textContent = `${filtered.length} địa điểm`;

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">📭</div><p>Không tìm thấy địa điểm phù hợp</p></div></td></tr>`;
    return;
  }

  const typeLabel = { den: '🏮 Đền', chua: '🪷 Chùa', dinh: '🏛️ Đình' };
  const provNames = { hanoi:'Hà Nội', phutho:'Phú Thọ', bacninh:'Bắc Ninh', quangninh:'Quảng Ninh', haiphong:'Hải Phòng', hungyen:'Hưng Yên', langson:'Lạng Sơn', yenbai:'Yên Bái' };

  tbody.innerHTML = filtered.map(loc => `
    <tr>
      <td><img class="thumb-sm" src="${loc.img || ''}" alt="${loc.name}" onerror="this.style.display='none'"></td>
      <td><strong style="color:var(--text)">${loc.name}</strong></td>
      <td><span class="type-badge badge-${loc.type}">${typeLabel[loc.type] || loc.type}</span></td>
      <td style="font-size:0.8rem">${provNames[loc.province] || loc.province || ''}</td>
      <td style="font-size:0.78rem;color:var(--text-dim);max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${loc.address || ''}</td>
      <td style="font-size:0.8rem">${loc.hours || '–'}</td>
      <td>
        <div class="action-btns">
          <button class="btn-icon edit" onclick="editLocation(${loc.id})" title="Sửa">✏️</button>
          <button class="btn-icon del"  onclick="deleteLocation(${loc.id})" title="Xoá">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddLocation() {
  document.getElementById('modalLocTitle').textContent = '➕ Thêm Địa Điểm Mới';
  clearForm(['locId','locName','locAddress','locLat','locLng','locHours','locMapUrl','locImg','locDesc']);
  document.getElementById('locType').value = 'den';
  document.getElementById('locProvince').value = 'hanoi';
  hideImgPreview('locImgPreview');
  openModal('modalLocation');
}

function editLocation(id) {
  const loc = LOCATIONS_DATA.find(l => l.id === id);
  if (!loc) return;
  document.getElementById('modalLocTitle').textContent = '✏️ Sửa Địa Điểm';
  document.getElementById('locId').value       = loc.id;
  document.getElementById('locName').value     = loc.name || '';
  document.getElementById('locType').value     = loc.type || 'den';
  document.getElementById('locProvince').value = loc.province || 'hanoi';
  document.getElementById('locAddress').value  = loc.address || '';
  document.getElementById('locLat').value      = loc.lat || '';
  document.getElementById('locLng').value      = loc.lng || '';
  document.getElementById('locHours').value    = loc.hours || '';
  document.getElementById('locMapUrl').value   = loc.mapUrl || '';
  document.getElementById('locImg').value      = loc.img || '';
  document.getElementById('locDesc').value     = loc.desc || '';
  previewImg('locImg', 'locImgPreview');
  openModal('modalLocation');
}

function saveLocation() {
  const name    = document.getElementById('locName').value.trim();
  const address = document.getElementById('locAddress').value.trim();
  const lat     = parseFloat(document.getElementById('locLat').value);
  const lng     = parseFloat(document.getElementById('locLng').value);
  const desc    = document.getElementById('locDesc').value.trim();

  if (!name || !address || !lat || !lng || !desc) {
    showToast('Vui lòng điền đầy đủ các trường bắt buộc (*)', 'error');
    return;
  }

  const idVal   = document.getElementById('locId').value;
  const provMap = { hanoi:'Hà Nội', phutho:'Phú Thọ', bacninh:'Bắc Ninh', quangninh:'Quảng Ninh', haiphong:'Hải Phòng', hungyen:'Hưng Yên', langson:'Lạng Sơn', yenbai:'Yên Bái', namdinh:'Nam Định', ninhbinh:'Ninh Bình', thaibinh:'Thái Bình', thanhhoa:'Thanh Hóa', hanam:'Hà Nam' };
  const prov    = document.getElementById('locProvince').value;

  const obj = {
    id:           idVal ? parseInt(idVal) : nextId(LOCATIONS_DATA),
    name:         name,
    type:         document.getElementById('locType').value,
    province:     prov,
    provinceName: provMap[prov],
    lat:          lat,
    lng:          lng,
    address:      address,
    hours:        document.getElementById('locHours').value.trim(),
    img:          document.getElementById('locImg').value.trim(),
    desc:         desc,
    mapUrl:       document.getElementById('locMapUrl').value.trim()
  };

  if (idVal) {
    const idx = LOCATIONS_DATA.findIndex(l => l.id === parseInt(idVal));
    if (idx !== -1) { LOCATIONS_DATA[idx] = obj; showToast('Đã cập nhật địa điểm: ' + name, 'success'); }
  } else {
    LOCATIONS_DATA.push(obj);
    showToast('Đã thêm địa điểm: ' + name, 'success');
  }

  saveLocations();
  renderLocations();
  closeModal('modalLocation');
}

function deleteLocation(id) {
  const loc = LOCATIONS_DATA.find(l => l.id === id);
  showConfirm('🗑️ Xoá Địa Điểm', `Bạn có chắc muốn xoá "<strong>${loc.name}</strong>"? Hành động này không thể hoàn tác.`, () => {
    LOCATIONS_DATA = LOCATIONS_DATA.filter(l => l.id !== id);
    saveLocations();
    renderLocations();
    showToast('Đã xoá địa điểm: ' + loc.name, 'info');
  });
}

/* ============================================================
   FESTIVALS – CRUD
   ============================================================ */

function renderFestivals() {
  const search = (document.getElementById('searchFest').value || '').toLowerCase();
  const prov   = document.getElementById('filterFestProv').value;

  const filtered = FESTIVALS_DATA.filter(f => {
    const matchSearch = !search || f.name.toLowerCase().includes(search) || (f.location||'').toLowerCase().includes(search);
    const matchProv   = prov === 'all' || f.province === prov;
    return matchSearch && matchProv;
  }).sort((a,b) => (a.lunarMonth*100 + a.lunarDay) - (b.lunarMonth*100 + b.lunarDay));

  const tbody = document.getElementById('festTableBody');
  document.getElementById('festCount').textContent = `${filtered.length} lễ hội`;

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">📭</div><p>Không tìm thấy lễ hội phù hợp</p></div></td></tr>`;
    return;
  }

  const lunarMonths = ['', 'Giêng','Hai','Ba','Tư','Năm','Sáu','Bảy','Tám','Chín','Mười','Mười Một','Chạp'];

  tbody.innerHTML = filtered.map(f => `
    <tr>
      <td><img class="thumb-sm" src="${f.img || ''}" alt="${f.name}" onerror="this.style.display='none'"></td>
      <td><strong style="color:var(--text)">${f.name}</strong></td>
      <td style="font-size:0.78rem;color:var(--text-dim)">${f.location || ''}</td>
      <td style="font-size:0.8rem">${f.lunarDay}/${lunarMonths[f.lunarMonth] || f.lunarMonth}</td>
      <td style="font-size:0.8rem">${f.provinceName || f.province || ''}</td>
      <td><span class="type-badge badge-blue" style="font-size:0.68rem">${f.type || ''}</span></td>
      <td style="text-align:center">${f.highlight ? '⭐' : '–'}</td>
      <td>
        <div class="action-btns">
          <button class="btn-icon edit" onclick="editFestival(${f.id})" title="Sửa">✏️</button>
          <button class="btn-icon del"  onclick="deleteFestival(${f.id})" title="Xoá">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddFestival() {
  document.getElementById('modalFestTitle').textContent = '➕ Thêm Lễ Hội Mới';
  clearForm(['festId','festName','festType','festLocation','festLunarDay','festLunarMonth','festSolarDay','festSolarMonth','festDuration','festImg','festDesc']);
  document.getElementById('festProvince').value  = 'hanoi';
  document.getElementById('festHighlight').checked = false;
  hideImgPreview('festImgPreview');
  openModal('modalFestival');
}

function editFestival(id) {
  const f = FESTIVALS_DATA.find(x => x.id === id);
  if (!f) return;
  document.getElementById('modalFestTitle').textContent  = '✏️ Sửa Lễ Hội';
  document.getElementById('festId').value          = f.id;
  document.getElementById('festName').value        = f.name || '';
  document.getElementById('festProvince').value    = f.province || 'hanoi';
  document.getElementById('festType').value        = f.type || '';
  document.getElementById('festLocation').value    = f.location || '';
  document.getElementById('festLunarDay').value    = f.lunarDay || '';
  document.getElementById('festLunarMonth').value  = f.lunarMonth || '';
  document.getElementById('festSolarDay').value    = f.solarDay || '';
  document.getElementById('festSolarMonth').value  = f.solarMonth || '';
  document.getElementById('festDuration').value    = f.duration || '';
  document.getElementById('festImg').value         = f.img || '';
  document.getElementById('festDesc').value        = f.desc || '';
  document.getElementById('festHighlight').checked = !!f.highlight;
  previewImg('festImg', 'festImgPreview');
  openModal('modalFestival');
}

function saveFestival() {
  const name = document.getElementById('festName').value.trim();
  const desc = document.getElementById('festDesc').value.trim();
  if (!name || !desc) {
    showToast('Vui lòng điền tên và mô tả lễ hội', 'error');
    return;
  }

  const idVal   = document.getElementById('festId').value;
  const provMap = { hanoi:'Hà Nội', phutho:'Phú Thọ', bacninh:'Bắc Ninh', quangninh:'Quảng Ninh', haiphong:'Hải Phòng', hungyen:'Hưng Yên', langson:'Lạng Sơn', yenbai:'Yên Bái', namdinh:'Nam Định', ninhbinh:'Ninh Bình', thaibinh:'Thái Bình', thanhhoa:'Thanh Hóa', hanam:'Hà Nam' };
  const prov    = document.getElementById('festProvince').value;

  const obj = {
    id:           idVal ? parseInt(idVal) : nextId(FESTIVALS_DATA),
    name:         name,
    province:     prov,
    provinceName: provMap[prov],
    type:         document.getElementById('festType').value.trim(),
    location:     document.getElementById('festLocation').value.trim(),
    lunarDay:     parseInt(document.getElementById('festLunarDay').value) || 1,
    lunarMonth:   parseInt(document.getElementById('festLunarMonth').value) || 1,
    solarDay:     parseInt(document.getElementById('festSolarDay').value) || 1,
    solarMonth:   parseInt(document.getElementById('festSolarMonth').value) || 1,
    solarYear:    2026,
    duration:     document.getElementById('festDuration').value.trim(),
    img:          document.getElementById('festImg').value.trim(),
    desc:         desc,
    highlight:    document.getElementById('festHighlight').checked
  };

  if (idVal) {
    const idx = FESTIVALS_DATA.findIndex(x => x.id === parseInt(idVal));
    if (idx !== -1) { FESTIVALS_DATA[idx] = obj; showToast('Đã cập nhật lễ hội: ' + name, 'success'); }
  } else {
    FESTIVALS_DATA.push(obj);
    showToast('Đã thêm lễ hội: ' + name, 'success');
  }

  saveFestivals();
  renderFestivals();
  closeModal('modalFestival');
}

function deleteFestival(id) {
  const f = FESTIVALS_DATA.find(x => x.id === id);
  showConfirm('🗑️ Xoá Lễ Hội', `Bạn có chắc muốn xoá "<strong>${f.name}</strong>"?`, () => {
    FESTIVALS_DATA = FESTIVALS_DATA.filter(x => x.id !== id);
    saveFestivals();
    renderFestivals();
    showToast('Đã xoá lễ hội: ' + f.name, 'info');
  });
}

/* ============================================================
   EXPORT / IMPORT
   ============================================================ */

function exportData(type) {
  let data, filename;
  if (type === 'json') {
    data = JSON.stringify({ locations: LOCATIONS_DATA, festivals: FESTIVALS_DATA }, null, 2);
    filename = 'tamlinhviet-data-' + today() + '.json';
  } else if (type === 'locations') {
    data = JSON.stringify(LOCATIONS_DATA, null, 2);
    filename = 'locations-' + today() + '.json';
  } else {
    data = JSON.stringify(FESTIVALS_DATA, null, 2);
    filename = 'festivals-' + today() + '.json';
  }
  downloadFile(data, filename, 'application/json');
  showToast('Đã xuất file: ' + filename, 'success');
}

function exportJS() {
  const locJS  = 'const LOCATIONS = ' + JSON.stringify(LOCATIONS_DATA, null, 2) + ';\n';
  const festJS = 'const FESTIVALS = ' + JSON.stringify(FESTIVALS_DATA, null, 2) + ';\n';
  const content = '/* Cập nhật: ' + new Date().toLocaleString('vi-VN') + ' */\n\n// map.js – LOCATIONS\n' + locJS + '\n\n// calendar.js – FESTIVALS\n' + festJS;

  document.getElementById('jsExportCard').style.display = '';
  document.getElementById('jsExportContent').textContent = content;
  showToast('Đã tạo mã JS. Sao chép và thay thế vào file tương ứng.', 'info');
}

function copyExportedJS() {
  const text = document.getElementById('jsExportContent').textContent;
  navigator.clipboard.writeText(text).then(() => showToast('Đã sao chép vào clipboard!', 'success'));
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.locations) {
        LOCATIONS_DATA = data.locations;
        localStorage.setItem('tlv_locations', JSON.stringify(LOCATIONS_DATA));
      }
      if (data.festivals) {
        FESTIVALS_DATA = data.festivals;
        localStorage.setItem('tlv_festivals', JSON.stringify(FESTIVALS_DATA));
      }
      // Handle single-array import
      if (Array.isArray(data)) {
        if (data[0] && 'lat' in data[0]) {
          LOCATIONS_DATA = data;
          localStorage.setItem('tlv_locations', JSON.stringify(data));
        } else if (data[0] && 'lunarMonth' in data[0]) {
          FESTIVALS_DATA = data;
          localStorage.setItem('tlv_festivals', JSON.stringify(data));
        }
      }
      updateStats(); updateBadges(); renderLocations(); renderFestivals();
      showToast('Nhập dữ liệu thành công!', 'success');
    } catch {
      showToast('File JSON không hợp lệ. Vui lòng kiểm tra lại.', 'error');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function confirmReset() {
  showConfirm('🗑️ Đặt Lại Dữ Liệu',
    'Hành động này sẽ <strong>xoá toàn bộ dữ liệu đã chỉnh sửa</strong> và khôi phục dữ liệu gốc từ file JS. Bạn có chắc không?',
    () => {
      localStorage.removeItem('tlv_locations');
      localStorage.removeItem('tlv_festivals');
      location.reload();
    }
  );
}

/* ============================================================
   ACTIVITY LOG
   ============================================================ */

function logActivity(text) {
  const list = document.getElementById('activityList');
  const item = document.createElement('div');
  item.className = 'activity-item';
  item.innerHTML = `
    <div class="activity-dot" style="background:var(--gold)"></div>
    <div>
      <div class="activity-text"><strong>${currentUser.name || 'Admin'}</strong>: ${text}</div>
      <div class="activity-time">${new Date().toLocaleTimeString('vi-VN')}</div>
    </div>
  `;
  list.insertBefore(item, list.firstChild);
  if (list.children.length > 8) list.removeChild(list.lastChild);
}

/* ============================================================
   UI HELPERS
   ============================================================ */

function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

function showConfirm(title, msg, onOk) {
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMsg').innerHTML = msg;
  document.getElementById('confirmOverlay').classList.add('open');
  const okBtn = document.getElementById('confirmOkBtn');
  okBtn.onclick = () => { closeConfirm(); onOk(); };
}

function closeConfirm() {
  document.getElementById('confirmOverlay').classList.remove('open');
}

function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'none'; toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3500);
}

function previewImg(inputId, previewId) {
  const url = document.getElementById(inputId).value.trim();
  const img = document.getElementById(previewId);
  if (url) {
    img.src = url;
    img.classList.add('show');
    img.onerror = () => img.classList.remove('show');
  } else {
    img.classList.remove('show');
  }
}

function hideImgPreview(previewId) {
  const img = document.getElementById(previewId);
  img.src = '';
  img.classList.remove('show');
}

function clearForm(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function nextId(arr) {
  return arr.length ? Math.max(...arr.map(x => x.id || 0)) + 1 : 1;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function downloadFile(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ============================================================
   INIT – Load dữ liệu khi trang sẵn sàng
   ============================================================ */

window.addEventListener('DOMContentLoaded', async () => {
  // Tải dữ liệu gốc từ file JS website nếu localStorage chưa có
  const hasLoc  = !!localStorage.getItem('tlv_locations');
  const hasFest = !!localStorage.getItem('tlv_festivals');

  if (!hasLoc || !hasFest) {
    try {
      await loadFromSourceFiles();
      if (!hasLoc  && LOCATIONS_DATA.length)  localStorage.setItem('tlv_locations',  JSON.stringify(LOCATIONS_DATA));
      if (!hasFest && FESTIVALS_DATA.length)   localStorage.setItem('tlv_festivals',  JSON.stringify(FESTIVALS_DATA));
    } catch(e) { /* Bỏ qua nếu không tải được */ }
  }

  initData();
  showToast('Chào mừng, ' + (currentUser.name || 'Admin') + '!', 'success');
});

// Responsive menu button
if (window.innerWidth <= 900) {
  document.getElementById('menuBtn').style.display = '';
}
window.addEventListener('resize', () => {
  document.getElementById('menuBtn').style.display = window.innerWidth <= 900 ? '' : 'none';
});

// Expose to HTML inline handlers
window.showPage       = showPage;
window.toggleSidebar  = toggleSidebar;
window.logout         = logout;
window.openAddLocation= openAddLocation;
window.editLocation   = editLocation;
window.saveLocation   = saveLocation;
window.deleteLocation = deleteLocation;
window.renderLocations= renderLocations;
window.openAddFestival= openAddFestival;
window.editFestival   = editFestival;
window.saveFestival   = saveFestival;
window.deleteFestival = deleteFestival;
window.renderFestivals= renderFestivals;
window.exportData     = exportData;
window.exportJS       = exportJS;
window.copyExportedJS = copyExportedJS;
window.importData     = importData;
window.confirmReset   = confirmReset;
window.closeModal     = closeModal;
window.closeConfirm   = closeConfirm;
window.previewImg     = previewImg;
