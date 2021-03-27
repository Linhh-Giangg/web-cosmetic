var nguoiDungService = new NguoiDungService();

getListUser();
getEle("btnThemNguoiDung").addEventListener("click", function () {
  var title = "Thêm người dùng";
  var footer = `
    <button class="btn btn-success" onclick="themNguoiDung()">Thêm</button>
  `;
  document.getElementsByClassName("modal-title")[0].innerHTML = title;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  // document.getElementsByClassName("form-control").value = "";
});

const IsNullOrEmpty = (text = "") => {
  return !text?.trim();
};

const ValidateUser = (userInfo = new NguoiDung()) => {
  if (IsNullOrEmpty(userInfo.name)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Bạn vui lòng nhập họ tên",
    });
    return false;
  }

  if (IsNullOrEmpty(userInfo.email)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email không được rỗng!",
    });
    return false;
  }

  if (IsNullOrEmpty(userInfo.phone)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "SĐT không được rỗng!",
    });
    return false;
  }

  if (IsNullOrEmpty(userInfo.address)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Địa chỉ không được rỗng!",
    });
    return false;
  }

  if (IsNullOrEmpty(userInfo.password)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Bạn phải nhập mật khẩu",
    });
    return false;
  }

  if (!/[a-zA-Z0-9]+(@gmail.com)/gi.test(userInfo.email)) {
    alert("Email không hợp lệ (ex: example@gmail.com)!");
    return false;
  }
  if (!/0\d{9,10}\s*$/gi.test(userInfo.phone)) {
    alert("SĐT không hợp lệ (ex: 0123456789)!");
    return false;
  }

  return true;
};
//Them Nguoi Dung
function themNguoiDung() {
  var name = getEle("name").value;
  var email = getEle("email").value;
  var phone = getEle("phone").value;
  var address = getEle("address").value;
  var password = getEle("password").value;
  var role = getEle("role").value;

  var nguoiDung = new NguoiDung(name, email, phone, address, password, role);

  if (!ValidateUser(nguoiDung)) {
    return;
  }

  nguoiDungService
    .themNguoiDung(nguoiDung)
    .then((result) => {
      if (result.status === 200 || result.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thêm người dùng thành công!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        getListUser();
      }
      let a = document.getElementsByClassName("form-control");
      Array.from(a).forEach((item) =>
        item.id !== "role" ? (item.value = "") : null
      );
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Thêm người dùng không thành công!!!",
        footer: "<a href>Sai òi!!!</a>",
      });
    });
}

function getListUser() {
  nguoiDungService
    .layDanhSachNguoiDung()
    .then(function (result) {
      setLocalStorage(result.data);

      renderUserTable(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Luu mảng người dùng xuống localStorage
function setLocalStorage(mangNguoiDung) {
  localStorage.setItem("DanhSachNguoiDung", JSON.stringify(mangNguoiDung));
}

//Lay mảng người dùng xuống localStorage
function getLocalStorage() {
  if (localStorage.getItem("DanhSachNguoiDung")) {
    return JSON.parse(localStorage.getItem("DanhSachNguoiDung"));
  }
}

//Chức năng Xóa
function xoaND(id) {
  nguoiDungService
    .xoaNguoiDung(id)
    .then((result) => {
      if (result.status === 200 || result.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Xóa người dùng thành công!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        getListUser();
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Xóa người dùng không thành công!!!",
        footer: "<a href>Sai òi!!!</a>",
      });
    });
}

//Sua nguoi dung
function suaND(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Sửa người dùng";

  var footer = `
    <button class="btn btn-success" onclick="capNhatND('${id}')">Cập nhật</button>
  `;

  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  nguoiDungService
    .layThongTinNguoiDung(id)
    .then(function (result) {
      getEle("name").value = result.data.data.name;
      getEle("email").value = result.data.data.email;
      getEle("phone").value = result.data.data.phone;
      getEle("address").value = result.data.data.address;
      getEle("password").value = result.data.data.password;
      getEle("role").value = result.data.data.role;
    })
    .catch(function (err) {
      console.log(err);
    });
}

//Cap Nhat nguoi dung
function capNhatND(id) {
  var name = getEle("name").value;
  var email = getEle("email").value;
  var phone = getEle("phone").value;
  var address = getEle("address").value;
  var password = getEle("password").value;
  var role = getEle("role").value;

  var nguoiDung = new NguoiDung(name, email, phone, address, password, role);

  if (!ValidateUser(nguoiDung)) {
    return;
  }

  nguoiDungService
    .capNhatNguoiDung(id, nguoiDung)
    .then(function (result) {
      if (result.status === 200 || result.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sửa người dùng thành công!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        getListUser();
      }
      let a = document.getElementsByClassName("form-control");
      Array.from(a).forEach((item) =>
        item.id !== "role" ? (item.value = "") : null
      );
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sửa người dùng không thành công!!!",
        footer: "<a href>Sai òi!!!</a>",
      });
    });
}

//chức năng tìm kiếm
getEle("txtSearch").addEventListener("keyup", function () {
  var chuoiTimKiem = getEle("txtSearch").value;
  var mangNguoiDung =
    JSON.parse(localStorage.getItem("DanhSachNguoiDung")) || [];

  var mangTimKiem = nguoiDungService.timKiemNguoiDung(
    chuoiTimKiem,
    mangNguoiDung
  );

  renderUserTable(mangTimKiem);
});

function getEle(id) {
  return document.getElementById(id);
}

function renderUserTable(mangNguoiDung) {
  var contentHTML = "";
  mangNguoiDung.map(function (item, index) {
    contentHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.address}</td>
                    <td>${item.phone}</td>
                    <td>${item.role}</td>
                    <td>
                      <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaND('${
                        item.id
                      }')">Sửa</button> 
                      <button class="btn btn-danger" onclick="xoaND('${
                        item.id
                      }')">Xóa</button>
                    </td>
                </tr>
            `;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}
