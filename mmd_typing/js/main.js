var scene, renderer, camera, mesh, helper;
var ready_mmd = false;

var wordlist = ["kamadotanjiro","kamadonezuko","agatsumazenitsu","hashibirainosuke","tsuyurikanao","shinazugawagenya","tomiokagiyu","rengokukyojuro","uzuitengen","tokitomuichiro","kochoshinobu","iguroobanai","kanrojimitsuri","himejimagyomei","shinazugawasanemi","ubuyashikikagaya","ubuyashikiamane","ubuyashikikiriya","ubuyashikikanata","kanzakiaoi","urokodakisakonji","haganezukahotaru","kuwajimajigoro","sabito","makomo","kamadotanjuro","kochokanae","rengokushinjuro","rengokuruka","rengokusenjuro","makiwo","suma","hinatsuru","goto","tetchikawaharatetchin","kotetsu","kotoha","kibutsujimuzan","kokushibo","doma","akaza","hantengu","gyokko","gyutaro","daki","nakime","kaigaku","enmu","rui","tamayo","yushiro"]
var wordlistJapanese = ["かまど たんじろう","かまど ねずこ","あがつま ぜんいつ","はしびら いのすけ","つゆり かなお","しなずがわ げんや","とみおか ぎゆう","れんごく きょうじゅろう","うずい てんげん","ときとう むいちろう","こちょう しのぶ","いぐろ おばない","かんろじ みつり","ひめじま ぎょうめい","しなずがわ さねみ","うぶやしき かがや","うぶやしき あまね","うぶやしき きりや","うぶやしき かなた","かんざき あおい","うろこだき さこんじ","はがねづか ほたる","くわじま じごろう","さびと","まこも","かまど たんじゅうろう","こちょう かなえ","れんごく しんじゅろう","れんごく るか","れんごく せんじゅろう","","すま","ひなつる","ごとう","てっちかわはら てっちん","こてつ","ことは","きぶつじむざん","こくしぼう","どうま","あかざ","はんてんぐ","ぎょっこ","ぎゅうたろう","だき","なきめ","かいがく","えんむ","るい","たまよ","ゆしろう"]
var wordlistKanji = ["竈門 炭治郎","竈門 禰豆子","我妻 善逸","嘴平 伊之助","栗花落 カナヲ","不死川 玄弥","冨岡 義勇","煉獄 杏寿郎","宇髄 天元","時透 無一郎","胡蝶 しのぶ","伊黒 小芭内","甘露寺 蜜璃","悲鳴嶼 行冥","不死川 実弥","産屋敷 耀哉","産屋敷 あまね","産屋敷 輝利哉","産屋敷 かなた","神崎 アオイ","鱗滝 左近次","鋼鐵塚 蛍","桑島 慈悟郎","錆兎","真菰","竈門 炭十郎","胡蝶 カナエ","煉獄 槇寿郎","煉獄 瑠火","煉獄 千寿郎","まきを","須磨","雛鶴","後藤","鉄地河原 鉄珍","小鉄","琴葉","鬼舞辻無惨","黒死牟","童磨","猗窩座","半天狗","玉壺","妓夫太郎","堕姫","鳴女","獪岳","魘夢","累","珠世","愈史郎"]
var time_limit = 10;
var score;
var correct;
var mistake;
var char_num = 0;
var word_char;
var random;

// MMD
//browser size
const windowWidth = window.innerWidth/2;
const windowHeight = window.innerHeight;

//Obujet Clock
const clock = new THREE.Clock();


const Pmx = "./pmx/Appearance_Teto_IS/Appearance_Teto_IS_1.0.5/Appearance_Teto_IS_1.0.5.pmx";
const MotionObjects = [
  { id: "loop", VmdClip: null, AudioClip: false },
  { id: "effort", VmdClip: null, AudioClip: true },
  { id: "how", VmdClip: null, AudioClip: true },
  { id: "problem", VmdClip: null, AudioClip: true }
];

window.onload = () => {
  Init();

  LoadModeler();

  Render();
}

/*
 * Initialize Three
 * camera and right
 */
Init = () => {
  scene = new THREE.Scene();

  const ambient = new THREE.AmbientLight(0xeeeeee);
  scene.add(ambient);

  renderer = new THREE.WebGLRenderer({
  	alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(windowWidth, windowHeight);
  renderer.setClearColor(0xcccccc, 0);

  // mmdにMMDをセットする
  document.body.appendChild(renderer.domElement);
  document.getElementById("mmd").appendChild(renderer.domElement);

  //cameraの作成
  camera = new THREE.PerspectiveCamera(40, windowWidth / windowHeight, 1, 1000);
  camera.position.set(0, 18, 10);
}

/*
 * Load PMX and VMD and Audio
 */
LoadModeler = async () => {
  const loader = new THREE.MMDLoader();

  //Loading PMX
  LoadPMX = () => {
    return new Promise(resolve => {
      loader.load(Pmx, (object) => {
        mesh = object;
        scene.add(mesh);

        resolve(true);
      }, onProgress, onError);
    });
  }

  //Loading VMD
  LoadVMD = (id) => {
    return new Promise(resolve => {
      const path = "./vmd/" + id + ".vmd";
      const val = MotionObjects.findIndex(MotionObject => MotionObject.id == id);

      loader.loadAnimation(path, mesh, (vmd) => {
        vmd.name = id;

        MotionObjects[val].VmdClip = vmd;

        resolve(true);
      }, onProgress, onError);
    });
  }

  //Load Audio
  LoadAudio = (id) => {
    return new Promise(resolve => {
      const path = "./audio/" + id + ".mp3";
      const val = MotionObjects.findIndex(MotionObject => MotionObject.id == id);

      if (MotionObjects[val].AudioClip) {
        new THREE.AudioLoader().load(path, (buffer) => {
          const listener = new THREE.AudioListener();
          const audio = new THREE.Audio(listener).setBuffer(buffer);
          MotionObjects[val].AudioClip = audio;

          resolve(true);
        }, onProgress, onError);
      } else {
        resolve(false);
      }
    });
  }

  // Loading PMX...
  await LoadPMX();

  // Loading VMD...
  await Promise.all(MotionObjects.map(async (MotionObject) => {
    return await LoadVMD(MotionObject.id);
  }));

  // Loading Audio...
  await Promise.all(MotionObjects.map(async (MotionObject) => {
    return await LoadAudio(MotionObject.id);
  }));

  //Set VMD on Mesh
  VmdControl("loop", true);
}

/*
 * Start Vmd and Audio.
 * And, Get Vmd Loop Event
 */
VmdControl = (id, loop) => {
  const index = MotionObjects.findIndex(MotionObject => MotionObject.id == id);

  // Not Found id
  if (index === -1) {
    console.log("not Found ID");
    return;
  }

  ready_mmd = false;
  helper = new THREE.MMDAnimationHelper({ afterglow: 2.0, resetPhysicsOnLoop: true });

  // 
  helper.add(mesh, {
    animation: MotionObjects[index].VmdClip,
    physics: false
  });

  //Start Audio
  if (MotionObjects[index].AudioClip) {
    MotionObjects[index].AudioClip.play();
  }

  const mixer = helper.objects.get(mesh).mixer;
  //animation Loop Once
  if (!loop) {
    mixer.existingAction(MotionObjects[index].VmdClip).setLoop(THREE.LoopOnce);
  }

  // VMD Loop Event
  mixer.addEventListener("loop", (event) => {
    console.log("loop");
  });

  // VMD Loop Once Event
  mixer.addEventListener("finished", (event) => {
    console.log("finished");
    VmdControl("loop", true);
  });

  ready_mmd = true;
}

/*
 * Loading PMX or VMD or Voice
 */
onProgress = (xhr) => {
  if (xhr.lengthComputable) {
    const percentComplete = xhr.loaded / xhr.total * 100;
    console.log(Math.round(percentComplete, 2) + '% downloaded');
  }
}

/* 
 * loading error
 */
onError = (xhr) => {
  console.log("ERROR");
}

/*
 * MMD Model Render
 */
Render = () => {
  requestAnimationFrame(Render);
  renderer.clear();
  renderer.render(scene, camera);

  if (ready_mmd) {
    helper.update(clock.getDelta());
  }
}

// Typing
function ready_typing() {
	VmdControl("effort", false);
    readytime = 3;
    scoredis.innerHTML = "";
    start_button.style.visibility = "hidden";
    var readytimer = setInterval(function() {
        count.innerHTML = readytime;
        readytime--;
        if (readytime < 0) {
            clearInterval(readytimer);
            gameStart();
        }
    }, 1000);
}
function gameStart() {
    score = 0.0;
    mistake = 0;
    correct = 0;
    wordDisplay();
    var time_remaining = time_limit;
    var gametimer = setInterval(function() {
        count.innerHTML = "残り時間：" + time_remaining + "秒";
        time_remaining--;
        if (time_remaining < 0) {
            clearInterval(gametimer);
            finish();
        }
    }, 1000);
}
function wordDisplay() {
    random = Math.floor(Math.random() * wordlist.length);
    word.innerHTML = wordlist[random];
    japanese.innerHTML = wordlistJapanese[random];
    kanji.innerHTML = wordlistKanji[random];
    charInsort();
}
function charInsort() {
    word_char = wordlist[random].charAt(char_num);
}
function finish() {
    score = correct-mistake;
    scoredis.innerHTML = "スコア:" + score + "点" + "<hr>正しく打てた回数:" + correct + "<br>間違えた回数:" + mistake + "<br>正答率" + (correct / (correct + mistake) * 100).toFixed(1) + "%";
    count.innerHTML = "";
    word.innerHTML = "";
    japanese.innerHTML = "";
    kanji.innerHTML = "";
    start_button.style.visibility = "visible";
    word_char = 0;
    random = 0;
    char_num = 0;
    window.setTimeout('VmdControl("how", false);', 3000);
}
document.onkeydown = function(e) {
    if (e.keyCode == 189) {
        keyStr = "-";
    } else if (e.keyCode == 188) {
        keyStr = ","
    } else {
        var keyStr = String.fromCharCode(e.keyCode);
        keyStr = keyStr.toLowerCase();
    }
    if (keyStr == word_char) {
        word.innerHTML = "<span style='color: red;'>" + wordlist[random].substr(0, char_num + 1) + "</span>" + wordlist[random].substr(char_num + 1, wordlist[random].length);
        char_num++;
        correct++;
        charInsort();
    } else {
    	VmdControl("problem", false);
        mistake++;
    }
    if (char_num == wordlist[random].length) {
        char_num = 0;
        wordDisplay();
    }
};