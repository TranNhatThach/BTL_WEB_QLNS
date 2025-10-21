const data = [
  { id: "NV001", name: "Lee min ho", month: 9, year: 2025, base: 25000000, bonus: 3000000, deduct: 200000 },
  { id: "NV002", name: "Phạm Văn Trường Vũ", month: 9, year: 2025, base: 14000000, bonus: 800000, deduct: 100000 },
  { id: "NV003", name: "Nguyễn Kim Ngọc", month: 9, year: 2025, base: 18000000, bonus: 1200000, deduct: 50000 },
  { id: "NV004", name: "Nguyễn Văn Quyết", month: 9, year: 2025, base: 22000000, bonus: 1500000, deduct: 100000 },
  { id: "NV005", name: "Nguyễn Chí Đạo", month: 9, year: 2025, base: 23000000, bonus: 1800000, deduct: 150000 },
  { id: "NV006", name: "Lê Thị Hoa", month: 9, year: 2025, base: 13000000, bonus: 400000, deduct: 50000 },
  { id: "NV007", name: "Hoàng Văn An", month: 9, year: 2025, base: 12500000, bonus: 300000, deduct: 0 },
  { id: "NV008", name: "Vũ Minh Anh", month: 9, year: 2025, base: 12800000, bonus: 350000, deduct: 30000 },
  { id: "NV009", name: "Đặng Thị Lan", month: 9, year: 2025, base: 13500000, bonus: 200000, deduct: 50000 },
  { id: "NV010", name: "Ngô Văn Hùng", month: 9, year: 2025, base: 14000000, bonus: 250000, deduct: 100000 },
  { id: "NV011", name: "Trần Văn Nam", month: 9, year: 2025, base: 12000000, bonus: 0, deduct: 0 },
  { id: "NV012", name: "Lý Thị Bích", month: 9, year: 2025, base: 12500000, bonus: 100000, deduct: 20000 },
  { id: "NV013", name: "Phạm Văn Long", month: 9, year: 2025, base: 16000000, bonus: 800000, deduct: 50000 },
  { id: "NV014", name: "Hà Thị Thu", month: 9, year: 2025, base: 15500000, bonus: 600000, deduct: 40000 },
  { id: "NV015", name: "Bùi Văn Tuấn", month: 9, year: 2025, base: 15000000, bonus: 500000, deduct: 30000 },
  { id: "NV016", name: "Đỗ Thị Mai", month: 9, year: 2025, base: 14000000, bonus: 400000, deduct: 20000 },
  { id: "NV017", name: "Hoàng Văn Hải", month: 9, year: 2025, base: 14500000, bonus: 450000, deduct: 50000 },
  { id: "NV018", name: "Nguyễn Thị Linh", month: 9, year: 2025, base: 13800000, bonus: 300000, deduct: 10000 },
  { id: "NV019", name: "Lê Văn Dũng", month: 9, year: 2025, base: 13000000, bonus: 250000, deduct: 20000 },
  { id: "NV020", name: "Trần Thị Kim", month: 9, year: 2025, base: 12500000, bonus: 150000, deduct: 0 },
  { id: "NV021", name: "Phan Văn Giang", month: 9, year: 2025, base: 13200000, bonus: 200000, deduct: 10000 },
  { id: "NV022", name: "Vũ Thị Thủy", month: 9, year: 2025, base: 20000000, bonus: 1000000, deduct: 50000 },
  { id: "NV023", name: "Đinh Văn Mạnh", month: 9, year: 2025, base: 11800000, bonus: 0, deduct: 0 },
  { id: "NV024", name: "Hoàng Thị Nguyệt", month: 9, year: 2025, base: 12200000, bonus: 100000, deduct: 10000 },
  { id: "NV025", name: "Lâm Văn Bình", month: 9, year: 2025, base: 16500000, bonus: 900000, deduct: 50000 },
  { id: "NV026", name: "Ngô Thị Thanh", month: 9, year: 2025, base: 12000000, bonus: 150000, deduct: 0 },
  { id: "NV027", name: "Dương Văn Tùng", month: 9, year: 2025, base: 13500000, bonus: 250000, deduct: 30000 },
  { id: "NV028", name: "Mai Thị Ánh", month: 9, year: 2025, base: 12800000, bonus: 200000, deduct: 0 },
  { id: "NV029", name: "Phùng Văn Khoa", month: 9, year: 2025, base: 14500000, bonus: 700000, deduct: 40000 },
  { id: "NV030", name: "Tạ Thị Diệp", month: 9, year: 2025, base: 12500000, bonus: 300000, deduct: 20000 }
];


const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');
const searchInput = document.getElementById('searchInput');
const tbody = document.querySelector('#salaryTable tbody');
const exportCsvBtn = document.getElementById('exportCsv');
const resetBtn = document.getElementById('resetBtn');

function initFilters(){
  const months = new Set();
  const years = new Set();
  data.forEach(r=>{months.add(r.month); years.add(r.year);});
  Array.from(months).sort((a,b)=>a-b).forEach(m=>{
    const opt = document.createElement('option'); opt.value = m; opt.textContent = `Tháng ${m}`; monthSelect.appendChild(opt);
  });
  Array.from(years).sort((a,b)=>a-b).forEach(y=>{
    const opt = document.createElement('option'); opt.value = y; opt.textContent = y; yearSelect.appendChild(opt);
  });
}

function formatMoney(n){ return n.toLocaleString('vi-VN') + ' ₫'; }

function renderTable(filtered){
  tbody.innerHTML='';
  let tBase=0,tBonus=0,tDed=0,tNet=0;
  if(filtered.length===0){
    const tr=document.createElement('tr');
    const td=document.createElement('td'); td.colSpan=8; td.className='muted center'; td.textContent='Không tìm thấy bản ghi.'; tr.appendChild(td); tbody.appendChild(tr);
  }
  filtered.forEach(r=>{
    const tr=document.createElement('tr');
    const net = r.base + r.bonus - r.deduct;
    tBase+=r.base; tBonus+=r.bonus; tDed+=r.deduct; tNet+=net;
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${r.name}</td>
      <td>${r.month}</td>
      <td>${r.year}</td>
      <td>${formatMoney(r.base)}</td>
      <td>${formatMoney(r.bonus)}</td>
      <td>${formatMoney(r.deduct)}</td>
      <td>${formatMoney(net)}</td>
    `;
    tbody.appendChild(tr);
  });
  document.getElementById('totalBase').textContent = formatMoney(tBase);
  document.getElementById('totalBonus').textContent = formatMoney(tBonus);
  document.getElementById('totalDeduct').textContent = formatMoney(tDed);
  document.getElementById('totalNet').textContent = formatMoney(tNet);
}

function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const m = monthSelect.value;
  const y = yearSelect.value;
  let filtered = data.filter(r=>{
    const matchesName = r.name.toLowerCase().includes(q);
    const matchesMonth = (m==='all') ? true : (String(r.month)===String(m));
    const matchesYear = (y==='all') ? true : (String(r.year)===String(y));
    return matchesName && matchesMonth && matchesYear;
  });
  renderTable(filtered);
}

function downloadExcel(rows){
  const header = ['ID','Name','Month','Year','Base','Bonus','Deduct','Net'];
  const dataExport = rows.map(r=>[
    r.id, r.name, r.month, r.year, r.base, r.bonus, r.deduct, (r.base + r.bonus - r.deduct)
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet([header, ...dataExport]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng lương");

  const colWidths = header.map((_,i)=>({wch: i===1 ? 25 : 12}));
  worksheet['!cols'] = colWidths;

  XLSX.writeFile(workbook, `luong_${new Date().toISOString().slice(0,10)}.xlsx`);
}

searchInput.addEventListener('input', applyFilters);
monthSelect.addEventListener('change', applyFilters);
yearSelect.addEventListener('change', applyFilters);
exportCsvBtn.addEventListener('click', ()=>{
  const q = searchInput.value.trim().toLowerCase();
  const m = monthSelect.value; const y = yearSelect.value;
  const rows = data.filter(r=>{
    const matchesName = r.name.toLowerCase().includes(q);
    const matchesMonth = (m==='all') ? true : (String(r.month)===String(m));
    const matchesYear = (y==='all') ? true : (String(r.year)===String(y));
    return matchesName && matchesMonth && matchesYear;
  });
  if(rows.length===0){ alert('Không có bản ghi để xuất.'); return; }
  downloadExcel(rows);
});
resetBtn.addEventListener('click', ()=>{ searchInput.value=''; monthSelect.value='all'; yearSelect.value='all'; applyFilters(); });

initFilters(); applyFilters();
