/**
 * cub.js
 */

var cub = {};

jQuery(document).ready(function($) {

    cub.doCubSortable = function() {

        $('.sortable').sortable({
            axis: 'y' ,
            items: "> li" ,
            handle: ".is-handle"
        });

    }

    cub.doCubSortable();

    /**
     * AJAX
     */

    cub.doCubAjax = function(p) {

        if (!(p.dataType)) {
            p.dataType = "json";
        }

        return $.when(
            $.ajax({
                type: p.type,
                url: p.url,
                data: p.data,
                dataType: p.dataType
            })
        );

    }

    /**
     *
     */

    cub.doCubBindings = function(bindings) {

        if (bindings) {

            $('#loadingInline').addClass('active');

            $.each(bindings, function (id, value) {

                if ($('[data-bind="' + id + '"]').is('*')) {

                    $('[data-bind="' + id + '"]').val(value).html(value);

                }

            });

            $('#loadingInline').removeClass('active');

        }

    }

    cub.doCubHtml = function(jqueryElement, HtmlValue) {

        if (HtmlValue) {

            jqueryElement.fadeOut('', function () {

                jqueryElement.html(HtmlValue);
                jqueryElement.fadeIn('', function () {

                    $('#loadingInline').removeClass('active');

                    cub.doPostCheck();

                });

            })

        }

    }

    cub.doCubReplace = function(jqueryElement, value) {

        $('#loadingInline').addClass('active');

        if (jqueryElement.is('*')) {

            let url = jqueryElement.data('cub-endpoint');

            if (url) {

                cub.doCubAjax({
                    type: 'get',
                    url: url,
                    dataType: 'html'
                }).done(function (result) {

                    cub.doCubHtml(jqueryElement, result);

                });

            } else {

                cub.doCubHtml(jqueryElement, value);

            }

        }

    }

    /**
     *
     */

    cub.doCubReplaceAll = function() {

        $('[data-cub-endpoint]').each(function () {

            cub.doCubReplace($(this));

        });

    }

    cub.doCubReplaceAll();

    /**
     *
     */

    cub.doPostCheck = function() {

        cub.doCubSortable();

    }

});

$(document).ajaxComplete(function() {

    cub.doPostCheck();

});