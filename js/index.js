if (!location.pathname.endsWith('html/login.html')) {
    if (!sessionStorage.getItem('loggedIn')) {
        // chưa đăng nhập -> gửi về trang login (replace để ko lưu lịch sử)
        location.replace('html/login.html');
    }
}

// Xử lý nút Đăng xuất: xóa flag và chuyển về login bằng replace
const logoutLink = document.querySelector('.foot');
if (logoutLink) {
    logoutLink.addEventListener('click', function (e) {
        e.preventDefault();
        // xóa thông tin đăng nhập
        sessionStorage.removeItem('loggedIn');
        // chuyển về login và thay thế entry lịch sử hiện tại
        location.replace(logoutLink.href);
    });
}