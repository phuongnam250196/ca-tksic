

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
    $('#avatar').change(function (event) {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        console.log('input.files[0]', tmppath)
        $(".form-avatar").css({
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
        $(".main-menu").css({'transform': 'none'});
        $(".manche").show();
    });

    $(".manche").on("click", function() {
        $(".main-menu").css({'transform': 'translateX(-100%)'});
        $(".manche").hide();
    })


    let hei = $("#header").outerHeight();
    if ($(window).scrollTop() > hei) {
        $("#header").addClass('scroll');
    }
    $(window).scroll(function() {
          let heiw = $(window).scrollTop();
          if (heiw > hei) {
            $("#header").addClass('scroll');
          } else {
            $("#header").removeClass('scroll');
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
    
});