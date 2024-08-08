<?php
/**
 * Displays the site header.
 *
 * @package WordPress
 * @subpackage Insign
 * @since Insign 1.0
 */

$wrapper_classes  = 'site-header';
$wrapper_classes .= has_custom_logo() ? ' has-logo' : '';
$wrapper_classes .= ( true === get_theme_mod( 'display_title_and_tagline', true ) ) ? ' has-title-and-tagline' : '';
$wrapper_classes .= has_nav_menu( 'primary' ) ? ' has-menu' : '';
?>

<?php $home_pg = 10; ?>

<?php
$style_bandeau = '';
	if(!is_front_page()){
		$page_courante = get_the_ID();
		// $bandeau = wp_get_attachment_url( get_post_thumbnail_id($page_courante) );
		$bandeau = get_field('bandeau_pg',$page_courante);
		$vignette = wp_get_attachment_url(get_post_thumbnail_id($page_courante));
		if($bandeau != '' && ($vignette != '' || $vignette == '')) {
			$style_bandeau = 'style="background-image: url('.$bandeau.');"';
		}

		if ($bandeau == '' && $vignette == '' ) {
			$bandeau = get_stylesheet_directory_uri().'/assets/images/default-header.jpg';
			$style_bandeau = 'style="background-image: url('.$bandeau.');"';
		}

		if($vignette != '' && $bandeau == '') {
			$style_bandeau = 'style="background-image: url('.$vignette.');"';
		}
		// elseif ($vignette != '' && $bandeau != '') {
		// 	$style_bandeau = 'style="background-image: url('.$bandeau.');"';
		// }
	}
?>

<header id="masthead" class="<?php echo esc_attr( $wrapper_classes ); ?> ak-transition" >

	<div class="container brand-nav-ctnr d-flex">
		<?php get_template_part( 'template-parts/header/site-branding' ); ?>
		<?php get_template_part( 'template-parts/header/site-nav' ); ?>
	</div>

</header><!-- #masthead -->
