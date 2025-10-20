// Giờ quy định: 8:00 sáng
const gioQuyDinh = 8;
const phutQuyDinh = 0;

async function loadData() {
  try {
    const res = await fetch("../database.json");
    const data = await res.json();
    renderTable(data);
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  }
}

function renderTable(data) {
  const tbody = document.getElementById("attendanceBody");
  tbody.innerHTML = "";

  data.forEach((nv, index) => {
    // Giả lập thời gian chấm ngẫu nhiên (8h00 - 9h00)
    const now = new Date();
    const gioCham = 8 + Math.floor(Math.random() * 2); // 8 hoặc 9
    const phutCham = Math.floor(Math.random() * 60);

    const chamGio = `${gioCham.toString().padStart(2, "0")}:${phutCham.toString().padStart(2, "0")}`;
    let trangThai = "";
    let className = "";

    if (gioCham > gioQuyDinh || (gioCham === gioQuyDinh && phutCham > phutQuyDinh)) {
      const diff = (gioCham - gioQuyDinh) * 60 + (phutCham - phutQuyDinh);
      if (diff > 120) {
        trangThai = "Vắng";
        className = "absent";
      } else {
        trangThai = `Muộn ${diff} phút`;
        className = "late";
      }
    } else {
      trangThai = "Đúng giờ";
      className = "success";
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${nv.ma_nv}</td>
      <td>${nv.hoten}</td>
      <td>${nv.gioitinh}</td>
      <td>${nv.phongban}</td>
      <td>${chamGio}</td>
      <td><span class="status ${className}">${trangThai}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// 🔍 Tìm kiếm theo tên
document.getElementById("searchButton").addEventListener("click", () => {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#attendanceBody tr");
  rows.forEach(row => {
    const name = row.children[2].innerText.toLowerCase();
    row.style.display = name.includes(keyword) ? "" : "none";
  });
});

// 📤 Xuất Excel
document.getElementById("exportButton").addEventListener("click", () => {
  const wb = XLSX.utils.table_to_book(document.getElementById("attendanceTable"), { sheet: "ChamCong" });
  XLSX.writeFile(wb, "ChamCong_HomNay.xlsx");
});

loadData();
