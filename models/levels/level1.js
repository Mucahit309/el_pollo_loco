let level1;

function initLevel() {
    level1 = new Level(
        [
            new Chicken(), new Chicken(), new Chicken(), new Chicken(), 
            new Chicken(), new Chicken(), new Chicken(), new Chicken(),
            new Chicken(), new Chicken(), new Chicken(), new Chicken(),
            new Chicken(), new Chicken(),
            new SmallChicken(), new SmallChicken(), new SmallChicken(),
            new SmallChicken(), new SmallChicken(), new SmallChicken(),
            new SmallChicken(), new SmallChicken(), new SmallChicken(),
            new SmallChicken(),
            new Endboss()
        ],
        [
            new Cloud("img/5_background/layers/4_clouds/1.png", 0, 0),
            new Cloud("img/5_background/layers/4_clouds/2.png", 0, 0),
            new Cloud("img/5_background/layers/4_clouds/1.png", 0, 0),
            new Cloud("img/5_background/layers/4_clouds/2.png", 0, 0)
        ],
        [
            new BackgroundObject("img/5_background/layers/air.png", -720, 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -720, 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -720, 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -720, 0),

            new BackgroundObject("img/5_background/layers/air.png", 0, 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0, 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0, 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0, 0),
            
            new BackgroundObject("img/5_background/layers/air.png", 720, 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720, 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720, 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720, 0),

            new BackgroundObject("img/5_background/layers/air.png", 720*2, 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720*2, 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720*2, 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720*2, 0),
            
            new BackgroundObject("img/5_background/layers/air.png", 720*3, 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720*3, 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720*3, 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720*3, 0),

            new BackgroundObject("img/5_background/layers/air.png", 720*4, 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720*4, 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720*4, 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720*4, 0),

            new BackgroundObject("img/5_background/layers/air.png", 720*5, 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720*5, 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720*5, 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720*5, 0),

            new BackgroundObject("img/5_background/layers/air.png", 720*6, 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720*6, 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720*6, 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720*6, 0),

            new BackgroundObject("img/5_background/layers/air.png", 720*7, 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720*7, 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720*7, 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720*7, 0),

            new BackgroundObject("img/5_background/layers/air.png", 720*8, 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720*8, 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720*8, 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720*8, 0),

            new BackgroundObject("img/5_background/layers/air.png", 720*9, 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720*9, 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720*9, 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720*9, 0)
        ],
        [
            new Bottle(300, 340), 
            new Bottle(500, 340), 
            new Bottle(800, 340), 
            new Bottle(1200, 340), 
            new Bottle(1500, 340),
            new Bottle(1900, 340),
            new Bottle(2300, 340),
            new Bottle(2700, 340),
            new Bottle(3200, 340),
            new Bottle(3600, 340)
        ],
        [
            new Coin(300, 200),
            new Coin(400, 150),
            new Coin(500, 200),
            new Coin(600, 250),
            new Coin(800, 150),
            new Coin(900, 100),
            new Coin(1300, 200),
            new Coin(1500, 150),
            new Coin(1800, 250),
            new Coin(2200, 100),
            new Coin(2400, 200),
            new Coin(2800, 150),
            new Coin(3300, 100),
            new Coin(3500, 250)
        ]
    );
}