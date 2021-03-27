import Products from "./product.js";
var sanPhamService1 = new SanPhamService();
var loaiSanPhamService = new LoaiSanPhamService();
let productCP = new Products();
const globalProducts = [];
// let countCart = productCP.countCart;
let countCart = 0;
JSON.parse(localStorage.getItem("add_cart"))?.forEach((item) => {
  countCart++;
});
getEle("count-cart").innerHTML = countCart;

getListProductHome();

function getListProductHome() {
  getEle(
    "product_category"
  ).innerHTML = `<div class="sefLoading"><div class="loader"></div></div>`;

  Promise.all([
    loaiSanPhamService.layDanhSachLoaiSanPham(),
    sanPhamService1.layDanhSachSanPham(),
  ]).then((res) => {
    let arrData = [];

    res.forEach((item, index) => {
      arrData[index] = item.data;
    });
    let [data0, data1] = [arrData[0], arrData[1]];

    data0.forEach((names) => {
      let a = data1.filter((product) => product.category === names.name);
      if (a.length) {
        globalProducts.push({ name: names.name, lstProduct: a });
      }
    });
    productCP.products = globalProducts;
    //render html
    let content = productCP.renderItem();

    getEle("product_category").innerHTML = content;

    InitialSlickCarousel();
  });
}

const InitialSlickCarousel = () => {
  $(".slick-carousel").slick({
    dots: true,
    nav: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });
};

function getEle(id) {
  return document.getElementById(id);
}

const homeUserCheck = function () {
  let content = getEle("home_user");

  if (!localStorage.getItem("user")) {
    content.innerHTML = `
    <i class="fa fa-user"></i>
              <span>Login</span>
  `;
  } else {
    let nameUser = JSON.parse(localStorage.getItem("user")).name;
    content.innerHTML = `
    <p>Hello <span  class="text-uppercase">${nameUser.split(
      0,
      1
    )}</span>  </p>`;
  }
};
// getEle("home_user").addEventListener("click", function () {
//   if (!localStorage.getItem("user")) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Bạn cần phải đăng nhập",
//       footer: "<a href>Why do I have this issue?</a>",
//     });
//   }
// });

homeUserCheck();
