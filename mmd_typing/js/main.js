var scene, renderer, camera, mesh, helper;
var ready_mmd = false;

var wordlist_1 = ["tannjirou","nezuko","zennitsu","inosuke","kanawo","gennya","giyuu","kyoujurou","tenngenn","muichirou","shinobu","obanai","mitsuri","gyoumei","sanemi","kagaya","amane","kiriya","kanata","aoi","sakonnji","hotaru","jigorou","sabito","makomo","tannjuurou","kanae","shinnjurou","ruka","sennjurou","makiwo","suma","hinatsuru","gotou","tecchinn","kotetsu","kotoha","muzann","kokushibou","douma","akaza","hanntenngu","gyokko","gyuutarou","daki","nakime","kaigaku","ennmu","rui","tamayo","yushirou"]
var wordlistJapanese_1 = ["たんじろう","ねずこ","ぜんいつ","いのすけ","かなお","げんや","ぎゆう","きょうじゅろう","てんげん","むいちろう","しのぶ","おばない","みつり","ぎょうめい","さねみ","かがや","あまね","きりや","かなた","あおい","さこんじ","ほたる","じごろう","さびと","まこも","たんじゅうろう","かなえ","しんじゅろう","るか","せんじゅろう","まきを","すま","ひなつる","ごとう","てっちん","こてつ","ことは","むざん","こくしぼう","どうま","あかざ","はんてんぐ","ぎょっこ","ぎゅうたろう","だき","なきめ","かいがく","えんむ","るい","たまよ","ゆしろう"]
var wordlistKanji_1 = ["炭治郎","禰豆子","善逸","伊之助","カナヲ","玄弥","義勇","杏寿郎","天元","無一郎","しのぶ","小芭内","蜜璃","行冥","実弥","耀哉","あまね","輝利哉","かなた","アオイ","左近次","蛍","慈悟郎","錆兎","真菰","炭十郎","カナエ","槇寿郎","瑠火","千寿郎","まきを","須磨","雛鶴","後藤","鉄珍","小鉄","琴葉","無惨","黒死牟","童磨","猗窩座","半天狗","玉壺","妓夫太郎","堕姫","鳴女","獪岳","魘夢","累","珠世","愈史郎"]
var wordlist_2 = ["kamado","kamado","agatsuma","hashibira","tsuyuri","shinazugawa","tomioka","renngoku","uzui","tokitou","kochou","iguro","kannroji","himejima","shinazugawa","ubuyashiki","ubuyashiki","ubuyashiki","ubuyashiki","kannzaki","urokodaki","haganeduka","kuwajima","sabito","makomo","kamado","kochou","renngoku","renngoku","renngoku","makiwo","suma","hinatsuru","gotou","tecchinn","kotetsu","kotoha","kibutsuji","kokushibou","douma","akaza","hanntenngu","gyokko","gyuutarou","daki","nakime","kaigaku","ennmu","rui","tamayo","yushirou"]
var wordlistJapanese_2 = ["かまど","かまど","あがつま","はしびら","つゆり","しなずがわ","とみおか","れんごく","うずい","ときとう","こちょう","いぐろ","かんろじ","ひめじま","しなずがわ","うぶやしき","うぶやしき","うぶやしき","うぶやしき","かんざき","うろこだき","はがねづか","くわじま","さびと","まこも","かまど","こちょう","れんごく","れんごく","れんごく","まきを","すま","ひなつる","ごとう","てっちん","こてつ","ことは","きぶつじ","こくしぼう","どうま","あかざ","はんてんぐ","ぎょっこ","ぎゅうたろう","だき","なきめ","かいがく","えんむ","るい","たまよ","ゆしろう"]
var wordlistKanji_2 = ["竈門","竈門","我妻","嘴平","栗花落","不死川","冨岡","煉獄","宇髄","時透","胡蝶","伊黒","甘露寺","悲鳴嶼","不死川","産屋敷","産屋敷","産屋敷","産屋敷","神崎","鱗滝","鋼鐵塚","桑島","錆兎","真菰","竈門","胡蝶","煉獄","煉獄","煉獄","まきを","須磨","雛鶴","後藤","鉄地河原","小鉄","琴葉","鬼舞辻","黒死牟","童磨","猗窩座","半天狗","玉壺","妓夫太郎","堕姫","鳴女","獪岳","魘夢","累","珠世","愈史郎"]
var wordlist_3 = ["kamadotannjirou","kamadonezuko","agatsumazennitsu","hashibirainosuke","tsuyurikanawo","shinazugawagennya","tomiokagiyuu","renngokukyoujurou","uzuitenngenn","tokitoumuichirou","kochoushinobu","iguroobanai","kannrojimitsuri","himejimagyoumei","shinazugawasanemi","ubuyashikikagaya","ubuyashikiamane","ubuyashikikiriya","ubuyashikikanata","kannzakiaoi","urokodakisakonnji","haganedukahotaru","kuwajimajigorou","sabito","makomo","kamadotannjuurou","kochoukanae","renngokushinnjurou","renngokuruka","renngokusennjurou","makiwo","suma","hinatsuru","gotou","tecchikawaharatecchinn","kotetsu","kotoha","kibutsujimuzann","kokushibou","douma","akaza","hanntenngu","gyokko","gyuutarou","daki","nakime","kaigaku","ennmu","rui","tamayo","yushirou"]
var wordlistJapanese_3 = ["かまど たんじろう","かまど ねずこ","あがつま ぜんいつ","はしびら いのすけ","つゆり かなお","しなずがわ げんや","とみおか ぎゆう","れんごく きょうじゅろう","うずい てんげん","ときとう むいちろう","こちょう しのぶ","いぐろ おばない","かんろじ みつり","ひめじま ぎょうめい","しなずがわ さねみ","うぶやしき かがや","うぶやしき あまね","うぶやしき きりや","うぶやしき かなた","かんざき あおい","うろこだき さこんじ","はがねづか ほたる","くわじま じごろう","さびと","まこも","かまど たんじゅうろう","こちょう かなえ","れんごく しんじゅろう","れんごく るか","れんごく せんじゅろう","まきを","すま","ひなつる","ごとう","てっちかわはら てっちん","こてつ","ことは","きぶつじむざん","こくしぼう","どうま","あかざ","はんてんぐ","ぎょっこ","ぎゅうたろう","だき","なきめ","かいがく","えんむ","るい","たまよ","ゆしろう"]
var wordlistKanji_3 = ["竈門 炭治郎","竈門 禰豆子","我妻 善逸","嘴平 伊之助","栗花落 カナヲ","不死川 玄弥","冨岡 義勇","煉獄 杏寿郎","宇髄 天元","時透 無一郎","胡蝶 しのぶ","伊黒 小芭内","甘露寺 蜜璃","悲鳴嶼 行冥","不死川 実弥","産屋敷 耀哉","産屋敷 あまね","産屋敷 輝利哉","産屋敷 かなた","神崎 アオイ","鱗滝 左近次","鋼鐵塚 蛍","桑島 慈悟郎","錆兎","真菰","竈門 炭十郎","胡蝶 カナエ","煉獄 槇寿郎","煉獄 瑠火","煉獄 千寿郎","まきを","須磨","雛鶴","後藤","鉄地河原 鉄珍","小鉄","琴葉","鬼舞辻無惨","黒死牟","童磨","猗窩座","半天狗","玉壺","妓夫太郎","堕姫","鳴女","獪岳","魘夢","累","珠世","愈史郎"]
var score;
var correct;
var mistake;
var char_num = 0;
var word_char;
var random;
var start = 0

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
  { id: "problem", VmdClip: null, AudioClip: true },
  { id: "mission", VmdClip: null, AudioClip: true },
  { id: "success", VmdClip: null, AudioClip: true },
  { id: "more", VmdClip: null, AudioClip: true },
  { id: "without", VmdClip: null, AudioClip: true },
  { id: "error", VmdClip: null, AudioClip: true },
  { id: "can", VmdClip: null, AudioClip: true }
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
function ready_typing1() {
	start = 1
	VmdControl("effort", false);
    readytime = 3;
    scoredis.innerHTML = "";
    start1.style.visibility = "hidden";
    start2.style.visibility = "hidden";
    start3.style.visibility = "hidden";
    var readytimer = setInterval(function() {
        count.innerHTML = readytime;
        readytime--;
        if (readytime < 0) {
            clearInterval(readytimer);
            gameStart();
        }
    }, 1000);
}
function ready_typing2() {
	start = 2
	VmdControl("effort", false);
    readytime = 3;
    scoredis.innerHTML = "";
    start1.style.visibility = "hidden";
    start2.style.visibility = "hidden";
    start3.style.visibility = "hidden";
    var readytimer = setInterval(function() {
        count.innerHTML = readytime;
        readytime--;
        if (readytime < 0) {
            clearInterval(readytimer);
            gameStart();
        }
    }, 1000);
}
function ready_typing3() {
	start = 3
	VmdControl("effort", false);
    readytime = 3;
    scoredis.innerHTML = "";
    start1.style.visibility = "hidden";
    start2.style.visibility = "hidden";
    start3.style.visibility = "hidden";
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
    if (start==1) {
		var time_remaining = 30;
	}
    else if (start==2) {
    	var time_remaining = 60;
    }
    else {
    	var time_remaining = 120;
    }
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
	if (start==1) {
		random = Math.floor(Math.random() * wordlist_1.length);
    	word.innerHTML = wordlist_1[random];
    	japanese.innerHTML = wordlistJapanese_1[random];
    	kanji.innerHTML = wordlistKanji_1[random];
	}
    else if (start==2) {
    	random = Math.floor(Math.random() * wordlist_2.length);
    	word.innerHTML = wordlist_2[random];
    	japanese.innerHTML = wordlistJapanese_2[random];
    	kanji.innerHTML = wordlistKanji_2[random];
    }
    else {
    	random = Math.floor(Math.random() * wordlist_3.length);
    	word.innerHTML = wordlist_3[random];
    	japanese.innerHTML = wordlistJapanese_3[random];
    	kanji.innerHTML = wordlistKanji_3[random];
    }
    charInsort();
}
function charInsort() {
	if (start==1) {
    	word_char = wordlist_1[random].charAt(char_num);
    }
    else if (start==2) {
    	word_char = wordlist_2[random].charAt(char_num);
    }
    else {
    	word_char = wordlist_3[random].charAt(char_num);
    }
}
function comment() {
	if (start==1) {
		if (score>=30) {
			VmdControl("success", false);
		}
   	 	else if (10<score && score<30) {
    		VmdControl("more", false);
    	}
    	else if (score<=10){
    		VmdControl("without", false);
    	}
	}
    else if (start==2) {
    	if (score>=100) {
			VmdControl("mission", false);
		}
   	 	else if (50<score && score<100) {
    		VmdControl("can", false);
    	}
    	else if (score<=50){
    		VmdControl("error", false);
    	}
    }
    else {
    	if (score>=200) {
			VmdControl("mission", false);
		}
   	 	else if (100<score && score<200) {
    		VmdControl("can", false);
    	}
    	else if (score<=100){
    		VmdControl("error", false);
    	}
    }
}
function finish() {
    score = correct-mistake;
    scoredis.innerHTML = "スコア:" + score + "点" + "<hr>正しく打てた回数:" + correct + "<br>間違えた回数:" + mistake + "<br>正答率" + (correct / (correct + mistake) * 100).toFixed(1) + "%";
    count.innerHTML = "";
    word.innerHTML = "";
    japanese.innerHTML = "";
    kanji.innerHTML = "";
    start1.style.visibility = "visible";
    start2.style.visibility = "visible";
    start3.style.visibility = "visible";
    word_char = 0;
    random = 0;
    char_num = 0;
    window.setTimeout('VmdControl("how", false);', 3000);
    window.setTimeout('comment();', 5000);
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
    	if (start==1) {
        	word.innerHTML = "<span style='color: red;'>" + wordlist_1[random].substr(0, char_num + 1) + "</span>" + wordlist_1[random].substr(char_num + 1, wordlist_1[random].length);
        }
        else if (start==2) {
        	word.innerHTML = "<span style='color: red;'>" + wordlist_2[random].substr(0, char_num + 1) + "</span>" + wordlist_2[random].substr(char_num + 1, wordlist_2[random].length);
        }
        else {
        	word.innerHTML = "<span style='color: red;'>" + wordlist_3[random].substr(0, char_num + 1) + "</span>" + wordlist_3[random].substr(char_num + 1, wordlist_3[random].length);
        }
        char_num++;
        correct++;
        charInsort();
    } else {
    	VmdControl("problem", false);
        mistake++;
    }
    if (start==1) {
    	if (char_num == wordlist_1[random].length) {
        	char_num = 0;
        	wordDisplay();
    	}
    }
    else if (start==2) {
    	if (char_num == wordlist_2[random].length) {
        	char_num = 0;
        	wordDisplay();
    	}
    }
    else {
    	if (char_num == wordlist_3[random].length) {
        	char_num = 0;
        	wordDisplay();
    	}
    }
};