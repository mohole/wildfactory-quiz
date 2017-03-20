function loadQuestionLayout(){
	setTimeout(function(){
		document.querySelector('.triangle').style.opacity=1;
	},1250);

	function mostradiv(elem){
		elem.style.opacity=1;
	}
	document.querySelectorAll('.animation').forEach(function(e,i){
		setTimeout(function(){
			mostradiv(e);
		},i*600+1050);
	});

}
/*document.addEventListener('DOMContentLoaded', function(){
       document.querySelector('.triangle').style.opacity=0;
       setTimeout(function(){
        document.querySelector('.triangle').style.opacity=1;
    },1050);
});
function mostradiv(elem){
  elem.style.opacity=1;
}
document.querySelectorAll('.animation').forEach(function(e,i){
  setTimeout(function(){
    mostradiv(e);
  },i*600+1050);
  console.log(i*70+1050);
});
*/