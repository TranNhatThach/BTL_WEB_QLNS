const CHAMCONG_KEY = 'chamcong_data';
const LUONG_KEY = 'luong_data';

let employees = JSON.parse(localStorage.getItem(NV_KEY)) || [];
function saveEmployees() {
  localStorage.setItem(NV_KEY, JSON.stringify(employees));
  syncChamCong();
  syncLuong();
}
function syncChamCong() {
  const chamCong = JSON.parse(localStorage.getItem(CHAMCONG_KEY)) || [];
  employees.forEach(nv => {
    if (!chamCong.find(c => c.maNV === nv.maNV)) {
      chamCong.push({
        maNV: nv.maNV,
        hoTen: nv.hoTen,
        phongBan: nv.phongBan,
        gioiTinh: nv.gioiTinh,
        lichSu: []
      });
    }
  });
  const filtered = chamCong.filter(c => employees.some(nv => nv.maNV === c.maNV));
  localStorage.setItem(CHAMCONG_KEY, JSON.stringify(filtered));
}

function syncLuong() {
  const luong = JSON.parse(localStorage.getItem(LUONG_KEY)) || [];
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  employees.forEach(nv => {
    if (!luong.find(l => l.maNV === nv.maNV && l.month === month && l.year === year)) {
      luong.push({
        maNV: nv.maNV,
        hoTen: nv.hoTen,
        month,
        year,
        base: nv.luongCoBan || 8000000,
        bonus: 500000,
        deduct: 0
      });
    }
  });

  const filtered = luong.filter(l => employees.some(nv => nv.maNV === l.maNV));
  localStorage.setItem(LUONG_KEY, JSON.stringify(filtered));
}

const tblBody = document.getElementById('tblBody');
const searchBox = document.getElementById('searchBox');
const filterPhongBan = document.getElementById('filterPhongBan');
const filterGioiTinh = document.getElementById('filterGioiTinh');
const exportBtn = document.getElementById('exportBtn');

const fab = document.getElementById('floatingAdd');
const slidePanel = document.getElementById('slidePanel');
const closePanel = document.getElementById('closePanel');
const employeeForm = document.getElementById('employeeForm');
const panelTitle = document.getElementById('panelTitle');

const editIndex = document.getElementById('editIndex');
const maNV = document.getElementById('maNV');
const hoTen = document.getElementById('hoTen');
const gioiTinh = document.getElementById('gioiTinh');
const ngaySinh = document.getElementById('ngaySinh');
const trangThai = document.getElementById('trangThai');
const phongBanSelect = document.getElementById('phongBanSelect');
const chucVuSelect = document.getElementById('chucVuSelect');
const trinhDoSelect = document.getElementById('trinhDoSelect');
const chuyenMonSelect = document.getElementById('chuyenMonSelect');
const bangCapSelect = document.getElementById('bangCapSelect');
const cccd = document.getElementById('cccd');
const hoKhau = document.getElementById('hoKhau');
const luongCoBan = document.getElementById('luongCoBan');
const avatarFile = document.getElementById('avatarFile');
const avatarPreview = document.getElementById('avatarPreview');
const removeAvatar = document.getElementById('removeAvatar');

function init() {
  refreshMaster();
  populateFilterPhongBan();
  renderTable();
  attachEvents();
  syncChamCong();
  syncLuong();
}

function attachEvents() {
  searchBox.addEventListener('input', renderTable);
  filterPhongBan.addEventListener('change', renderTable);
  filterGioiTinh.addEventListener('change', renderTable);
  exportBtn.addEventListener('click', exportExcel);

  fab.addEventListener('click', openAddPanel);
  closePanel.addEventListener('click', closePanelFn);
  document.getElementById('btnCancel').addEventListener('click', closePanelFn);
  employeeForm.addEventListener('submit', onSaveEmployee);

  avatarFile.addEventListener('change', onAvatarSelected);
  removeAvatar.addEventListener('click', () => {
    avatarPreview.src = '';
    avatarPreview.dataset.base = '';
    avatarFile.value = '';
  });

  const closeView = document.getElementById('closeView');
  if (closeView)
    closeView.addEventListener('click', () =>
      document.getElementById('viewModal').classList.remove('open')
    );

  document.querySelectorAll('.add-cat').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      const val = prompt(`Nhập tên ${cat} mới:`)?.trim();
      if (!val) return;
      if (window.Data && typeof Data.addTo === 'function') {
        Data.addTo(cat, val);
      } else {
        const all = JSON.parse(localStorage.getItem('master_data_v1')) || {};
        if (!all[cat]) all[cat] = [];
        if (!all[cat].includes(val)) all[cat].push(val);
        localStorage.setItem('master_data_v1', JSON.stringify(all));
      }
      refreshMaster();
      alert(`Đã thêm ${cat}: ${val}`);
    });
  });
}

function onAvatarSelected(e) {
  const f = e.target.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    avatarPreview.src = ev.target.result;
    avatarPreview.dataset.base = ev.target.result;
  };
  reader.readAsDataURL(f);
}

function refreshMaster() {
  const m = Data.getAll();
  fillSelect(phongBanSelect, m.phongBan);
  fillSelect(chucVuSelect, m.chucVu);
  fillSelect(trinhDoSelect, m.trinhDo);
  fillSelect(chuyenMonSelect, m.chuyenMon);
  fillSelect(bangCapSelect, m.bangCap);
}

function fillSelect(sel, arr) {
  sel.innerHTML = '';
  arr.forEach((v) => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.text = v;
    sel.appendChild(opt);
  });
}

function renderTable() {
  tblBody.innerHTML = '';
  const q = (searchBox.value || '').toLowerCase();
  const fp = filterPhongBan.value;
  const fg = filterGioiTinh.value;

  const filtered = employees.filter((nv) => {
    const matchSearch =
      !q ||
      (nv.hoTen && nv.hoTen.toLowerCase().includes(q)) ||
      (nv.maNV && nv.maNV.toLowerCase().includes(q));
    const matchPB = !fp || nv.phongBan === fp;
    const matchG = !fg || nv.gioiTinh === fg;
    return matchSearch && matchPB && matchG;
  });

  filtered.forEach((nv, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${escapeHtml(nv.maNV || '')}</td>
      <td>${nv.avatar ? `<img class="avatar-small" src="${nv.avatar}">` : `<div class="avatar-small" style="background:#f1f5f9;width:44px;height:44px;border-radius:6px"></div>`}</td>
      <td>${escapeHtml(nv.hoTen || '')}</td>
      <td>${escapeHtml(nv.gioiTinh || '')}</td>
      <td>${escapeHtml(nv.phongBan || '')}</td>
      <td>${escapeHtml(nv.chucVu || '')}</td>
      <td class="text-center">${nv.trangThai ? `<span class="status ${nv.trangThai === 'Đã nghỉ việc' ? 'status-danger' : 'status-active'}">${nv.trangThai}</span>` : ''}</td>
      <td class="text-center">
        <button class="small-btn info" onclick="onView(${employees.indexOf(nv)})">👁</button>
        <button class="small-btn" onclick="onEdit(${employees.indexOf(nv)})">✏</button>
        <button class="small-btn danger" onclick="onDelete(${employees.indexOf(nv)})">🗑</button>
      </td>`;
    tblBody.appendChild(tr);
  });

  populateFilterPhongBan();
  localStorage.setItem(NV_KEY, JSON.stringify(employees));
}

function populateFilterPhongBan() {
  const m = Data.getAll();
  filterPhongBan.innerHTML = `<option value="">-- Phòng ban --</option>`;
  m.phongBan.forEach((v) => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.text = v;
    filterPhongBan.appendChild(opt);
  });
}

function openAddPanel() {
  editIndex.value = '';
  employeeForm.reset();
  avatarPreview.src = '';
  avatarPreview.dataset.base = '';
  panelTitle.textContent = 'Thêm nhân viên';
  slidePanel.classList.add('open');
}

function closePanelFn() {
  slidePanel.classList.remove('open');
}

function onSaveEmployee(e) {
  e.preventDefault();
  if (!maNV.value.trim() || !hoTen.value.trim()) {
    alert('Nhập Mã NV và Họ tên.');
    return;
  }

  const payload = {
    maNV: maNV.value.trim(),
    hoTen: hoTen.value.trim(),
    gioiTinh: gioiTinh.value,
    ngaySinh: ngaySinh.value,
    trangThai: trangThai.value,
    phongBan: phongBanSelect.value,
    chucVu: chucVuSelect.value,
    trinhDo: trinhDoSelect.value,
    chuyenMon: chuyenMonSelect.value,
    bangCap: bangCapSelect.value,
    cccd: cccd.value.trim(),
    hoKhau: hoKhau.value.trim(),
    luongCoBan: Number(luongCoBan.value) || 0,
    avatar: avatarPreview.dataset.base || ''
  };

  if (editIndex.value) employees[Number(editIndex.value)] = payload;
  else employees.push(payload);

  saveEmployees();
  renderTable();
  closePanelFn();
}

function onEdit(i) {
  const nv = employees[i];
  if (!nv) return;
  editIndex.value = i;
  maNV.value = nv.maNV || '';
  hoTen.value = nv.hoTen || '';
  gioiTinh.value = nv.gioiTinh || 'Nam';
  ngaySinh.value = nv.ngaySinh || '';
  trangThai.value = nv.trangThai || 'Đang làm việc';
  phongBanSelect.value = nv.phongBan || '';
  chucVuSelect.value = nv.chucVu || '';
  trinhDoSelect.value = nv.trinhDo || '';
  chuyenMonSelect.value = nv.chuyenMon || '';
  bangCapSelect.value = nv.bangCap || '';
  cccd.value = nv.cccd || '';
  hoKhau.value = nv.hoKhau || '';
  luongCoBan.value = nv.luongCoBan || '';
  avatarPreview.src = nv.avatar || '';
  avatarPreview.dataset.base = nv.avatar || '';
  panelTitle.textContent = 'Chỉnh sửa nhân viên';
  slidePanel.classList.add('open');
}

function onView(i) {
  const nv = employees[i];
  if (!nv) return;

  const modal = document.getElementById('viewModal');
  const content = document.getElementById('viewContent');
  const avatar = nv.avatar
    ? `<img src="${nv.avatar}" style="width:140px;height:180px;border-radius:8px;object-fit:cover;border:1px solid #ccc;margin-right:20px;">`
    : '<div style="width:140px;height:180px;background:#f1f5f9;border-radius:8px;margin-right:20px;"></div>';

  content.innerHTML = `
    <h3 style="margin-bottom:10px;color:#1e293b;border-bottom:1px solid #ddd;padding-bottom:4px;">Thông tin nhân viên</h3>
    <div style="display:flex;align-items:flex-start;gap:20px;margin-top:10px;">
      ${avatar}
      <div style="line-height:1.8;font-size:15px;flex:1;">
        <p><strong>Mã NV:</strong> ${nv.maNV}</p>
        <p><strong>Họ tên:</strong> ${nv.hoTen}</p>
        <p><strong>Giới tính:</strong> ${nv.gioiTinh}</p>
        <p><strong>Ngày sinh:</strong> ${nv.ngaySinh || '—'}</p>
        <p><strong>Phòng ban:</strong> ${nv.phongBan || '—'}</p>
        <p><strong>Chức vụ:</strong> ${nv.chucVu || '—'}</p>
        <p><strong>Trình độ:</strong> ${nv.trinhDo || '—'}</p>
        <p><strong>Chuyên môn:</strong> ${nv.chuyenMon || '—'}</p>
        <p><strong>Bằng cấp:</strong> ${nv.bangCap || '—'}</p>
        <p><strong>Số CCCD:</strong> ${nv.cccd || '—'}</p>
        <p><strong>Hộ khẩu:</strong> ${nv.hoKhau || '—'}</p>
        <p><strong>Lương cơ bản:</strong> ${nv.luongCoBan ? nv.luongCoBan.toLocaleString('vi-VN') + ' ₫' : 'Chưa có'}</p>
        <p><strong>Trạng thái:</strong>
          <span class="status ${nv.trangThai === 'Đã nghỉ việc' ? 'status-danger' : 'status-active'}">
            ${nv.trangThai}
          </span>
        </p>
      </div>
    </div>`;
  modal.classList.add('open');
}


function onDelete(i) {
  if (!confirm('Xóa nhân viên này?')) return;
  employees.splice(i, 1);
  saveEmployees();
  renderTable();
}

function exportExcel() {
  if (!employees || employees.length === 0) {
    alert('Không có dữ liệu để xuất');
    return;
  }
  const data = employees.map((nv) => ({
    'Mã NV': nv.maNV,
    'Họ tên': nv.hoTen,
    'Giới tính': nv.gioiTinh,
    'Ngày sinh': nv.ngaySinh,
    'Phòng ban': nv.phongBan,
    'Chức vụ': nv.chucVu,
    'Trạng thái': nv.trangThai,
    'CCCD': nv.cccd,
    'Hộ khẩu': nv.hoKhau,
    'Lương cơ bản': nv.luongCoBan || ''
  }));
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'NhanVien');
  XLSX.writeFile(wb, 'DanhSachNhanVien.xlsx');
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

window.addEventListener('DOMContentLoaded', init);
window.onEdit = onEdit;
window.onDelete = onDelete;
window.onView = onView;

const logoutLink = document.querySelector('.foot');
if (logoutLink) {
  logoutLink.addEventListener('click', function (e) {
    e.preventDefault();
    sessionStorage.removeItem('loggedIn');
    location.replace(logoutLink.href);
  });
}

