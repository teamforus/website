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

    $('form .form-group .form-control').change(function(){
        validateForm($(this).closest('form'));
    });

    $('.clear_field').on('click', function (e) {
        e.preventDefault();

        console.log('dfvdv');
        $(this).closest('.form-group').find('.form-control').val('');
    });

    function validateForm(form){
        var error = false;

        var nameReg = /^[A-Za-z]+$/;
        var numberReg = /^[0-9]+$/;
        var emailReg = /^\S+@\S+$/;

        var names_field = $(form).find('#nameInput');
        var email_field = $(form).find('#emailInput');
        var message_field = $(form).find('#messageInput');
        var telephone_field = $(form).find('#telInput');
        var names = $(form).find('#nameInput').val();
        var email = $(form).find('#emailInput').val();
        var message = $(form).find('#messageInput').val();
        var telephone = $(form).find('#telInput').val();
        var inputVal = [names, email, message, telephone];
        var inputMessage = ["naam", "email adres", "bericht", "telefoonnummer"];

        $('.error').hide();
        form.find('.form-group').each(function (i, el) {
            $(el).removeClass('has-error').find('.help-block').html('');
        });

        if(inputVal[0] == "" || !nameReg.test(names)){
            $(names_field).closest('.form-group').find('.help-block').html("").html('Vul uw ' + inputMessage[0] + ' in.');
            $(names_field).closest('.form-group').addClass('has-error');
            error = true;
        }
        if(inputVal[1] == "" || !emailReg.test(email)){
            $(email_field).closest('.form-group').find('.help-block').html("").html('Vul uw ' + inputMessage[1] + ' in.');
            $(email_field).closest('.form-group').addClass('has-error');
            error = true;
        }

        if(inputVal[2] == ""){
            $(message_field).closest('.form-group').find('.help-block').html("").html('Vul een ' + inputMessage[2] + ' in.');
            $(message_field).closest('.form-group').addClass('has-error');
            error = true;
        }

        if($(telephone).length > 0 && !numberReg.test(telephone)){
            $(telephone_field).closest('.form-group').find('.help-block').html("").html('Alleen nummers toegestaan');
            $(telephone_field).closest('.form-group').addClass('has-error');
            error = true;
        }

        console.log(error);

        if(error){
            $(form).find('button').prop('disabled','disabled');
        }
        else{
            $(form).find('button').removeAttr("disabled");
        }
    }

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
        //$(el).addClass('blur');
    });
});
$("#modalContact").on('hidden.bs.modal', function (e) {
    $('body > .wrapper, body > header, body > footer').each(function (i, el) {
        //$(el).removeClass('blur');
    });
});

