/********************************
================================*
    rentimetro 					*
================================*
Created on Dec 2019				*
Filename: rentimetro.js			*
Author: Sergio Morales Enciso	*
*********************************/

// Global constants
// Gears
const GEAR_NUM = 20;
const GEAR_DOUBLE_SIZE_AT = 8;
const GEAR_QUADRUPLE_SIZE_AT = 15;
const VERTICAL_ZERO_VH = 0;
const HORIZONTAL_ZERO_VW = 0;
const HORIZONTAL_MAX_DELTA_VW = 11.5;
const HORIZONTAL_SCALE_ADJUSTMENT = 0.7;

// Stoppers
const STOPPER_NUM = 8;
const STOPPER_X_POS = 35.3;
const STOPPER_Y_START = 32.5;
const LAMBDA_VALUE_INCREASE = 0.5;

// Bar
const BAR_START_VW = 14.3;  // 274px // 14.3vw
const BAR_END_VW = 38.35;		// 710px;		//37vw
//Distnace (in px) from min to max positions on the bar allowed for the gear
const BAR_SIZE = BAR_END_VW - BAR_START_VW;
const MAX_TAU_PERCENTAGE = 32; //As labelled on the bar

// Hinge: this must coincide with css
// 		.bar{
//			transform-origin: 13.9vw 40.6vh;
// 		}
const HINGE_CENTRE_X = 13.9;
const HINGE_CENTRE_Y = 40.6;
const BUCKET_HANGING_X = 6.6;

const BOARD_MAX_ROE_VH = 9.25; // 150 ROE is located at 9.25vh
const BOARD_MIN_ROE_VH = 39.2; // 0 RPE is located at 39.2vh

// Global variables/arrays
var gears = [];
var selectedGear;
var stoppers = [];
var bucketStatus = "EMPTY";
var workFlow = -1;
var fieldName = ['outcome','income','investment','debt']; // Selectors/names of input fields
var instructions = {'normalized': 	[
										{status: false, txt: "1. Seleccionar engrane (ROS)."},
										{status: false, txt: "2. Desplazar engrane sobre cremallera (ROA)."},
										{status: false, txt: "3. Fijar engrane (doble click)."},
										{status: false, txt: "4. Llenar de agua (1 click sobre cubeta)."},
										{status: false, txt: "5. Seleccionar tope para cremallera &lambda;."},
										{status: false, txt: "6. Elevar cremallera (1 click sobre cubeta)."},
										{status: false, txt: "7. Tomar lectura de ROE."}
									],
					'free': 		[
										{status: false, txt: "1. Introducir monto de egresos."},
										{status: false, txt: "2. Introducir monto de ingresos."},
										{status: false, txt: "3. Introducir monto de inversiones."},
										{status: false, txt: "4. Introducir monto de deudas."},
										{status: false, txt: "5. Calcular.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"}
									]
					};


function getImgSize(imgObj){
	console.log('Left = ' + imgObj.css('left'));
	console.log('height = ' + imgObj.css('height'));
	console.log('Width = ' + imgObj.css('width'));
}

function sumOfRange(start,end){
	return ((end - start + 1) * (end + start) / 2);
}

function calculateRadiusIncrement(gearRadius, width, elements, doubleAt, quadrupleAt){
	var baseRadiusIncrement = ((width - elements * (gearRadius)) /
			(   sumOfRange(1,elements) +
			  2*sumOfRange(doubleAt, elements) +
			  4*sumOfRange(quadrupleAt, elements)
			 )
		  );
	baseRadiusIncrement = baseRadiusIncrement / 2;
	return(baseRadiusIncrement);
}

function toPercentage(things,attr){
	totalAttr = 0;
	for (var i = 0; i < gears.length; i++)
		totalAttr+=things[i][attr];
	for (var i = 0; i < gears.length; i++)
		things[i][attr] = 100*things[i][attr] / totalAttr;
	return(things);
}

function calculateGearSizes(baseRadiusIncrement, gears){
	var radiusIncrement = baseRadiusIncrement;
	var baseSizeIncrement = 0.5;
	var sizeIncrement = baseSizeIncrement;
	var txtPos = "33%";
	for (var i = 1; i<GEAR_NUM; i++) {
		gears[i] = {};
		if(i > GEAR_DOUBLE_SIZE_AT){
			radiusIncrement = 2*baseRadiusIncrement;
			sizeIncrement = 2*baseSizeIncrement;
			txtPos = "38%";
		}
		if(i > GEAR_QUADRUPLE_SIZE_AT){
			radiusIncrement = 4*baseRadiusIncrement;
			sizeIncrement = 4*baseSizeIncrement;
			txtPos = "42%";
		}
		gears[i].radius = gears[i-1].radius + radiusIncrement;
		gears[i].size = gears[i-1].size + sizeIncrement;
		gears[i].txtPos = txtPos;
	}
	// Add artificial extra gear for margin calculation
	gears[GEAR_NUM] = {};
	gears[GEAR_NUM].radius = GEAR_NUM * 2;
	gears = toPercentage(gears,'radius');
}

function vh2px(vh){
	return(vh*document.documentElement.clientHeight/100);
}

function px2vh(px){
	return(100*px/document.documentElement.clientHeight);
}

function vw2px(vw){
	//return(vw*document.documentElement.clientWidth/100);
	return(vw*window.innerWidth/100);
}

function px2vw(px){
	//return(100*px/document.documentElement.clientWidth);
	return(100*px/window.innerWidth);
}

function addGearsToDOM(){
	for (var i = 0; i<GEAR_NUM; i++) {

		//ADD TEXT ON TOP OF IMAGE. SEE: https://www.w3schools.com/howto/howto_css_image_text.asp
		//WILL NEED TO ADD A DIV AS PARENT OF EACH IMAGE

		var im = $('<img/>');
		im.appendTo(gears[i].div);
		im.attr('src',"img/engrane100.png");
		im.attr('gearid',i);
		im.css('width',(gears[i].radius - (gears[GEAR_NUM].radius / GEAR_NUM))+'%');
		$('.gear-rail').css('width',BAR_SIZE+'vw');
		im.click(function(){
			if($('#optNormalize').prop('checked')){
				resetNormalizedDupont();
				calculateFreeDupont();
				clearBoard();
				if(workFlow < 4){

					var gear_id = parseInt(this.getAttribute("gearid"), 10);

					// Since width is calculated in % of the bottom div, and we want to preserve absolute size, we need to calculate
					// the proportion to apply the adjustment
					var width_adjustment_coeff = parseInt($(".gearCanvas").css("width"),10) / parseInt($("#gearScrollingArea").css("width"),10);
					selectedGear.css('width',(width_adjustment_coeff*gears[gear_id].radius)+'%');
					selectedGear.css('height',selectedGear.css('width'));
					selectedGear.css('display',"block");
					var curr_height = selectedGear.css('height');
					var curr_width = selectedGear.css('width');

					// Position gear in pre-defined viewport coordinates, adjusting for the corresponding image size
					var new_top = px2vh(vh2px(VERTICAL_ZERO_VH) - parseInt(curr_height,10));
					selectedGear.css('top',(new_top)+'vh');
					var new_left = px2vw(vw2px(HORIZONTAL_ZERO_VW) - parseFloat(curr_width,10)/2);
					var diameter = px2vw(parseFloat(curr_width,10));
					selectedGear.css('left',(new_left)+'vw');
					selectedGear.css('transform','rotate(0deg)');

					selectedGear.attr('src',"img/engrane100.png");
					selectedGear.fixed = false;
					selectedGear.leftBoundOffset = null;


					// Update instructions and Dupont
					instructions['normalized'][0].status = true;
					instructions['normalized'][1].status = false;
					instructions['normalized'][2].status = false;
					$('#ROS').html(gears[gear_id].size.toFixed(2));
					$('#tau').html((0).toFixed(2));
					$('#ROA').html((0).toFixed(2));

					// Make image draggable and implement rotation when dragged
					var changedPxToViewPort = false;
					selectedGear.unbind('dblclick');

					selectedGear.draggable({
						axis: "x",
						drag: function(ev, ui){
							// USE THIS FOR ROTATION
							if(!selectedGear.fixed){
								var perimeter = Math.PI * diameter;
								var curr_left = px2vw(ui.position.left);
								var horizontal_displacement = Math.abs(curr_left - new_left);
								rotation_deg = 360 * horizontal_displacement / perimeter;
								selectedGear.css('transform','rotate('+rotation_deg+'deg)');
								console.log("drag: ", ui.position.left);

								$('.ros-reading-line').css('width',(HORIZONTAL_SCALE_ADJUSTMENT+horizontal_displacement)+'vw');

								// Update instructions and Dupont
								if(!instructions['normalized'][1].status){
									instructions['normalized'][1].status = true;
									$('#ROS').html(gears[gear_id].size.toFixed(2));
									setInstructionsText();
								}
								var radius = px2vw(parseFloat(selectedGear.css('width'),10))/2;
								var proportional_horizontal_displacement = MAX_TAU_PERCENTAGE * horizontal_displacement / (BAR_SIZE);
								var roa = proportional_horizontal_displacement;
								$('#ROA').html(roa.toFixed(2));
								var ros = parseInt($('#ROS').html(),10);
								var tau = roa / ros;
								$('#tau').html(tau.toFixed(2));
								calculateNormalizedDupont();
							}
						}
					});
					selectedGear.draggable('enable');

					// Calculate containment area to bound dragging
					selectedGear.on('mousedown',function(){
						console.log("mousedown: offset ",selectedGear.offset().left,"pos: ",selectedGear.position().left,"css: ",selectedGear.css('left'))
						if (null == selectedGear.leftBoundOffset)
							selectedGear.leftBoundOffset = px2vw(selectedGear.offset().left);
						var x1 = vw2px(selectedGear.leftBoundOffset);
						var curr_width = selectedGear.css('width');
						var x2 = vw2px(px2vw(x1) + (HORIZONTAL_ZERO_VW + BAR_SIZE));
						var y1 = y2 = selectedGear.position().top;
						selectedGear.draggable('option', 'containment',[x1, y1, x2, y2]);
						changedPxToViewPort = false;
						console.log("Mouse down: Offset ",selectedGear.offset().left, "Pos: ",selectedGear.position().left);
					});

					selectedGear.on('mouseup',function(ev){
						// why is the top position changed from the last logged one during drag?
					 	selectedGear.css('top', px2vh(parseFloat(selectedGear.css('top'),10))+'vh' );
						selectedGear.css('left', px2vw(parseFloat(selectedGear.css('left'),10))+'vw' );
						workFlow = Math.max(workFlow,2);
					});

					selectedGear.on('mouseleave',function(ev){
						selectedGear.trigger('mouseup');
					});

					selectedGear.on('dblclick',function(ev){
						if(selectedGear.fixed){
							selectedGear.attr('src',"img/engrane100.png");
							selectedGear.fixed = false;
							instructions['normalized'][2].status = false;
							selectedGear.draggable('enable');
							workFlow = 2;
						}
						else{
							selectedGear.attr('src',"img/engrane100Fix.png");
							selectedGear.fixed = true;
							instructions['normalized'][2].status = true;
							selectedGear.draggable('disable');
							workFlow = 3;
						}
						setInstructionsText();
					});
					workFlow = 1;
					setInstructionsText();
					calculateNormalizedDupont();
				}
			}
		});
		var dv = $('<div class="gear-txt">'+(gears[i].size).toFixed(1)+'</div>');
		dv.attr('style','left: '+gears[i].txtPos);
		dv.appendTo(gears[i].div);
	}
}

function addGearDivsToDOM(gearBox){
	for (var i = 0; i<GEAR_NUM; i++) {
		gears[i].div = $('<div class="gear"></div>');
		gears[i].div.appendTo(gearBox);
	}
	// Also, add one to the board
	selectedGear = $('<img/>');
	selectedGear.appendTo($("#gearScrollingArea"));
	selectedGear.attr('src',"img/engrane100.png");
	selectedGear.css('display',"none");
	selectedGear.css('left',HORIZONTAL_ZERO_VW+'vw');
	selectedGear.css('top',VERTICAL_ZERO_VH+"vh");
}

function displayBottomGears(){
	var canvas = $(".gearCanvas");
	var gearBox = $('<div class="gear-shelf"></div>');
	gearBox.appendTo(canvas);
	interGearSpace = 0;
	gears[0] = {};
	gears[0].radius = 10;
	gears[0].size = 1;
	var baseRadiusIncrement = calculateRadiusIncrement(	gears[0].radius,
														gearBox.width(),
														GEAR_NUM,
														GEAR_DOUBLE_SIZE_AT,
														GEAR_QUADRUPLE_SIZE_AT
													  );

	calculateGearSizes(baseRadiusIncrement, gears);
	addGearDivsToDOM(gearBox);
	addGearsToDOM();
}

function toRadians(degrees){
  return(degrees * (Math.PI/180));
}

function toDegrees(radians){
	return(radians * 180 / Math.PI);
}

function getStopperPositions(){
	board = $('.col-main');
	var DELTA_STOPPER = 3;
	var yStart = STOPPER_Y_START;
	var lambdaValue = 1.0;
	var template;

	// Need to hardcode these instead of calculating their positions. However, it might be possible to calculate
	// the positions based on the word document describing the functioning of the appliance (rentimetro).
	stopper_top_vh = {0: 32.3,
					  1: 29.4,
					  2: 26.4,
					  3: 22.5,
					  4: 19.5,
					  5: 16.0,
					  6: 11.5,
					  7: 7.0
					};

	for (var i = 0; i < STOPPER_NUM; i++) {
		var top = stopper_top_vh[i];
		var template = `
						<div class="boardFloatingElement stopper" style="top: ${top}vh;">
				        	<img src="img/tornillo.png" lambdaValue="${lambdaValue}" class="stopperImg"><div>&nbsp;&lambda;=${lambdaValue.toFixed(1)}</div>
				        </div>
				       `
		lambdaValue += LAMBDA_VALUE_INCREASE;
		board.append(template);
	}
}

function displayStoppers(){
	getStopperPositions();

}

function adjustInstructionsText(){
	for (var i = 1; i <= 7; i++)
		$('#status'+i).attr('style','top: '+($('#txt'+i).height()/4)+'px;');
}

function resetDupontValues(bDisable){
	// Clear fields
	fieldVal =  [0,100,0,0,0];
	for (var i = 0; i < fieldName.length; i++) {
		$('#'+fieldName[i]).val((fieldVal[i]).toFixed(2));
		if(bDisable)
			$('#'+fieldName[i]).attr('disabled',true);
		else
			$('#'+fieldName[i]).removeAttr('disabled');
	}
	// Clear outputs
	outputName = ['ROS','ROA','ROE1','ROE2','ROE3'];
	outputVal = [0,0,0,0,0];
	for (var i = 0; i < outputName.length; i++) {
		console.log('#'+outputName[i]);
		$('#'+outputName[i]).html(outputVal[i].toFixed(2));
	}
	$('[lambdaValue="1"]').attr('src','img/selTornillo.png');
	$('#lambda1,#lambda2').html(1.00.toFixed(2));
	$('#tau').html(0.00.toFixed(2));
	workFlow = -1;
}

function calculateNormalizedDupont(){
	// Perform calculations
	var income = 100.00;
	var ros = parseInt($('#ROS').html(),10);
	var utility = ros/100.0 * income;
	var tau = parseFloat($('#tau').html(),10);
	// var lambda = 1;
	var lambda = parseFloat($('#lambda1').html(),10);

	var outcome = (ros==0 ? 0 : income - utility);
	var investment = (tau==0 ? 0 : income / tau);
	var equity = investment / lambda;
	var debt = investment - equity;
	var mu = tau * Math.pow(ros,3);
	var roe = ros * tau * lambda;

	// Set fields with formatted results
	$('#income').val(income.toFixed(2));
	$('#outcome').val(outcome.toFixed(2));
	$('#investment').val(investment.toFixed(2));
	$('#debt').val(debt.toFixed(2));

	$('#equity').html(equity.toFixed(2));
	$('#utility').html(utility.toFixed(2));
	$('#mu').html(mu.toFixed(2));
	$('#lambda1,#lambda2').html(lambda.toFixed(2));
	$('#ROE1,#ROE2,#ROE3').html(roe.toFixed(2));
}

function resetNormalizedDupont(){
	resetDupontValues(true);
	calculateNormalizedDupont();
}

function reEnableDupontInputs(){
	for (var i = 0; i < fieldName.length; i++) {
		$('#'+fieldName[i]).removeAttr('disabled');
	}
}

function calculateFreeDupont(){
	var outcome = parseInt($('#outcome').val(),10);
	var income = parseInt($('#income').val(),10);
	var investment = parseInt($('#investment').val(),10);
	var debt = parseInt($('#debt').val(),10);

	var utility = income - outcome;
	var equity = investment - debt;
	var ros = 100 * utility / income;
	var tau = (investment==0 ? 0 : income / investment)
	var lambda = (equity==0 ? 0 : investment / equity);
	var roe = ros * tau * lambda;
	var roa = ros * tau;
	var mu = tau * Math.pow(ros,3);

	$('#utility').html(utility.toFixed(2));
	$('#equity').html(equity.toFixed(2));
	$('#ROS').html(ros.toFixed(2));
	$('#tau').html(tau.toFixed(2));
	$('#lambda1,#lambda2').html(lambda.toFixed(2));
	$('#ROE1,#ROE2,#ROE3').html(roe.toFixed(2));
	$('#ROA').html(roa.toFixed(2));
	$('#mu').html(mu.toFixed(2));
}

function clearBoard(){
	selectedGear.css('display',"none");
	instructions['normalized'].forEach(function(item){
		item.status = false;
	});
	$('.stopperImg').attr('src','img/tornillo.png');
	resetBucket();
	resetBar();
}

function raiseBar(){
	// Raise bar:
	var lambda = parseFloat($('#lambda1').html(),10);
	var stopper_top = px2vh(parseFloat($('.stopperImg[lambdaValue="'+lambda+'"]').parent().css('top'),10));;
	var stopper_height = px2vh(parseFloat($('.stopperImg[lambdaValue="'+lambda+'"]').css('height'),10));
	stopper_top = stopper_top + stopper_height; // account for stopper height

	// Calculate angle to raise (rotate) bar
	var BAR_WIDTH = 1.6;	// account for bar's teeth & thickness
	var opposite_side = Math.abs(stopper_top - (HINGE_CENTRE_Y - BAR_WIDTH ));
	var adjacent_side = Math.abs(STOPPER_X_POS - HINGE_CENTRE_X);
	var tan_theta = vh2px(opposite_side) / vw2px(adjacent_side);
	var rotation_rad = Math.atan(tan_theta);
	var rotation_deg = -toDegrees(rotation_rad);
	var barEl = $('#idBar');
	barEl.css('transform','rotate('+rotation_deg+'deg)');

	// Calculate and display reading line
	$('.ros-reading-line').css('border-top','1px red solid');
	var adj = parseFloat($('.ros-reading-line').css('width'),10);
	var roe_step_vh = (BOARD_MAX_ROE_VH - BOARD_MIN_ROE_VH) / 150;
	var new_top = BOARD_MIN_ROE_VH + parseFloat($('#ROE1').html(),10) * roe_step_vh;
	$('.ros-reading-line').css('top', (new_top) + 'vh');
	$('.ros-reading-line').css('width', (adj) * ( Math.cos(rotation_rad)) );

	// calculate height to raise gear
	var curr_top = parseFloat(selectedGear.css('top'),10);
	var curr_left = parseFloat(selectedGear.css('left'),10);
	var hypothenuse = vw2px(Math.abs(HINGE_CENTRE_X - px2vw(curr_left)));
	$('.gear-rail').css('transform','rotate('+rotation_deg+'deg)');

	// Lower bucket
	hypothenuse = vw2px(Math.abs(HINGE_CENTRE_X - BUCKET_HANGING_X));
	adjacent_side = px2vw(-hypothenuse * Math.cos(rotation_rad) + hypothenuse);
	opposite_side = px2vh(hypothenuse * Math.sin(rotation_rad) );

	var bucketGroup = $('#water,#bucketBg,#bucketFg');
	bucketGroup.each(function(){
		var curr_top = px2vh(parseFloat($(this).css("top"),10));
		var curr_left = px2vw(parseFloat($(this).css("left"),10));
		$(this).css("left",(adjacent_side)+'vw');
		$(this).css("top",(opposite_side)+'vh');
	});
}

function resetFreeInstructions(){
	for (var i = 0; i <= instructions['free'].length-1; i++) {
		instructions['free'][i]["status"] = false;
	}
}

function setEvents(){
	$('#optNormalize').change(function(){
		if($('#optNormalize').prop('checked')){
			resetNormalizedDupont();
			resetFreeInstructions();
		}
		else{
			reEnableDupontInputs();
			resetDupontValues();
			calculateFreeDupont();
			clearBoard();
		}
		setInstructionsText();
	});
	var fieldName_loc = fieldName.map(function(x){return('#'+x)});
	$(fieldName_loc.join(', ')).change(function(a,b){
		instructions['free'][fieldName.indexOf(this.id)].status = true;
		var isComplete = true;
		for (var i = 0; i <= instructions['free'].length-2; i++) {
			isComplete = isComplete && instructions['free'][i]["status"];
		}
		instructions['free'][instructions['free'].length-1].status = isComplete;
		setInstructionsText();
		calculateFreeDupont();
	});
	$('.clean-button').click(function(){
		if($('#optNormalize').prop('checked')){
			resetNormalizedDupont();
			calculateFreeDupont();
			clearBoard();
		}
		else{
			resetDupontValues();
			resetFreeInstructions();
			calculateFreeDupont();
		}
		setInstructionsText();
	});
	$('.stopperImg').click(function(ev){
		if($('#optNormalize').prop('checked')){
			if($(this).attr('src').search('sel')<0){
				$('.stopperImg').attr('src','img/tornillo.png');
				$(this).attr('src','img/selTornillo.png');
				$('#lambda1,#lambda2').html(parseFloat($(this).attr('lambdaValue'),10).toFixed(2));
			}
			instructions['normalized'][4].status = true;
			setInstructionsText();
			calculateNormalizedDupont();
		}
	});
	$('.clickableBucket').click(function(){
		if($('#optNormalize').prop('checked')){
			if(workFlow>=3){
				if(bucketStatus=="EMPTY"){
					var im = $('<img src="img/agua_800x600.png"/>');
					im.appendTo($('#water'));
					bucketStatus = "FULL";
					instructions['normalized'][3].status = true;
				}
				else if(bucketStatus=="FULL" && instructions['normalized'][4].status==true){
					bucketStatus = "ELEVATED";
					instructions['normalized'][5].status = true;
					instructions['normalized'][6].status = true;
					raiseBar();
				}
				else{
					resetBucket();
					resetBar();
				}
				setInstructionsText();
			}
		}
	});
}

function resetBucket(){
	bucketStatus="EMPTY";
	$('#water').empty();
	instructions['normalized'][3].status = false;
	instructions['normalized'][5].status = false;
	instructions['normalized'][6].status = false;
}

function resetBar(){
	// Lower bar, reset bucket
	$('#idBar').css('transform','rotate(0deg)');
	var bucketGroup = $('#water,#bucketBg,#bucketFg');
	bucketGroup.css('left',0+'vw');
	bucketGroup.css('top',0+'vw');
	$('.gear-rail').css('transform','rotate(0deg)');
	$('.ros-reading-line').css('border-top','0px red solid');
}

function setInstructionsText(){
	console.log("workFlow: ",workFlow);
	var type = $('#optNormalize').prop('checked') == true ? 'normalized' : 'free';
	var parent = $('.col-instructions-container');
	var instructionCounter = 1;
	parent.empty();
	parent.append('<h1>Instrucciones:</h1>');
	instructions[type].forEach(function(item){
		var imgSrc = item.status ? 'greenTick' : 'redCross';
		var template =
					`<div class="column">
	                	<div id="txt${instructionCounter}" class="column col-instructions-text">
	                  	<img id="statusImg" src="img/${imgSrc}.png"/>&nbsp; ${item.txt}
	                	</div>
	              	</div>`
	    console.log(template);
		parent.append(template);
		instructionCounter++;
	});
}

$(document).ready(function(){
	displayBottomGears();
	displayStoppers();
	setEvents();
	setInstructionsText();
});


// TODO:
// 	- Reduce gear sizes in pixels (vw)
//	- Prevent selected gear to be changed on-zoom
// 	- Test in other browsers:
//		- Chrome: all working
//		- Firefox: all working
//		- IE: many things not working, identify browser and display legend.
//		- Opera/safari: not tested

