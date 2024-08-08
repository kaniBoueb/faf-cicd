<?php
/**
 * Block Styles
 *
 * @link https://developer.wordpress.org/reference/functions/register_block_style/
 *
 * @package WordPress
 * @subpackage INSIGN
 * @since INSIGN 1.0
 */

if ( function_exists( 'register_block_style' ) ) {
	/**
	 * Register block styles.
	 *
	 * @since INSIGN 1.0
	 *
	 * @return void
	 */
	function insign_register_block_styles() {
		// Columns: Overlap.
		register_block_style(
			'core/columns',
			array(
				'name'  => 'insign-columns-overlap',
				'label' => esc_html__( 'Overlap', 'insign' ),
			)
		);

		// Cover: Borders.
		register_block_style(
			'core/cover',
			array(
				'name'  => 'insign-border',
				'label' => esc_html__( 'Borders', 'insign' ),
			)
		);

		// Group: Borders.
		register_block_style(
			'core/group',
			array(
				'name'  => 'insign-border',
				'label' => esc_html__( 'Borders', 'insign' ),
			)
		);

		// Image: Borders.
		register_block_style(
			'core/image',
			array(
				'name'  => 'insign-border',
				'label' => esc_html__( 'Borders', 'insign' ),
			)
		);

		// Image: Frame.
		register_block_style(
			'core/image',
			array(
				'name'  => 'insign-image-frame',
				'label' => esc_html__( 'Frame', 'insign' ),
			)
		);

		// Latest Posts: Dividers.
		register_block_style(
			'core/latest-posts',
			array(
				'name'  => 'insign-latest-posts-dividers',
				'label' => esc_html__( 'Dividers', 'insign' ),
			)
		);

		// Latest Posts: Borders.
		register_block_style(
			'core/latest-posts',
			array(
				'name'  => 'insign-latest-posts-borders',
				'label' => esc_html__( 'Borders', 'insign' ),
			)
		);

		// Media & Text: Borders.
		register_block_style(
			'core/media-text',
			array(
				'name'  => 'insign-border',
				'label' => esc_html__( 'Borders', 'insign' ),
			)
		);

		// Separator: Thick.
		register_block_style(
			'core/separator',
			array(
				'name'  => 'insign-separator-thick',
				'label' => esc_html__( 'Thick', 'insign' ),
			)
		);

		// Social icons: Dark gray color.
		register_block_style(
			'core/social-links',
			array(
				'name'  => 'insign-social-icons-color',
				'label' => esc_html__( 'Dark gray', 'insign' ),
			)
		);
	}
	add_action( 'init', 'insign_register_block_styles' );
}
