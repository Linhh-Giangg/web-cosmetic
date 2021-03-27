let ArrayProducsCase = JSON.parse(localStorage.getItem("add_cart")) || [];

import { actionBuyProduct } from "../services/cart.js";
getEle("buy_product").disabled = ArrayProducsCase.length > 0 ? false : true;
function getEle(id) {
  return document.getElementById(id);
}

const homeUserCheck = function () {
  let content = getEle("home_user");

  if (!localStorage.getItem("user")) {
    content.innerHTML = `

    `;
  }
};
function handleDeleteSP(values) {
  let a = ArrayProducsCase.filter((item) => {
    if (item.products.length > 0) {
      let findF = item.products.findIndex((data) => data.id === values);
      if (findF > -1) {
        console.log(item.products[findF]);
        item.products.splice(findF, 1);
      } else return item;
    }
  });

  localStorage.setItem("add_cart", JSON.stringify(a));
  renderProductPushCase(a);
}
window.handleDeleteSP = handleDeleteSP;
// renderProductPushCase
const renderProductPushCase = function (arr = ArrayProducsCase) {
  let content = "";
  let total_product = 0;
  arr.forEach((item) => {
    return item.products.map((data) => {
      total_product += data.price * item.amount;

      content += `
                <div class="cart__item">
                <img class="image" src="/assets/img/${data.image}" alt=${data.name_product}>
                <span class="amount">${item.amount}</span>
                <span class="tt">${data.description}</span>
                <span class="money__item">${data.price}</span>
                <span style="cursor:pointer;font-size:30px" onClick="handleDeleteSP('${data.id}')" class="ion-trash-a"></span>
              </div>
                `;
    });
  });

  getEle("total_product").innerHTML = total_product;
  getEle("lst-product").innerHTML = content;
};

getEle("buy_product").addEventListener("click", () => {
  let product = [];
  let total_product = 0;
  if (ArrayProducsCase.length !== 0) {
    ArrayProducsCase.forEach((data) => {
      data.products.forEach(
        (item) => {
          total_product += data.amount * item.price;
          product.push({
            sku: item.sku,
            amount: data.amount,
            total: data.amount * item.price,
          });
        }
        // product.push(item)
      );
    });

    let data = {
      email: getEle("email").value,
      product,
      order_desc: getEle("order_desc").value.trim() || "Không có yêu cầu",
      total: total_product,
      status: 1,
    };
    if (data.product.length < 1 || data == undefined) {
      Swal.fire({
        icon: "error",
        text: "Giỏ hàng rỗng !!!",
      });
      return;
    }
    actionBuyProduct(data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Đặt hàng thành công",

            showConfirmButton: true,
          }).then((data) => {
            if (data.value) {
              total_product = 0;
              handleDestroyProduct();
              renderProductPushCase([]);
            }
          });
        }
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          text: "Đặt hàng thất bại",
        })
      );
  }
  Swal.fire({
    icon: "error",
    text: "Giỏ hàng rỗng !!!",
  });
});

// window.handleBuyProduct = handleBuyProduct();
function handleDestroyProduct() {
  localStorage.removeItem("add_cart");
}
window.handleDestroyProduct = handleDestroyProduct;
function thongTinNguoiDung() {
  //   var password = getEle("password").value;
  //   var role = getEle("role").value;

  //   var nguoiDung = new NguoiDung(name, email, password, address, phone, role);
  let detailsUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  if (detailsUser) {
    getEle("name").value = detailsUser.name;
    getEle("email").value = detailsUser.email;
    getEle("phone").value = detailsUser.phone;
    getEle("address").value = detailsUser.address;
  }

  //render product
  renderProductPushCase();
}
thongTinNguoiDung();
