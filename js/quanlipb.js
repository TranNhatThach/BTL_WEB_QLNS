document.addEventListener("DOMContentLoaded", () => {

  const pbMaInput = document.getElementById("maPB");
  const pbTenInput = document.getElementById("tenPB");
  const btnSavePb = document.getElementById("btnSave");
  const pbTbody = document.querySelector("#pbTable tbody");
  const searchPbInput = document.getElementById("searchPB");


  const modal = document.getElementById("detailModal");
  const modalTitle = document.getElementById("modalTitle");
  const employeeListDiv = document.getElementById("employeeList");
  const closeButton = document.querySelector(".close-button");


  const employeeFormContainer = document.getElementById("employeeFormContainer");
  const employeeForm = document.getElementById("employeeForm");
  const employeeFormTitle = document.getElementById("employeeFormTitle");
  const employeeIndexInput = document.getElementById("employeeIndex");
  const departmentNameInput = document.getElementById("departmentName");
  const employeeNameInput = document.getElementById("employeeName");
  const employeePositionInput = document.getElementById("employeePosition");
  const employeeGroupInput = document.getElementById("employeeGroup");
  const saveEmployeeBtn = document.getElementById("saveEmployeeBtn");
  const cancelEmployeeBtn = document.getElementById("cancelEmployeeBtn");
  const addNewEmployeeBtn = document.getElementById("addNewEmployeeBtn");


  const NV_KEY = "nhanviens_v1";
  let phongBans = JSON.parse(localStorage.getItem("phongBans")) || [];
  let allEmployees = [];


  function loadEmployeeData() {
    try {
      const stored = localStorage.getItem(NV_KEY);
      if (stored) {
        allEmployees = JSON.parse(stored);
      } else {
        allEmployees = window.Data && Data.nhanviens ? Data.nhanviens : [];
        localStorage.setItem(NV_KEY, JSON.stringify(allEmployees));
      }

      if (phongBans.length === 0) {
        initializeDepartments();
      }
      renderDepartments();
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu nhân viên:", error);
    }
  }


  function initializeDepartments() {
    const departmentNames =
      (window.Data && Data.phongBans) ||
      [...new Set(allEmployees.map(emp => emp.phongBan))];

    phongBans = departmentNames
      .filter(Boolean)
      .map(name => ({
        tenPB: name,
        maPB: name.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 100)
      }));

    saveDepartmentsToStorage();
  }


  function renderDepartments() {
    const keyword = searchPbInput.value.toLowerCase().trim();
    pbTbody.innerHTML = "";

    const filteredPbs = phongBans.filter(
      pb =>
        pb.tenPB.toLowerCase().includes(keyword) ||
        pb.maPB.toLowerCase().includes(keyword)
    );

    if (filteredPbs.length === 0) {
      pbTbody.innerHTML =
        `<tr><td colspan="5" style="text-align:center;padding:18px;">Không tìm thấy phòng ban nào</td></tr>`;
      return;
    }

    filteredPbs.forEach(pb => {
      const employeesInDept = allEmployees.filter(emp => emp.phongBan === pb.tenPB);
      const teamNames = [...new Set(employeesInDept.map(emp => emp.nhom).filter(Boolean))].join(", ");

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHtml(pb.maPB)}</td>
        <td>${escapeHtml(pb.tenPB)}</td>
        <td>${employeesInDept.length}</td>
        <td>${escapeHtml(teamNames) || "Chưa có"}</td>
        <td>
          <button class="btn small detail" data-pb-name="${escapeHtml(pb.tenPB)}">Quản lý nhân viên</button>
        </td>`;
      pbTbody.appendChild(tr);
    });
  }


  function renderEmployeesInModal(tenPhongBan) {
    modalTitle.textContent = `Quản lý nhân viên - Phòng ${tenPhongBan}`;
    departmentNameInput.value = tenPhongBan;

    const employeesInDept = allEmployees.filter(emp => emp.phongBan === tenPhongBan);

    let tableHtml = `<table class="table">
      <thead>
        <tr>
          <th>Họ và tên</th>
          <th>Chức vụ</th>
          <th>Nhóm</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>`;

    if (employeesInDept.length > 0) {
      employeesInDept.forEach((emp, index) => {
        const originalIndex = allEmployees.findIndex(e => e.maNV === emp.maNV);
        tableHtml += `
          <tr>
            <td>${escapeHtml(emp.hoTen)}</td>
            <td>${escapeHtml(emp.chucVu)}</td>
            <td>${escapeHtml(emp.nhom || "")}</td>
            <td>
              <button class="btn small" data-action="edit" data-index="${originalIndex}">Sửa</button>
              <button class="btn small danger" data-action="delete" data-index="${originalIndex}">Xóa</button>
            </td>
          </tr>`;
      });
    } else {
      tableHtml += `<tr><td colspan="4" style="text-align:center;">Chưa có nhân viên nào.</td></tr>`;
    }
    tableHtml += `</tbody></table>`;
    employeeListDiv.innerHTML = tableHtml;
  }


  function saveDepartmentsToStorage() {
    localStorage.setItem("phongBans", JSON.stringify(phongBans));
  }

  function saveEmployeesToStorage() {
    localStorage.setItem(NV_KEY, JSON.stringify(allEmployees));
  }


  function resetEmployeeForm() {
    employeeForm.reset();
    employeeIndexInput.value = "";
    employeeFormContainer.style.display = "none";
    addNewEmployeeBtn.style.display = "block";
  }


  btnSavePb.addEventListener("click", () => {
    const ma = pbMaInput.value.trim();
    const ten = pbTenInput.value.trim();
    if (!ma || !ten) {
      alert("Vui lòng nhập Mã và Tên phòng ban.");
      return;
    }
    if (phongBans.some(pb => pb.maPB === ma || pb.tenPB === ten)) {
      alert("Mã hoặc Tên phòng ban đã tồn tại.");
      return;
    }
    phongBans.push({ maPB: ma, tenPB: ten });
    saveDepartmentsToStorage();
    renderDepartments();
    pbMaInput.value = "";
    pbTenInput.value = "";
  });

  pbTbody.addEventListener("click", e => {
    if (e.target.classList.contains("detail")) {
      const tenPhongBan = e.target.dataset.pbName;
      renderEmployeesInModal(tenPhongBan);
      modal.style.display = "block";
    }
  });

  employeeListDiv.addEventListener("click", e => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const action = target.dataset.action;
      const index = parseInt(target.dataset.index, 10);

      if (action === "edit") {
        const employee = allEmployees[index];
        employeeFormTitle.textContent = "Cập nhật thông tin nhân viên";
        employeeIndexInput.value = index;
        employeeNameInput.value = employee.hoTen;
        employeePositionInput.value = employee.chucVu;
        employeeGroupInput.value = employee.nhom || "";
        employeeFormContainer.style.display = "block";
        addNewEmployeeBtn.style.display = "none";
      } else if (action === "delete") {
        if (confirm(`Bạn có chắc muốn xóa nhân viên "${allEmployees[index].hoTen}"?`)) {
          allEmployees.splice(index, 1);
          saveEmployeesToStorage();
          renderEmployeesInModal(departmentNameInput.value);
        }
      }
    }
  });

  addNewEmployeeBtn.addEventListener("click", () => {
    employeeFormTitle.textContent = "Thêm nhân viên mới";
    employeeFormContainer.style.display = "block";
    addNewEmployeeBtn.style.display = "none";
  });

  saveEmployeeBtn.addEventListener("click", () => {
    const hoTen = employeeNameInput.value.trim();
    if (!hoTen) {
      alert("Vui lòng nhập họ và tên nhân viên.");
      return;
    }
    const index = employeeIndexInput.value;
    const employeeData = {
      hoTen,
      chucVu: employeePositionInput.value.trim(),
      nhom: employeeGroupInput.value.trim(),
      phongBan: departmentNameInput.value,
      gioiTinh: "N/A",
      maNV: "NV" + (Math.floor(Math.random() * 900) + 100)
    };

    if (index) {
      allEmployees[parseInt(index, 10)] = {
        ...allEmployees[parseInt(index, 10)],
        ...employeeData
      };
    } else {
      allEmployees.push(employeeData);
    }

    saveEmployeesToStorage();
    renderEmployeesInModal(departmentNameInput.value);
    resetEmployeeForm();
  });

  cancelEmployeeBtn.addEventListener("click", resetEmployeeForm);
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    resetEmployeeForm();
    renderDepartments();
  });

  window.addEventListener("click", event => {
    if (event.target == modal) {
      modal.style.display = "none";
      resetEmployeeForm();
      renderDepartments();
    }
  });

  searchPbInput.addEventListener("input", renderDepartments);

  function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined) return "";
    return String(unsafe)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  loadEmployeeData();
});

const logoutBtn = document.querySelector(".foot");
if (logoutBtn) {
  logoutBtn.addEventListener("click", e => {
    e.preventDefault();
    sessionStorage.removeItem("loggedIn");
    location.replace(logoutBtn.href);
  });
}
