<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package WordPress
 * @subpackage Insign
 * @since Insign 1.0
 */
$lien_img = get_stylesheet_directory_uri().'/assets/images/404.svg';

get_header();
?>

	<header class="page-header ak-center w100 mt-30">
		<!--<h1 class="page-title"><?php /*esc_html_e( 'Page introuvable!', 'insign' ); */?></h1>-->
		<h1 class="majuscule texte-bold texte-noir f-50">
			404
		</h1>
		<span class="texte-bold texte-noir f-24">Page introuvable</span><br>
		<span class="texte-bold f-24">
			Retour sur <a class="cta texte-vert" href="/">la page d'accueil</a>
		</span>
	</header><!-- .page-header -->

	<div class="error-404 not-found w100 ak-center">
    	<img src="<?=$lien_img?>" alt="Autorent Occasion | 404">
	</div><!-- .error-404 -->

<?php
get_footer();
