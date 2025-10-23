// --- Khai báo key ---
const NV_KEY = 'nhanviens_v1';
const LUONG_KEY = 'luong_data';

// --- Tải & hiển thị bảng lương ---
function loadLuong() {
  const data = JSON.parse(localStorage.getItem(LUONG_KEY)) || [];
  renderLuong(data);
}

function renderLuong(data) {
  const tbody = document.querySelector('#salaryTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  data.forEach((row, i) => {
    const thucNhan = row.base + row.bonus - row.deduct;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${row.maNV}</td>
      <td>${row.hoTen}</td>
      <td>${row.month}/${row.year}</td>
      <td>${row.base.toLocaleString()} ₫</td>
      <td>${row.bonus.toLocaleString()} ₫</td>
      <td>${row.deduct.toLocaleString()} ₫</td>
      <td><strong>${thucNhan.toLocaleString()} ₫</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

// --- Đồng bộ dữ liệu lương ---
function dongBoLuong() {
  const nhanviens = JSON.parse(localStorage.getItem(NV_KEY)) || [];
  let luong = JSON.parse(localStorage.getItem(LUONG_KEY)) || [];

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  nhanviens.forEach(nv => {
    if (!luong.find(l => l.maNV === nv.maNV && l.month === month && l.year === year)) {
      luong.push({
        maNV: nv.maNV,
        hoTen: nv.hoTen,
        month,
        year,
        base: 12000000 + Math.floor(Math.random() * 8000000),
        bonus: 500000 + Math.floor(Math.random() * 2000000),
        deduct: Math.floor(Math.random() * 500000)
      });
    }
  });

  luong = luong.filter(l => nhanviens.some(nv => nv.maNV === l.maNV));
  localStorage.setItem(LUONG_KEY, JSON.stringify(luong));
  loadLuong();
}

// --- Khởi tạo ---
document.addEventListener('DOMContentLoaded', () => {
  dongBoLuong(); // tự đồng bộ khi tải trang
  loadLuong();

  // Thêm nút đồng bộ
  const actions = document.querySelector('.actions') || document.body;
  const btnSync = document.createElement('button');
  btnSync.textContent = '🔄 Đồng bộ dữ liệu';
  btnSync.className = 'btn btn-sync';
  btnSync.onclick = dongBoLuong;

  actions.appendChild(btnSync);
});
