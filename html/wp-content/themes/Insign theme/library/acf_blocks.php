<?php 
function lana_setup() {
    add_theme_support('editor-styles');
    
    // Utilisez une version locale de Tailwind CSS pour de meilleures performances
    // add_editor_style(get_template_directory_uri() . '/path/to/local/tailwind.css'); 
    add_editor_style( 'https://cdn.tailwindcss.com' );
    add_editor_style(get_template_directory_uri() . '/library/css/style.css');
}
add_action('after_setup_theme', 'lana_setup');


// ********* Custom category ************

function custom_category($categories, $post) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'custom',
                'title' => __('Custom', 'custom')
            )
        )
    );
}
add_filter('block_categories', 'custom_category', 10, 2);


// ********* Custom blocks ************

// Callback de rendu des blocs
function my_acf_render_callback($block) {
    $slug = str_replace('acf/', '', $block['name']);
    
    if(file_exists(get_theme_file_path("/template-parts/blocks/{$slug}.php"))) {
        include(get_theme_file_path("/template-parts/blocks/{$slug}.php"));
    } else {
        echo "<p>Template pour le bloc {$slug} non trouvé.</p>";
    }
}

// Initialisation des blocs ACF
function my_acf_init() {
    if(function_exists('acf_register_block_type')) {
        acf_register_block_type(array(
            'name' => 'text-image-block',
            'title' => __('Bloc texte image'),
            'description' => __('Un bloc texte image'),
            'render_callback' => 'my_acf_render_callback',
            'category' => 'custom',
            'icon' => 'text',
            'keywords' => array('bloc', 'texte'),
        ));
        acf_register_block_type(array(
            'name' => 'slider-block',
            'title' => __('Bloc slider'),
            'description' => __('Un bloc avec des grandes images qui slident'),
            'render_callback' => 'my_acf_render_callback',
            'category' => 'custom',
            'icon' => 'slides',
            'keywords' => array('bloc', 'texte'),
        ));
    }
}
add_action('acf/init', 'my_acf_init');
