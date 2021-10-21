var canvas = document.getElementById("can");
var applyButton = document.getElementById("Apply");


var context = canvas.getContext("2d");


var lSystem = "F";
var lSysRules = [
        ["F", "F[F-+G]-F"],
        ["H", "[F]"],
        ["G", "H"],
	["-", "-"],
	["+", "+"]
];


var rotateAmount = Math.PI / 180 * 20;
var fLength = 5;

var cc = 1;
applyButton.onclick =  function (event) 
{
	if (cc % 5 == 0)
	{
	lSysRules = mutate(lSysRules, 0.01);
	lSystem = "F[-F][+F]";
	}
	lSystem = applyRules(lSystem, lSysRules);
        console.log(lSystem);
        drawLSystem(lSystem);
	cc++;
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

function mutate(rules, chance)
{
	var newRules = [];
	for (var i = 0; i < rules.length;i++)
	{
		newRules[i] = [rules[i][0], rules[i][1]];
		if (Math.random() < chance)
		{
			//newRules[i][0] = ["F", "G", "+", "-"][Math.floor(Math.random() * 4)];
		}
		
		var newRule = "";
		var removedBracketCount = 0;

		if (Math.random() < chance)
		{
			newRule += [rules[i][0], ""][Math.floor(Math.random() * 2)];
		}

		for (var j = 0; j < rules[i][1].length;j++)
		{
			if (Math.random() < chance)
			{
				if (rules[i][1][j] == "[")
				{
					removedBracketCount++;
				}
				else if (rules[i][1][j] == "]")
				{
					if (removedBracketCount > 0)
					{
						removedBracketCount--;
					}
					else
					{
						newRule += ["F", "G", "+", "-", "[]", ""][Math.floor(Math.random() * 6)];
						newRule += "]"
					}

					continue;
				}
				
				newRule += ["F", "G", "+", "-", "[]", ""][Math.floor(Math.random() * 6)];
			}
			else
			{
				if (rules[i][1][j] == "]" && removedBracketCount > 0)
				{
					removedBracketCount--;
				}
				else
				{
					newRule += rules[i][1][j];
				}
			}
		}

		newRules[i][1] = newRule;
	}

	return newRules;
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
