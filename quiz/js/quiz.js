'use strict';

var baseUrl='http://www.moholepeople.it/wildfactory/backend/api.php';

//http://localhost/rest-test/

var testquestion;
var mascotte;
var sectionNow='';
var testResult = [];
var quiz=document.querySelector('#quiz');
var questionTmpl=document.querySelector('#questionTmpl');
var answerTmpl=document.querySelector('#answerTmpl');

function nextQuestion(e){
	//console.log(e.dataset.index);
	testResult.push(e.dataset.index);
	window.location.href='#quiz/question/'+(testResult.length+1);
}
function loadTest(){
	quiz.innerHTML='';
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
		json.forEach(function(e,i){
			console.log(e.id+' '+e.ans_a);
		});
		quiz.innerHTML='';
		quiz.innerHTML='<a href="#/quiz/question/1">Inizia</a><br><a href="#/quiz/credits">Show credits</a>';

	})  
}
function renderQuestion(id){
	quiz.innerHTML='';
	sectionNow=window.location.href.split("#")[1];
	var qNow=testquestion[id-1];
	if(id>testquestion.length){
		window.location.href='#quiz/mascotte';
	}else{
		if(testResult.length!=parseInt(id)-1){
			window.location.href='#quiz/question/'+(testResult.length+1);
		}else{

			var indAnswer=['a','b','c','d'];
			var ansList=[qNow.ans_a,qNow.ans_b,qNow.ans_c,qNow.ans_d];
			var answerGroup='';
			var qt=questionTmpl.innerHTML;
			var ansG = answerTmpl.innerHTML;

			ansList.forEach(function(e,i){
				answerGroup+=ansG.replace('{{risposta}}',e).replace('{{lettera}}',indAnswer[i]).replace('{{idx}}',indAnswer[i]);
			})
			qt=qt.replace('{{domanda}}',qNow.text).replace('{{image_url}}',qNow.image_url).replace('{{index_domanda}}',qNow.id).replace('{{tot_domande}}',testquestion.length).replace('{{answer_group}}',answerGroup);
			quiz.innerHTML+=qt+'<a href="#/quiz/credits">Show credits</a>';
		}
		loadQuestionLayout()
	}
}

function shareResult(){
	quiz.innerHTML='';
	sectionNow=window.location.href.split("#")[1];
	//calcolo risultato
	//insert db
	console.log(testResult);
	//scelgo mascotte
	var idMascotte=1;
	var myInit = { method: 'GET',
		   cache: 'false' };
	fetch(baseUrl+'/mascotte/'+idMascotte,myInit)
	.then(function(response){
		return response.json();
	})
	.then(function(json){
		mascotte=json;
		console.log(mascotte);
		console.log(mascotte.id+' '+mascotte.name);
		quiz.innerHTML='<a href="">share</a><br>';
		quiz.innerHTML+='<a href="#/quiz">riprova</a><br><a href="#/quiz/credits">Show credits</a>';
	})

}
function showCredits(){
	quiz.innerHTML='';
	quiz.innerHTML='<div><h2>credits</h2><ul><li>pippo</li><li>pippo</li><li>pippo</li></ul></div><br><a href="#'+sectionNow+'">torna indietro</a>';
}
var routes = {
	'/quiz/':loadTest,
	'/quiz/question/:id':renderQuestion,
	'/quiz/mascotte/':shareResult,
	'/quiz/credits/':showCredits
}
var router = Router(routes);
router.init('/quiz');