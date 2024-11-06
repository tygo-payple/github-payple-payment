$(document).ready(function () {
    function handleSelectChange() {
        $('._installment-box').css({'display': 'none'});
        $('._app-bank-box').change(function () {
            const result = $('._app-bank-box option:selected').val();
            if (result !== "") {
                $('._installment-box').show()
            }
        });
    }
    function handleSelectsChange() {
        $('._tax-box').hide();
        $('._business-input').hide();
        $('._transaction-type').change(function () {
            const result = $('._transaction-type option:selected').data("value")
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
                $('._business-input input').val("");
            } else if (result === "business") {
                $('._business-input').show();
                $('._phone-input').hide();
                $('._phone-input input').val("");
            } else {
                $('._business-input').hide();
                $('._phone-input').hide();
                $('._business-input input').val("");
                $('._phone-input input').val("");
            }
        });
    }
    function handleBtnChange() {
        const paymentMethod = $('._payment-method-box')
        paymentMethod.on('click', function (e) {
            const target = $(e.target)
            const index = $(e.target).index()
            const tabPane = $('._tab-pane')

            $(this).children('.btn').removeClass('active');
            tabPane.removeClass('show');
            target.addClass('active');
            tabPane.eq(index).addClass('show');
        })
    }
    function createCustomCheckbox() {
        $('._all-chk').on('click', function () {
            if ($('._all-chk').is(":checked")) $('input[name=policy]').prop("checked", true);
            else $('input[name=policy]').prop("checked", false);
        });
        $('input[name=policy]').on('click', function () {
            let total = $('input[name=policy]').length;
            let checked = $('input[name=policy]:checked').length;
            if (total !== checked) $('._all-chk').prop("checked", false);
            else $('._all-chk').prop("checked", true);
        });
    }
    function toggleModal(modalId, action) {
        const modal = $(`.${modalId}`);
        const modalAnimation = modal.children('._modal-animation');
        if (action === "open") {
            modal.addClass('show');
            modalAnimation.addClass('show');
        } else if (action === "close") {
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
    function toggleSlide(){
        const btn = $('._slide-down-btn');
        btn.on('click', function () {
            $(this).parent().siblings('.item-list').toggleClass('is-active')
            $(this).toggleClass('active')
        })
    }
    function onlyNumber() {
        $('._only-number').on('input', function() {
            let inputValue = $(this).val();
            inputValue = inputValue.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
            $(this).val(inputValue);
        });
    }




    function init() {
        handleSelectChange();
        handleSelectsChange();
        handleBtnChange();
        toggleModal();
        createCustomCheckbox();
        toggleSlide();
        onlyNumber();
    }

    init();
})
