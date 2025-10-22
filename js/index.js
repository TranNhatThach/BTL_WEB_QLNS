if (!location.pathname.endsWith('login.html')) {
    if (!sessionStorage.getItem('loggedIn')) {
        // chưa đăng nhập -> gửi về trang login (replace để ko lưu lịch sử)
        location.replace('login.html');
    }
}

// Xử lý nút Đăng xuất: xóa flag và chuyển về login bằng replace
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.foot')?.addEventListener('click', function (e) {
        e.preventDefault();
        sessionStorage.removeItem('loggedIn');
        const href = this.getAttribute('href') || 'login.html';
        location.replace(href);
    });
});