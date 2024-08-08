<?php /* Block Name: Text Image Block */ 
    $bg_color = get_field('bg_color');    
    $text_color = get_field('color');

?>

<section class="py-8" style="background-color: <?= $bg_color?>; color: <?= $text_color?>;">
    <div class="text-image-block">
        <h2><?php the_field('title'); ?></h2>
        <!-- <img src="<?php the_field('image'); ?>" alt=""> -->
        <p><?php the_field('desc'); ?></p>
    </div>
</section>

