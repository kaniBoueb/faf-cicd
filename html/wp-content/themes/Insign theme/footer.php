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

	<?php
	$home_pg = 10;
	$titre_rs = 'Rejoignez nous';
	
	if (get_locale() == 'en_US' || get_locale() == 'en_GB'):
		$titre_rs = 'Follow us';
	endif;
	?>
	

	<footer id="colophon" class="site-footer fond-gris">
		<?php if ( has_nav_menu( 'footer' ) ) : ?>
			<nav aria-label="<?php esc_attr_e( 'Secondary menu', 'insign' ); ?>" class="footer-navigation">
				<ul class="footer-navigation-wrapper">
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'footer',
							'items_wrap'     => '%3$s',
							'container'      => false,
							'depth'          => 1,
							'link_before'    => '<span>',
							'link_after'     => '</span>',
							'fallback_cb'    => false,
						)
					);
					?>
				</ul><!-- .footer-navigation-wrapper -->
			</nav><!-- .footer-navigation -->
		<?php endif; ?>
		<div class="container">
			<div class="footer-main-infos w100 d-flex">
				<div class="pad pad-adresse w20">
					<div class="logo-site line texte-moyen texte-blanc w100">
						<div class="sceau line texte-moyen texte-blanc f-10 mr-30">
							<img src="<?=get_field('logo_site',$home_pg)?>" alt="Autorent occasion logo" loading="lazy"/>
						</div>
						<div class="sceau line texte-moyen texte-blanc f-10 mr-30">
							<img src="<?=get_field('logo_lasa',$home_pg)?>" alt="Autorent occasion logo" loading="lazy"/>
						</div>
					</div>
					<div class="les-infos">
						<?php if( have_rows('infos_footer',$home_pg) ):

							while( have_rows('infos_footer',$home_pg) ) : the_row();?>

								<div class="une-info d-flex">
									<img src="<?=get_sub_field('picto_info',$home_pg)?>" alt="Autorent occasion logo" loading="lazy"/>
									<p class="desc texte-vert"><?=get_sub_field('desc_info',$home_pg)?></p>

								</div>

							<?php endwhile;
						endif;?>
					</div>
				</div>
				<div class="maps w60">
					<span class="titre texte-vert majuscule texte-center f-20 text-bold"><?=get_field('titre_maps',$home_pg)?></span>
					<div class="la-carte">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.4134803088077!2d-17.440034324090117!3d14.689193985807751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173fa7f5d2ee9%3A0x23e645b549bd2638!2sAutorent%20Occasions!5e0!3m2!1sfr!2ssn!4v1693489145294!5m2!1sfr!2ssn" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
					</div>
				</div>
				<div class="pad pad-links w20">
					<div class="infos-items w100">
						<div class="footer-links ak-right texte-blanc texte-regular f-14">
							<?php
							wp_nav_menu( array(
								'menu' => '6'
							) ); ?>
						</div>
					</div>
				</div>
			</div>
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
