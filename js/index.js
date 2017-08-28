$(function(){

//declare variables
    var $timerStart = $('#timerStart');
    var $currentExercise = $('#currentExercise');
    var $exerciseLength = $('#exerciseLength');
    var $workoutSets = $('#workoutSets');

    var $exerciseProgressBar = $('#exerciseProgressBar');

    var $workoutProgressBar = $('#workoutProgressBar');

    var countInTimer = undefined;
    var exerciseTimer = undefined;
    var workoutTimer = undefined;

    
//declare count in function to count in and begin the workout
    function countIn() {
        
        var i = 2;
        
        function count() {
            $currentExercise.text(i);
            i--;
            
            if(i === -1) {
                clearInterval(countInTimer);
                
                var workoutLength = (($exerciseLength.val() * 1000) * $workoutSets.val());

                callNext();
                runWorkoutProgressBar(workoutLength);

                exerciseTimer = setInterval(callNext, $exerciseLength.val() * 1000);
            }
        }
        
        $currentExercise.text(3);
        countInTimer = setInterval(count, 1000);
    }

//declare flip function to return an exercise
    function flip() {
    var number = Math.floor(Math.random() * 5);

    var exercises = ['push-ups',
                    'star-jumps',
                     'squats',
                    'burpees',
                    'mountain climbers'];

    return exercises[number];
    }
  
//declare callNext function to get an exercise using the flip function and run the exercise progress bar.
    function callNext() {
        var nextEx = flip();

        $currentExercise.text('Do ' + nextEx + '!');

        runExProgressBar(($exerciseLength.val() * 1000) - 15);
    }
  
//declare runExProgressBar function to animate the exercise progress bar so it fills for the ammount of time specified by the user.
    function runExProgressBar(time) {
        $exerciseProgressBar.css('width', '0%');
        $exerciseProgressBar.animate({
        width: '100%'
        }, time, "linear");
    }
  
//declare runWorkoutProgressBar function to animate the workout progress bar for the full length of the workout.
    function runWorkoutProgressBar(time) {
        workoutTimer = setInterval(stopTimers, time);

        $workoutProgressBar.css('width', '0%');
        $workoutProgressBar.animate({
        width: '100%'
        }, time, "linear");
    }
    
//declare stopTimers function
    function stopTimers() {
        clearInterval(workoutTimer);
        clearInterval(exerciseTimer);
        clearInterval(countInTimer);
        $exerciseProgressBar.stop();
        $workoutProgressBar.stop();
        $timerStart.text('Workout!');
        $timerStart.toggleClass('start');
        $currentExercise.text('Finished - Good workout!');
    }

//declare runTimers to run the workout/exercise timers
    function runTimers() {
        if ($timerStart.hasClass('start')) {
            $timerStart.toggleClass('start');
            $timerStart.text('Stop');
            
            countIn();

        } else {
            stopTimers();
        }
    }
    
    $timerStart.on('click', runTimers);

});