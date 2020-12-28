var scene, renderer, camera, mesh, helper;
var ready1 = false;
var wordlist = ["apple", "banana", "orange", "grape", "kiwi"];
var wordlistJapanese = ["リンゴ", "バナナ", "オレンジ", "ブドウ", "キウイ"]
var time_limit = 30;
var readytime = 3;
var score;
var correct;
var mistake;
var char_num = 0; // ?
var word_char; // ?
var random;

//browser size
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

//Obujet Clock
const clock = new THREE.Clock();


const Pmx = "./pmx/pronama/kizunaai.pmx";
const MotionObjects = [
  { id: "loop", VmdClip: null, AudioClip: false },
  { id: "kei_voice_009_1", VmdClip: null, AudioClip: true },
  { id: "kei_voice_010_2", VmdClip: null, AudioClip: true },
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

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xcccccc, 0);

  // documentにMMDをセットする
  document.body.appendChild(renderer.domElement);

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

  ready1 = false;
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

  ready1 = true;
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

  if (ready1) {
    helper.update(clock.getDelta());
  }
}

/*
 * Click Event
 */
PoseClickEvent = (id) => {
  switch (id) {
    case "pose1":
      VmdControl("loop", true);
      break;

    case "pose2":
      VmdControl("kei_voice_009_1", false);
      break;

    case "pose3":
      VmdControl("kei_voice_010_2", false);
      break;

    default:
      VmdControl("loop", true);
      break;
  }
}

function ready2() {
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
        count.innerHTML = "残り時間：" + time_remaining;
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
    charInsort();
}
function charInsort() {
    word_char = wordlist[random].charAt(char_num);
}
function finish() {
    score = Math.floor(Math.pow(correct, 2) * Math.pow((correct / (correct + mistake)), 5));
    scoredis.innerHTML = "スコア:" + score + "点" + "<hr>正タイプ数:" + correct + "<br>ミスタイプ数:" + mistake + "<br>正答率" + (correct / (correct + mistake) * 100).toFixed(1) + "%";
    count.innerHTML = "";
    word.innerHTML = "";
    japanese.innerHTML = "";
    start_button.style.visibility = "visible";
    word_char = 0;
    random = 0;
    char_num = 0;
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
        mistake++;
    }
    if (char_num == wordlist[random].length) {
        char_num = 0;
        wordDisplay();
    }
};