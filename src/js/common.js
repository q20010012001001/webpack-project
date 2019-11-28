$(function () {

    // 导航
    if (document.documentElement.clientWidth >= 992) {
        $('.navbar-nav li').mouseenter(function () {
            $(this).addClass('show')
            $(this).find('.dropdown-menu').stop().slideDown()
        }).mouseleave(function () {
            $(this).removeClass('show')
            $(this).find('.dropdown-menu').stop().slideUp()
        })

        $('.navbar-expand-lg .navbar-nav span.nav-link').click(function(){
            if($(this).find('a').length>0){
                var href = $(this).find('a').attr('href')
                location.href = href
            }
        })
    }

})