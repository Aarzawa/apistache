import kaboom from "./libs/kaboom.mjs"



kaboom({
  width: 1280,
  height: 720,
  letterbox: true,
  debug: false,
  });

loadSound("ost", "./Musique/apistache_ost2.mp3")
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
loadSprite("block-1", "block-1.png")
loadSprite("poils", "poils.png")
loadSprite("triangle", "triangle.png")
loadSprite("faucon", "faucon.png")
loadSprite("ankh", "ankh.png")
loadSprite("scarab", "scarab.png")
loadSprite("jewel", "jewel.png")


const SPEED = 240
const ENEMYSPEED = 30
const START_LEVEL_IDX = 0
let LEVEL_IDX = START_LEVEL_IDX
let WIN_SCORE = 0
let BONUS_SCORE = 0
setGravity(1600)
const music = play("ost", {
  volume: 0.8,
  loop: true
})

const LEVELS = [
  [
    "|                                                                                                                                        |",
    "|                                                                                                                                        |",
    "|                                                                                           S                                            |",
    "|                                                                                 c    c    c                                            |",
    "|                                                                                                                                        |",
    "|                                                                              c                                                         |",
    "|                                                                                                      *                                 |",
    "|                                                                              P                       C                                 |",
    "|                                                                        p    CC     V1                                                  |",
    "|                                                                        c           CCCC      ccc                                       |",
    "|                                                                   c                                                                    |",
    "|                                 0                               c                                                                      |",
    "|                                 c                                                                                                      |",
    "|                                                                                                                                        |",
    "|                           c                               cc    c P 2   Y                                                              |",
    "|                                            c                    CCCCCCCCCCC                                                            |",
    "|              C           1 V                                                    VA                                                     |",
    "|                         =====                                                   ===                                                    |",
    "|        C           C                                                                 p                                                 |",
    "|                                                                                      CC      c      c                                   |",
    "| T V p      PV 1c    2    V VP   c 2   P    2    V  Y                                                      P                            |",
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
    "|  T   Pp                                                                                                                                |",
    "|==========                                                                                                                    P  0 Pp   |",
    "|          =                                                                                                            P  B  CCCCCCCCCCC|",
    "|           =V                                                                                                       CCCCCCCCC           |",
    "|            =      V  P                                                                                                                 |",
    "|             ==============                                                                                      c                      |",
    "|                           =                                                             cV1 c             c                            |",
    "|                            =                                                            =====    CC   c                                |",
    "|                             =  1            p    1    A    c  V2  P c     c V1 c  S                                                    |",
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
    "|                    B    ^ V2 PPp    C                                                                                                  |",
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
    "|T    V      c             Pc          A        C   P        SV  =====             VY                               p   2     P B  0 Y & |",
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
      //BONUS
      "A": () => [sprite("ankh", {height: 16}), area(), body({isStatic: true}), anchor("bot"), "ankh", "bonus"],
      "S": () => [sprite("scarab", {height: 16}), area(), body({isStatic: true}), anchor("bot"), "scarab", "bonus"],
      "0": () => [sprite("jewel", {height: 16}), area(), body({isStatic: true}), anchor("bot"), "jewel", "bonus"],
    }
  })


  //LABELS
  const levelLabel = add([
		text(`Niveau ${LEVEL_IDX + 1}`, {font: "courier new", size: 32}),
    color(0, 0, 0),
		anchor("center"),
		pos(width() - 1160, 80),
		fixed(),
		z(100),
	])
  const bonusLabels = add([
    rect(240, 70),
    color(50, 50, 50),
    outline(4),
    anchor("center"),
    pos(width() - 640, 80),
    fixed(),
    z(99)
  ])
  
  let bonusOpacity = 0.3

  const ankhLabel = add([
    sprite("ankh", {height: 48}),
    anchor("center"),
    pos(bonusLabels.pos.x - 85, bonusLabels.pos.y),
    opacity(bonusOpacity),
    fixed(),
    z(100) 
  ])
  const scarabLabel = add([
    sprite("scarab", {height: 48}),
    anchor("center"),
    pos(bonusLabels.pos.x, bonusLabels.pos.y),
    opacity(bonusOpacity),
    fixed(),
    z(100) 
  ])

  const jewelLabel = add([
    sprite("jewel", {height: 48}),
    anchor("center"),
    pos(bonusLabels.pos.x + 85, bonusLabels.pos.y),
    opacity(bonusOpacity),
    fixed(),
    z(100) 
  ])

  const attributeLabels = add([
    rect(270, 70),
    color(256, 256, 256),
    opacity(0.7),
    outline(4),
    anchor("center"),
    pos(width() - 170, 80),
    fixed(),
    z(99)
  ])
  
  let attributeOpacity = 0.3

  const poilsLabel = add([
    sprite("poils", {height: 48}),
    anchor("center"),
    pos(attributeLabels.pos.x - 88, attributeLabels.pos.y),
    opacity(bonusOpacity),
    fixed(),
    z(100) 
  ])
  const triangleLabel = add([
    sprite("triangle", {height: 48}),
    anchor("center"),
    pos(attributeLabels.pos.x, attributeLabels.pos.y),
    opacity(bonusOpacity),
    fixed(),
    z(100) 
  ])

  const fauconLabel = add([
    sprite("faucon", {height: 48}),
    anchor("center"),
    pos(attributeLabels.pos.x + 88, attributeLabels.pos.y),
    opacity(bonusOpacity),
    fixed(),
    z(100) 
  ])

  if (levelIdx == 0){
    poilsLabel.opacity = attributeOpacity
    triangleLabel.opacity = attributeOpacity
    fauconLabel.opacity = attributeOpacity
  }
  if (levelIdx == 1){
    poilsLabel.opacity = 1
    triangleLabel.opacity = attributeOpacity
    fauconLabel.opacity = attributeOpacity
  }
  if (levelIdx == 2){
    poilsLabel.opacity = 1
    triangleLabel.opacity = 1
    fauconLabel.opacity = attributeOpacity
  }

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
  
  function patrol(time, additionalTime) {
    return {
      id: "patrol",
      require: ["pos", "area"],
      add() {
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
        this.onCollide("death", () => {
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

    WIN_SCORE += 1
    LEVEL_IDX += 1
    BONUS_SCORE += CUR_BONUS_SCORE
    if (LEVEL_IDX === 3) {
      go("end")
    }
    else {
      go("level-start", {
      levelIdx: LEVEL_IDX,
    })
  }
  })

  //BONUS
  let CUR_BONUS_SCORE = 0
  let bonus_texts = {}
  bonus_texts = {
    0: {
      ankh: "Le taureau était associé au pharaon, rappel de son pouvoir et de sa force.\n\n⏎ pour fermer",
      scarab: "Le culte du taureau Apis est attesté dès le début du 3e millénaire av. J.-C et jusqu’à la période romaine.\n\n⏎ pour fermer",
      jewel: "Les divinités bovines étaient nombreuses en Égypte antique. Les plus célèbres sont Hathor, déesse de la beauté et de l’amour, représentée en vache, et Apis, symbole de force, de fertilité et de virilité.\n\n⏎ pour fermer",
    },
    1: {
      ankh: "Le taureau Apis était utilisé comme oracle. À certaines occasions particulières, le taureau était amené dans une salle avec de nombreuses portes, derrières lesquels étaient placés différents symboles. La porte que franchissait le taureau à la suite d’une question posée apportait une réponse.\n\n⏎ pour fermer",
      scarab: "Il n’y avait qu’un seul taureau Apis à la fois. Une fois décédé, on entamait la recherche de son successeur. \n\n⏎ pour fermer",
      jewel: "Le taureau Apis était logé, avec sa mère, dans l’enceinte du temple de Ptah à Memphis.\n\n⏎ pour fermer",
    },
    2: {
      ankh: "Après 25 ans, le taureau était tué de manière cérémoniale. Certaines parties de la chair étaient mangées par les prêtres, puis la carcasse était embaumée.\n\n⏎ pour fermer",
      scarab: "Les taureaux Apis étaient momifiés avec le même soin que celui apporté à un roi ou un noble.\n\n⏎ pour fermer",
      jewel: "Une fois embaumé, le taureau était enterré dans le Sérapéum à la nécropole de Saqqarah, où une série de chambres souterraines étaient creusées pour accueillir les défunts taureaux Apis.\n\n⏎ pour fermer",
    }
  }

  console.log(bonus_texts[LEVEL_IDX]["ankh"])

  player.onCollide("ankh", (ankh) => {
    destroy(ankh)
    CUR_BONUS_SCORE += 1
    ankhLabel.opacity = 1

    const txt = add([
      text(`${bonus_texts[LEVEL_IDX]['ankh']}`, { font: "courier new", size: 24, width: 400 - 60, align: "center", lineSpacing: 8}),
      pos(220, 390),
      anchor("center"),
      color(0, 0, 0),
      fixed(),
      z(100),
      ])
      const bonusBox = add([
        rect(txt.width + 40, txt.height + 40),
        color(255, 255, 255),
        opacity(0.7),
        outline(4),
        anchor("center"),
        pos(220, 390),
        fixed(),
        z(98),
      ])

      onKeyPress("enter", () => {
        destroy(txt)
        destroy(bonusBox)
      })
  })

  player.onCollide("scarab", (scarab) => {
    destroy(scarab)
    CUR_BONUS_SCORE += 1
    scarabLabel.opacity = 1

    const txt = add([
      text(`${bonus_texts[LEVEL_IDX]['scarab']}`, { font: "courier new", size: 24, width: 400 - 60, align: "center", lineSpacing: 18}),
      pos(220, 390),
      anchor("center"),
      color(0, 0, 0),
      fixed(),
      z(100),
      ])
      const bonusBox = add([
        rect(txt.width + 40, txt.height + 40),
        color(255, 255, 255),
        opacity(0.7),
        outline(4),
        anchor("center"),
        pos(220, 390),
        fixed(),
        z(98),
      ])

      onKeyPress("enter", () => {
        destroy(txt)
        destroy(bonusBox)
      })
  })

  player.onCollide("jewel", (jewel) => {
    destroy(jewel)
    CUR_BONUS_SCORE += 1
    jewelLabel.opacity = 1

    const txt = add([
      text(`${bonus_texts[LEVEL_IDX]['jewel']}`, { font: "courier new", size: 24, width: 400 - 60, align: "center", lineSpacing: 18}),
      //pos(bonusBox.pos),
      pos(220, 390),
      anchor("center"),
      color(0, 0, 0),
      fixed(),
      z(100),
      ])
      const bonusBox = add([
        rect(txt.width + 40, txt.height + 40),
        color(255, 255, 255),
        opacity(0.7),
        outline(4),
        anchor("center"),
        pos(220, 390),
        fixed(),
        z(98),
      ])

      onKeyPress("enter", () => {
        destroy(txt)
        destroy(bonusBox)
      })
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
  loadShader("invert", null, `
    uniform float u_time;
    
    vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
      vec4 c = def_frag();
      float t = (sin(u_time * 6.0) + 1.0) / 2.0;
      vec4 transparentColor = vec4(c.rgb, 0.0); // Couleur d'arrivée (opacité 0)
      return mix(c, transparentColor, t); // Mélange des deux couleurs selon t
    }
    `)
  const spaceInstruction = add([
    text("<Espace>", { font: "courier new", size: 24, width: startMenu.width - 60, align: "center", lineSpacing: 25 }),
    pos(startMenu.pos.x + 300, startMenu.pos.y + 220),
    anchor("center"),
    color(0, 0, 0),
    shader("invert", () => ({
      "u_time": time(),
    }))

  ])
  const dialogs = [
    ["Égypte, Memphis. 652 avant notre ère..."],
    ["Vous êtes un taureau et souhaitez saisir la chance de poursuivre votre vie dans les meilleures conditions qui soient pour vous :"],
    ["Le précédent taureau Apis, incarnation terrestre du dieu Ptah, vient de mourir et vous souhaitez lui succéder !"],
    ["Vous pourriez ainsi terminer votre vie dans les plus grands honneurs, aux soins des prêtres..."],
    ["Pour cela, il vous faut récupérer les attributs caractéristiques des taureaux Apis :"],
    ["les poils noirs \n\nle triangle blanc sur le front\n\nla marque de faucon sur le dos"],
    ["Dans chaque niveau se cachent 3 objets de valeur qui vous apporterons un prestige supplémentaire... Récupérez les pour augmentez votre score !\n"],
    ["Avant d'avoir réuni tous ces objets, ne vous faites pas attraper par les prêtres !"],
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

    if(curDialog === 5) {
      let poils = add([
        sprite("poils", {height: 48}),
        anchor("center"),
        pos(startMenu.pos.x, startMenu.pos.y - 64),
        fixed(),
        z(100),
        "label" 
      ])
      let triangle = add([
        sprite("triangle", {height: 48}),
        anchor("center"),
        pos(startMenu.pos.x, startMenu.pos.y + 64),
        fixed(),
        z(100),
        "label" 
      ])
    
      let faucon = add([
        sprite("faucon", {height: 48}),
        anchor("center"),
        pos(startMenu.pos.x, startMenu.pos.y + 172),
        fixed(),
        z(100),
        "label"
      ])
    }
    if (curDialog === 6) {
      destroyAll("label")
    }
    if(curDialog === 6) {
      let ankh = add([
        sprite("ankh", {height: 48}),
        anchor("center"),
        pos(startMenu.pos.x - 110, startMenu.pos.y + 180),
        fixed(),
        z(100),
        "label" 
      ])
      let scarab = add([
        sprite("scarab", {height: 48}),
        anchor("center"),
        pos(startMenu.pos.x, startMenu.pos.y + 180),
        fixed(),
        z(100),
        "label" 
      ])
    
      let jewel = add([
        sprite("jewel", {height: 48}),
        anchor("center"),
        pos(startMenu.pos.x + 110, startMenu.pos.y + 180),
        fixed(),
        z(100),
        "label"
      ])
    }
    if (curDialog > 6) {
      destroyAll("label")
    }
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
    text(`Vous êtes désormais un taureau Apis, honoré par toute l'Égypte !\n\n\nBonus récupérés : ${BONUS_SCORE}`, { font: "courier new", size: 32, width: endMenu.width - 60, align: "center", lineSpacing: 25 }),
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

function start() {
  go("start")
}

start()