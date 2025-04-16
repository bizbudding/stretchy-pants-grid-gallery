<?php
/**
 * Plugin Name:       Stretchy Pants Grid Gallery
 * Description:       A lightweight and flexible grid gallery block for Stretchy Pants.
 * Version:           0.3.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            BizBudding
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       stretchy-pants-grid-gallery
 */

namespace StetchyPants\GridGallery;

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', __NAMESPACE__ . '\init' );
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @since 0.1.0
 *
 * @return void
 */
function init() {
	register_block_type( __DIR__ . '/block' );

	// Localize the editor assets.
	wp_localize_script(
		'stretchypants-grid-gallery-editor-script',
		'spGridGalleryVars',
		[
			'pluginUrl' => plugin_dir_url(__FILE__)
		]
	);

}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\maybe_enqueue_styles' );
/**
 * Enqueues the styles for the grid gallery block.
 *
 * @since 0.3.0
 *
 * @return void
 */
function maybe_enqueue_styles() {
	// Bail if not a single post/page.
	if ( ! is_singular() ) {
		return;
	}

	// Bail if the page doesn't have the grid gallery block.
	if ( ! has_block( 'stretchypants/grid-gallery' ) ) {
		return;
	}

	// Enqueue the styles.
	enqueue_styles();
}

add_action( 'plugins_loaded', __NAMESPACE__ . '\updater' );
/**
 * Setup the updater.
 *
 * composer require yahnis-elsts/plugin-update-checker
 *
 * @since 0.1.0
 *
 * @uses https://github.com/YahnisElsts/plugin-update-checker/
 *
 * @return void
 */
function updater() {
	$updater = PucFactory::buildUpdateChecker( 'https://github.com/bizbudding/stretchy-pants-grid-gallery', __FILE__, 'stretchy-pants-grid-gallery' );
	$updater->setBranch( 'main' );
}

/**
 * Enqueues the styles for the grid gallery block.
 *
 * @since 0.3.0
 *
 * @return void
 */
function enqueue_styles() {
	// Get the version of the stylesheet.
	$ver = filemtime( plugin_dir_path( __FILE__ ) . 'build/styles.css' );

	// Enqueue the styles in the head if the block is on the page.
	wp_enqueue_style( 'stretchypants-grid-gallery-styles', plugin_dir_url(__FILE__) . 'build/styles.css', [], $ver );
}
