song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song1_status = "";
song2_status = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(450, 200);
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        song2.stop;
        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing Song 1";
        }
    }
}

function modelLoded(){
    console.log('Posenet is Initialized');
}

function gotPoses(results){
    if(results.length > 0);
{
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("Score Left Wrist = "+scoreLeftWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("Left Wrist X = " +leftWristX+"Left Wrist Y = "+leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("Right Wrist X = " +rightWristX+"Right Wrist Y = "+rightWristY);
}
}