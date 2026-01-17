/**
 * ChipMasterVN Theme Scripts
 * Handles: Image fallback, scroll effects, navbar hide/show, smooth scrolling
 * @version 2.0
 */

(function($) {
    'use strict';
    
    // Constants
    const CONFIG = {
        SCROLL_THRESHOLD: 280,
        BACK_TO_TOP_THRESHOLD: 500,
        SCROLL_DELTA: 5,
        SMOOTH_SCROLL_DURATION: 1000,
        SCROLL_CHECK_INTERVAL: 250,
        BACK_TO_TOP_DURATION: 600
    };
    
    /**
     * Image Error Handling
     * Replaces broken images with placeholder
     */
    function initImageFallback() {
        $('img').on('error', function() {
            if ($(this).hasClass('error-handled')) return;
            
            $(this).addClass('error-handled');
            const width = $(this).attr('width') || 400;
            const height = $(this).attr('height') || 300;
            const alt = $(this).attr('alt') || 'Image not found';
            
            $(this).attr({
                'src': `https://via.placeholder.com/${width}x${height}/e9ecef/666666?text=${encodeURIComponent(alt)}`,
                'title': 'Image could not be loaded'
            });
        });
    }
    
    /**
     * Scroll Handler
     * Controls alertbar and back-to-top button visibility
     */
    function initScrollEffects() {
        $(document).scroll(function() {
            const scrollY = $(this).scrollTop();
            
            // Alert bar toggle
            $('.alertbar').toggle(scrollY > CONFIG.SCROLL_THRESHOLD);
            
            // Back to top button toggle
            $('#backToTop').toggle(scrollY > CONFIG.BACK_TO_TOP_THRESHOLD);
        });
        
        // Back to top click handler
        $('#backToTop').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, CONFIG.BACK_TO_TOP_DURATION);
            return false;
        });
    }
    
    /**
     * Navbar Auto Hide/Show on Scroll
     * Hides navbar when scrolling down, shows when scrolling up
     */
    function initNavbarAutoHide() {
        let didScroll = false;
        let lastScrollTop = 0;
        const navbarHeight = $('nav').outerHeight();
        
        $(window).on('scroll', function() {
            didScroll = true;
        });
        
        // Check scroll status periodically
        setInterval(function() {
            if (didScroll) {
                handleScroll();
                didScroll = false;
            }
        }, CONFIG.SCROLL_CHECK_INTERVAL);
        
        function handleScroll() {
            const scrollTop = $(window).scrollTop();
            
            // Ignore small scrolls
            if (Math.abs(lastScrollTop - scrollTop) <= CONFIG.SCROLL_DELTA) {
                return;
            }
            
            const $nav = $('nav');
            
            if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
                // Scrolling down
                $nav.removeClass('nav-down').addClass('nav-up');
                $('.nav-up').css('top', `-${navbarHeight}px`);
            } else {
                // Scrolling up
                if (scrollTop + $(window).height() < $(document).height()) {
                    $nav.removeClass('nav-up').addClass('nav-down');
                    $('.nav-up, .nav-down').css('top', '0px');
                }
            }
            
            lastScrollTop = scrollTop;
        }
    }
    
    /**
     * Smooth Scrolling
     * For anchor links and external page anchors
     */
    function initSmoothScroll() {
        // Handle page load with hash
        setTimeout(function() {
            if (location.hash) {
                window.scrollTo(0, 0);
                const target = location.hash.split('#')[1];
                smoothScrollTo($('#' + target));
            }
        }, 1);
        
        // Handle anchor clicks
        $('a[href*=\\#]:not([href=\\#])').on('click', function(e) {
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && 
                location.hostname === this.hostname) {
                smoothScrollTo($(this.hash));
                e.preventDefault();
                return false;
            }
        });
        
        function smoothScrollTo(target) {
            target = target.length ? target : $('[name=' + location.hash.slice(1) + ']');
            
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, CONFIG.SMOOTH_SCROLL_DURATION);
            }
        }
    }
    
    /**
     * Initialize all features on document ready
     */
    $(document).ready(function() {
        initImageFallback();
        initScrollEffects();
        initNavbarAutoHide();
        initSmoothScroll();
        
        // Adjust content margin based on header height
        $('.site-content').css('margin-top', $('header').outerHeight() + 'px');
    });
    
})(jQuery);