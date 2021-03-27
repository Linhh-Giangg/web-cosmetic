var sanPhamService = new SanPhamService();
// const loaiSanPhamService = new LoaiSanPhamService();
const renderSelectList = (data = []) => {
  const elemen = document.getElementById("category");
  const lstOption = data.map((item) => {
    const option = document.createElement("option");
    option.setAttribute("value", item.name);
    option.innerText = item.name;
    return option;
  });

  elemen.append(...lstOption);
};
function getListCategory() {
  loaiSanPhamService
    .layDanhSachLoaiSanPham()
    .then(function (result) {
      renderSelectList(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListCategory();
getListProduct();

getEle("btnThemSanPham").addEventListener("click", function () {
  var title = "Thêm sản phẩm";
  var footer = `
    <button class="btn btn-success" onclick="themSanPham()">Thêm</button>
  `;

  document.getElementsByClassName("modal-title")[2].innerHTML = title;
  document.getElementsByClassName("modal-footer")[2].innerHTML = footer;
});

const ValidateProduct = (productInfo = new SanPham()) => {
  if (IsNullOrEmpty(productInfo.sku)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Mã sản phẩm không được bỏ trống!",
    });
    return false;
  }
  if (IsNullOrEmpty(productInfo.name_product)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tên sản phẩm không được bỏ trống!",
    });
    return false;
  }
  if (IsNullOrEmpty(productInfo.price)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Giá không được bỏ trống!",
    });
    return false;
  }
  if (IsNullOrEmpty(productInfo.quantity)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Số lượng không được bỏ trống!",
    });
    return false;
  }
  if (IsNullOrEmpty(productInfo.description)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Mô tả không được bỏ trống!",
    });
    return false;
  }
  if (IsNullOrEmpty(productInfo.image)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Link hình ảnh không được bỏ trống!",
    });
    return false;
  }
  return true;
};
//Them San Pham
function themSanPham() {
  var sku = getEle("sku").value;
  var name_product = getEle("name_product").value;
  var price = getEle("price").value;
  var quantity = getEle("quantity").value;
  var category = getEle("category").value;
  var description = getEle("description").value;
  var image = getEle("image").value;

  var sanPham = new SanPham(
    sku,
    name_product,
    price,
    quantity,
    category,
    description,
    image
  );

  if (!ValidateProduct(sanPham)) {
    return;
  }

  sanPhamService
    .themSanPham(sanPham)
    .then((result) => {
      if (result.status === 200 || result.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thêm sản phẩm thành công!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        getListProduct();
      }
      let a = document.getElementsByClassName("form-control");
      Array.from(a).forEach((item) => (item.value = ""));
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Thêm sản phẩm không thành công!!!",
        footer: "<a href>Sai òi!!!</a>",
      });
    });
}

function getListProduct() {
  sanPhamService
    .layDanhSachSanPham()
    .then(function (result) {
      localStorage.setItem("danhSachSanPham", JSON.stringify(result.data));
      renderProductTable(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Chức năng Xóa
function xoaSP(id) {
  sanPhamService
    .xoaSanPham(id)
    .then((result) => {
      if (result.status === 200 || result.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Xoá sản phẩm thành công!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        getListProduct();
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Xoá sản phẩm không thành công!!!",
        footer: "<a href>Sai òi!!!</a>",
      });
    });
}

//Sua san pham
function suaSP(id) {
  document.getElementsByClassName("modal-title")[2].innerHTML = "Sửa sản phẩm";

  var footer = `
    <button class="btn btn-success" onclick="capNhatSP('${id}')">Cập nhật</button>
  `;

  document.getElementsByClassName("modal-footer")[2].innerHTML = footer;

  sanPhamService
    .layThongTinSanPham(id)
    .then(function (result) {
      console.log(result);
      getEle("sku").value = result.data.data.sku;
      getEle("name_product").value = result.data.data.name_product;
      getEle("price").value = result.data.data.price;
      getEle("quantity").value = result.data.data.quantity;
      getEle("category").value = result.data.data.category;
      getEle("description").value = result.data.data.description;
      getEle("image").value = result.data.data.image;
    })
    .catch(function (err) {
      console.log(err);
    });
}

//Cap nhat san pham
function capNhatSP(id) {
  var sku = getEle("sku").value;
  var name_product = getEle("name_product").value;
  var price = getEle("price").value;
  var quantity = getEle("quantity").value;
  var category = getEle("category").value;
  var description = getEle("description").value;
  var image = getEle("image").value;

  var sanPham = new SanPham(
    sku,
    name_product,
    price,
    quantity,
    category,
    description,
    image
  );

  if (!ValidateProduct(sanPham)) {
    return;
  }

  sanPhamService
    .capNhatSanPham(id, sanPham)
    .then(function (result) {
      if (result.status === 200 || result.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sửa sản phẩm thành công!!!",
          showConfirmButton: false,
          timer: 1500,
        });
        getListProduct();
      }
      let a = document.getElementsByClassName("form-control");
      Array.from(a).forEach((item) => (item.value = ""));
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sửa sản phẩm không thành công!!!",
        footer: "<a href>Sai òi!!!</a>",
      });
    });
}

//chức năng tìm kiếm
getEle("txtSearch2").addEventListener("keyup", function () {
  var chuoiTimKiem = getEle("txtSearch2").value;
  var mangSanPham = JSON.parse(localStorage.getItem("danhSachSanPham")) || [];
  var mangTimKiem = sanPhamService.timKiemSanPham(chuoiTimKiem, mangSanPham);

  renderProductTable(mangTimKiem);
});

function getEle(id) {
  return document.getElementById(id);
}

function renderProductTable(mangSanPham) {
  var contentHTML = "";
  mangSanPham.map(function (item) {
    contentHTML += `
                <tr>
                    <td>${item.sku}</td>
                    <td>${item.name_product}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>${item.description}</td>
                    <td>${item.category}</td>
                    <td>${item.image}</td>
                    <td>
                      <button class="btn btn-info" data-toggle="modal" data-target="#myModal2" onclick="suaSP('${item.id}')">Sửa</button>
                      <button class="btn btn-danger" onclick="xoaSP('${item.id}')">Xóa</button>
                    </td>
                </tr>
            `;
  });
  getEle("tblDanhSachSanPham").innerHTML = contentHTML;
}
