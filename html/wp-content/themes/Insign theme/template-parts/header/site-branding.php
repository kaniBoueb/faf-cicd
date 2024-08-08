<?php
/**
 * Displays header site branding
 *
 * @package WordPress
 * @subpackage Insign
 * @since Insign 1.0
 */

$blog_info    = get_bloginfo( 'name' );
$description  = get_bloginfo( 'description', 'display' );
$show_title   = ( true === get_theme_mod( 'display_title_and_tagline', true ) );
$header_class = $show_title ? 'site-title' : 'screen-reader-text';

?>

<?php //if ( has_custom_logo() ) : ?>
	<div class="site-logo w15">
		<a href="/">
			<img src="<?= get_field('logo_site', 'option')['url']; ?>" alt="Logo du site">
		</a>
	</div>
<?php //endif; ?>
