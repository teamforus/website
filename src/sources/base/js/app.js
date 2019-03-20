/**
 * Vanilla JS
 */

/*
console.log('%cWelcome to Quick Dev Template!', 'color: green');


var displayVersion = function(name, version, installed) {
    console.log(name + ': %c' + version, 'color: ' + (installed ? 'green' : 'red'));
};

displayVersion('jQuery', (typeof jQuery != 'undefined' ? ('v' + jQuery.fn.jquery) : 'not installed!'), typeof jQuery != 'undefined');
displayVersion('Angular', (typeof angular != 'undefined' ? ('v' + angular.version.full) : 'not installed!'), typeof angular != 'undefined');
displayVersion('Angular2', (typeof ng != 'undefined' ? 'v2.1.0' : 'not installed!'), typeof ng != 'undefined');
 */

function fix_frame(block, lastScrollTop, topOfWindow){

    var block_fix = block;
    var success_story_offset = $(block_fix).closest('.success_story').offset().top;
    var success_story_end = success_story_offset + $(block_fix).closest('.success_story').height();


    var topOfWindow = topOfWindow;


    if (topOfWindow > lastScrollTop){
        if (topOfWindow > (success_story_offset) && (topOfWindow) < (success_story_end - $(block_fix).find('.frame').height())){
            $(block_fix).removeClass('bottom').addClass('fix');
        }
        else if((topOfWindow) >= (success_story_end - $(block_fix).find('.frame').height())){
            $(block_fix).removeClass('fix').addClass('bottom');
        }
    }
    if (topOfWindow < lastScrollTop){
        if((topOfWindow) < (success_story_end  - $(block_fix).find('.frame').height()) && (topOfWindow > (success_story_offset))){
            $(block_fix).addClass('fix').removeClass('bottom');
        }
        else if (topOfWindow < (success_story_offset) ){
            $(block_fix).removeClass('fix');
        }
    }
};

function change_in_fix(block, n, scrollCount) {
    if(scrollCount > n * 20 && scrollCount < n * 40){
        $(block).find('.nav_story li').each(function (i, el) {
            $(el).removeClass('active');
        });
        $(block).find('.nav_story li').eq(n + 1).addClass('active');
    }
}

function validateElement(element){

    //var nameReg = /^([a-zА-Яа-я]+[,.]?[ ]?|[a-zА-Яа-я]+['-]?)+$/;
    var nameReg = /^[^0-9]+$/;

    //var numberReg = /^(?:(?:\+?[0-9]{1,3}\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    /*
    numbers like this:
     +14(555)5555555
     +380635555555
     555-555-5555
     +1-555-532-3455
     */

    var numberReg = /^(?:\+?)[0-9]+$/;
    var emailReg = /^\S+@\S+$/;


    var names_field;
    var email_field;
    var message_field;
    var telephone_field;

    var names = '';
    var email = '';
    var message = '';
    var telephone = '';

    var error_field = 0;

    var form = element.closest('form');
    var inputMessage = {
        'name':"Vul uw naam in.",
        'email':"Vul uw email adres in.",
        'message': "Vul een bericht in.",
        'phone': "Alleen nummers toegestaan"
    };

    $(element).closest('.form-group').removeClass('has-error').find('.help-block').html('');

    if($(element).attr('id') == 'nameInput'){
        names_field = $(element);
        names = $(element).val();

        if(names == "" || !nameReg.test(names)){
            $(names_field).closest('.form-group').find('.help-block').html("").html(inputMessage['name']);
            $(names_field).closest('.form-group').addClass('has-error');
        }
    }
    else if($(element).attr('id') == 'emailInput'){
        email_field = $(element);
        email = $(element).val();

        if(email == "" || !emailReg.test(email)){
            $(email_field).closest('.form-group').find('.help-block').html("").html(inputMessage['email']);
            $(email_field).closest('.form-group').addClass('has-error');
        }
    }
    else if($(element).attr('id') == 'messageInput'){
        message_field = $(element);
        message = $(element).val();

        if(message == ""){
            $(message_field).closest('.form-group').find('.help-block').html("").html(inputMessage['message']);
            $(message_field).closest('.form-group').addClass('has-error');
        }
    }
    else if($(element).attr('id') == 'telInput'){
        telephone_field = $(element);
        telephone = $(element).val();

        if($(telephone_field).length > 0 && telephone !='' && !numberReg.test(telephone)){
            $(telephone_field).closest('.form-group').find('.help-block').html("").html(inputMessage['phone']);
            $(telephone_field).closest('.form-group').addClass('has-error');
        }
    }


    $(form).find('.form-control').each(function (i, el) {
        if($(el).closest('.form-group').hasClass('has-error') || $(el).closest('.required').find('.form-control').val() == ''){
            error_field += 1;
        }
    });

    if(error_field > 0){
        $(form).find('button').prop('disabled','disabled');
    }
    else{
        $(form).find('button').removeAttr("disabled");
    }
}

$('.btn_link').on('click', function(e) {

    e.preventDefault();

    var video = $(this).closest('.tab-pane').find('.wrapper_tab_video video');

    $(this).toggleClass('active');

    if($(this).hasClass('active')){
        $(video)[0].play();
    } else {
        $(video)[0].pause();
    }
});

$('.wrapper_tab_video video').hover(function toggleControls() {
    if (this.hasAttribute("controls")) {
        this.removeAttribute("controls")
    } else {
        this.setAttribute("controls", "controls")
    }
});

$(document).ready(function(){

    $( 'a[data-toggle="tab"]' ).on('shown.bs.tab', function(e) {

        e.preventDefault();

        $('.wrapper_tab_video').each(function (i, el) {
            var video = $(el).find('video');
            var play_btn = $(el).closest('.tab-pane').find('.btn_link');

            $(play_btn).removeClass('active');

            $(video)[0].pause();
        });

    });

    $('form#formContact .form-group .form-control').on('change',function(){
        validateElement($(this));
    }).on('keypress', function (e) {
        if(e.which === 13){
            validateElement($(this));
        }
    }).on('keyup', function (e) {
        validateElement($(this));
    });

    $('.clear_field').on('click', function (e) {
        e.preventDefault();

        $(this).closest('.form-group').find('.form-control').val('');

        validateElement($(this).closest('.form-group').find('.form-control'));
    });

    $('#formSubmit').click(function(){
        $.post($("#formContact").attr('action'), JSON.stringify({
            name: $("#formContact input[name='name']").val(),
            email: $("#formContact input[name='email']").val(),
            phone: $("#formContact input[name='phone']").val(),
            organization: $("#formContact input[name='organization']").val(),
            message: $("#formContact textarea[name='message']").val(),
            'g-recaptcha-response': $("#formContact textarea[name='g-recaptcha-response']").val()
        }), function (data) {
            $(".thanks").show();
            $("#formContact button").hide();
        }, 'json');
    });
});

var lastScrollTop = 0;
var scrollCount = 0;
var success_story_1 = $('.success_story_1');
var success_story_1_offset = $(success_story_1).offset().top;
var success_story_2 = $('.success_story_2').offset().top;

$(document).scroll(function() {
    var id = '';
    var part = 0;
    var topOfWindow = $(window).scrollTop();

    if(topOfWindow > lastScrollTop){

    }
    else{

    }

    lastScrollTop = topOfWindow;

});

$('.site_footer .nav_category .title').on('click', function () {
   $(this).toggleClass('open')
});

$("#modalContact").on('show.bs.modal', function (e) {
    $('body > .wrapper, body > header, body > footer').each(function (i, el) {
        $(el).addClass('blur');
    });
    $('#formSubmit').prop('disabled','disabled');
});
$("#modalContact").on('hidden.bs.modal', function (e) {
    $('body > .wrapper, body > header, body > footer').each(function (i, el) {
        $(el).removeClass('blur');
    });
});

