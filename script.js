var urlApi = "https://quartz-drain.glitch.me/products";

function toggleListEdit() {
  if ($("#divEdit").css('display') == 'none') {
    $("#divEdit").show();
    $("#productsList").hide();
    $("#boxList").hide();
  }
  else {
    $("#divEdit").hide();
    $("#productsList").show();
    $("#boxList").show();
  }
}

function cancel() {
  toggleListEdit();
}

function getProducts() {
  $.ajax({
    type: "GET",
    url: urlApi
  }).success(function (data) {
    $("#productsList").empty();
    $.each(data, function (a, b) {
      var editLink = "<a href='#' onclick=edit('" + b.name + "'," + b.value + "," + b.quantity + ")>Edit</a>";
      var deleteLink = "<a href='#' onclick=deleteProduct('" + b.name + "')>Delete</a>";
      $("#productsList").append("<div>" + editLink + " | " + deleteLink + " | " + b.name + " - " + b.value + "</div>");
    });
  });
}

function edit(name, value, quantity) {
  toggleListEdit();

  $("#txtName").val(name);
  $("#txtName").prop('disabled', true);
  $("#txtValue").val(value);
  $("#txtQuantity").val(quantity);
}

function newProduct() {
  toggleListEdit();

  $("#txtName").val('');
  $("#txtName").prop('disabled', false);
  $("#txtValue").val('');
  $("#txtQuantity").val('');
}

function save() {
  var name = $("#txtName").val();
  var value = $("#txtValue").val();
  var quantity = $("#txtQuantity").val();

  var product = {
    name: name,
    value: value,
    quantity: quantity
  };

  var type;
  var urlSave;
  if ($("#txtName").prop("disabled")) {
    type = "PUT";
    urlSave = urlApi + "/name/" + product.name;
  } else {
    type = "POST";
    urlSave = urlApi
  }
  $.ajax({
    type: type,
    data: JSON.stringify(product),
    url: urlSave,
    contentType: "application/json",
    dataType: "json"
  }).success(function (res) {
    alert("Saved!");
    getProducts();
    toggleListEdit();
  }).error(function (err) {
    console.log('ee', err)
    alert("Not saved :(");
  });
}

function deleteProduct(name) {
  $.ajax({
    type: "DELETE",
    url: urlApi + "/name/" + name
  }).success(function (res) {
    alert("deleted!");
    getProducts();
  });
}
