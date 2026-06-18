const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorPicker =
document.getElementById("colorPicker");

const brushSize =
document.getElementById("brushSize");

let currentTool = "brush";
let drawing = false;

/* TOOLS */

document
.querySelectorAll("[data-tool]")
.forEach(button=>{

    button.addEventListener(
    "click",()=>{

        document
        .querySelectorAll("[data-tool]")
        .forEach(btn=>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentTool =
        button.dataset.tool;

    });

});

/* DRAW */

canvas.addEventListener(
"mousedown",
e=>{

drawing=true;

ctx.beginPath();

ctx.moveTo(
e.offsetX,
e.offsetY
);

});

canvas.addEventListener(
"mouseup",
()=>{

drawing=false;

ctx.beginPath();

});

canvas.addEventListener(
"mouseleave",
()=>{

drawing=false;

ctx.beginPath();

});

canvas.addEventListener(
"mousemove",
e=>{

if(!drawing) return;

ctx.lineWidth =
Number(
brushSize.value
);

ctx.lineCap="round";

if(currentTool==="brush"){

ctx.globalCompositeOperation =
"source-over";

ctx.strokeStyle =
colorPicker.value;

}

if(currentTool==="eraser"){

ctx.globalCompositeOperation =
"destination-out";

}

ctx.lineTo(
e.offsetX,
e.offsetY
);

ctx.stroke();

ctx.beginPath();

ctx.moveTo(
e.offsetX,
e.offsetY
);

});

/* IMPORT */

document
.getElementById("openImage")
.addEventListener(
"change",
e=>{

const file =
e.target.files[0];

if(!file) return;

const img =
new Image();

img.onload=()=>{

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

ctx.drawImage(
img,
0,
0,
canvas.width,
canvas.height
);

};

img.src =
URL.createObjectURL(file);

});

/* SAVE */

document
.getElementById("saveBtn")
.addEventListener(
"click",
()=>{

const link =
document.createElement("a");

link.download =
"photosoft.png";

link.href =
canvas.toDataURL(
"image/png"
);

link.click();

});