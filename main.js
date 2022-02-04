music="";
music1="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;

function preload() {
    music1=loadSound("music.mp3");
    music=loadSound("music2.mp3");
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded() 
{
    console.log('PoseNet is initialized');
}

function gotPoses(results) 
{
    if(results.length>0)
    {
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreleftWrist = "+scoreleftWrist+ " scorerightWrist = "+scorerightWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}

function draw() 
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreleftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20);

        music.stop();

        if (music1==false) 
        {
            music1.play();
            document.getElementById("music").innerHTML="Playing Peter-Pan song"
        }
    }
    if(scoreleftWrist>0.2)
    {
        circle(rightWristX,rightWristY,20);

        music1.stop();

        if (music==false) 
        {
            music.play();
            document.getElementById("music").innerHTML="Playing Harry Potter song"
        }
    }
}

function play() 
{
    music.play();
}