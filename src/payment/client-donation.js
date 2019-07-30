var GGPaymentConfig = function(e) {
    for (var t in this.configValues = {
        api_key: "",
        api_token: "",
        postLocation: "https://api.globalgiving.org/api/secure/givingservice/donationsclient",
        is_test: !1,
        paymentGatewayKey: "",
        transactionId: "",
        refcode: "",
        formId: "ggPaymentForm",
        cardDivId: "ggCardNumber",
        cvvDivId: "ggCardCvv",
        expirationDateDivId: "ggCardExpiration",
        postalDivId: "ggCardPostal"
    },
    e)
        this.configValues.hasOwnProperty(t) && (this.configValues[t] = e[t])
}
  , GGPayment = function(e) {
    this.formId = e.configValues.formId,
    this.postLocation = e.configValues.postLocation,
    this.api_key = e.configValues.api_key,
    this.api_token = e.configValues.api_token,
    this.is_test = e.configValues.is_test,
    this.donation = {
        refcode: e.configValues.refcode,
        transactionId: e.configValues.transactionId,
        email: "",
        twitter_username: "",
        amount: 0,
        addon: {
            amount: 0
        },
        currencyCode: "USD",
        project: {
            id: -1
        },
        noteToOrganization: "",
        partnerCode: "",
        signupForGGNewsletter: !1,
        signupForCharityNewsletter: !1,
        payment_detail: {
            firstname: "",
            lastname: "",
            address: "",
            address2: "",
            city: "",
            state: "",
            iso3166CountryCode: "",
            paymentGateway: "braintree",
            paymentGatewayKey: e.configValues.paymentGatewayKey,
            paymentGatewayNonce: ""
        }
    },
    this.braintree = {
        styles: {
            input: {
                "font-size": "16px",
                "font-family": "courier, monospace",
                "font-weight": "lighter",
                color: "#ccc"
            },
            ":focus": {
                color: "black"
            },
            ".valid": {
                color: "#8bdda8"
            }
        },
        fields: {
            number: {
                selector: "#" + e.configValues.cardDivId,
                placeholder: "4111 1111 1111 1111"
            },
            cvv: {
                selector: "#" + e.configValues.cvvDivId,
                placeholder: "123"
            },
            expirationDate: {
                selector: "#" + e.configValues.expirationDateDivId,
                placeholder: "MM/YYYY"
            },
            postalCode: {
                selector: "#" + e.configValues.postalDivId,
                placeholder: "11111"
            }
        }
    }
};
function doPost(e, t, a, n) {
    var o = '{ "donation" : ' + t + "}";
    console.log("sending:\n" + o);
    var i = function(e, t, a) {
        alert("Thank you for your donation!"),
        console.log(JSON.stringify(e))
    };
    "function" == typeof a && (i = a);
    var r = function(e, t, a) {
        alert("There was a problem with your donation. Please try again.")
    };
    "function" == typeof n && (r = n),
    $.ajax({
        type: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Pragma: "no-cache",
            "Cache-Control": "no-cache"
        },
        url: e.postLocation + "?api_key=" + e.api_key + "&api_token=" + e.api_token + "&is_test=" + e.is_test,
        data: o,
        success: i,
        error: r,
        dataType: "json",
        timeout: 6e4
    })
}
function escapeForJsonChars(e) {
    return "string" == typeof e ? e.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f") : new String(e)
}
function overridedMapFromFormData(e, t) {
    for (i = 0; i < e.length; i++) {
        var a = e[i].name;
        if ("donation.project.id" != a) {
            if (null != a) {
                var n = a.split(".");
                "donation" == n[0] && (2 == n.length ? t.donation.hasOwnProperty(n[1]) && "payment_detail" != n[1] && (t.donation[n[1]] = e[i].value) : 3 == n.length && "payment_detail" == n[1] && t.donation.payment_detail.hasOwnProperty(n[2]) && (t.donation.payment_detail[n[2]] = e[i].value))
            }
        } else
            t.donation.project.id = e[i].value
    }
}
function buildJson(e) {
    var t = "{";
    for (var a in e)
        if (e.hasOwnProperty(a)) {
            if ("string" == typeof e[a] && 0 == e[a].length)
                continue;
            t += '"' + escapeForJsonChars(a) + '" : ' + generateStringForValueType(a, e[a]) + ","
        }
    return 1 < t.length && (t = t.substring(0, t.length - 1)),
    t += "}"
}
function generateStringForValueType(e, t) {
    var a = typeof t;
    return "object" == a ? buildJson(t) : "string" == a ? '"' + escapeForJsonChars(t) + '"' : t
}
GGPayment.prototype.startup = function(i, r, s, n, c, l) {
    var p = this;
    braintree.client.create({
        authorization: p.donation.payment_detail.paymentGatewayKey
    }, function(e, t) {
        if (e)
            "function" == typeof n && n(e, t, p);
        else {
            var a = document.getElementById(p.formId);
            braintree.hostedFields.create({
                client: t,
                styles: p.braintree.styles,
                fields: p.braintree.fields
            }, function(e, o) {
                e ? "function" == typeof c && c(e, o, p) : a.addEventListener("submit", function(n) {
                    n.preventDefault();
                    var e = document.getElementById(p.formId);
                    overridedMapFromFormData(e.getElementsByTagName("input"), p),
                    overridedMapFromFormData(e.getElementsByTagName("select"), p),
                    overridedMapFromFormData(e.getElementsByTagName("textarea"), p),
                    o.tokenize(function(e, t) {
                        if (e)
                            "function" == typeof l && l(e, o, p);
                        else if (p.donation.payment_detail.paymentGatewayNonce = t.nonce,
                        "function" != typeof s || s(n, p)) {
                            var a = buildJson(p.donation);
                            doPost(p, a, i, r)
                        }
                    })
                }, !1)
            })
        }
    })
}
;
