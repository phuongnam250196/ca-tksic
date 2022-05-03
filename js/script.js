

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

// function changeImg(input){
//     //Nếu như tồn thuộc tính file, đồng nghĩa người dùng đã chọn file mới
//     if(input.files && input.files[0]){
//         var reader = new FileReader();
//         //Sự kiện file đã được load vào website
//         reader.onload = function(e){
//             //Thay đổi đường dẫn ảnh
//             $('#avatar').attr('src',e.target.result);
//         }
//         reader.readAsDataURL(input.files[0]);
//     }
// }
$(document).ready(function() {
    $('#fileUp').change(function (event) {
        let tmppath = URL.createObjectURL(event.target.files[0]);
        // console.log('input.files[0]', tmppath);

        $("#imgUp").css({
            "background-image": `url(${tmppath})`,
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "background-position": "center",
        })
    });

    $('#fileDown').change(function (event) {
        let tmppath = URL.createObjectURL(event.target.files[0]);
        $("#imgDown").css({
            "background-image": `url(${tmppath})`,
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "background-position": "center",
        })
    });

    let i = 1;
    $(".profile").on("click", function() {
        $(".profile-form").slideToggle();
        let degs = i%2===0 ? 180 : 0;
        $(this).find(".profile-dropdown i").css({
            "transform": `rotate(${degs}deg)`,
            "transition-duration": "1s"
        })
        i++;
    });

    $(document).mouseup(function(e) {
        var container = $(".profile-form");
        // var container2 = $(".profile-dropdown i");
        var container3 = $(".profile");
        if (!container.is(e.target) && !container3.is(e.target)  && container.has(e.target).length === 0 && container3.has(e.target).length === 0) {
            container.hide();
            $(".profile-dropdown i").css({
                "transform": `rotate(0deg)`,
                "transition-duration": "1s"
            })
        }
    });

    $(".ct-table .tab-body>div").hide();
    $(".ct-table .tab-body").find(".active").show();
    $(".ct-table .nav li a").on("click", function(){
        let id = $(this).data("id");
        $(".ct-table .nav li a").removeClass("active");
        $(this).addClass("active");
        $(".ct-table .tab-body>div").hide();
        $(`.ct-table .tab-body .tab-${id}`).show();
    });

    $(".ct-chart .tab-body>div").hide();
    $(".ct-chart .tab-body").find(".active").show();
    $(".ct-chart .nav li a").on("click", function(){
        let id = $(this).data("id");
        $(".ct-chart .nav li a").removeClass("active");
        $(this).addClass("active");
        $(".ct-chart .tab-body>div").hide();
        $(`.ct-chart .tab-body .tab-${id}`).show();
    });

    $(".toggle-n").on("click", function() {
        $(".main-menu").css({'transform': 'none', "box-shadow": "5px 0 12px #ddd"});
        $(".manche").show();
    });

    $(".manche").on("click", function() {
        $(".main-menu").css({'transform': 'translateX(-100%)', "box-shadow": "unset"});
        $(".manche").hide();
    })


    let hei = $("#header-login").outerHeight();
    if ($(window).scrollTop() > hei) {
        $("#header").addClass('scroll');
        $("#header-login").addClass('header-register')
    } else {
        $("#header-login").removeClass('header-register')
    }
    let wCk = $(window).outerWidth();
    $(window).scroll(function() {
        console.log('widh', wCk, $(window).scrollTop(), hei)
          let heiw = $(window).scrollTop();
          if (heiw > hei) {
            $("#header").addClass('scroll');
          } else {
            $("#header").removeClass('scroll');
          }
          if (wCk>1200 && wCk < 1600) {
              if (heiw > hei) {
                $("#header-login").addClass('header-register')
              } else {
                $("#header-login").removeClass('header-register')
              }
          }
      });


    // const labels = [
    //     '2012',
    //     '2013',
    //     '2014',
    //     '2015',
    //     '2016',
    //     '2017',
    //     '2018',
    //     '2019',
    //     '2020',
    // ];

    // const data = {
    //     labels: labels,
    //     datasets: [{
    //             label: '1',
    //             backgroundColor: 'rgb(255, 99, 132)',
    //             borderColor: 'rgb(255, 99, 132)',
    //             data: [0, 10, 5, 2, 20, 30, 45, 12, 22, 11],
    //         },
    //         {
    //             label: '2',
    //             backgroundColor: 'rgb(255, 99, 132)',
    //             borderColor: 'rgb(255, 99, 132)',
    //             data: [2, 33, 15, 22, 23, 66, 1, 8, 32, 54],
    //         }
    //     ]
    // };

    // const config = {
    //     type: 'line',
    //     data: data,
    //     options: {}
    // };
    // const myChart = new Chart(
    //     document.getElementById('myChart'),
    //     config
    // );

    function checkDropdown(cl) {
        let val1 = $(`.${cl}-menu`).find(".active").data('val');
        $(`.${cl}`).text(val1);
        $(`.${cl}`).on("click", function() {
            $(`.${cl}-menu .dropdown-item`).on("click", function() {
                let txt = $(this).data('val')
                if ($(`.${cl}`).data('type') === 'popup') {
                    $("#myConfirm p").text(txt);
                    $("#myConfirm").modal();
                    $("#myConfirm .btn-ok").on("click", function() {
                        $(`.${cl}`).text(txt);
                        $(`.${cl}-menu .dropdown-item`).removeClass("active");
                        $(this).addClass("active");
                        $("#myConfirm").modal("hide");
                    })
                } else {
                    $(`.${cl}`).text(txt);
                    $(`.${cl}-menu .dropdown-item`).removeClass("active");
                    $(this).addClass("active");
                }
            });
        })
    }

    let listToggle = $(".dropdown-toggle");
    $.each(listToggle, function(index, item) {
        checkDropdown(item.classList[1]);
    });
    
    $(".question .title").on("click", function() {
        $(this).closest('.list').find('.desc').slideUp();
        $(this).closest('.list').find('.item').removeClass('active');
        $(this).parents('.item').addClass('active');
        $(this).parent().find('.desc').slideToggle();
    })

    const settings = {
        fill: '#35add9',
        background: '#ededed'
    }
    const sliders = document.querySelectorAll('.range-slider');
    Array.prototype.forEach.call(sliders, (slider) => {
        slider.querySelector('input').addEventListener('input', (event) => {
            applyFill(event.target);
        });

        applyFill(slider.querySelector('input'));
    });

    function applyFill(slider) {
        const percentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
        let transform = 50;
        if (percentage > 95) {
            transform = 100;
        }
        if (percentage < 5) {
            transform = 0;
        }

        $(slider).prev().css({"left": percentage + '%', 'transform': 'translateX(-' + transform + '%)'})
            .find('span').text(numberFormat(slider.value, ',', 0, '.'));
        slider.style.background = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1}%)`;
        $(slider).val(slider.value).trigger('change');
    }

    function numberFormat(number, decimals, dec_point, thousands_sep) {
        number = parseFloat(number).toFixed(decimals);

        let nstr = number.toString();
        nstr += '';
        x = nstr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? dec_point + x[1] : '';
        var rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + thousands_sep + '$2');

        return x1 + x2;
    }

    let header_h = $("#header").outerHeight();
    $(".body").css({"margin-top": header_h});
    let footer_h = $(".footer").outerHeight();
    $(".body").css({"margin-bottom": footer_h});

    $(".btn-search-mb").on("click", function()  {
        let wContainer = $(".container").outerWidth();
        $(".form-search-mobile").show();
        $(".form-search-mobile input").val("").css({"width":wContainer}).focus();
    });
    $('.form-search-mobile input').blur(function() {
        $(this).parents(".form-search-mobile").hide();
    });

    if ($(".title-head .item.active").find("img").attr('src')) {
        $(".title-head .item.active").find("img").attr('src', $(".title-head .item.active").find("img").attr('src').replace(".png", "-blue.png"));
    }
    
    $(".title-head .item").on('mouseenter', function(){
        let url_img = $(this).find('img').attr('src');
        if (url_img.indexOf("blue") === -1) {
            $(this).find("img").attr({"src": url_img.replace(".png", "-blue.png")});
        }
    }).on('mouseleave', function(){ 
        let url_img = $(this).find('img').attr('src');
        if ($(this).attr('class').indexOf("active") === -1) {
            $(this).find("img").attr({"src": url_img.replace("-blue.png", ".png")});
        }
    });
});