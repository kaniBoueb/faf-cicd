<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Insign
 * @since Insign 1.0
 */

?>
			</main><!-- #main -->
		</div><!-- #primary -->
	</div><!-- #content -->

	<footer id="colophon" class="site-footer fond-bleu">
		<div class="container">
			<span>Copyright <?=get_field('copyright', 'option')?>  © <?= date('Y') ?> - Développé par <a href="https://insign.africa" target="_blank">insign.africa</a></span>
		</div>
	</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

<!-- <script type="text/javascript">
	// document.querySelector('.ak-section').classList.add("ak-loading");
    window.onscroll = function() {scrollFunction();};
    function scrollFunction() {
        if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 320) {
            jQuery("body").addClass("nav-fixe");
            // jQuery(".top-btn").addClass("ak-ouvert");
        } else {
            jQuery("body").removeClass("nav-fixe");
            // jQuery(".top-btn").removeClass("ak-ouvert");
        }
    } 
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
</script> -->
<script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/perso.js"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/assets/js/swiper-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11.0.6/swiper-bundle.min.js"></script>

</body>
</html>
