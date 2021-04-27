const request = require('request');
const parBuild = require("paragraph-builder")

function buildNew(textVar, numb) {
	var height = 0
	var animationSpeed = 450
	var svgCont = `
	<svg xmlns="http://www.w3.org/2000/svg" width="495" height="170" viewBox="0 0 495 170" fill="none">
        <style>
          .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #c09839;
            animation: fadeInAnimation 0.8s ease-in-out forwards;
          }
          
    .stat {
      font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #c9cacc;
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    .rank-text {
      font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: #c9cacc;
      animation: scaleInAnimation 0.3s ease-in-out forwards;
    }
    
    .bold { font-weight: 700 }
    .icon {
      fill: #c09839;
      display: block;
    }
    
    .rank-circle-rim {
      stroke: #c09839;
      fill: none;
      stroke-width: 6;
      opacity: 0.2;
    }
    .rank-circle {
      stroke: #c09839;
      stroke-dasharray: 380;
      fill: none;
      stroke-width: 6;
      stroke-linecap: round;
      opacity: 0.8;
      transform-origin: -10px 8px;
      transform: rotate(-90deg);
      animation: rankAnimation 1s forwards ease-in-out;
    }
    
    @keyframes rankAnimation {
      from {
        stroke-dashoffset: 380.32741228718345;
      }
      to {
        stroke-dashoffset: 127.78762114229264;
      }
    }
  
  

          
    /* Animations */
    @keyframes scaleInAnimation {
      from {
        transform: translate(-5px, 5px) scale(0);
      }
      to {
        transform: translate(-5px, 5px) scale(1);
      }
    }
    @keyframes fadeInAnimation {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  
          
        </style>

        undefined

        <rect data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="99%" stroke="#E4E2E2" width="494" fill="#151515" stroke-opacity="1"/>

        
      <g data-testid="card-title" transform="translate(25, 35)">
        <g transform="translate(0, 0)">
      <text x="0" y="0" class="header" data-testid="header">Random Number Facts</text>
    </g>
      </g>
    

        <g data-testid="main-card-body" transform="translate(0, 55)">
          
    <g data-testid="rank-circle" transform="translate(420, 25)">
        <circle class="rank-circle-rim" cx="-10" cy="8" r="40"/>
        <circle class="rank-circle" cx="-10" cy="8" r="40"/>
        <g class="rank-text">
          <text x="-5" y="2" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">
              ${numb}
          </text>
        </g>
      </g>

    <svg x="0" y="0">
	`
	var endSvg = `</svg>
		</g>
	</svg>
	`
	for (var i=0; i<textVar.length; i++) {
		var tempValue = textVar[i]
		svgCont += `
		<g transform="translate(0, ${height})">
			<g class="stagger" style="animation-delay: ${animationSpeed}ms" transform="translate(0, 0)">
				<text class="stat bold" x="25" y="12.5">${tempValue}</text>
			</g>
		</g>
		`
		height += 25
		animationSpeed += 150
	}
    svgCont =+ endSvg
	return svgCont
}

function numbSplitter(numb) {
	if (numb < 10) {
		return '000' + numb
	} else if (numb < 100) {
		return '00' + numb
	} else if (numb < 1000) {
		return '0' + numb
	} else {
		return String(numb)
	}
}

module.exports = (req, res) => {
	//const name = req.query.name || 'stranger';
	request('http://numbersapi.com/random/math', { json: false }, (err, rest, body) => {
		if (err) { return console.log(err); }
		var numb = body.split(' ')[0]
		var splitNumb = numbSplitter(numb)
		var remainingStr = body.substr(numb.length+1, 10000)
		var capitalStr = remainingStr.charAt(0).toUpperCase() + remainingStr.slice(1)
		var resultText = parBuild.toArray(capitalStr, [minNumChar=42])
		var svgRes = buildNew(resultText, splitNumb)
		res.setHeader("Content-Type","image/svg+xml")
		res.status(200).send(svgRes)
	});
}