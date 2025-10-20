const news = [
    {
        title: "Thông báo nghỉ lễ 20/10",
        content: "Công ty thông báo toàn thể nhân viên được nghỉ 1 ngày 20/10 để chúc mừng ngày Phụ nữ Việt Nam.",
        date: "Ngày đăng: 18/10/2025"
    },
    {
        title: "Khen thưởng nhân viên xuất sắc tháng 9",
        content: "Xin chúc mừng bạn Trần Nhật Thạch – Nhân viên xuất sắc tháng 9 vì những đóng góp nổi bật trong dự án quản lý nhân sự.",
        date: "Ngày đăng: 10/10/2025"
    },
    {
        title: "Cập nhật chính sách chấm công",
        content: "Từ tháng 11/2025, hệ thống chấm công sẽ được nâng cấp với tính năng mới: đăng nhập bằng khuôn mặt.",
        date: "Ngày đăng: 05/10/2025"
    }
];

const newsList = document.getElementById("news-list");

news.forEach(item => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <div class="news-date">${item.date}</div>
    `;
    newsList.appendChild(card);
});
