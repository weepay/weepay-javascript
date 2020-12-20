"use strict";

var Constants = {
    Locale: {
        TR: "tr",
        EN: "en"
    },
    Currency: {
        TL: "TL",
        EUR: "EUR",
        USD: "USD",
        GBP: "GBP",
    },
    PaymentGroup: {
        PRODUCT: "PRODUCT",
        LISTING: "LISTING",
        SUBSCRIPTION: "SUBSCRIPTION"
    },
    PaymentChannel: {
        WEB: "WEB",
        MOBILE: "MOBILE",
        MOBILE_WEB: "MOBILE_WEB",
        MOBILE_ANDROID: "MOBILE_ANDROID",
        MOBILE_WINDOWS: "MOBILE_WINDOWS",
        MOBILE_TABLET: "MOBILE_TABLET",
        MOBILE_PHONE: "MOBILE_PHONE"
    },
    ProductType: {
        PHYSICAL: "PHYSICAL",
        VIRTUAL: "VIRTUAL"
    }
}


// AUTH
function Auth(auth) {
    this.auth = auth;
};


//INIT
function weepayInit() {

    this.configure = function (auth) {
        var options = new Auth(auth);
        return this.auth = options;
    }

    this.getPayment = function (request, callback) {
        var getPaymentRequest = new GetPaymentRequest(request);
        var getPaymentInit = new GetPaymentModel(getPaymentRequest, this.auth);
        var response = getPaymentInit.getRawResult();
        callback(response);
    }

    this.formInitialize = function (request, callback) {
        var formInitializeRequest = new FormInitializeRequest(request.data, request.customer, request.shippingAddress, request.billingAddress, request.products);
        var formInitialize = new FormInitializeModel(formInitializeRequest, this.auth);
        var response = formInitialize.getRawResult();
        callback(response);
    }

    this.createPayment = function (request, callback) {
        var createPaymentRequest = new CreatePaymentRequest(request.data, request.customer, request.shippingAddress, request.billingAddress, request.products);
        var createPayment = new CreatePaymentModel(createPaymentRequest, this.auth);
        var response = createPayment.getRawResult();
        callback(response);
    }
    this.createPayment3d = function (request, callback) {
        var createPaymentRequest3d = new CreatePaymentRequestThreeD(request.data, request.customer, request.shippingAddress, request.billingAddress, request.products);
        var createPayment3d = new CreatePaymentThreeDModel(createPaymentRequest3d, this.auth);
        var response = createPayment3d.getRawResult();
        callback(response);
    }
}


//REQUEST
function BaseRequest(request) {
    this.request = request;
}

BaseRequest.prototype.toJsonString = function (options) {
    return JSON.stringify(this.getJsonObject(options))
}

function GetPaymentRequest(request) {
    BaseRequest.call(this, request);
    this.getJsonObject = function (options) {
        var requestObject = {
            Auth: options.auth,
            Data: this.request,
        }
        return requestObject;
    }
}

GetPaymentRequest.prototype = Object.create(BaseRequest.prototype);

function FormInitializeRequest(data, customer, shippingAddress, billingAddress, products) {
    this.data = data;
    this.customer = customer;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
    this.products = products;

    this.getJsonObject = function (options) {
        var requestObject = {
            Auth: options.auth,
            Data: this.data,
            Products: this.products,
            Customer: this.customer,
            ShippingAddress: this.shippingAddress,
            BillingAddress: this.billingAddress,
        }
        return requestObject;
    }
}

FormInitializeRequest.prototype = Object.create(BaseRequest.prototype);

function CreatePaymentRequest(data, customer, shippingAddress, billingAddress, products) {
    this.data = data;
    this.customer = customer;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
    this.products = products;

    this.getJsonObject = function (options) {
        var requestObject = {
            Auth: options.auth,
            Data: this.data,
            Products: this.products,
            Customer: this.customer,
            ShippingAddress: this.shippingAddress,
            BillingAddress: this.billingAddress,
        }
        return requestObject;
    }
}
CreatePaymentRequest.prototype = Object.create(BaseRequest.prototype);

function CreatePaymentRequestThreeD(data, customer, shippingAddress, billingAddress, products) {
    this.data = data;
    this.customer = customer;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
    this.products = products;

    this.getJsonObject = function (options) {
        var requestObject = {
            Auth: options.auth,
            Data: this.data,
            Products: this.products,
            Customer: this.customer,
            ShippingAddress: this.shippingAddress,
            BillingAddress: this.billingAddress,
        }
        return requestObject;
    }
}

CreatePaymentRequestThreeD.prototype = Object.create(BaseRequest.prototype);

//RESOURCE
function BaseResource(response) {
    this.response = response;
}

BaseResource.prototype.getRawResult = function () {
    return this.response;
}

function GetPaymentResource(response) {
    BaseResource.call(this, response)
}
GetPaymentResource.prototype = Object.create(BaseResource.prototype);

function FormInitializeResource(response) {
    BaseResource.call(this, response)
}
FormInitializeResource.prototype = Object.create(BaseResource.prototype);

function CreatePaymentResource(response) {
    BaseResource.call(this, response);
}
CreatePaymentResource.prototype = Object.create(BaseResource.prototype);

function CreatePaymentThreeDResource(response) {
    BaseResource.call(this, response);
}
CreatePaymentThreeDResource.prototype = Object.create(BaseResource.prototype);

//MODEL
function BaseModel() { }

BaseModel.prototype.responseHandler = function (option, request, path) {
    var data = "";
    var url = option.auth.baseUrl + path;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send(request.toJsonString(option));
    return data;
}

function GetPaymentModel(request, option) {
    this.request = request;
    this.option = option;

    if (option instanceof Auth && request instanceof GetPaymentRequest) {
        var response = new GetPaymentResource(this.responseHandler(option, request, "/GetPayment/Detail"));
        return response;
    }
}

GetPaymentModel.prototype = Object.create(BaseModel.prototype);

function FormInitializeModel(request, option) {
    this.request = request;
    this.option = option;

    if (option instanceof Auth && request instanceof FormInitializeRequest) {
        var response = new FormInitializeResource(this.responseHandler(option, request, "/Payment/PaymentCreate"));
        return response;
    }
}

FormInitializeModel.prototype = Object.create(BaseModel.prototype);

function CreatePaymentModel(request, option) {
    this.request = request;
    this.option = option;

    if (option instanceof Auth && request instanceof CreatePaymentRequest) {
        var response = new CreatePaymentResource(this.responseHandler(option, request, "/Payment/PaymentRequest"));
        return response;
    }
}

CreatePaymentModel.prototype = Object.create(BaseModel.prototype);

function CreatePaymentThreeDModel(request, option) {
    this.request = request;
    this.option = option;

    if (option instanceof Auth && request instanceof CreatePaymentRequestThreeD) {
        var response = new CreatePaymentThreeDResource(this.responseHandler(option, request, "/Payment/PaymentRequestThreeD"));
        return response;
    }
}

CreatePaymentThreeDModel.prototype = Object.create(BaseModel.prototype);