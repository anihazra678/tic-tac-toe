window.onload = function() {
    
    var num;
    var box;
    var ctx;
    var pos_status;
    var table;
    var win_cond;
    var gameover = false;
    var ai = "X";
    var hu2 = "O";
    var ai_opponent = false;
    var game_running = false;
    var player = "X";
    var opp = "O";
    var result = {};
    
    pos_status = new Array();
    table = new Array();
    
    win_cond =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    
    document.getElementById("cgm").innerText = "Current Game Mode : Human Vs Human";
    
    document.getElementById("result").innerText = "Current Turn : Player '" + player +"' !!";
    
    for(var i=0; i<9; i++){
        pos_status[i] = false;
        table[i] = "";
    }
    
    var rst = document.getElementById("reset");
    rst.addEventListener("click",newgame);
    
    function newgame(){
        document.location.reload();
    }
    
    document.getElementById("grid").addEventListener("click",function(e){boxclick(e.target.id)});
    
    var pl_ai = document.getElementById("start_ai");
    pl_ai.addEventListener("click",aifirstmove);
    
    function aifirstmove(){
        if(player == hu2){
            alert("A.I already completed his turn, now it's your turn");
            return;
        }
        if(game_running == true){
            alert("Currently the game is ongoing, to reset click the 'New Game' button first then click play against computer A.I")
        }
        else{
            if(gameover==true){
                alert("Please click the 'New Game' button first then click play against computer A.I")
            }
            else{
                document.getElementById("cgm").innerText = "Current Game Mode : Computer Vs Human";
                document.getElementById("sugp").innerText = "To go again into H v H mode click on new game";
                ai_opponent = true;
                if(game_running == false){
                    var move = minimax(table,ai,ai,hu2);
                    var boxid = "canvas" + (move.id + 1);
                    pos_status[move.id] = "true";
                    
                    box = document.getElementById(boxid);
                    ctx = box.getContext("2d");
                    
                    draw_x(move.id);
                    
                    if(check_winner(table, table[move.id]) == true){
                        document.getElementById("result").innerText = "Winner : Player '" + table[move.id] +"'(Computer/A.I) !!";
                        gameover = true;
                        return;
                    }
                    
                    document.getElementById("result").innerText = "Now your turn.";
                    player = hu2;
                    opp = ai;
                }
            }
        }
    }
    
    var sgg = document.getElementById("sugb");
    sgg.addEventListener("click",getsuggestion);
    
    
    function draw_x(index){
        
        ctx.beginPath();
        ctx.moveTo(20,20);
        ctx.lineTo(80,80);
        ctx.moveTo(80,20);
        ctx.lineTo(20,80);
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
        
        table[index]="X";
    }
    
    function istablefull(){
        var val = true;
        for(var i=0; i<table.length; i++){
            val = (val && pos_status[i]);
        }
        return val;
    }
    
    function draw_o(index){
        
        ctx.beginPath();
        ctx.arc(50,50,35,0,2*Math.PI);
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.closePath();
        
        table[index] = "O";
    }
    
    function check_winner(Table, Player){
        for(var j=0; j<win_cond.length; j++){
            if((Table[win_cond[j][0]] == Player) && (Table[win_cond[j][1]] == Player) && (Table[win_cond[j][2]] == Player)){
                return true;
            }
        }
        return false;
    }
    
    function boxclick(box_id){
        box = document.getElementById(box_id);
        ctx = box.getContext("2d");
        game_running = true;
        
        document.getElementById("sugp").innerText = "";
        
        switch(box_id){
            case "canvas1": num = 1;
                break;
            case "canvas2": num = 2;
                break;
            case "canvas3": num = 3;
                break;
            case "canvas4": num = 4;
                break;
            case "canvas5": num = 5;
                break;
            case "canvas6": num = 6;
                break;
            case "canvas7": num = 7;
                break;
            case "canvas8": num = 8;
                break;
            case "canvas9": num = 9;
                break;
            
        }
        
        if(gameover == false){
            if(pos_status[num-1] == false){
                pos_status[num-1] = true;
                //table[num-1] = player;
                
                if(player == hu2){
                    draw_o(num-1);
                    player = ai;
                    opp = hu2;
                    if(check_winner(table, table[num-1])){
                        document.getElementById("result").innerText = "Winner : Player '" + table[num-1] +"' !!";
                        gameover = true;
                        return;
                    }
                    if(ai_opponent == false){
                    document.getElementById("result").innerText = "Current Turn : Player '" + player +"' !!";
                    }
                }
                else if((player == ai) && (ai_opponent == false)){
                    draw_x(num-1);
                    player = hu2;
                    opp = ai;
                    if(check_winner(table, table[num-1]) == true){
                        document.getElementById("result").innerText = "Winner : Player '" + table[num-1] +"' !!";
                        gameover = true;
                        return;
                    }
                    document.getElementById("result").innerText = "Current Turn : Player '" + player +"' !!";
                }
                
                if((player == ai) && (ai_opponent == true)){
                    var move = minimax(table,ai,ai,hu2);
                    var boxid = "canvas" + (move.id + 1);
                    pos_status[move.id] = true;
                    //table[move.id] = ai;
                    box = document.getElementById(boxid);
                    ctx = box.getContext("2d");
                    draw_x(move.id);
                    if(check_winner(table, table[move.id]) == true){
                        document.getElementById("result").innerText = "Winner : Player '" + table[move.id] +"'(Computer/A.I) !!";
                        gameover = true;
                        return;
                    }
                    
                    if(istablefull() == false){
                        document.getElementById("result").innerText = "Now your turn.";
                    }
                    player = hu2;
                    opp = ai;
                }
                
                if((istablefull() == true) && (gameover != true)){
                    document.getElementById("result").innerText = "Game Over !! It is a Draw.";
                    return;
                }
            }
            else{
                alert("Please click on an Empty Box.");
            }
        }
        else{
            alert("Game is over. Please click the 'New Game' button to start a new game");
        }
    }
    
    function availableboxes(Table){
        var empty_box = [];
        for(var i=0; i<Table.length; i++){
            if((Table[i] != "X") && (Table[i] != "O")){
               empty_box.push(i);
            }
        }
        return empty_box;
    }
    
    function minimax(Table, Player, MaxP, MinP){
        var avlbl = availableboxes(Table);
        
        if(check_winner(Table,MinP)){
            return { score: -10 };
        }
        else if(check_winner(Table,MaxP)){
            return { score: 10 };
        }
        else if(avlbl.length == 0){
            return { score: 0 };
        }
        
        var moves_n_score = [];
        
        for(var i=0; i<avlbl.length; i++){
            var c_move = {};
            c_move.id = avlbl[i];
            Table[avlbl[i]] = Player;
            
            if(Player == MaxP){
                result = minimax(Table, MinP, MaxP, MinP);
                c_move.score = result.score;
            }
            else{
                result = minimax(Table, MaxP, MaxP, MinP);
                c_move.score = result.score;
            }
            
            Table[avlbl[i]] = "";
            moves_n_score.push(c_move);
        }
        
        var best_move;
        var best_score;
        if(Player == MaxP){
            best_score = -Infinity;
            for(var j=0; j<moves_n_score.length; j++){
                if(moves_n_score[j].score > best_score){
                    best_score = moves_n_score[j].score;
                    best_move = j;
                }
            }
        }
        else{
            best_score = Infinity;
            for(var j=0; j<moves_n_score.length; j++){
                if(moves_n_score[j].score < best_score){
                    best_score = moves_n_score[j].score;
                    best_move = j;
                }
            }
        }
        
        return moves_n_score[best_move];
    }
    
    function getsuggestion(){
        var sug_txt;
        if(istablefull() || gameover){
            sug_txt = "To play again click on new game. To exit close the tab."
        }
        else{
            var s_move = minimax(table,player,player,opp);
            var row = Math.floor(s_move.id/3)+1;
            var col = (s_move.id%3)+1;
            sug_txt = "Suggested Move : Row - " + row + ", Column - " + col + ".";
        }
        document.getElementById("sugp").innerText = sug_txt;
    }
};

  
