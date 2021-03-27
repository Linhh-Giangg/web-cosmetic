import { fetchDataOrder } from "../services/cart.js";
import { fetchDataProductOrder } from "../services/cart.js";
import { timKiemOrder } from "../services/cart.js";

getListOrder();
let danhSachOrder = [];
function getListOrder() {
  fetchDataOrder()
    .then(function (result) {
      danhSachOrder = [...result.data];
      renderOrderTable(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// getListProductOrder();
let danhSachProductOrder = [];
function getListProductOrder() {
  fetchDataProductOrder()
    .then(function (result) {
      danhSachProductOrder = [...result.data];
      renderOrderProductTable(result.data);
      // console.log(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function show(values) {
  let findIndex = danhSachOrder.findIndex((data) => data.id === values);
  if (findIndex > -1) {
    renderOrderProductTable(danhSachOrder[findIndex].product);
    //console.log(danhSachOrder[findIndex].product);
  }
  // console.log(danhSachOrder[findIndex]);
}
window.show = show;

//chức năng tìm kiếm
getEle("txtSearchOrder").addEventListener("keyup", function () {
  var chuoiTimKiem = getEle("txtSearchOrder").value;
  var mangTimKiem = timKiemOrder(chuoiTimKiem, danhSachOrder);

  renderOrderTable(mangTimKiem);
});

function getEle(id) {
  return document.getElementById(id);
}

function renderOrderTable(arr = danhSachOrder) {
  var contentHTML = "";
  arr.map(function (item) {
    contentHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.email}</td>
                    <td>${item.order_desc}</td>
                    <td>${item.total}</td>  
                    <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModalOrder"
                     onclick="show('${item.id}')">Xem</button> 
                    </td>
                </tr>
            `;
  });
  getEle("tblDanhSachOrder").innerHTML = contentHTML;
}

function renderOrderProductTable(arr = danhSachProductOrder) {
  var contentHTML = "";
  arr.map(function (item, index) {
    contentHTML += `
                <tr>
                    <td>${item.sku}</td>
                    <td>${item.amount}</td>
                    <td>${item.total}</td>  
                </tr>
            `;
  });
  getEle("tblDanhSachProductOrder").innerHTML = contentHTML;
}
