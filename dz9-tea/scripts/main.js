new WOW({
    boxClass: 'wow',
    animateClass: 'animate__animated',
    offset: 200,
    mobile: true,
    live: true
}).init();



const modal = new bootstrap.Modal(document.querySelector('.modal'), {
    backdrop: 'static'
});
const showModal = (message) => {
    document.querySelector('.modal-body').textContent = message;
    modal.show();
}


$('.image-popup-vertical-fit').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
        verticalFit: true
    }
});

$('.single-item').slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',

    responsive: [
        {
            breakpoint: 567,
            swipe: true
            // arrows: false
        }
    ]

});

$('.image-slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',

    responsive: [
        {
            breakpoint: 567,
            swipe: true
            // arrows: false
        }
    ]

});
$(window).on("resize", function (e) {
    var newWindowWidth = $(window).width();
    if (newWindowWidth < 576) {
        // $('.single-item').slick('unslick');
        $('.slick-prev').hide();
        $('.slick-next').hide();
    }
});

$("#accordion").accordion();

window.onload = function (e) {
//валидация
    let formUsername = $('#validationCustom02');
    let formLastname = $('#validationCustom03');
    let formPhone = $('#validationCustom04');
    let formCountry = $('#validationCustom05');

    let formAddress = $('#validationCustom07');
    let formIndex = $('#validationCustom06');

    formIndex.inputmask({"mask": "999999"}); //specifying options

    $('#form-send-btn').click(function (evt) {
        evt.preventDefault();
        if (!formUsername.val()) {
            alert('Введите имя.');
            formUsername.focus();
            return;
        }
        if (!formLastname.val()) {
            alert('Введите фамилию.');
            formLastname.focus();
            return;
        }
        if (!formPhone.val()) {
            alert('Введите телефон.');
            formPhone.focus();
            return;
        }
        if (!formCountry.val()) {
            alert('Укажите страну!!!');
            formCountry.focus();
            return;
        }
        if (!formIndex.val()) {
            alert('Введите индекс.');
            formIndex.focus();
            return;
        }
        if ((formIndex.val()).length < 6) {
            console.log(formIndex.val());
            console.log(formIndex.val().length);

            alert('Индекс должен состоять из 6 цифр.');
            formIndex.focus();
            return;
        }
        if (!formAddress.val()) {
            alert('Введите адрес.');
            formAddress.focus();
            return;
        }
        // alert('Спасибо за заказ!');

        showModal('Спасибо за заказ!');

        $('.order').hide();
        $('.orderFinish').removeClass("d-none").show();
        $('.parallax1').addClass("d-none").hide();

      //  $('.parallax-window').parallax({imageSrc: 'images/image-12.png'});
        $('.parallax2').removeClass("d-none").show();
    })
}

