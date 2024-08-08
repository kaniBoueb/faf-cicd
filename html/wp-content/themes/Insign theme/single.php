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
	
endwhile; // End of the loop.

get_footer();
