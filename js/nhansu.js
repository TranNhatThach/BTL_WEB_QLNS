const NV_KEY = 'nhanviens_v1';
let employees = JSON.parse(localStorage.getItem(NV_KEY)) || [];
if(!employees || employees.length === 0){
const SAMPLE_EMPLOYEES=[
  {
    "maNV": "NV001",
    "hoTen": "Lee min ho",
    "gioiTinh": "Nam",
    "ngaySinh": "1987-06-22",
    "trangThai": "Đang làm việc",
    "phongBan": "Marketing",
    "chucVu": "Trưởng phòng",
    "trinhDo": "Thạc sĩ",
    "chuyenMon": "Quản trị kinh doanh",
    "bangCap": "Bằng 1",
    "cccd": "011223344",
    "hoKhau": "Hà Nội",
    "avatar": "",
    "nhom": "Quản lý"
  },
  {
    "maNV": "NV002",
    "hoTen": "Phạm Văn Trường Vũ",
    "gioiTinh": "Nam",
    "ngaySinh": "1990-05-15",
    "trangThai": "Đang làm việc",
    "phongBan": "Kế toán",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Kế toán - Kiểm toán",
    "bangCap": "Bằng 1",
    "cccd": "022334455",
    "hoKhau": "TP. HCM",
    "avatar": "",
    "nhom": "Kế toán tổng hợp"
  },
  {
    "maNV": "NV003",
    "hoTen": "Nguyễn Kim Ngọc",
    "gioiTinh": "Nữ",
    "ngaySinh": "1988-11-30",
    "trangThai": "Đang làm việc",
    "phongBan": "Nhân sự",
    "chucVu": "Trưởng phòng",
    "trinhDo": "Đại học",
    "chuyenMon": "Quản trị nhân lực",
    "bangCap": "Bằng 1",
    "cccd": "033445566",
    "hoKhau": "Đà Nẵng",
    "avatar": "",
    "nhom": "Quản lý"
  },
  {
    "maNV": "NV004",
    "hoTen": "Nguyễn Văn Quyết",
    "gioiTinh": "Nam",
    "ngaySinh": "1985-01-20",
    "trangThai": "Đang làm việc",
    "phongBan": "IT",
    "chucVu": "Trưởng phòng",
    "trinhDo": "Kỹ sư",
    "chuyenMon": "Công nghệ thông tin",
    "bangCap": "Bằng 1",
    "cccd": "044556677",
    "hoKhau": "Hà Nội",
    "avatar": "",
    "nhom": "Quản lý"
  },
  {
    "maNV": "NV005",
    "hoTen": "Nguyễn Chí Đạo",
    "gioiTinh": "Nam",
    "ngaySinh": "1986-09-10",
    "trangThai": "Đang làm việc",
    "phongBan": "Kinh doanh",
    "chucVu": "Trưởng phòng",
    "trinhDo": "Đại học",
    "chuyenMon": "Quản trị kinh doanh",
    "bangCap": "Bằng 1",
    "cccd": "055667788",
    "hoKhau": "Hải Phòng",
    "avatar": "",
    "nhom": "Quản lý"
  },
  {
    "maNV": "NV006",
    "hoTen": "Lê Thị Hoa",
    "gioiTinh": "Nữ",
    "ngaySinh": "1995-03-12",
    "trangThai": "Đang làm việc",
    "phongBan": "Marketing",
    "chucVu": "Nhân viên",
    "trinhDo": "Cao đẳng",
    "chuyenMon": "Marketing",
    "bangCap": "Bằng 2",
    "cccd": "066778899",
    "hoKhau": "Hà Nội",
    "avatar": "",
    "nhom": "Content"
  },
  {
    "maNV": "NV007",
    "hoTen": "Hoàng Văn An",
    "gioiTinh": "Nam",
    "ngaySinh": "1993-07-25",
    "trangThai": "Đang làm việc",
    "phongBan": "Marketing",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Truyền thông đa phương tiện",
    "bangCap": "Bằng 1",
    "cccd": "077889900",
    "hoKhau": "Bắc Ninh",
    "avatar": "",
    "nhom": "Digital"
  },
  {
    "maNV": "NV008",
    "hoTen": "Vũ Minh Anh",
    "gioiTinh": "Nữ",
    "ngaySinh": "1996-02-18",
    "trangThai": "Đang làm việc",
    "phongBan": "Marketing",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Báo chí",
    "bangCap": "Bằng 1",
    "cccd": "088990011",
    "hoKhau": "TP. HCM",
    "avatar": "",
    "nhom": "Content"
  },
  {
    "maNV": "NV009",
    "hoTen": "Đặng Thị Lan",
    "gioiTinh": "Nữ",
    "ngaySinh": "1991-12-05",
    "trangThai": "Đang làm việc",
    "phongBan": "Kế toán",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Kế toán",
    "bangCap": "Bằng 1",
    "cccd": "099001122",
    "hoKhau": "Hà Nam",
    "avatar": "",
    "nhom": "Kế toán thuế"
  },
  {
    "maNV": "NV010",
    "hoTen": "Ngô Văn Hùng",
    "gioiTinh": "Nam",
    "ngaySinh": "1992-04-08",
    "trangThai": "Đang làm việc",
    "phongBan": "Kế toán",
    "chucVu": "Nhân viên",
    "trinhDo": "Cao đẳng",
    "chuyenMon": "Tài chính ngân hàng",
    "bangCap": "Bằng 2",
    "cccd": "011223300",
    "hoKhau": "Thái Bình",
    "avatar": "",
    "nhom": "Kế toán tổng hợp"
  },
  {
    "maNV": "NV011",
    "hoTen": "Trần Văn Nam",
    "gioiTinh": "Nam",
    "ngaySinh": "1994-08-14",
    "trangThai": "Đang làm việc",
    "phongBan": "Nhân sự",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Quản trị nhân lực",
    "bangCap": "Bằng 1",
    "cccd": "022334411",
    "hoKhau": "Hà Nội",
    "avatar": "",
    "nhom": "Tuyển dụng"
  },
  {
    "maNV": "NV012",
    "hoTen": "Lý Thị Bích",
    "gioiTinh": "Nữ",
    "ngaySinh": "1990-10-21",
    "trangThai": "Đang làm việc",
    "phongBan": "Nhân sự",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Luật",
    "bangCap": "Bằng 1",
    "cccd": "033445522",
    "hoKhau": "Quảng Ninh",
    "avatar": "",
    "nhom": "Chế độ & Chính sách"
  },
  {
    "maNV": "NV013",
    "hoTen": "Phạm Văn Long",
    "gioiTinh": "Nam",
    "ngaySinh": "1992-03-03",
    "trangThai": "Đang làm việc",
    "phongBan": "IT",
    "chucVu": "Nhân viên",
    "trinhDo": "Kỹ sư",
    "chuyenMon": "Công nghệ thông tin",
    "bangCap": "Bằng 1",
    "cccd": "044556633",
    "hoKhau": "Hà Nội",
    "avatar": "",
    "nhom": "Development"
  },
  {
    "maNV": "NV014",
    "hoTen": "Hà Thị Thu",
    "gioiTinh": "Nữ",
    "ngaySinh": "1997-06-19",
    "trangThai": "Đang làm việc",
    "phongBan": "IT",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Hệ thống thông tin",
    "bangCap": "Bằng 1",
    "cccd": "055667744",
    "hoKhau": "Phú Thọ",
    "avatar": "",
    "nhom": "Development"
  },
  {
    "maNV": "NV015",
    "hoTen": "Bùi Văn Tuấn",
    "gioiTinh": "Nam",
    "ngaySinh": "1991-11-07",
    "trangThai": "Đang làm việc",
    "phongBan": "IT",
    "chucVu": "Nhân viên",
    "trinhDo": "Cao đẳng",
    "chuyenMon": "Quản trị mạng",
    "bangCap": "Bằng 2",
    "cccd": "066778855",
    "hoKhau": "Hưng Yên",
    "avatar": "",
    "nhom": "System Admin"
  },
  {
    "maNV": "NV016",
    "hoTen": "Đỗ Thị Mai",
    "gioiTinh": "Nữ",
    "ngaySinh": "1998-04-23",
    "trangThai": "Đang làm việc",
    "phongBan": "Kinh doanh",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Kinh tế đối ngoại",
    "bangCap": "Bằng 1",
    "cccd": "077889966",
    "hoKhau": "TP. HCM",
    "avatar": "",
    "nhom": "Sales Team 1"
  },
  {
    "maNV": "NV017",
    "hoTen": "Hoàng Văn Hải",
    "gioiTinh": "Nam",
    "ngaySinh": "1993-09-11",
    "trangThai": "Đang làm việc",
    "phongBan": "Kinh doanh",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Quản trị kinh doanh",
    "bangCap": "Bằng 1",
    "cccd": "088990077",
    "hoKhau": "Thanh Hóa",
    "avatar": "",
    "nhom": "Sales Team 2"
  },
  {
    "maNV": "NV018",
    "hoTen": "Nguyễn Thị Linh",
    "gioiTinh": "Nữ",
    "ngaySinh": "1996-01-27",
    "trangThai": "Đang làm việc",
    "phongBan": "Kinh doanh",
    "chucVu": "Nhân viên",
    "trinhDo": "Cao đẳng",
    "chuyenMon": "Marketing",
    "bangCap": "Bằng 2",
    "cccd": "099001188",
    "hoKhau": "Hà Nội",
    "avatar": "",
    "nhom": "Sales Team 1"
  },
  {
    "maNV": "NV019",
    "hoTen": "Lê Văn Dũng",
    "gioiTinh": "Nam",
    "ngaySinh": "1995-05-02",
    "trangThai": "Đang làm việc",
    "phongBan": "Marketing",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Marketing",
    "bangCap": "Bằng 1",
    "cccd": "011223399",
    "hoKhau": "Đà Nẵng",
    "avatar": "",
    "nhom": "Digital"
  },
  {
    "maNV": "NV020",
    "hoTen": "Trần Thị Kim",
    "gioiTinh": "Nữ",
    "ngaySinh": "1994-07-16",
    "trangThai": "Nghỉ thai sản",
    "phongBan": "Marketing",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Ngôn ngữ Anh",
    "bangCap": "Bằng 1",
    "cccd": "022334400",
    "hoKhau": "TP. HCM",
    "avatar": "",
    "nhom": "Content"
  },
  {
    "maNV": "NV021",
    "hoTen": "Phan Văn Giang",
    "gioiTinh": "Nam",
    "ngaySinh": "1989-12-11",
    "trangThai": "Đang làm việc",
    "phongBan": "Kế toán",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Kế toán",
    "bangCap": "Bằng 1",
    "cccd": "033445511",
    "hoKhau": "Nghệ An",
    "avatar": "",
    "nhom": "Kế toán thuế"
  },
  {
    "maNV": "NV022",
    "hoTen": "Vũ Thị Thủy",
    "gioiTinh": "Nữ",
    "ngaySinh": "1984-02-28",
    "trangThai": "Đang làm việc",
    "phongBan": "Kế toán",
    "chucVu": "Kế toán trưởng",
    "trinhDo": "Thạc sĩ",
    "chuyenMon": "Kế toán - Kiểm toán",
    "bangCap": "Bằng 1",
    "cccd": "044556622",
    "hoKhau": "Hải Dương",
    "avatar": "",
    "nhom": "Quản lý"
  },
  {
    "maNV": "NV023",
    "hoTen": "Đinh Văn Mạnh",
    "gioiTinh": "Nam",
    "ngaySinh": "1991-06-07",
    "trangThai": "Đang làm việc",
    "phongBan": "Nhân sự",
    "chucVu": "Chuyên viên tuyển dụng",
    "trinhDo": "Đại học",
    "chuyenMon": "Quản trị nhân lực",
    "bangCap": "Bằng 1",
    "cccd": "055667733",
    "hoKhau": "Hà Nội",
    "avatar": "",
    "nhom": "Tuyển dụng"
  },
  {
    "maNV": "NV024",
    "hoTen": "Hoàng Thị Nguyệt",
    "gioiTinh": "Nữ",
    "ngaySinh": "1993-10-17",
    "trangThai": "Đang làm việc",
    "phongBan": "Nhân sự",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Luật",
    "bangCap": "Bằng 1",
    "cccd": "066778844",
    "hoKhau": "Bắc Giang",
    "avatar": "",
    "nhom": "Chế độ & Chính sách"
  },
  {
    "maNV": "NV025",
    "hoTen": "Lâm Văn Bình",
    "gioiTinh": "Nam",
    "ngaySinh": "1996-01-01",
    "trangThai": "Đang làm việc",
    "phongBan": "IT",
    "chucVu": "Lập trình viên",
    "trinhDo": "Kỹ sư",
    "chuyenMon": "Phần mềm",
    "bangCap": "Bằng 1",
    "cccd": "077889955",
    "hoKhau": "Lạng Sơn",
    "avatar": "",
    "nhom": "Development"
  },
  {
    "maNV": "NV026",
    "hoTen": "Ngô Thị Thanh",
    "gioiTinh": "Nữ",
    "ngaySinh": "1998-03-14",
    "trangThai": "Đang làm việc",
    "phongBan": "IT",
    "chucVu": "Tester",
    "trinhDo": "Đại học",
    "chuyenMon": "Công nghệ thông tin",
    "bangCap": "Bằng 1",
    "cccd": "088990066",
    "hoKhau": "Vĩnh Phúc",
    "avatar": "",
    "nhom": "Development"
  },
  {
    "maNV": "NV027",
    "hoTen": "Dương Văn Tùng",
    "gioiTinh": "Nam",
    "ngaySinh": "1990-08-20",
    "trangThai": "Đang làm việc",
    "phongBan": "Kinh doanh",
    "chucVu": "Nhân viên",
    "trinhDo": "Cao đẳng",
    "chuyenMon": "Thương mại",
    "bangCap": "Bằng 2",
    "cccd": "099001177",
    "hoKhau": "TP. HCM",
    "avatar": "",
    "nhom": "Sales Team 2"
  },
  {
    "maNV": "NV028",
    "hoTen": "Mai Thị Ánh",
    "gioiTinh": "Nữ",
    "ngaySinh": "1997-12-01",
    "trangThai": "Đang làm việc",
    "phongBan": "Kinh doanh",
    "chucVu": "Nhân viên",
    "trinhDo": "Đại học",
    "chuyenMon": "Kinh tế",
    "bangCap": "Bằng 1",
    "cccd": "011223388",
    "hoKhau": "Cần Thơ",
    "avatar": "",
    "nhom": "Sales Team 1"
  },
  {
    "maNV": "NV029",
    "hoTen": "Phùng Văn Khoa",
    "gioiTinh": "Nam",
    "ngaySinh": "1994-04-13",
    "trangThai": "Đang làm việc",
    "phongBan": "Marketing",
    "chucVu": "Digital Marketer",
    "trinhDo": "Đại học",
    "chuyenMon": "Marketing",
    "bangCap": "Bằng 1",
    "cccd": "022334499",
    "hoKhau": "Hà Tây",
    "avatar": "",
    "nhom": "Digital"
  },
  {
    "maNV": "NV030",
    "hoTen": "Tạ Thị Diệp",
    "gioiTinh": "Nữ",
    "ngaySinh": "1995-10-26",
    "trangThai": "Đang làm việc",
    "phongBan": "Marketing",
    "chucVu": "Content Creator",
    "trinhDo": "Đại học",
    "chuyenMon": "Báo chí và Truyền thông",
    "bangCap": "Bằng 1",
    "cccd": "033445500",
    "hoKhau": "Hà Nội",
    "avatar": "",
    "nhom": "Content"
  }
];
employees= SAMPLE_EMPLOYEES;
localStorage.setItem(NV_KEY,JSON.stringify(employees));
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
const avatarFile = document.getElementById('avatarFile');
const avatarPreview = document.getElementById('avatarPreview');
const removeAvatar = document.getElementById('removeAvatar');

function init() {
  refreshMaster();
  populateFilterPhongBan();
  renderTable();
  attachEvents();
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

  // đóng modal xem
  const closeView = document.getElementById('closeView');
  if (closeView)
    closeView.addEventListener('click', () =>
      document.getElementById('viewModal').classList.remove('open')
    );
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
    avatar: avatarPreview.dataset.base || ''
  };

  if (editIndex.value) employees[Number(editIndex.value)] = payload;
  else employees.push(payload);

  localStorage.setItem(NV_KEY, JSON.stringify(employees));
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
      <div style="line-height:1.8;font-size:15px;">
        <p><strong>Mã nhân viên:</strong> ${nv.maNV || ''}</p>
        <p><strong>Họ tên:</strong> ${nv.hoTen || ''}</p>
        <p><strong>Giới tính:</strong> ${nv.gioiTinh || ''}</p>
        <p><strong>Ngày sinh:</strong> ${nv.ngaySinh || ''}</p>
        <p><strong>Phòng ban:</strong> ${nv.phongBan || ''}</p>
        <p><strong>Chức vụ:</strong> ${nv.chucVu || ''}</p>
        <p><strong>Trình độ:</strong> ${nv.trinhDo || ''}</p>
        <p><strong>Chuyên môn:</strong> ${nv.chuyenMon || ''}</p>
        <p><strong>Bằng cấp:</strong> ${nv.bangCap || ''}</p>
        <p><strong>Số CCCD:</strong> ${nv.cccd || ''}</p>
        <p><strong>Hộ khẩu:</strong> ${nv.hoKhau || ''}</p>
        <p><strong>Trạng thái:</strong> 
          <span class="status ${nv.trangThai === 'Đã nghỉ việc' ? 'status-danger' : 'status-active'}">
            ${nv.trangThai || ''}
          </span>
        </p>
      </div>
    </div>
  `;

  modal.classList.add('open');
}


function onDelete(i) {
  if (!confirm('Xóa nhân viên này?')) return;
  employees.splice(i, 1);
  localStorage.setItem(NV_KEY, JSON.stringify(employees));
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
    'Hộ khẩu': nv.hoKhau
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
