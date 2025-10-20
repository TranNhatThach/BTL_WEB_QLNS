document.addEventListener("DOMContentLoaded", () => {
  const maInput = document.getElementById("maPB");
  const tenInput = document.getElementById("tenPB");
  const soLuongInput = document.getElementById("soLuongNV");
  const ghiChuInput = document.getElementById("ghiChu");
  const btnSave = document.getElementById("btnSave");
  const btnCancel = document.getElementById("btnCancel");
  const tbody = document.querySelector("#pbTable tbody");
  const editIndexInput = document.getElementById("editIndex");

  let phongBans = JSON.parse(localStorage.getItem("phongBans")) || [];

  function render() {
    tbody.innerHTML = "";
    if (phongBans.length === 0) {
      const r = document.createElement("tr");
      r.innerHTML = `<td colspan="5" style="text-align:center;color:#666;padding:18px;">Chưa có phòng ban nào</td>`;
      tbody.appendChild(r);
      return;
    }
    phongBans.forEach((pb, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHtml(pb.maPB)}</td>
        <td>${escapeHtml(pb.tenPB)}</td>
        <td>${escapeHtml(pb.soNV)}</td>
        <td>${escapeHtml(pb.ghiChu)}</td>
        <td>
          <button class="btn small" data-action="edit" data-i="${idx}">Sửa</button>
          <button class="btn small danger" data-action="delete" data-i="${idx}">Xóa</button>
        </td>`;
      tbody.appendChild(tr);
    });
  }

  function saveToStorage() {
    localStorage.setItem("phongBans", JSON.stringify(phongBans));
  }

  // Thêm hoặc cập nhật
  btnSave.addEventListener("click", () => {
    const ma = maInput.value.trim();
    const ten = tenInput.value.trim();
    const soLuong = soLuongInput.value.trim();
    const ghiChu = ghiChuInput.value.trim();

    if (!ma || !ten) {
      alert("Vui lòng nhập Mã và Tên phòng ban.");
      return;
    }

    const editIndex = editIndexInput.value;
    if (editIndex === "") {
      // thêm mới
      phongBans.push({ maPB: ma, tenPB: ten, soNV: soLuong || "0", ghiChu });
    } else {
      // cập nhật
      phongBans[parseInt(editIndex, 10)] = {
        maPB: ma,
        tenPB: ten,
        soNV: soLuong || "0",
        ghiChu,
      };
      editIndexInput.value = "";
      btnCancel.style.display = "none";
      btnSave.textContent = "Thêm / Cập nhật";
    }

    saveToStorage();
    render();
    resetForm();
  });

  // Hủy sửa
  btnCancel.addEventListener("click", () => {
    resetForm();
    editIndexInput.value = "";
    btnCancel.style.display = "none";
    btnSave.textContent = "Thêm / Cập nhật";
  });

  // Bắt sự kiện cho các nút trong bảng (event delegation)
  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const action = btn.dataset.action;
    const i = parseInt(btn.dataset.i, 10);
    if (action === "edit") {
      startEdit(i);
    } else if (action === "delete") {
      if (confirm("Bạn có chắc muốn xóa phòng ban này?")) {
        phongBans.splice(i, 1);
        saveToStorage();
        render();
      }
    }
  });

  function startEdit(index) {
    const pb = phongBans[index];
    maInput.value = pb.maPB;
    tenInput.value = pb.tenPB;
    soLuongInput.value = pb.soNV;
    ghiChuInput.value = pb.ghiChu;
    editIndexInput.value = index;
    btnSave.textContent = "Cập nhật";
    btnCancel.style.display = "inline-block";
    maInput.focus();
  }

  function resetForm() {
    maInput.value = "";
    tenInput.value = "";
    soLuongInput.value = "";
    ghiChuInput.value = "";
  }

  // small sanitization to avoid HTML injection in table
  function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined) return "";
    return String(unsafe)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // init
  render();
});
// ==============================
// TÌM KIẾM PHÒNG BAN
// ==============================
document.getElementById("searchPB").addEventListener("input", function () {
  const keyword = this.value.toLowerCase().trim();
  const rows = document.querySelectorAll(".table tbody tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const match = Array.from(cells).some((cell) =>
      cell.textContent.toLowerCase().includes(keyword)
    );
    row.style.display = match ? "" : "none";
  });
});
