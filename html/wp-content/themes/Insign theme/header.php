<?php
/**
 * The header.
 *
 * This is the template that displays all of the <head> section and everything up until main.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Insign
 * @since Insign 1.0
 */

?>
<!doctype html>
<html <?php language_attributes(); ?> <?php insign_the_html_classes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet"  href="<?php echo get_stylesheet_directory_uri(); ?>/assets/css/fonts/fonts.css" media="all" />
    <link rel="stylesheet"  href="<?php echo get_stylesheet_directory_uri(); ?>/assets/css/swiper-bundle.min.css" media="all" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11.0.6/swiper-bundle.min.css">
	<link rel="stylesheet"  href="<?php echo get_stylesheet_directory_uri(); ?>/assets/css/custom.css" media="all" />
	<link rel="stylesheet"  href="<?php echo get_stylesheet_directory_uri(); ?>/assets/css/insign.css" media="all" />
	<?php wp_head(); ?>
    <link rel="stylesheet"  href="<?php echo get_stylesheet_directory_uri(); ?>/style.css" media="all" />
	<link rel="stylesheet"  href="<?php echo get_stylesheet_directory_uri(); ?>/assets/css/responsive.css" media="all" />
	<script src="https://cdn.tailwindcss.com"></script>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<?php get_template_part( 'template-parts/header/site-header' ); ?>

	<div id="content" class="site-content">
		<div id="primary" class="content-area">
			<main id="main" class="site-main">
