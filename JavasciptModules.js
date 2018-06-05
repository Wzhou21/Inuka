var canvas= document.getElementById('myCanvas');
var canvaslayer2  = document.getElementById('myCanvasLayer2');
var slider = document.getElementById('rangeBrightness');
var rangeBrush = document.getElementById("rangeBrush");
var saveas = document.getElementById("exportBtn"); 
var save = document.getElementById("saveBtn"); 
var reset = document.getElementById("resetBtn"); 
var pen = document.getElementById("penBtn"); 
var erase = document.getElementById("eraseBtn"); 
var bright = document.getElementById("brightnessBtn");
var brightnessContainer = document.getElementById("brightnessContainer");
var brsuhContainer=document.getElementById("brsuhContainer");
var eraseContainer=document.getElementById("eraseContainer");
var colourBtnList=document.getElementById("colourContiner");
var ctx=canvas.getContext("2d");
var ctx2=canvaslayer2.getContext("2d");
var imagePath;
var img = new Image();
var blank = new Image();
var mode ="undefine" ;
var mousePressed=false;
var lastX;
var lastY;

//=================================================================================================
function insert(){
var reader = new FileReader();
reader.onload = function(e)
 {
                img.src=e.target.result;
                imagePath = e.target.result;
                img.onload=function()
                {
                    if(img.height >img.width)
                    {
                        var widthOverHeightRatio = img.width/img.height;
                        var editedWidth = widthOverHeightRatio * (canvas.width - 20);
                        var imgPosition = (canvas.width - editedWidth) / 2;
                        ctx.drawImage(img,imgPosition,10,editedWidth,(canvas.height - 20));
                    }else{
                        var heightOverWidthRatio = img.height/img.width;
                        var editedHeight = heightOverWidthRatio * (canvas.height - 20);
                        var imgPosition = (canvas.height - editedHeight) / 2;
                        ctx.drawImage(img,10,imgPosition, (canvas.width - 20), editedHeight);
                        
                    }
                };
            };
            reader.readAsDataURL(document.getElementById("file-upload").files[0]);
            saveas.disabled=false;
            save.disabled=false;
            pen.disabled=false;
            erase.disabled=false;
            bright.disabled=false;            
}
//=================================================================================================
function startReset() {
mode="undefine";
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx2.clearRect(0, 0, canvas.width, canvas.height);
document.getElementById("file-upload").value = "";
canvaslayer2.style.cursor="default";
brightnessContainer.style.display = "none";
colourBtnList.style.display = "none";
brsuhContainer.style.display="none";
saveas.disabled=true;
save.disabled=true;
pen.disabled=true;
erase.disabled=true;
bright.disabled=true; 
}
//=================================================================================================
function startDrawing(){
var lastX;
var lastY;
var mouseX;
var mouseY;
var isMouseDown=false;
canvaslayer2.style.cursor="crosshair";
  if (colourBtnList.style.display === "none") {

    mode = "redpen";
    colourBtnList.style.display = "block";
    brsuhContainer.style.display="block";
    } else {
        canvaslayer2.style.cursor="default";
        mode="undefine";
        colourBtnList.style.display = "none";
        brsuhContainer.style.display="none";
    }

        function handleMouseDown(e){
        mouseX=parseInt(e.pageX - $("#myCanvasLayer2").offset().left);
        mouseY=parseInt(e.pageY - $("#myCanvasLayer2").offset().top);
        // Put your mousedown stuff here
        lastX=mouseX;
        lastY=mouseY;
        isMouseDown=true;
        if(isMouseDown==true){
        var radidusOrCircle=rangeBrush.value/3;
         ctx2.beginPath();
         if(mode=="redpen"){
             ctx2.arc(mouseX,mouseY,radidusOrCircle,0,2*Math.PI);
             ctx2.lineWidth = radidusOrCircle;
             ctx2.strokeStyle = '#FF0000';
             ctx2.fillStyle='#FF0000';
             ctx2.fill();
             ctx2.stroke(); 
             ctx2.closePath();
         }
         else if(mode=="bluepen"){
            ctx2.arc(mouseX,mouseY,radidusOrCircle,0,2*Math.PI);
             ctx2.lineWidth = radidusOrCircle;
             ctx2.strokeStyle = '#0000FF';
             ctx2.fillStyle='#0000FF';
             ctx2.fill();
             ctx2.stroke(); 
             ctx2.closePath();
         }
         else if(mode=="greenpen"){
             ctx2.arc(mouseX,mouseY,radidusOrCircle,0,2*Math.PI);
             ctx2.lineWidth = radidusOrCircle;
             ctx2.strokeStyle = '#00FF00';
             ctx2.fillStyle='#00FF00';
             ctx2.fill();
             ctx2.stroke(); 
             ctx2.closePath();
         }
         else if(mode=="erase"){
            ctx2.globalCompositeOperation="destination-out";
            ctx2.arc(mouseX,mouseY,radidusOrCircle,0,Math.PI*2,false);
            ctx2.lineWidth = radidusOrCircle;
            ctx2.fill(); 
            ctx2.closePath();
         }
        }
        console.log("Brush Size:" + rangeBrush.value + "Dot Size: " + radidusOrCircle );      
        }

        function handleMouseUp(e){
            mouseX=parseInt(e.pageX - $("#myCanvasLayer2").offset().left);
            mouseY=parseInt( e.pageY - $("#myCanvasLayer2").offset().top);
        // Put your mouseup stuff here
            isMouseDown=false;
        }

        function handleMouseOut(e){
            mouseX=parseInt(e.pageX - $("#myCanvasLayer2").offset().left);
            mouseY=parseInt(e.pageY - $("#myCanvasLayer2").offset().top);
        // Put your mouseOut stuff here
            isMouseDown=false;
        }

        function handleMouseMove(e){
        mouseX=parseInt(e.pageX - $("#myCanvasLayer2").offset().left);
        mouseY=parseInt(e.pageY - $("#myCanvasLayer2").offset().top);
        // Put your mousemove stuff here
        if(isMouseDown)
        {
            ctx2.beginPath();
            ctx2.lineWidth=rangeBrush.value;
                if(mode=="redpen")
                {  
                    ctx2.globalCompositeOperation="source-over";
                    ctx2.lineJoin = 'round';
                    ctx2.lineCap = 'round';
                    ctx2.strokeStyle = '#FF0000';
                    ctx2.moveTo(lastX,lastY);
                    ctx2.lineTo(mouseX,mouseY);
                    ctx2.stroke();
                    ctx2.closePath();   
                }
                else if(mode=="greenpen")
                { 
                    ctx2.globalCompositeOperation="source-over";
                    ctx2.lineJoin = 'round';
                    ctx2.lineCap = 'round';
                    ctx2.strokeStyle = '#00FF00';
                    ctx2.moveTo(lastX,lastY);
                    ctx2.lineTo(mouseX,mouseY);
                    ctx2.stroke();
                    ctx2.closePath();
                }
                else if(mode=="bluepen"){
                    ctx2.globalCompositeOperation="source-over";
                    ctx2.lineJoin = 'round';
                    ctx2.lineCap = 'round';
                    ctx2.strokeStyle = '#0000FF';
                    ctx2.moveTo(lastX,lastY);
                    ctx2.lineTo(mouseX,mouseY);
                    ctx2.stroke();
                    ctx2.closePath();
                } 
                else if(mode=="erase"){ 
                    ctx2.globalCompositeOperation="destination-out";
                    ctx2.lineJoin = 'round';
                    ctx2.lineCap = 'round';
                    ctx2.moveTo(lastX,lastY);
                    ctx2.lineTo(mouseX,mouseY);
                    ctx2.stroke();
                    ctx2.closePath();
                }
        }
        lastX=mouseX;
        lastY=mouseY;
    }


        $("#myCanvasLayer2").mousedown(function(e){handleMouseDown(e);});
        $("#myCanvasLayer2").mousemove(function(e){handleMouseMove(e);});
        $("#myCanvasLayer2").mouseup(function(e){handleMouseUp(e);});
        $("#myCanvasLayer2").mouseout(function(e){handleMouseOut(e);});

        
        $("#redPen").click(function(){ mode="redpen";canvaslayer2.style.cursor="crosshair";});
        $("#greenPen").click(function(){ mode="greenpen";canvaslayer2.style.cursor="crosshair";});
        $("#bluePen").click(function(){ mode="bluepen";canvaslayer2.style.cursor="crosshair";});
        $("#eraseBtn").click(function(){ mode="erase";canvaslayer2.style.cursor="crosshair";});  
 }

//=================================================================================================
function startZoom(){
}
//=================================================================================================
function startEraser(){
 canvaslayer2.style.cursor="crosshair";
}
//=================================================================================================
function startBrightness(){
canvaslayer2.style.cursor="default";
mode="undefine";
  if (brightnessContainer.style.display === "none") {
    brightnessContainer.style.display = "block";
    } else {
        brightnessContainer.style.display = "none";
    }
var ci = new CanvasImage('myCanvas', imagePath);

slider.addEventListener('change', function() {
    ci.brightness(parseInt(slider.value, 0));
}, false);

   function CanvasImage(element, src) {
    var width, height;
    var element = document.getElementById(element);
    var ctxelement = element.getContext("2d");
    var img = new Image;
    img.crossOrigin = 'anonymous';
    img.src = src;

    this.brightness = function (amount) {

        if(img.height >img.width)
                    {
                        var widthOverHeightRatio = img.width/img.height;
                        var editedWidth = widthOverHeightRatio * (document.getElementById("myCanvas").width - 20);
                        var imgPosition = (document.getElementById("myCanvas").width - editedWidth) / 2;
                        ctxelement.drawImage(img,imgPosition,10,editedWidth,(document.getElementById("myCanvas").height - 20));
                    }else{
                        var heightOverWidthRatio = img.height/img.width;
                        var editedHeight = heightOverWidthRatio * (document.getElementById("myCanvas").height - 20);
                        var imgPosition = (document.getElementById("myCanvas").height - editedHeight) / 2;
                        ctxelement.drawImage(img,10,imgPosition, (document.getElementById("myCanvas").width - 20), editedHeight);
                    }

        /// no change, just exit
        if (amount === 0) return;
        
        var imgData = ctx.getImageData(0, 0, 2000, 2000);
        var data = imgData.data;
        
        for (var i = 0; i < data.length; i += 4) {
            data[i] += amount;
            data[i + 1] += amount;
            data[i + 2] += amount
        }
        
        imgData.data = data;
        ctxelement.putImageData(imgData, 0, 0)
    };

    this.transform = function (data) {

        this.brightness(data.brightness);
        }
    }
}
//=================================================================================================
function startSave() {
var link = document.createElement('a');
link.download = document.getElementById('uploadText').value+"_MaskedLayer.png";
link.href = canvaslayer2.toDataURL("image/png").replace("image/png", "image/octet-stream");;
link.click();
document.getElementById("file-upload").value = "";
}
//=================================================================================================
function startExport(){
ctx.drawImage(canvaslayer2,0,0);//Combine Context
var link = document.createElement('a');
link.download = document.getElementById('uploadText').value+".jpg";
link.href = canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");;
link.click();
document.getElementById("file-upload").value = "";    
}     
//=================================================================================================
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});
