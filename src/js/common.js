$(document).ready(function () {
    // AppCard 선택 시
    function cardShowBox(){
        $('._installment-box').css({'display':'none'});
        $('._app-bank-box').change(function() {
            const result = $('._app-bank-box option:selected').val();
            if (result !== "") {
                $('._installment-box').show()
            }
        });
    }

    function naverShowBox(){
        // $('._installment-box').css({'display':'none'});
        // $('._app-bank-box').change(function() {
        //     const result = $('._app-bank-box option:selected').val();
        //     if (result !== "") {
        //         $('._installment-box').show()
        //     }
        // });
    }






    function init(){
        cardShowBox();
        naverShowBox();
    }

    init();
})
