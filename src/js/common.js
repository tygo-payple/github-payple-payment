$(document).ready(function () {

    function cardShowBox() {
        $('._installment-box').css({'display': 'none'});
        $('._app-bank-box').change(function () {
            const result = $('._app-bank-box option:selected').val();
            if (result !== "") {
                $('._installment-box').show()
            }
        });
    }

    function naverShowBox() {
        $('._tax-box').hide();
        $('._business-input').hide();
        $('._naver-pay').change(function () {
            const result = $('._naver-pay option:selected').data("value")
            const caption = $(this).parent().siblings('.caption')
            if (result === "point") {
                caption.css({'display': 'none'});
                $('._tax-box').show()
            } else {
                caption.css({'display': 'block'});
                caption.text('무이자 할부 안내 〉')
                $('._tax-box').hide()
            }
        });
        $('._tax').change(function () {
            const result = $('._tax option:selected').data("value")
            if (result === "phone") {
                $('._phone-input').show();
                $('._business-input').hide();
            } else if (result === "business") {
                $('._business-input').show();
                $('._phone-input').hide();
            } else {
                $('._business-input').hide();
                $('._phone-input').hide();
            }
        });

    }

    function btnTabShow() {
        const btnBox = $('._btn-box')
        btnBox.on('click', function (e) {
            const target = $(e.target)
            const index = $(e.target).index()
            const tabPane = $('._tab-pane')

            $(this).children('.btn').removeClass('active')
            tabPane.removeClass('show')
            target.addClass('active')
            tabPane.eq(index).addClass('show')
        })
    }

    function checkBox(all, name) {
        $(all).on('click', function () {
            if ($(all).is(":checked")) $(`input[name=${name}]`).prop("checked", true);
            else $(`input[name=${name}]`).prop("checked", false);
        });
        $(`input[name=${name}]`).on('click', function () {
            let total = $(`input[name=${name}]`).length;
            let checked = $(`input[name=${name}]:checked`).length;
            if (total !== checked) $(all).prop("checked", false);
            else $(all).prop("checked", true);
        });
    }

    function modalAnimation() {
        $('._modal-open').on('click', function () {
            $('._modal-background').addClass('show')
            $('._modal-animation').addClass('show')
        })
        $('._modal-close').on('click', function () {
            $('._modal-animation').removeClass('show')
            setTimeout(() => {
                $('._modal-background').removeClass('show')
            }, 150)
        })


    }



    // function validateForm {
    //     $('._validation').on('change', function () {
    //             const thisVal = $(this).val();
    //             const inputEmail = $("input[name=email]");
    //             const paymentBtn = $("button[name=paymentBtn]")
    //
    //
    //             switch ($(this).attr("name")) {
    //                 case "allChk":
    //                     if ($("input[name=allChk]").length !== $("input[name=allChk]:checked").length) {
    //                         inputEmail.attr('disabled', true)
    //                         paymentBtn.attr('disabled', true)
    //                     } else {
    //                         inputEmail.attr('disabled', false)
    //                         paymentBtn.attr('disabled', false)
    //                     }
    //                     break;
    //                 case "policy":
    //                     if ($("input[name=policy]:checked").length !== $("input[name=policy]").length) {
    //                         inputEmail.attr('disabled', true)
    //                         paymentBtn.attr('disabled', true)
    //                     } else {
    //                         inputEmail.attr('disabled', false)
    //                         paymentBtn.attr('disabled', false)
    //                     }
    //                     break;
    //                 case "bank":
    //                     if (thisVal === "") {
    //                         inputEmail.attr('disabled', true)
    //                         paymentBtn.attr('disabled', true)
    //                     }
    //                     break;
    //                 case "month":
    //                     if (thisVal === "") {
    //                         inputEmail.attr('disabled', true)
    //                         paymentBtn.attr('disabled', true)
    //                     }
    //                     break;
    //             }
    //
    //         }
    //     )
    // }


    function init() {
        cardShowBox();
        naverShowBox();
        btnTabShow();
        // enableSubmitButton();
        checkBox('._all-chk', 'policy');
        modalAnimation();
    }


    init();
})
