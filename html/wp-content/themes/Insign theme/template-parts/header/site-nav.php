<?php
/**
 * Displays the site navigation.
 *
 * @package WordPress
 * @subpackage Insign
 * @since Insign 1.0
 */
?>

<?php if ( has_nav_menu( 'primary' ) ) : ?>
	<nav id="site-navigation" class="primary-navigation texte-moyen ak-desk w65" aria-label="<?php esc_attr_e( 'Primary menu', 'insign' ); ?>">
		<?php
		wp_nav_menu(
			array(
				'theme_location'  => 'primary',
				'menu_class'      => 'menu-wrapper',
				'container_class' => 'primary-menu-container',
				'items_wrap'      => '<ul id="primary-menu-list" class="%2$s d-flex">%3$s</ul>',
				'fallback_cb'     => false,
			)
		);
		?>
	</nav>
	<?php
endif;?>
	

<!-- Menu mobile -->
<div class="content ak-mobile">
	<div class="burger-menu">
		<div class="bar">
		<span class="bar-1"> </span>
		<span class="bar-2"> </span>
		<span class="bar-3"> </span>
		</div>
	</div>

	<div id="custom-nav" class="custom-nav ak-transition">
		
		<!-- <?php get_template_part( 'template-parts/header/site-branding' ); ?>
		<div class="nom-site majuscule texte-blanc texte-regular"><?=$titre_site?></div> -->
		<div class="le-menu">
			<div class="burger-menu close">
			<div class="bar">
				<span class="bar-1"> </span>
				<span class="bar-2"> </span>
				<span class="bar-3"> </span>
				</div>
			</div>
			<div class="site-logo w15"><?php the_custom_logo(); ?></div>
			<?php if ( has_nav_menu( 'primary' ) ) : ?>
				<nav id="site-navigation" class="primary-navigation texte-moyen" aria-label="<?php esc_attr_e( 'Primary menu', 'insign' ); ?>">
					<?php
						wp_nav_menu(
							array(
								'theme_location'  => 'primary',
								'menu_class'      => 'menu-wrapper',
								'container_class' => 'primary-menu-container',
								'items_wrap'      => '<ul id="primary-menu-list" class="%2$s">%3$s</ul>',
								'fallback_cb'     => false,
							)
						);
					?>
				</nav>
			<?php endif;?>
			<!-- <div class="call-us d-flex">
				<img src="<?=get_field('logo_whatsapp',$home_pg)?>" alt="whatsapp">
				<div class="les-infos">
					<span class="texte-gris f-16 text-light"><?=get_field('texte_whatsapp',$home_pg)?></span>
					<span class="texte-vert f-13 text-bold"><?=get_field('numero_whatsapp',$home_pg)?></span>
				</div>
			</div> -->
		</div>
	</div>
</div>
