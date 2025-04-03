// Xử lý đăng nhập bằng email bệnh viện
function handleHospitalLogin() {
    const email = document.getElementById('hospital-email').value;
    const password = document.getElementById('hospital-password').value;
    
    // Validate email domain
    if (!email.endsWith('@phuongdonghospital.com')) {
        alert('Vui lòng sử dụng email có đuôi @phuongdonghospital.com');
        return;
    }
    
    // Validate password (demo)
    if (password.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự');
        return;
    }
    
    // Tạo thông tin user (demo)
    const user = {
        name: email.split('@')[0],
        email: email,
        picture: 'https://i.imgur.com/JN6QXeA.png' // Avatar mặc định
    };
    
    // Lưu thông tin đăng nhập
    localStorage.setItem('user', JSON.stringify(user));
    
    // Chuyển hướng sang trang đặt suất ăn
    window.location.href = 'order.html';
}

// Hàm kiểm tra đăng nhập khi trang được tải
function checkLogin() {
    const user = localStorage.getItem('user');
    if (user && window.location.pathname.includes('login.html')) {
        window.location.href = 'order.html';
    } else if (!user && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Kiểm tra đăng nhập khi load trang
function checkLogin() {
    const user = localStorage.getItem('user');
    if (user && window.location.pathname.includes('login.html')) {
        window.location.href = 'order.html';
    } else if (!user && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Hiển thị thông tin người dùng
function displayUserInfo() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('user-avatar').src = user.picture;
        document.getElementById('user-name').textContent = user.name;
    }
}

// Xử lý đăng xuất
function setupLogout() {
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });
}

// Xử lý form đặt suất ăn
function setupOrderForm() {
    document.getElementById('submit-btn').addEventListener('click', (e) => {
        e.preventDefault();
        
        // Lấy thông tin bệnh nhân
        const patientName = document.getElementById('patient-name').value;
        const floor = document.getElementById('floor').value;
        const roomNumber = document.getElementById('room-number').value;
        
        // Validate thông tin
        if (!patientName || !floor || !roomNumber) {
            alert('Vui lòng nhập đầy đủ thông tin bệnh nhân');
            return;
        }
        
        // Lấy thông tin các bữa ăn đã chọn
        const meals = {
            morning: getSelectedMeals('morning'),
            noon: getSelectedMeals('noon'),
            afternoon: getSelectedMeals('afternoon'),
            dinner: getSelectedMeals('dinner')
        };
        
        // Lấy ghi chú
        const notes = {
            morning: document.getElementById('morning-notes').value,
            noon: document.getElementById('noon-notes').value,
            afternoon: document.getElementById('afternoon-notes').value,
            dinner: document.getElementById('dinner-notes').value
        };
        
        // Tạo đối tượng đơn đặt
        const order = {
            patient: { name: patientName, floor, roomNumber },
            meals,
            notes,
            timestamp: new Date().toISOString()
        };
        
        // Lưu đơn đặt (trong demo sẽ lưu vào localStorage)
        saveOrder(order);
        
        // Hiển thị thông báo thành công
        alert('Đã gửi đơn đặt suất ăn thành công!');
    });
}

// Lấy các món đã chọn theo buổi
function getSelectedMeals(prefix) {
    const checkboxes = document.querySelectorAll(`input[id^="${prefix}-"]:checked`);
    return Array.from(checkboxes).map(cb => {
        return {
            id: cb.id,
            name: document.querySelector(`label[for="${cb.id}"]`).textContent
        };
    });
}

// Lưu đơn đặt (demo)
function saveOrder(order) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    // Chuyển hướng sang trang cảm ơn
    window.location.href = 'thankyou.html';
}

// Khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    
    if (window.location.pathname.includes('order.html')) {
        displayUserInfo();
        setupLogout();
        setupOrderForm();
    }
});