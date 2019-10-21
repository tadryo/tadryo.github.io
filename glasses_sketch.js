// �e�ϐ��̏�����
let video;
let poseNet;

let noseX = 0;
let noseY = 0;

let eyelX = 0;
let eyelY = 0;

let eyerX = 0;
let eyerY = 0;

// �y�[�W���J�����Ƃ��Ɉ�x�������s���鏈��
function setup() {
        createCanvas(640, 480);
        video = createCapture(VIDEO);
        video.hide();
        let poseNet = ml5.poseNet(video, modelLoaded);
        poseNet.on('pose', gotPoses);
}

// ����I�ɌJ��Ԃ����s����鏈��
function draw() {
        image(video, 0, 0)

        let w = dist(eyerX, eyerY, eyelX, eyelY);

        fill(255, 0, 0);
        ellipse(noseX, noseY, w * 0.75);

        fill(255, 255, 255);
        ellipse(eyerX, eyerY, w * 0.5);
        ellipse(eyelX, eyelY, w * 0.5);

        fill(0, 0, 0);
        ellipse(eyerX, eyerY, w * 0.2);
        ellipse(eyelX, eyelY, w * 0.2);
}

// PoseNet���f���̓ǂݍ��݂����������Ƃ��ɌĂ΂��R�[���o�b�N�֐�
function modelLoaded() {
        console.log('Model Loaded!');
}

// �|�[�Y���ς�邽�тɌĂ΂��R�[���o�b�N�֐�
function gotPoses(poses) {
        if (poses.length > 0) {
                //console.log(poses);

                let newNoseX = poses[0].pose.nose.x;
                let newNoseY = poses[0].pose.nose.y;

                let newEyelX = poses[0].pose.leftEye.x;
                let newEyelY = poses[0].pose.leftEye.y;

                let newEyerX = poses[0].pose.rightEye.x;
                let newEyerY = poses[0].pose.rightEye.y;

                noseX = lerp(noseX, newNoseX, 0.2);
                noseY = lerp(noseY, newNoseY, 0.2);

                eyelX = lerp(eyelX, newEyelX, 0.2);
                eyelY = lerp(eyelY, newEyelY, 0.2);

                eyerX = lerp(eyerX, newEyerX, 0.2);
                eyerY = lerp(eyerY, newEyerY, 0.2);
        }
}