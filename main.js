Prediction1="";
Prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    }
    );
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/TXxdP1NWl/model.json",modelLoaded);
function modelLoaded() {
    console.log("model has loaded");
}
function speak() {
    var synth=window.speechSynthesis;
    speak1="the first prediction is"+ Prediction1;
    speak2="and the second prediction is"+ Prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utterThis);
}

function check() {
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
} 

function gotResult(error,results) {
if (error){
    console.error(error);
    
}
else {
    console.log(results);
document.getElementById("emotion_name").innerHTML=results[0].label;
document.getElementById("emotion_name2").innerHTML=results[1].label;
Prediction1=results[0].label;
Prediction2=results[1].label;
speak();
if (results[0].label=="Happy"){
    document.getElementById("emojiname").innerHTML="&#128522;";
}
if (results[0].label=="toungue out"){
    document.getElementById("emojiname").innerHTML="&#128539;";
}
if (results[0].label=="Angry"){
    document.getElementById("emojiname").innerHTML="&#128545;";
}
if (results[1].label=="Happy"){
    document.getElementById("emojiname2").innerHTML="&#128522;";
}
if (results[1].label=="toungue out"){
    document.getElementById("emojiname2").innerHTML="&#128539;";
}
if (results[1].label=="Angry"){
    document.getElementById("emojiname2").innerHTML="&#128545;";
}

}
}
