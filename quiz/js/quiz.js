'use strict';

var baseUrl='http://www.moholepeople.it/wildfactory/backend/api.php';

//http://localhost/rest-test/
//http://www.moholepeople.it/wildfactory/backend/
var colorPalette=['yellow','pink','fucsia','lightblue','medblue','blue'];
var testquestion;
var mascotte;
var sectionNow='';
var testResult = [];
var quiz=document.querySelector('#quiz');
var questionTmpl=document.querySelector('#questionTmpl');
var answerTmpl=document.querySelector('#answerTmpl');
var welcomeTmpl=document.querySelector('#welcomeTmpl');
var mascotteTmpl=document.querySelector('#mascotteTmpl');
var creditsTmpl=document.querySelector('#creditsTmpl');
var bodyelem=document.querySelector('body');
var descriptionFB;
var imageFB;

var intervalSlide;
function getRand(max){
	return Math.floor(Math.random()*(max-0+1))+0;
}
function randRA(){
	var listAnimal=['r_squalo','r_tigre','r_lupo','r_aquila'];
	var a = listAnimal[getRand(3)];
		document.querySelector('.slider-anim').innerHTML='<img src="image/'+a+'.svg"/>';
	//console.log(a);
		}
function nextQuestion(e){
	//testResult.push(e.dataset.index);
	testResult.push(e.dataset.animal);
	window.location.href='#quiz/question/'+(testResult.length+1);
}
function loadTest(){

	bodyelem.classList=colorPalette[getRand(5)];
	quiz.innerHTML='';
	var wt=welcomeTmpl.innerHTML;
	sectionNow=window.location.href.split("#")[1];
	var myInit = { method: 'GET',
		cache: 'false' };
	fetch(baseUrl+'/questions',myInit)
	.then(function(response){
		return response.json();
	})
	.then(function(json){
		testquestion=json;
		testResult = [];
		console.log('domande caricate');
		quiz.innerHTML=wt;
		loadQuestionLayout();
		window.scrollTo(0, 0);
		intervalSlide = setInterval(randRA,1000);
		//quiz.innerHTML+='<a href="#/quiz/question/1">Inizia</a>';

	})
}
function renderQuestion(id){
	clearInterval(intervalSlide);
	quiz.innerHTML='';
	sectionNow=window.location.href.split("#")[1];
	var qNow=testquestion[id-1];
	if(id>testquestion.length){
		window.location.href='#quiz/mascotte';
	}else{
		if(testResult.length!=parseInt(id)-1){
			window.location.href='#quiz/question/'+(testResult.length+1);
		}else{
			var listAnim=['lupo','aquila','delfino','medusa','orso','cavallo','elephante'];
			var indAnswer=['a','b','c','d'];
			var ansList=[qNow.ans_a,qNow.ans_b,qNow.ans_c,qNow.ans_d];
			var answerGroup='';
			var qt=questionTmpl.innerHTML;
			var ansG = answerTmpl.innerHTML;
			bodyelem.classList=colorPalette[getRand(5)];
			ansList.forEach(function(e,i){
				var testoAns=e.split('|');
				answerGroup+=ansG.replace('{{risposta}}',testoAns[1]).replace('{{lettera}}',indAnswer[i]).replace('{{idx}}',indAnswer[i]).replace('{{quiz_animal}}',testoAns[0]);
			})
			qt=qt.replace('{{domanda}}',qNow.text).replace('{{image_url}}','image/'+listAnim[getRand(6)]+'.svg').replace('{{index_domanda}}',qNow.id).replace('{{tot_domande}}',testquestion.length).replace('{{answer_group}}',answerGroup);
			quiz.innerHTML+=qt;
		}
		loadQuestionLayout();
		window.scrollTo(0, 0);
	}
}
function getResults(arr){
		var obj = { };
		for (var i = 0; i < arr.length; i++) {
		   if (obj[arr[i]]) {
		      obj[arr[i]]++;
		   }
		   else {
		      obj[arr[i]] = 1;
		   }
		}
	  function returnResults(obj){
	    var max = 0;
	    var resultsArray=[];
	    for(var k in obj){
	      if(obj[k]>max){
	        max=obj[k];
	        resultsArray=[];
	        resultsArray.push(k);
	      } else if(obj[k]==max){
	        resultsArray.push(k);
	      }
	    }
	    return resultsArray;
	  }
	  var resultsArray=returnResults(obj);
	  var result = resultsArray[Math.floor(Math.random()*resultsArray.length)];
	  return result;
}
function shareResult(){
	clearInterval(intervalSlide);
	quiz.innerHTML='';
	sectionNow=window.location.href.split("#")[1];
	var res= getResults(testResult);
	//res=res.charAt(0).toUpperCase()+res.slice(1);
	var resultsString=testResult.join(',');


	var jsonData = {
	    answers: resultsString,
	    result: res
    };

var data = JSON.stringify(jsonData);
console.log('data: '+data);

fetch(baseUrl+'/completed', {
    method: 'post',
    body: data
})
.then(function (response) {
    return response.json();
})
.then(function (result) {

			//scelgo mascotte
			var idMascotte=res;
	var myInit = { method: 'GET',
		   cache: 'false' };
	fetch(baseUrl+'/mascotte/'+idMascotte,myInit)
	.then(function(response){
		return response.json();
	})
	.then(function(json){
		mascotte=json;
		var mt=mascotteTmpl.innerHTML;
		//console.log(mascotte);
		//console.log(mascotte.id+' '+mascotte.name);
		mascotte=mascotte[0];
		bodyelem.classList=colorPalette[getRand(5)];
		document.querySelector('head').innerHTML=document.querySelector('head').innerHTML.replace('{{image_social}}','http://www.moholepeople.it/wildfactory/quiz/image/'+mascotte.image);
		quiz.innerHTML=mt.replace('{{mascotte_name}}',mascotte.name).replace('{{mascotte_image}}','image/'+mascotte.image).replace('{{mascotte_text}}',mascotte.description);
		loadQuestionLayout();
		window.scrollTo(0, 0);
		//quiz.innerHTML='<a href="">share</a><br>';
		//quiz.innerHTML+='<a href="#/quiz">riprova</a><br><a href="#/quiz/credits">Show credits</a>';
		descriptionFB=mascotte.description;
		imageFB=res;
	})
})
.catch (function (error) {
	console.log('Request failed', error);
});

}

// FB SHARE

window.fbAsyncInit = function() {
    FB.init({
      appId      : '195115404319153',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

function fbShare(){

	 		FB.ui({
	 				display: 'popup',
	 				method: 'share',
	 				title: 'Wild Factory Quiz',
	 				description: descriptionFB,
	 			link: 'http://moholepeople.it/wildfactory/quiz',
	 			picture: 'http://moholepeople.it/wildfactory/quiz/image/fbr_'+imageFB+'.png',
	 			href: 'http://moholepeople.it/wildfactory/quiz',

	 	}, function(response){});

}

//	FINE FB SHARE


function showCredits(){
	clearInterval(intervalSlide);
	quiz.innerHTML='';
	bodyelem.classList=colorPalette[getRand(5)];
	quiz.innerHTML=creditsTmpl.innerHTML.replace('{{backLink}}','<div class="col-12"><a href="#'+sectionNow+'" class="btn btn-lg"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i> Torna indietro</a></div>');
}
var routes = {
	'/quiz/':loadTest,
	'/quiz/question/:id':renderQuestion,
	'/quiz/mascotte/':shareResult,
	'/quiz/credits/':showCredits
}
var router = Router(routes);
router.init('/quiz');
