<?php
/**
 * Plugin Name:       Stretchy Pants Grid Gallery
 * Description:       A lightweight and flexible grid gallery block for Stretchy Pants.
 * Version:           0.1.4
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

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\localize_editor_assets' );
/**
 * Localize the editor assets.
 *
 * @since 0.1.0
 *
 * @return void
 */
function localize_editor_assets() {
	wp_localize_script(
		'stretchypants-grid-gallery-editor-script',
		'spGridGalleryVars',
		[
			'pluginUrl' => plugin_dir_url(__FILE__)
		]
	);
}