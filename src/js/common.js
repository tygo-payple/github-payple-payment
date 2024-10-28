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
        const btnBox = $('._payment-method-box')
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

    function toggleModal(modalId , action){
        const modal = $(`.${modalId}`);
        const modalAnimation = modal.children('._modal-animation');

        if(action === "open"){
            modal.addClass('show');
            modalAnimation.addClass('show');
        }else if (action === "close"){
            modal.removeClass('show');
            modalAnimation.removeClass('show');
        }


        $('._open-modal').on('click', function () {
            const modalId = $(this).data('modal-id');
            toggleModal(modalId, 'open');
        })
        $('._close-modal').on('click', function () {
            const modalId = $(this).data('modal-id');
            toggleModal(modalId, 'close');
        })
    }







    function init() {
        cardShowBox();
        naverShowBox();
        btnTabShow();
        toggleModal();
        // enableSubmitButton();
        checkBox('._all-chk', 'policy');
    }


    init();
})
