<?php 
    $home_pg = 23;

    $args = array(
        'post_type'        => 'post',
        'posts_per_page' => '-1',
        'category' => '7',
        'order' => 'DESC'
    );
?>
<section class="ak-section bandeau w100 ak-before">
    <div class="flexslider home-slider">
        <ul class="slides">
            <?php
                if( have_rows('slide', $home_pg) ): ?>
                    <?php
                    $cpt = 0;
                    while ( have_rows('slide', $home_pg) ) : the_row();
                        $titre_sld = get_sub_field('titre',$home_pg);
                        $image_sld = get_sub_field('image',$home_pg);
                        $cpt++;
                        if($cpt > 3) break;
            ?>
            <li class="sld ak-transition ak-before ak-after" style="background-image:url('<?=$image_sld?>');">
                <div class="container">
                    <h2 class="titre-sld texte-blanc texte-bold ak-left ak-transition"><?=$titre_sld?></h2>
                </div>
            </li>
            <?php
                    endwhile; 
                endif;
            ?>
        </ul>
    </div>

    <!-- SLIDER ACTUS -->
            
    <div class="flexslider actus-slider">
        <ul class="slides">
            <?php
                $les_actus = get_posts($args);
                foreach($les_actus as $actu):
                    $id_ = $actu->ID;
                    $titre = $actu->post_title;
                    $lien = get_permalink($id_);
                    $vignette = wp_get_attachment_url( get_post_thumbnail_id($id_) );
                    if($vignette != ''):
            ?>
            <li class="sld ak-transition ak-before ak-after" >
                <div class="pad w100 flex-it">
                    <div class="vignette w50 ak-center" style="background-image:url('<?=$vignette?>');">
                        <img src="<?=$vignette?>" alt="<?=$titre?>" class="ak-transition" loading="lazy" />
                    </div>
                    <div class="infos w50 ak-left">
                        <h4 class="le-titre ak-transition texte-noir majuscule texte-bold">
                            <a href="<?=$lien?>" class="cta ak-transition texte-noir texte-moyen ak-before ak-after f-18" title="<?=$titre?>">
                                <?= substr($titre, 0, 45).'...';?>
                            </a>
                        </h4>
                        <a href="<?=$lien?>" class="cta-actus ak-transition texte-noir texte-moyen ak-before ak-after f-18" title="<?=$titre?>">
                        </a>
                    </div>
                </div>
            </li>
            <?php
                endif;
                    endforeach; 
            ?>
        </ul>
    </div>
    
</section>