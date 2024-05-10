import kaboom from "./libs/kaboom.mjs"



kaboom({
  width: 1280,
  height: 720,
  letterbox: true,
  //debug: false,
  });

loadSound("ost", "../Musique/apistache_ost2.mp3")
loadRoot("sprites/")
loadSprite("taureau", "spritesheetTaureau1-min2.png", {
    sliceX: 8,
    anims: {
      "idle": 0,
      "walk": {
        from: 1,
        to: 6,
        speed: 30,
        loop: true,
      },
      "jump": 7,
    }
  })
loadSprite("perso1", "spritesheetPerso1.png", {
  sliceX: 4,
  anims: {
    "idle": 0,
    "walk": {
      from: 1,
      to: 3,
      speed: 12,
      loop: true,
    }
  }
})
loadSprite("background", "full-background_resized.png")
loadSprite("ground", "ground.png")
loadSprite("brick", "brick-main.png")
loadSprite("debris", "Debris.png")
loadSprite("pillar", "Pillar.png")
loadSprite("grass", "Grass.png")
loadSprite("palmtree-big","PalmTree1.png")
loadSprite("palmtree-small", "PalmTree2.png")
loadSprite("sphinx", "LionSphinx.png")
/*loadSpriteAtlas(
  "egypt_tomb_v1.1.png", {
    "block-1": {
      x: 0,
      y: 0,
      width: 96,
      heigth: 64,
    }
  }
)*/
loadSprite("block-1", "block-1.png")
//loadSprite("philae2", "./architecture/PHILAE2.png")
loadSprite("poils", "poils.png")
loadSprite("triangle", "triangle.png")
loadSprite("faucon", "faucon.png")


const SPEED = 240
const ENEMYSPEED = 30
const START_LEVEL_IDX = 0
let LEVEL_IDX = START_LEVEL_IDX
let WIN_SCORE = 0
setGravity(1600)
const music = play("ost", {
  volume: 0.8,
  loop: true
})

const LEVELS = [
  [
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                 c         c                                            |",
    "|                                                                                                                                        |",
    "|                                                                              c                                                         |",
    "|                                                                                                      *                                 |",
    "|                                                                              P                       C                                 |",
    "|                                                                        p    CC     V1         T                                        |",
    "|                                                                        c           CCCC      ccc                                       |",
    "|                                                                   c                                                                    |",
    "|                                                                 c                                                                      |",
    "|                                 c                                                                                                      |",
    "|                                                                                                                                        |",
    "|                           c                               cc    c P 2   Y                                                              |",
    "|                                            c                    CCCCCCCCCCC                                                            |",
    "|              C           1 V                                                    V                                                      |",
    "|                         =====                                                   ===                                                    |",
    "|        C           C                                                                 p                                                 |",
    "|                                                                                      CC      c      c                                   |",
    "|   V p      PV 1c    2    V VP   c 2   P    2    V  Y                                                      P                            |",
    "|======================================================                                                   CCCCC                          |",
    "|                                                      =V                                                           c                    |",
    "|                                                       =V                                                                 c             |",
    "|                                                        =                                                                               |",
    "|                               B                         = 2  p                                                        c                |",
    "|                           =======      P                 ========                                                                      |",
    "|                                   =======                        =                                 C2 2 VY        CC                   |",
    "|                                                                   =                             P  CCCCCCC                             |",
    "|                                                         X          =  V 2  P   V          B    CC             c                        |",
    "|                                                      CCCC   Y P     =============      =======                                         |",
    "|                                                             ===                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
  ],
  [
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|      Pp                                                                                                                                |",
    "|==========                                                                                                                    P    Pp   |",
    "|          =                                                                                                            P  B  CCCCCCCCCCC|",
    "|           =V                                                                                                       CCCCCCCCC           |",
    "|            =      V  P                                                                                                                 |",
    "|             ==============                                                                                      c                      |",
    "|                           =                                                             cV1 c             c                            |",
    "|                            =                                                            =====    CC   c                                |",
    "|                             =  1            p    1         c  V2  P c     c V1 c                                                       |",
    "|                              =======   =   =========  ==   ==========  =  ======  C  CC                                                |",
    "|                                                                                                                                        |",
    "|                                    P                                                                                                   |",
    "|                                    ====                                                                                                |",
    "|                                                                                                                                        |",
    "|                                               CC                                                                                       |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                  C                    c 2p c          c                                                                |",
    "|                                            1          ======                                                                           |",
    "|                            1              ===    c                                                                                     |",
    "|                            ==                                                                                                          |",
    "|                                                                                                                                        |",
    "|                                   1     c           c                                                                                  |",
    "|                                 ====                                                                                                   |",
    "|                                                                                                                                        |",
    "|                                         CCC                                                                                            |",
    "|                                       C                                                                                                |",
    "|                    B T  ^ V2 PPp    C                                                                                                  |",
    "|                  =================                                                                                                     |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
  ],
  [
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                        2                                               |",    "|                                                                                                                                        |",
    "|                                                                                       CCC                                              |",
    "|                                                                cp1 c                                                                   |",
    "|     V      c             Pc                   C   P         V  =====             VY                               p   2     P B T  Y & |",
    "|=   ===                  ===       c  c  c         C       ===                    ===             c    c    c    =======================|",
    "|                    c                                                     P B               c                                           |",
    "|                                                                          =====                                                         |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
  ],
  /*[
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|     T                                                                                                                                  |",
    "|     =                                                                                                                                  |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
  ],*/
]

scene("game", ({levelIdx}) => {



  //BACKGROUND
 const BACKGROUND = add([
    sprite("background"),
    fixed(),
    scale(0.75),
  ])

  //LEVEL SETUP
  const level = addLevel(LEVELS[levelIdx || 0 ], {
    tileWidth: 32,
    tileHeight: 32,
    tiles: {
      //CHARACTERS
      "T": () => [sprite("taureau", {width: 32}), area(), body(), anchor("bot"), "player"],
      "1": () => [sprite("perso1", {height: 32}), area(), body(), anchor("bot"), state("walk", ["idle", "walk"]), patrol(1, 0), "enemy"],
      "2": () => [sprite("perso1", {height: 32}), area(), body(), anchor("bot"), state("walk", ["idle", "walk"]), patrol(2, 2), "enemy"],
      //OBSTACLES
      "=": () => [sprite("brick", {height: 32}), area(), body({isStatic: true}), anchor("bot"), "brick"],
      "Y": () => [sprite("pillar", {height: 64}), area(), body({isStatic: true}), anchor("bot"), "pillar"],
      "X": () => [sprite("debris", {width: 32}), area(), body({isStatic: true}), anchor("bot"), "debris", "obstacle"],
      "C": () => [sprite("block-1", {height: 32}), area(), body({isStatic: true}), anchor("bot"), "bloc", "obstacle"],
      "c": () => [sprite("block-1", {width: 32}), area(), body({isStatic: true}), anchor("bot"), "bloc", "obstacle"],
      "B": () => [sprite("sphinx", {height: 64}), area(), body({isStatic: true}), anchor("bot"), "bloc", "obstacle"],
      "V": () => [sprite("grass"), anchor("bot"), "grass"],
      "p": () => [sprite("palmtree-small"), anchor("bot"), "grass"],
      "P": () => [sprite("palmtree-big"), anchor("bot"), "grass"],
      "?": () => [sprite("grass"), opacity(0), anchor("bot"),area(), body({isStatic: true}), "enemy", "death"],
      "|": () => [sprite("grass"), opacity(0), anchor("bot"),area(), body({isStatic: true})],
      //ATTRIBUTES
      "*": () => [sprite("poils", {height: 16}), area(), body({isStatic: true}), anchor("bot"), "attribute"],
      "^": () => [sprite("triangle", {height: 16}), area(), body({isStatic: true}), anchor("bot"), "attribute"],
      "&": () => [sprite("faucon", {height: 16}), area(), body({isStatic: true}), anchor("bot"), "attribute"],
    }
  })


	/*const scoreLabel = add([
		text(WIN_SCORE, {font: "courier new", size: 32}),
    color(0, 0, 0),
		anchor("center"),
		pos(width() - 80, 80),
		fixed(),
		z(100),
	])*/
  const levelLabel = add([
		text(`Niveau ${LEVEL_IDX + 1}`, {font: "courier new", size: 32}),
    color(0, 0, 0),
		anchor("center"),
		pos(width() - 1160, 80),
		fixed(),
		z(100),
	])

  //MOUVEMENTS DU JOUEUR ET ANIMATIONS
  const player = level.get("player")[0]
  player.play("idle")

  player.onGround(() => {
    if (!isKeyDown("left") && !isKeyDown("right")) {
      player.play("idle")
    } else {
      player.play("walk")
    }
  })

  onKeyDown("right", () => {
    player.flipX = false
    player.move(SPEED, 0)
    if (player.isGrounded() && player.curAnim() !== "walk") {
      player.play("walk")
    }
  })
  onKeyDown("left", () => {
    player.flipX = true
    player.move(-SPEED, 0)
    if (player.isGrounded() && player.curAnim() !== "walk") {
      player.play("walk")
    }
  })

  onKeyPress("space" || "up", () => {
    if(player.isGrounded()) {
      player.jump()
      player.play("jump")
    }
  })

  ;["left", "right"].forEach((key) => {
    onKeyRelease(key, () => {
    // Only reset to "idle" if player is not holding any of these keys
      if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
        player.play("idle")
      }
    })
  })

  //ENNEMIS  
  /*onCollide("enemy", "obstacle", () => {
    enemy.jump()
  })*/
  
  function patrol(time, additionalTime) {
    return {
      id: "patrol",
      require: ["pos", "area"],
      //startingPos: vec2(0, 0),
      add() {
        //debug.log(this.pos.y)
        this.onStateEnter("idle", async () => {
          let timer = rand(time)
          this.play("idle")
          await wait(timer + 1)
          this.enterState("walk")
        })
        this.onStateEnter("walk", async () => {
          this.play("walk")
          let dir = rand(1)
          let timer = rand(time)
          
          if (dir <= 0.5) {
            this.flipX = true
          }
          if (dir >= 0.5) {
            this.flipX = false
          }
          await wait(timer + additionalTime)
          this.enterState("idle")
        })
      
        this.onStateUpdate("walk", () => {    
            if (this.flipX == true) {
              this.move(-ENEMYSPEED, 0)
            }
            if (this.flipX == false) {
              this.move(ENEMYSPEED, 0)
            }
        })
        //this.play("walk")
        this.onCollide("death", () => {
          //debug.log(this.startingPos)
          //this.pos = this.startingPos
          destroy(this)
        })
      },
    };
  }

  player.onCollide("enemy", async () => {
    shake(40)
    destroy(player)
    await wait(1)
    go("lose")
  })
  player.onCollide("death", async () => {
    shake(20)
    destroy(player)
    await wait(1)
    go("lose")
  })

  //ATTRIBUTS
  player.onCollide("attribute", (attribute) => {
    destroy(attribute)

    /*add([
      sprite(attribute.sprite),
      anchor("center"),
      pos(width() - 80*WIN_SCORE, 80),
      fixed(),
      z(100)

    ])*/
    WIN_SCORE += 1
    LEVEL_IDX += 1
    //scoreLabel.text = WIN_SCORE
    if (WIN_SCORE === 3) {
      go("end")
    }
    else {
      go("level-start", {
      levelIdx: LEVEL_IDX,
    })
  }
  })


  //CAMERA
  camScale(0.8)
  let startCam = camPos()
  camPos(player.pos.x + 120, startCam.y)
  camScale(2)

  player.onUpdate(() => {
    // center camera to player
    var currCam = camPos();
    if (currCam.x !== player.pos.x || currCam.y !== player.pos.y) {
      camPos(player.pos.x, player.pos.y);
    }
  });
  
})

//SCENES DEBUT, FIN ET LOSE
scene("start", () => {
  const BACKGROUND = add([
    sprite("background"),
    fixed(),
    scale(0.75),
  ])
  const startMenu = add([
    rect(800, 500),
    color(255, 255, 255),
    opacity(0.7),
		outline(4),
		anchor("center"),
		pos(center()),
  ])
  const dialogs = [
    ["Égypte, Memphis. 652 avant notre ère..."],
    ["Vous êtes un taureau et souhaitez poursuivre votre vie dans les meilleures conditions qui soient pour vous :"],
    ["Vous souhaitez devenir un taureau Apis, incarnation terrestre du dieu Ptah !"],
    ["Vous pourriez ainsi terminer votre vie dans les plus grands honneurs, aux soins des prêtres..."],
    ["Pour cela, il vous faut récupérer les attributs caractéristiques des taureaux Apis : \n- les poils noirs \n- le triangle blanc sur le front\n- la marque de faucon sur le dos \n- la marque de scarabé sous la langue"],
    ["Avant d'avoir réuni ces attributs, ne vous faites pas attraper par les prêtres !"]
  ]
  let curDialog = 0
  const txt = add([
    text("", { font: "courier new", size: 32, width: startMenu.width - 60, align: "center", lineSpacing: 25 }),
    pos(startMenu.pos),
    anchor("center"),
    color(0, 0, 0),
  ])
  onKeyPress("space", () => {
    // Cycle through the dialogs
    curDialog = (curDialog + 1)
    if(curDialog === dialogs.length) {
      go("level-start", {
        levelIdx: LEVEL_IDX,
      })
    }
    else{
      updateDialog()
    }
  })
  function updateDialog() {
    
    const [ dialog ] = dialogs[curDialog]
    // Update the dialog text
    txt.text = dialog
  
  }
  
  updateDialog()
})

scene("end", () => {
  const BACKGROUND = add([
    sprite("background"),
    fixed(),
    scale(0.75),
  ])
  const endMenu = add([
    rect(800, 500),
    color(255, 255, 255),
    opacity(0.7),
		outline(4),
		anchor("center"),
		pos(center()),
  ])
  const txt = add([
    text("Vous êtes désormais un taureau Apis, honoré par toute l'Égypte !", { font: "courier new", size: 32, width: endMenu.width - 60, align: "center", lineSpacing: 25 }),
    pos(endMenu.pos),
    anchor("center"),
    color(0, 0, 0),
  ])
})

scene("lose", () => {
  const BACKGROUND = add([
    sprite("background"),
    fixed(),
    scale(0.75),
  ])
  const endMenu = add([
    rect(800, 500),
    color(255, 255, 255),
    opacity(0.7),
		outline(4),
		anchor("center"),
		pos(center()),
  ])
  const txt = add([
    text("Les prêtres vous ont attrapé... Votre aventure s'arrête ici\n\n\nAppuyez <espace> pour rejouer", { font: "courier new", size: 32, width: endMenu.width - 60, align: "center", lineSpacing: 25 }),
    pos(endMenu.pos),
    anchor("center"),
    color(0, 0, 0),
  ])

  onKeyPress("space", () => {
      go("level-start", {
        levelIdx: LEVEL_IDX,
      })
  })
  //addButton("Rejouer", endMenu.pos.x, endMenu.pos.y + 170, () => go("game", {levelIdx: 0}))
})

scene("level-start", ({levelIdx}) => {
  const BACKGROUND = add([
    sprite("background"),
    fixed(),
    scale(0.75),
  ])
  const menu = add([
    rect(300, 100),
    color(255, 255, 255),
    opacity(0.7),
		outline(4),
		anchor("center"),
		pos(center()),
  ])
  const txt = add([
    text(`Niveau ${levelIdx + 1}`, { font: "courier new", size: 32, width: menu.width - 60, align: "center", lineSpacing: 25 }),
    pos(menu.pos),
    anchor("center"),
    color(0, 0, 0),
  ])

  onKeyPress("space", () => {
      go("game", {
        levelIdx: LEVEL_IDX,
      })
  })
})
/*
function patrol(distance = 500, speed = 50, dir = 1) {
  return {
    id: "patrol",
    require: ["pos", "area"],
    startingPos: vec2(0, 0),
    add() {
      this.startingPos = this.pos;
      this.on("collide", (obj, side) => {
        if (side === "left" || side === "right") {
          dir = -dir;
        }
      });
    },
    update() {
      if (Math.abs(this.pos.x - this.startingPos.x) >= distance) {
        dir = -dir;
      }
      this.move(speed * dir, 0);
    },
  };
}
function enemy() {
  return {
    id: "enemy",
    require: ["pos", "area", "sprite", "patrol"],
    isAlive: true,
    update() {},
    squash() {
      this.isAlive = false;
      this.unuse("patrol");
      this.stop();
      this.frame = 2;
      this.area.width = 16;
      this.area.height = 8;
      this.use(lifespan(0.5, { fade: 0.1 }));
    },
  };
}*/

function addButton(txt, px, py, f) {

	// add a parent background object
	const btn = add([
		rect(200, 60, { radius: 8 }),
    opacity(0.2),
		pos(px, py),
		area(),
		scale(1),
		anchor("center"),
		outline(4),
	])

	// add a child object that displays the text
	btn.add([
		text(txt, { font: "courier new", size: 32} ),
		anchor("center"),
		color(0, 0, 0),
	])

	// onHoverUpdate() comes from area() component
	// it runs every frame when the object is being hovered
	btn.onHoverUpdate(() => {
		btn.scale = vec2(1.2)
		setCursor("pointer")
	})

	// onHoverEnd() comes from area() component
	// it runs once when the object stopped being hovered
	btn.onHoverEnd(() => {
		btn.scale = vec2(1)
		btn.color = rgb()
	})

	// onClick() comes from area() component
	// it runs once when the object is clicked
	btn.onClick(f)

	return btn

}

function start() {
  go("start")
}

start()