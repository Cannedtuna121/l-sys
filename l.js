var canvas = document.getElementById("can");
var applyButton = document.getElementById("Apply");


var context = canvas.getContext("2d");


var lSystem = "F";
var lSysRules = [
        ["F", "F[F[++G-FG]]F[F-[-F-]i]G"],
        ["H", "[F]"],
        ["G", "H"]
];


var rotateAmount = Math.PI / 180 * 30;
var fLength = 5;

applyButton.onclick =  function (event) 
{
        lSystem = applyRules(lSystem, lSysRules);
        console.log(lSystem);
        drawLSystem(lSystem);
};

function applyRules(sys, rules)
{
        lSys = "";
        for (var j = 0; j < sys.length; j++)
        {
                var applied = false;
                for (var i = 0; i < rules.length; i++)
                {
                        if (applied == true)
                        {
                                break;
                        }

                        if (sys.charAt(j) == rules[i][0])
                        {
                                lSys += rules[i][1];
                                applied = true;
                                break;
                        }
                }

                if (!applied)
                {
                        lSys += sys.charAt(j);
                }
        }

        return lSys;
}

function drawLSystem(sys)
{
        context.resetTransform();
        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.transform(1, 0, 0, 1, canvas.width / 2, canvas.height);
        for (var i = 0; i < sys.length; i++)
        {
                var c = sys.charAt(i);

                if (c == "F" || c == "G")
                {
                        context.fillStyle = "rgba(0, 0, 0, 1)";
                        context.fillRect(0, 0, 1, -fLength);
                        context.transform(1, 0, 0, 1, 0, -fLength);
                }
                else if (c == "-")
                {
                        context.rotate(rotateAmount);
                }
                else if (c == "+")
                {
                        context.rotate(-rotateAmount);
                }
                else if (c == "[")
                {
                        context.save();
                }
                else if (c == "]")
                {
                        context.restore();
                }
        }
}
