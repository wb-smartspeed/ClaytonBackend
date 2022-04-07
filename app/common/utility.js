function Utility() { }

Utility.prototype.groupByMultiple=function( array , f )
{
  var groups = {};
  array.forEach( function( o )
  {
    var group = JSON.stringify( f(o) );
    groups[group] = groups[group] || [];
    groups[group].push( o );  
  });
  return Object.keys(groups).map( function( group )
  {
    return groups[group]; 
  })
};

Utility.prototype.groupBy = function (array, key) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var added = false;
        for (var j = 0; j < result.length; j++) {
            if (result[j][key] == array[i][key]) {
                result[j].items.push(array[i]);
                added = true;
                break;
            }
        }
        if (!added) {
            var entry = { items: [] };
            entry[key] = array[i][key];
            entry.items.push(array[i]);
            result.push(entry);
        }
    }
    return result;
}

Utility.prototype.paginate = function (array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}


module.exports = new Utility();