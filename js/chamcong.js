// --- Khai báo key ---
const NV_KEY = 'nhanviens_v1';
const CHAMCONG_KEY = 'chamcong_data';

// --- Đọc danh sách chấm công ---
function loadChamCong() {
  const chamCong = JSON.parse(localStorage.getItem(CHAMCONG_KEY)) || [];
  renderChamCong(chamCong);
}

// --- Hiển thị bảng ---
function renderChamCong(data) {
  const tbody = document.getElementById('attendanceBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  data.forEach((nv, i) => {
    const last = nv.lichSu && nv.lichSu.length > 0 ? nv.lichSu[nv.lichSu.length - 1] : null;
    const time = last ? last.gio : '-';
    const status = last ? last.trangThai : 'Chưa chấm';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${nv.maNV}</td>
      <td>${nv.hoTen}</td>
      <td>${nv.phongBan}</td>
      <td>${time}</td>
      <td><span class="status ${status === 'Đúng giờ' ? 'status-active' : status === 'Muộn' ? 'status-warning' : 'status-danger'}">${status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// --- Chấm công hôm nay ---
function chamCongHomNay() {
  const data = JSON.parse(localStorage.getItem(CHAMCONG_KEY)) || [];
  const now = new Date();
  const gio = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  data.forEach(nv => {
    const trangThai =
      now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 0)
        ? now.getHours() >= 10 ? 'Vắng' : 'Muộn'
        : 'Đúng giờ';
    nv.lichSu.push({ ngay: now.toLocaleDateString('vi-VN'), gio, trangThai });
  });

  localStorage.setItem(CHAMCONG_KEY, JSON.stringify(data));
  loadChamCong();
}

// --- Đồng bộ dữ liệu nhân viên ---
function dongBoChamCong() {
  const nhanviens = JSON.parse(localStorage.getItem(NV_KEY)) || [];
  let chamCong = JSON.parse(localStorage.getItem(CHAMCONG_KEY)) || [];

  nhanviens.forEach(nv => {
    if (!chamCong.find(c => c.maNV === nv.maNV)) {
      chamCong.push({ maNV: nv.maNV, hoTen: nv.hoTen, phongBan: nv.phongBan, lichSu: [] });
    }
  });

  chamCong = chamCong.filter(c => nhanviens.some(nv => nv.maNV === c.maNV));
  localStorage.setItem(CHAMCONG_KEY, JSON.stringify(chamCong));
  loadChamCong();
}

// --- Khởi tạo ---
document.addEventListener('DOMContentLoaded', () => {
  dongBoChamCong(); // tự đồng bộ khi tải trang
  loadChamCong();

  // Tạo thanh nút hành động
  const actionBar = document.querySelector('.action-bar') || document.body;
  const btnSync = document.createElement('button');
  btnSync.textContent = '🔄 Đồng bộ dữ liệu';
  btnSync.className = 'btn btn-sync';
  btnSync.onclick = dongBoChamCong;

  const btnCham = document.createElement('button');
  btnCham.textContent = '🕗 Chấm công hôm nay';
  btnCham.className = 'btn btn-checkin';
  btnCham.onclick = chamCongHomNay;

  actionBar.appendChild(btnSync);
  actionBar.appendChild(btnCham);
});
