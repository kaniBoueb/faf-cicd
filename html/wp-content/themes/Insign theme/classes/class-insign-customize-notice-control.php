<?php
/**
 * Customize API: Insign_Customize_Notice_Control class
 *
 * @package WordPress
 * @subpackage Insign
 * @since Insign 1.0
 */

/**
 * Customize Notice Control class.
 *
 * @since Insign 1.0
 *
 * @see WP_Customize_Control
 */
class Insign_Customize_Notice_Control extends WP_Customize_Control {
	/**
	 * The control type.
	 *
	 * @since Insign 1.0
	 *
	 * @var string
	 */
	public $type = 'insign-notice';

	/**
	 * Renders the control content.
	 *
	 * This simply prints the notice we need.
	 *
	 * @since Insign 1.0
	 *
	 * @return void
	 */
	public function render_content() {
		?>
		<div class="notice notice-warning">
			<p><?php esc_html_e( 'To access the Dark Mode settings, select a light background color.', 'insign' ); ?></p>
			<p><a href="<?php echo esc_url( __( 'https://wordpress.org/support/article/insign/#dark-mode-support', 'insign' ) ); ?>">
				<?php esc_html_e( 'Learn more about Dark Mode.', 'insign' ); ?>
			</a></p>
		</div><!-- .notice -->
		<?php
	}
}
