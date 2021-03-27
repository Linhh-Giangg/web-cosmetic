function SanPham(
  _sku,
  _name_product,
  _price,
  _quantity,
  _category,
  _description,
  _image
) {
  //key: value
  this.sku = _sku;
  this.name_product = _name_product;
  this.price = _price;
  this.quantity = _quantity;
  this.category = _category;
  this.description = _description;
  this.image = _image;
}
