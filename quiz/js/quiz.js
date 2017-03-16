var baseUrl='http://www.moholepeople.it/wildfactory/backend/api.php';
//http://www.moholepeople.it/wildfactory/backend/
	var testquestion;
	var mascotte;
	var sectionNow='';
	var qTemplate=document.querySelector('#question-tmpl');
	var aTemplate=document.querySelector('#answer-tmpl');
	var quiz=document.querySelector('#quiz');


	function loadTest(){
		quiz.innerHTML='';
		sectionNow=window.location.href.split("#")[1];
		fetch(baseUrl+'/questions')
		.then(function(response){
			return response.json();
		})
		.then(function(json){
			testquestion=json;
			json.forEach(function(e,i){
				console.log(e.id+' '+e.ans_a);
			})
			quiz.innerHTML='<a href="#/quiz/question/1">Inizia</a><br><a href="#/quiz/credits">Show credits</a>';
		})
	}
	function renderQuestion(id){
		quiz.innerHTML='';
		sectionNow=window.location.href.split("#")[1];
		var qNow=testquestion[id-1];
		console.log(qNow);
		quiz.innerHTML+=qTemplate.innerHTML
																			.replace('{{domanda}}', qNow.text)
																			.replace('{{image_url}}', qNow.image_url);

		/*
		ROBA SBAGLIATA E BRUTTA
		var ind=['a','b','c','d'];
		var answ=[qNow.ans_a,qNow.ans_b,qNow.ans_c,qNow.ans_d];
		aTemplate.innerHTML
											.replace('{{lettera}}', ind[i])
											.replace('{{risposte}}', answ[i])*/
/*
			forEach(function(e,i){
			var ind=['A','B','C','D'];
			quiz.innerHTML+=aTemplate.innerHTML
																				.replace('{{lettera}}', ind[i])
																				.replace('{{risposte}}', )
		})*/

		var nextQ=parseInt(id)+1;
		if(nextQ<=testquestion.length){
			quiz.innerHTML='<a href="#/quiz/question/'+nextQ+'">avanti</a><br><a href="#/quiz/credits">Show credits</a>';
		}else{
			quiz.innerHTML='<a href="#/quiz/mascotte">fine</a><br><a href="#/quiz/credits">Show credits</a>';
		}
		var nextQ=parseInt(id)+1;
	}

	function shareResult(){
		quiz.innerHTML='';
		sectionNow=window.location.href.split("#")[1];
		//calcolo risultato
		//insert db
		//scelgo mascotte
		var idMascotte=1;
		fetch(baseUrl+'/mascotte/'+idMascotte)
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
