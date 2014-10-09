(function () {
    var KssStateGenerator;
    KssStateGenerator = (function () {
        function KssStateGenerator() {
            var idx, idxs, pseudos, replaceRule, rule, stylesheet, _i, _len, _len2, _ref, _ref2;
            pseudos = /(\:hover|\:disabled|\:active|\:visited|\:focus)/g;
            try {
                _ref = document.styleSheets;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    stylesheet = _ref[_i];
                    idxs = [];
                    _ref2 = stylesheet.cssRules;
                    for (idx = 0, _len2 = _ref2.length; idx < _len2; idx++) {
                        rule = _ref2[idx];
                        if ((rule.type === CSSRule.STYLE_RULE) && pseudos.test(rule.selectorText)) {
                            replaceRule = function (matched, stuff) {
                                return ".pseudo-class-" + matched.replace(':', '');
                            };
                            this.insertRule(rule.cssText.replace(pseudos, replaceRule));
                        }
                        pseudos.lastIndex = 0
                    }
                }
            } catch (_e) {
            }
        }

        KssStateGenerator.prototype.insertRule = function (rule) {
            var headEl, styleEl;
            headEl = document.getElementsByTagName('head')[0];
            styleEl = document.createElement('style');
            styleEl.type = 'text/css';
            if (styleEl.styleSheet) {
                styleEl.styleSheet.cssText = rule;
            } else {
                styleEl.appendChild(document.createTextNode(rule));
            }
            return headEl.appendChild(styleEl);
        };
        return KssStateGenerator;
    })();
    new KssStateGenerator;
}).call(this);

/* All KSS Javascript will be prefix with js-styleguide- */

var hideNav = function() {
    $('body').off('click', hideNav);
    $('.js-styleguide-nav').removeClass('is-active');
    $('.js-styleguide-Content').removeClass('is-dimmed');
};

var showNav = function(event) {
    event.stopPropagation();
    $('.js-styleguide-nav').addClass('is-active');
    $('.js-styleguide-Content').addClass('is-dimmed');
    $('body').on('click', hideNav);
};

$('.js-styleguide-NavToggle').click(function(event) {
    event.preventDefault();
    showNav(event);
});


// Prevent our styleguide code blocks getting styled up differently to
$( '.styleguide-js-codeBlock' ).each(function( index ) {
    Prism.highlightElement($( '.styleguide-js-codeBlock' )[ index ] );
});

$('.styleguide-codeblock').each(function() {
    var codeHeight = $(this).outerHeight();

    if ( codeHeight > 118) {
        $(this).toggleClass('styleguide-code-is-collapsed');
        $( this ).next('.styleguide-js-expand-code').show();
    }

});

// Toggle Code Block
$('.styleguide-js-expand-code').on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass('styleguide-code-is-collapsed');
    $(this).prev('.styleguide-codeblock').toggleClass('styleguide-code-is-collapsed');
});

$('.styleguide-nav-item').filter('[href="'+window.location.pathname+'"]').addClass('is-current');
