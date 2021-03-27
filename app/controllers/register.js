import request from "../apis/request.js";
// import users from "../model/users.js";
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

getEle("yh").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = getEle("name").value;
  const phone = getEle("phone").value;
  const address = getEle("address").value;
  const email = getEle("email").value;
  const password = getEle("matKhau").value;
  callApi
    .addUser({ name, phone, address, email, password })
    .then((res) => {
      if (res.data.success) {
        alert("Dang ky thanh cong");
        localStorage.setItem("token", res.data.data);
      }
      window.location.href = "/app/views/login.html";
    })
    .catch((e) => alert(e.message));
});
// getEle(app).innerHTML = ""
