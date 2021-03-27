var loaiSanPhamService = new LoaiSanPhamService();

getListCategory();

getEle("btnThemLoaiSanPham").addEventListener("click", function () {
  var title = "Thêm loại sản phẩm";
  var footer = `
    <button class="btn btn-success" onclick="themLoaiSanPham()">Thêm</button>
  `;

  document.getElementsByClassName("modal-title")[1].innerHTML = title;
  document.getElementsByClassName("modal-footer")[1].innerHTML = footer;
});

const ValidateCategory = (categoryInfo = new LoaiSanPham()) => {
  if (IsNullOrEmpty(categoryInfo.name)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tên loại sản phẩm không được để trống!",
    });
    return false;
  }
  if (IsNullOrEmpty(categoryInfo.description)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Mô tả không được để trống!",
    });
    return false;
  }
  return true;
};
//Them Loai San Pham
function themLoaiSanPham() {
  var name = getEle("name_cate").value;
  var description = getEle("description_cate").value;

  var loaiSanPham = new LoaiSanPham(name, description);

  if (!ValidateCategory(loaiSanPham)) {
    return;
  }

  loaiSanPhamService
    .themLoaiSanPham(loaiSanPham)
    .then((result) => {
      if (result.status === 200 || result.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thêm loại sản phẩm thành công!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        getListCategory();
      }
      let a = document.getElementsByClassName("form-control");
      Array.from(a).forEach((item) => (item.value = ""));
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Thêm loại sản phẩm không thành công!!!",
        footer: "<a href>Sai òi!!!</a>",
      });
    });
}

function getListCategory() {
  loaiSanPhamService
    .layDanhSachLoaiSanPham()
    .then(function (result) {
      localStorage.setItem("product_category", JSON.stringify(result.data));
      renderCategoryTable(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
//Chức năng Xóa
function xoaLSP(id) {
  loaiSanPhamService
    .xoaLoaiSanPham(id)
    .then((result) => {
      if (result.status === 200 || result.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Xóa loại sản phẩm thành công!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        getListCategory();
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Xóa loại sản phẩm không thành công!!!",
        footer: "<a href>Sai òi!!!</a>",
      });
    });
}

//Sua loai san pham
function suaLSP(id) {
  document.getElementsByClassName("modal-title")[1].innerHTML =
    "Sửa loại sản phẩm";

  var footer = `
    <button class="btn btn-success" onclick="capNhatLSP('${id}')">Cập nhật</button>
  `;

  document.getElementsByClassName("modal-footer")[1].innerHTML = footer;

  loaiSanPhamService
    .layThongTinLoaiSanPham(id)
    .then(function (result) {
      let { data } = result.data;
      getEle("name_cate").value = data.name;
      getEle("description_cate").value = data.description;
    })
    .catch(function (err) {
      console.log(err);
    });
}

//Cap nhat loai san pham
function capNhatLSP(id) {
  var name = getEle("name_cate").value;
  var description = getEle("description_cate").value;

  var loaiSanPham = new LoaiSanPham(name, description);

  if (!ValidateCategory(loaiSanPham)) {
    return;
  }

  loaiSanPhamService
    .capNhatLoaiSanPham(id, loaiSanPham)
    .then(function (result) {
      if (result.status === 200 || result.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sửa loại sản phẩm thành công!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        getListCategory();
      }
      let a = document.getElementsByClassName("form-control");
      Array.from(a).forEach((item) => (item.value = ""));
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sửa loại sản phẩm không thành công!!!",
        footer: "<a href>Sai òi!!!</a>",
      });
    });
}

//chức năng tìm kiếm
getEle("txtSearch3").addEventListener("keyup", function () {
  var chuoiTimKiem = getEle("txtSearch3").value;
  var mangLoaiSanPham =
    JSON.parse(localStorage.getItem("product_category")) || [];

  var mangTimKiem = loaiSanPhamService.timKiemSanPham(
    chuoiTimKiem,
    mangLoaiSanPham
  );

  renderCategoryTable(mangTimKiem);
});

function getEle(id) {
  return document.getElementById(id);
}

function renderCategoryTable(mangLoaiSanPham) {
  var contentHTML = "";
  mangLoaiSanPham.map(function (item) {
    contentHTML += `
                <tr>
                    <td>${item._id}</td> 
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>
                      <button class="btn btn-info" data-toggle="modal" data-target="#myModal3" onclick="suaLSP('${item._id}')">Sửa</button>
                      <button class="btn btn-danger" onclick="xoaLSP('${item._id}')">Xóa</button>
                    </td>
                </tr>
            `;
  });
  getEle("tblDanhSachLoaiSanPham").innerHTML = contentHTML;
}
