<?php 
    /* Block Name: Slider Block */ 
    // $id = get_the_ID();
?>

<section class="ak-section bandeau w100 ak-before">
    <div class="flexslider home-slider">
        <ul class="slides">
            <?php
                if( have_rows('slide') ): ?>
                    <?php
                    // $cpt = 0;
                    while ( have_rows('slide') ) : the_row();
                        $title_group = get_sub_field('title_group');
                        $titre_slider = $title_group['titre_slider'];    
                        $title_color = $title_group['title_color'];    
                        $title_add_class = $title_group['title_add_class'];
                        
                        $image_sld = get_sub_field('image_slider');
                        
                        $btn_group = get_sub_field('btn_group');
                        $btn_slider = $btn_group['btn_slider'];                        
                        $btn_link = $btn_group['btn_link'];
                        $btn_color = $btn_group['btn_color'];    
                        $btn_add_class = $btn_group['btn_add_class'];

                        // $cpt++;
                        // if($cpt > 6) break;
            ?>
            <li class="sld ak-transition ak-before ak-after" style="background-image:url('<?= esc_url($image_sld) ?>');">
                <div class="container">
                    <h2 class="titre-sld ak-transition <?= esc_attr($title_add_class) ?>"  style="color: <?= esc_attr($title_color) ?>;"><?=$titre_slider?></h2>
                    <a href="<?= esc_url($btn_link) ?>" class="<?= esc_attr($btn_add_class) ?>"><?=$btn_slider?></a>
                </div>
            </li>
            <?php
                    endwhile; 
                endif;
            ?>
        </ul>
    </div>
</section>