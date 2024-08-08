<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage Insign
 * @since Insign 1.0
 */

get_header();

/* Start the Loop */
while ( have_posts() ) :
	the_post();
	get_template_part( 'template-parts/inclusion/page-hero' );
	get_template_part( 'template-parts/inclusion/content-page' );
	get_template_part( 'template-parts/inclusion/catalogue' );
	get_template_part( 'template-parts/inclusion/les-conseils' );
	get_template_part( 'template-parts/inclusion/news' );

	// If comments are open or there is at least one comment, load up the comment template.
	if ( comments_open() || get_comments_number() ) {
		comments_template();
	}
endwhile; // End of the loop.

get_footer();
