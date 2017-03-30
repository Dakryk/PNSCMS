<script type="text/javascript">
//<![CDATA[
    var payment_method_chosen = false;
    var using_coupon = false;

    /* Make sure they choose a payment provider */
    function confirm_payment_provider() {
        //if terms and conditions is enabled and the customer didn't tick agree terms and conditions
        if($('.CheckoutHideOrderTermsAndConditions').css('display') != "none" && $('#AgreeTermsAndConditions').prop('checked') != true){
            alert(lang.TickArgeeTermsAndConditions);
            return false;
        }

        // If they are using a coupon code we don't need to validate any of the form
        if (using_coupon) {
            return true;
        }

        if($('#use_store_credit').css('display') != "none") {
            if($('#store_credit:checked')) {
                if($('#credit_provider_list').css('display') != "none") {
                    var length = $('#credit_provider_list').find('input').length;
                    if(length == 0) {
                        var checked = 1;
                    }
                    else {
                        var checked = $('#credit_provider_list').find('input:checked').length;
                    }
                }
                else {
                    checked = 1;
                }
            }
            else {
                var length = $('#provider_list').find('input').length;
                if(length == 0) {
                    var checked = 1;
                }
                else {
                    var checked = $('#provider_list').find('input:checked').length;
                }
            }
        }
        else if ($('#payment_options').css('display') != "none") {
            var length = $('#provider_list').find('input').length;
            if(length == 0) {
                var checked = 1;
            }
            else {
                var checked = $('#provider_list').find('input:checked').length;
            }
        }

        if(checked == 0) {
            alert("%%LNG_PleaseChooseAPaymentMethod%%");
            return false;
        }
        else {
            return true;
        }
    }

    /* Is this an online or offline button? If offline change the submit button */
    function checkout_provider_changed(obj) {
        var bottom_payment_button = g("bottom_payment_button");
        payment_method_chosen = true;
        if(obj.className.indexOf("PAYMENT_PROVIDER_ONLINE") >= 0) {
            bottom_payment_button.src = "%%GLOBAL_IMG_PATH%%/%%GLOBAL_SiteColor%%/PaymentButton.gif";
            bottom_payment_button.value = "%%LNG_ProceedToPayment%%";
        }
        else {
            bottom_payment_button.src = "%%GLOBAL_IMG_PATH%%/%%GLOBAL_SiteColor%%/PaymentButtonContinue.gif";
            bottom_payment_button.value = "%%LNG_ProceedToPaymentContinue%%";
        }
    }

    function update_order_credit_payment(status) {
        var bottom_payment_button = g("bottom_payment_button");
        if(status == true) {
            $('#use_store_credit').show();
            $('#provider_list').hide();
            $('#provider_list').removeClass('PL40');
            if($('#credit_provider_list').css('display') != "none") {
                bottom_payment_button.src = "%%GLOBAL_IMG_PATH%%/%%GLOBAL_SiteColor%%/PaymentButton.gif";
                bottom_payment_button.value = "%%LNG_ProceedToPayment%%";
            }
            else {
                bottom_payment_button.src = "%%GLOBAL_IMG_PATH%%/%%GLOBAL_SiteColor%%/PaymentButtonContinue.gif";
                bottom_payment_button.value = "%%LNG_ProceedToPaymentContinue%%";
            }
        }
        else {
            $('#use_store_credit').hide();
            if($('#provider_list input').length > 1) {
                $('#provider_list').show();
                $('#provider_list').addClass('PL40');
            }
        }
    }

    function ShowContinueButton() {
        var bottom_payment_button = g("bottom_payment_button");
        bottom_payment_button.src = "%%GLOBAL_IMG_PATH%%/%%GLOBAL_SiteColor%%/PaymentButtonContinue.gif";
        bottom_payment_button.value = "%%LNG_ProceedToPaymentContinue%%";

        var top_payment_button = g("top_payment_button");
        if(top_payment_button) {
            top_payment_button.src = "%%GLOBAL_IMG_PATH%%/%%GLOBAL_SiteColor%%/PaymentButtonContinue.gif";
            bottom_payment_button.value = "%%LNG_ProceedToPaymentContinue%%";
        }
    }



    $(document).ready(function() {


var paylike = Paylike('8ea51d08-de79-4fe7-a3c4-94084ea68bd9');

function pay(){

var total = $('em.ProductPrice').last().html();
var nodecimal = total.replace('.', '');

nodecimal = nodecimal.replace('$', '');
nodecimal = parseInt(nodecimal);

var customerinfos = $('#CheckoutStepBillingAddress').children().first().children('.ExpressCheckoutCompletedContent').html();

console.log('infos : ' + customerinfos);
    paylike.popup({currency: 'EUR', amount: nodecimal, title: 'Pay to Finalize your Order', description: 'Puff N Stuff', descriptor: 'Puff N Stuff.', custom: { customer: customerinfos }}, 
                  function( err, r ){
                        if (err) {
                              console.log(err);
                        } else {
$('#bottom_payment_button').click();
                        }
                });
        
}

var el = document.getElementById("checkout_provider_checkout_cod");
el.onclick = pay;

        $('#couponcode').keypress(function(event) {
            if(event.keyCode == 13) {
                $('#apply_code').trigger('click');
                return false;
            }
        });
    });
//]]>
</script>