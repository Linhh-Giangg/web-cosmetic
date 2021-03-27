import request from "../apis/request.js";
//create object request để callAPI
let callApi = new request();
//create object user để đăng ký

// let user = new users();
//hàm này dùng để DOM id
let getEle = function (value) {
  return document.getElementById(value);
};

// getEle("taiKhoan").value = user.name;
// getEle("matKhau").value = user.password;
// getEle("email").value = user.email;
// getEle("role").value = user.role;

// handle event submit
getEle("sb").addEventListener("submit", function (event) {
  event.preventDefault(); // để ko load lại trang

  const email = getEle("email").value;
  const password = getEle("matKhau").value;
  callApi
    .login({ email, password })
    .then((res) => {
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        alert("Dang nhap thanh cong");
        localStorage.setItem("token", res.data.data.token);
        if (res.data.data.role === "admin") {
          window.location.href = "/app/views/index.html";
        } else {
          window.location.href = "/app/views/index1.html";
        }
      }
    })
    .catch((e) => alert(e.message));
});
