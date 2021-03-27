export const actionBuyProduct = function (data) {
  return axios({
    method: "POST",
    url: "http://localhost:3000/api/v1/order",
    data,
  });
};
export const fetchDataOrder = function (data) {
  return axios({
    method: "GET",
    url: "http://localhost:3000/api/v1/order",
    data,
  });
};

export const fetchDataProductOrder = function (id) {
  return axios({
    method: "GET",
    url: `http://localhost:3000/api/v1/order/${id}`,
  });
};

export const timKiemOrder = function (chuoiTimKiem, mangOrder) {
  /**
   * 1. tao mang rong mangTimKiem
   * 2. duyet mangNguoiDung
   * 3. sd hàm indexOf so sánh
   * 4. thêm người dùng tìm thấy vào mảng mangTimKiem
   */
  //Cach 1
  // var mangTimKiem = [];

  // mangNguoiDung.map(function(item) {
  //   if (item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1) {
  //     mangTimKiem.push(item);
  //   }
  // });

  // return mangTimKiem;

  //Cach 2 dung filter
  return mangOrder.filter(function (item) {
    return item.email.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1;
  });
};
