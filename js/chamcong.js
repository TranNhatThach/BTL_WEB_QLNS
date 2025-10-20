document.getElementById("searchInput").onkeyup = function () {
  let keyword = this.value.toLowerCase();
  // Lặp qua tất cả các hàng trong bảng (chỉ hàng dữ liệu, không phải hàng chi tiết)
  document.querySelectorAll("tbody tr:not(.details)").forEach(row => {
    let name = row.cells[2]?.textContent.toLowerCase() || "";
    // Hiện hoặc ẩn tùy theo kết quả khớp tên
    row.style.display = name.includes(keyword) ? "" : "none";

    // Ẩn luôn hàng chi tiết tương ứng nếu hàng chính bị ẩn
    let next = row.nextElementSibling;
    if (next?.classList.contains("details")) {
      next.style.display = name.includes(keyword) ? next.style.display : "none";
    }
  });
};

document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.onclick = () => {
    let tr = btn.closest("tr");
    let details = tr.nextElementSibling;
    if (!details?.classList.contains("details")) return;

    // Đảo trạng thái hiển thị
    let isOpen = details.style.display === "table-row";
    details.style.display = isOpen ? "none" : "table-row";

    // Cập nhật giao diện mũi tên & thuộc tính truy cập
    btn.textContent = isOpen ? "▼" : "▲";
    btn.classList.toggle("open", !isOpen);
    btn.setAttribute("aria-expanded", String(!isOpen));
  };
});
