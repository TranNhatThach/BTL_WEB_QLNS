const data = [
  {id:1, name:'Nguyễn Văn A', month:1, year:2025, base:15000000, bonus:1500000, deduct:200000},
  {id:2, name:'Trần Thị B', month:1, year:2025, base:12000000, bonus:800000, deduct:100000},
  {id:3, name:'Lê Văn C', month:2, year:2025, base:18000000, bonus:2000000, deduct:300000},
  {id:4, name:'Phạm Thị D', month:2, year:2024, base:11000000, bonus:0, deduct:50000},
  {id:5, name:'Hoàng Văn E', month:3, year:2024, base:14000000, bonus:600000, deduct:150000},
  {id:6, name:'Ngô Thanh F', month:3, year:2025, base:16000000, bonus:1000000, deduct:100000},
  {id:7, name:'Đỗ Thị G', month:12, year:2024, base:13000000, bonus:300000, deduct:0},
  {id:8, name:'Bùi Văn H', month:12, year:2025, base:17000000, bonus:1200000, deduct:250000},
  {id:9, name:'Phạm Văn M', month:11, year:2025, base:14000000, bonus:120000, deduct:350000}
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

function downloadCSV(rows){
  const header = ['ID','Name','Month','Year','Base','Bonus','Deduct','Net'];
  const csv = [header.join(',')].concat(rows.map(r=>[
    r.id,`"${r.name}"`,r.month,r.year,r.base,r.bonus,r.deduct,(r.base+r.bonus-r.deduct)
  ].join(','))).join('\n');
  const blob = new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `luong_${new Date().toISOString().slice(0,10)}.csv`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
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
  downloadCSV(rows);
});
resetBtn.addEventListener('click', ()=>{ searchInput.value=''; monthSelect.value='all'; yearSelect.value='all'; applyFilters(); });

initFilters(); applyFilters();