document.addEventListener("DOMContentLoaded", () => {
    // --- Các biến và DOM Elements ---
    const pbMaInput = document.getElementById("maPB");
    const pbTenInput = document.getElementById("tenPB");
    const btnSavePb = document.getElementById("btnSave");
    const pbTbody = document.querySelector("#pbTable tbody");
    const searchPbInput = document.getElementById("searchPB");
    
    // Modal elements
    const modal = document.getElementById("detailModal");
    const modalTitle = document.getElementById("modalTitle");
    const employeeListDiv = document.getElementById("employeeList");
    const closeButton = document.querySelector(".close-button");

    // Employee form elements in modal
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

    // --- Dữ liệu ---
    let phongBans = JSON.parse(localStorage.getItem("phongBans")) || [];
    let allEmployees = [];

    // --- Hàm xử lý chính ---

    // Tải dữ liệu nhân viên từ file JSON
    async function loadEmployeeData() {
        try {
            const response = await fetch('../database.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allEmployees = await response.json();
            // Nếu chưa có phòng ban trong localStorage, tạo từ dữ liệu nhân viên
            if (phongBans.length === 0) {
                initializeDepartments();
            }
            renderDepartments();
        } catch (error) {
            console.error("Không thể tải file database.json:", error);
        }
    }

    // Khởi tạo danh sách phòng ban lần đầu
    function initializeDepartments() {
        const departmentNames = [...new Set(allEmployees.map(emp => emp.phongban))];
        phongBans = departmentNames.map(name => ({
            tenPB: name,
            maPB: name.substring(0, 3).toUpperCase() + Math.floor(Math.random() * 100)
        }));
        saveDepartmentsToStorage();
    }

    // Render bảng phòng ban
    function renderDepartments() {
        const keyword = searchPbInput.value.toLowerCase().trim();
        pbTbody.innerHTML = "";
        
        const filteredPbs = phongBans.filter(pb => pb.tenPB.toLowerCase().includes(keyword) || pb.maPB.toLowerCase().includes(keyword));

        if (filteredPbs.length === 0) {
            pbTbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:18px;">Không tìm thấy phòng ban nào</td></tr>`;
            return;
        }

        filteredPbs.forEach(pb => {
            const employeesInDept = allEmployees.filter(emp => emp.phongban === pb.tenPB);
            const teamNames = [...new Set(employeesInDept.map(emp => emp.nhom).filter(Boolean))].join(', ');
            
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${escapeHtml(pb.maPB)}</td>
                <td>${escapeHtml(pb.tenPB)}</td>
                <td>${employeesInDept.length}</td>
                <td>${escapeHtml(teamNames) || 'Chưa có'}</td>
                <td>
                    <button class="btn small detail" data-pb-name="${escapeHtml(pb.tenPB)}">Quản lý nhân viên</button>
                </td>`;
            pbTbody.appendChild(tr);
        });
    }

    // Render bảng nhân viên trong Modal
    function renderEmployeesInModal(tenPhongBan) {
        modalTitle.textContent = `Quản lý nhân viên - Phòng ${tenPhongBan}`;
        departmentNameInput.value = tenPhongBan; // Lưu tên phòng ban cho form
        
        const employeesInDept = allEmployees.filter(emp => emp.phongban === tenPhongBan);
        
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
                // Tìm index thực trong mảng allEmployees
                const originalIndex = allEmployees.findIndex(e => e.ma_nv === emp.ma_nv);
                tableHtml += `
                    <tr>
                        <td>${escapeHtml(emp.hoten)}</td>
                        <td>${escapeHtml(emp.chucvu)}</td>
                        <td>${escapeHtml(emp.nhom)}</td>
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

    // Lưu dữ liệu vào Local Storage
    function saveDepartmentsToStorage() {
        localStorage.setItem("phongBans", JSON.stringify(phongBans));
    }

    function resetEmployeeForm() {
        employeeForm.reset();
        employeeIndexInput.value = "";
        employeeFormContainer.style.display = "none";
        addNewEmployeeBtn.style.display = "block";
    }

    // --- Event Listeners ---

    // Thêm phòng ban
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
    
    // Mở modal khi click "Quản lý nhân viên"
    pbTbody.addEventListener("click", e => {
        if (e.target.classList.contains('detail')) {
            const tenPhongBan = e.target.dataset.pbName;
            renderEmployeesInModal(tenPhongBan);
            modal.style.display = "block";
        }
    });

    // Các hành động trong modal (Sửa, Xóa nhân viên)
    employeeListDiv.addEventListener("click", e => {
        const target = e.target;
        if (target.tagName === 'BUTTON') {
            const action = target.dataset.action;
            const index = parseInt(target.dataset.index, 10);
            
            if (action === "edit") {
                const employee = allEmployees[index];
                employeeFormTitle.textContent = "Cập nhật thông tin nhân viên";
                employeeIndexInput.value = index;
                employeeNameInput.value = employee.hoten;
                employeePositionInput.value = employee.chucvu;
                employeeGroupInput.value = employee.nhom;
                employeeFormContainer.style.display = "block";
                addNewEmployeeBtn.style.display = "none";
                employeeNameInput.focus();
            } else if (action === "delete") {
                if (confirm(`Bạn có chắc muốn xóa nhân viên "${allEmployees[index].hoten}"?`)) {
                    allEmployees.splice(index, 1);
                    
                    renderEmployeesInModal(departmentNameInput.value);
                }
            }
        }
    });

    // Mở form thêm nhân viên mới
    addNewEmployeeBtn.addEventListener("click", () => {
        employeeFormTitle.textContent = "Thêm nhân viên mới";
        employeeFormContainer.style.display = "block";
        addNewEmployeeBtn.style.display = "none";
        employeeNameInput.focus();
    });

    // Lưu nhân viên (thêm mới hoặc cập nhật)
    saveEmployeeBtn.addEventListener("click", () => {
        const hoten = employeeNameInput.value.trim();
        if (!hoten) {
            alert("Vui lòng nhập họ và tên nhân viên.");
            return;
        }
        const index = employeeIndexInput.value;
        const employeeData = {
            hoten: hoten,
            chucvu: employeePositionInput.value.trim(),
            nhom: employeeGroupInput.value.trim(),
            phongban: departmentNameInput.value,
            gioitinh: "N/A"
        };

        if (index) { // Cập nhật
            const originalEmployee = allEmployees[parseInt(index, 10)];
            allEmployees[parseInt(index, 10)] = {...originalEmployee, ...employeeData};
        } else { // Thêm mới
            employeeData.ma_nv = "NV" + (Math.floor(Math.random() * 900) + 100); // Tạo mã NV ngẫu nhiên
            allEmployees.push(employeeData);
        }
        
        renderEmployeesInModal(departmentNameInput.value);
        resetEmployeeForm();
    });
    
    // Hủy form nhân viên
    cancelEmployeeBtn.addEventListener("click", resetEmployeeForm);

    // Đóng modal
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        resetEmployeeForm();
        renderDepartments(); // Cập nhật lại bảng chính sau khi đóng modal
    });
    window.addEventListener("click", event => {
        if (event.target == modal) {
            modal.style.display = "none";
            resetEmployeeForm();
            renderDepartments(); // Cập nhật lại bảng chính
        }
    });
    
    // Tìm kiếm phòng ban
    searchPbInput.addEventListener("input", renderDepartments);

    // --- Tiện ích ---
    function escapeHtml(unsafe) {
        if (unsafe === null || unsafe === undefined) return "";
        return String(unsafe)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // --- Khởi tạo ---
    loadEmployeeData();
});