var uuid = require('node-uuid');
var jf = require('jsonfile');
var file = 'Json/data.json';
entries = jf.readFileSync(file);

function find(id,array){
    for(var i=0; i<array.length; i++){
        if(array[i].id==id)
            return array[i];
    }
};

function done(array){
    var newlist = [];
    for(var i=0; i<array.length; i++){
        if(array[i].isDone==false || array[i].isDone == "false")
            newlist.push(array[i]);
    }
    return newlist;
};

exports.index=function(req,res){
    res.sendfile("views/index.html");
};

exports.todos=function(req,res){
    res.sendfile(file);
};

exports.submit=function(req,res){
    var new_todo= {
    "name":req.body.name,
    "boothnumber":req.body.boothnumber,
    "isDone":false,
    "id":uuid.v4()
    };
    entries.push(new_todo);
    jf.writeFileSync(file, entries);
    res.redirect("/");

};

exports.select=function(req,res){
    var found= find(req.params.id, entries);
    res.send(found);
};

exports.change=function(req,res){
    var found= find(req.params.id, entries);
    if (req.body.isDone == "false" || req.body.isDone == "true")
        found.isDone=req.body.isDone;
    found.name=req.body.name || found.name;
    jf.writeFileSync(file, entries);
    res.send(found);
};

exports.removeall=function(req,res){
    entries =[];    
    jf.writeFileSync(file, entries);
    res.redirect("/");
}

exports.removecompleted=function(req,res){
    entries = done(entries);
    jf.writeFileSync(file, entries);
    res.redirect("/");
}
function sortatoz(array) {
        function compare(a, b) {
          if (a.name<b.name)
             return -1;
          if (a.name>b.name)
             return 1;
          return 0;
        }
        array.sort(compare);
        return array;   
};

exports.sorted=function(req,res){
    entries = sortatoz(entries);
    jf.writeFileSync(file, entries);
    res.redirect("/");
};

function sortnumbers(array) {
    
       function compareNumbers(a, b) {
        var floatya = parseFloat(a.boothnumber);
        var floatyb = parseFloat(b.boothnumber);
       
          return floatya-floatyb;
        }
        array.sort(compareNumbers);
        return array;   
};

exports.sortednumbers=function(req,res){
    entries = sortnumbers(entries);
    jf.writeFileSync(file, entries);
    res.redirect("/");
};
