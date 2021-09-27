$(document).ready(function(){
    let sentenceArray = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
   let phrase=0;
   let letter=0;
   let correctLetters =0;
   let wrongLetters = 0;
   let startTime;
   function gameStart(e){
    startTime=e.timeStamp;
   }

   function gameOver(e){
       let endTime=e.timeStamp;
       //all calc in here for wpm
       let msTime=endTime-startTime;
       let secTime=msTime/1000;
       let minTime=secTime/60;
       //numberOfWords / minutes - 2 * numberOfMistakes
       wordsPerMinute=54/minTime-2*wrongLetters;
   }

  

   //puts the sentences on the screen
   $('#sentence').append(sentenceArray[phrase]);
   
    //hides the upper container
    $('#keyboard-upper-container').css({
        'visibility':'hidden',
    });
    //when shift key is down hide lower and show upper
    $(document).keydown(function (e) {
        console.log(phrase)
        if (e.keyCode == 16) {
            $('#keyboard-lower-container').css({
                'visibility':'hidden',
            });
            $('#keyboard-upper-container').css({
                'visibility':'visible',
            });

        }
        if (correctLetters == 1){
            gameStart(e)
        }
    });
    //when shift key is up and released hide upper and show lower
    $(document).keyup(function (e) {
        if (e.keyCode == 16) {
            $('#keyboard-upper-container').css({
                'visibility':'hidden',
            });
            $('#keyboard-lower-container').css({
                'visibility':'visible',
            });

        }
        $('#'+e.key.charCodeAt(0)).css('background-color','pink');
        if (phrase < sentenceArray.length){  //during the game

        }else if(phrase >= sentenceArray.length){//game end
            gameOver(e);
            console.log(wordsPerMinute)
            $('#sentence').empty();
            $( "#sentence" ).html("<p>Your words per minute: " +  wordsPerMinute.toFixed(2) + " </p>")
            
            //reset button
            let $reset=$('<button>Play again?</button>')
            $('#feedback').append($reset);
            $reset.click(function(){
            window.location.reload()
        })

        }

    });

    let targetLetterCounter = 0
    //let targetLetter =(sentenceArray[phrase].charAt(targetLetterCounter))
    $('#target-letter').append(sentenceArray[phrase].charAt(targetLetterCounter));

    
    //when you press a button it will glow
    $(document).keypress(function(event) {
        let keyCode=(event.keyCode);
        letter++
        $('#yellow-block').animate({left: "+=18px"}, 10); //moving the yellow block
        $('#'+keyCode).css('background-color','magenta');
        $('#target-letter').empty()

        //did you get your key right? putting check marks and x's
        if (event.key==(sentenceArray[phrase].charAt(targetLetterCounter))){
            correctLetters++;
            //console.log(correctLetters);
            $('#feedback').append('<span class="glyphicon glyphicon glyphicon-ok"></span>');
        }else{
            wrongLetters++
           // console.log(wrongLetters);
            $('#feedback').append('<span class="glyphicon glyphicon glyphicon-remove"></span>');
            
        }


        //this is the letter that should have been pressed console.log(sentenceArray[phrase].charAt(targetLetterCounter));
        targetLetterCounter++
        $('#target-letter').append(sentenceArray[phrase].charAt(targetLetterCounter));
        // this is the letter that needs to be typed next at a particular point in the current array (sentenceArray[phrase].charAt(targetLetterCounter))




        //end of the line if statement putting yellow block back to front and giving new sentence
       if (sentenceArray[phrase].length==letter){
           $('#sentence').empty()
       phrase++ 
       targetLetterCounter = 0;
       $('#target-letter').append(sentenceArray[phrase].charAt(targetLetterCounter));
       $( "#feedback" ).empty()
       $('#sentence').append(sentenceArray[phrase]);
        letter = 0;
        $('#yellow-block').animate({left: "0px"}, 10);
       }
       


       //separate from letter counter totallettercounter(correct letter and wrong letter) inside if statement, =1 start counter, 
       //

    });

   

  
   






})