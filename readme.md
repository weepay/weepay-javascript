# weepay javascript
#### javascript credit card payment library


You can sign up or sign in for an weepay account at [https://weepay.co](https://weepay.co "https://weepay.co")

### Installation
import weepay javascript library weepay.js or weepay.min.js file

### Usage
To write an app using the SDK
- Add dependency 'weepay.js' in your html file. 


```html
<script src="/weepay.min.js"></script>
```

- Create config options, with parameters (bayiId, apiKey, secretKey).

```javascript 
var weepay = new weepayInit();

weepay.configure({
    bayiId: "bayi-id",
    apiKey: "apiKey",
    secretKey: "secretKey",
    baseUrl: "https://test-api.weepay.co"
});

```

- Invoke the rest api (eg: create a weepay payment) with required parameters (eg: data, option).


```javascript
     var request = {
            data: {
                orderId: 1,
                ipAddress: "192.168.2.1",
                paidPrice: 0.10,
                currency: Constants.Currency.TL,
                locale: Constants.Locale.TR,
                description: "Açıklama Alanı",
                callBackUrl: "https://websitem.com/callback",
                paymentGroup: Constants.PaymentGroup.PRODUCT,
                paymentChannel: Constants.PaymentChannel.WEB
            },
            customer: {
                customerId: 1234,
                customerName: "isim",
                customerSurname: "soyisim",
                gsmNumber: "50XXXXXX",
                email: "helo@weepay.co",
                identityNumber: "00032222721",
                city: "istanbul",
                country: "turkey"
            },
            billingAddress: {
                contactName: "isim soyisim",
                address: "Abdurrahman Nafiz Gürman,Mh, G. Ali Rıza Gürcan Cd. No:27",
                city: "istanbul",
                country: "turkey",
                zipCode: "34164"
            },
            shippingAddress: {
                contactName: "isim soyisim",
                address: "Abdurrahman Nafiz Gürman,Mh, G. Ali Rıza Gürcan Cd. No:27",
                city: "istanbul",
                country: "turkey",
                zipCode: "34164"
            },
            products: [
                {
                    name: "first product",
                    productPrice: "30.00",
                    itemType: Constants.ProductType.PHYSICAL,
                    productId: "1234"
                },
                {
                    name: "first product",
                    productPrice: "30.00",
                    itemType: Constants.ProductType.PHYSICAL,
                    productId: "1234"
                },
            ]
        }
        weepay.formInitialize(request, function (response) {
            if (response.status == "failure") {
                console.log(response);
            } else {

                var elem = document.getElementById("weePay-checkout-form");
                var createForm = document.createRange().createContextualFragment(response.CheckoutFormData);
                elem.append(createForm);

                // or use jQuery

                // $("#weePay-checkout-form").append(response.CheckoutFormData);
            }
        });
```
### Requirements
- if you want to use the checkout form; weepay div is required
```HTML
<div id="weePay-checkout-form" class="responsive">
```

### Samples

- You can see further examples in samples folder



If you have any questions, please don't hesitate to contact us via Github with open an issue or contact us at destek@weepay.co.
