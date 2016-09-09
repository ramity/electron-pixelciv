(function()
{
  //write('Hi','./engine/data/1.json');
  //open('./engine/data/1.json');
  //get canvas
  canvas = document.getElementById('output');
  //apply changes by attrib
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //apply changes by css
  canvas.style.width = window.innerWidth;
  canvas.style.height = window.innerHeight;

  create_map();
  render_map();
})();

function create_map () {
  window.maptiles = 2000;
  window.mapxmax = 0;
  window.mapymax = 0;
  window.mapxmin = 0;
  window.mapymin = 0;
  window.map = [];
  window.map[0] = {
  'title': 'spawn'
  , 'x': 0
  , 'y': 0
  };
  cur_x = 0;
  cur_y = 0;
  for (c = 1; c < maptiles + 1; c++) {
    t_tile = {};
    t_cur_x = cur_x;
    t_cur_y = cur_y;
    //declaring +1 or -1 delta in direction
    if (rand(0, 1) == 0) {
      r_delta = 1;
    } else {
      r_delta = -1;
    }
    //declaring if change is in the x or y planes
    if (rand(0, 1) == 0) {
      t_cur_x += r_delta;
    } else {
      t_cur_y += r_delta;
    }
    //declare temp tile
    t_tile = {
      'x': t_cur_x
      , 'y': t_cur_y
    };
    //search array to check if map tile coords already exist
    if (checkmaptile(t_tile)) {
      //create map tiled
      window.maperror = 0;
      t_tile.id = c;
      window.map[c] = t_tile;
      cur_x = t_cur_x;
      cur_y = t_cur_y;
      if (cur_x > mapxmax)
        mapxmax = cur_x;
      if (cur_y > mapymax)
        mapymax = cur_y;
      if (cur_x < mapxmin)
        mapxmin = cur_x;
      if (cur_y < mapymin)
        mapymin = cur_y;
    } else {
      window.maperror++;
      if (window.maperror >= 32) {
        window.maperror = 0;
        cur_x = window.map[c - 1].x;
        cur_y = window.map[c - 1].y;
      }
    }
  }
}
function render_map () {
  t_mapwidth = document.getElementById('output').width;
  t_mapheight = document.getElementById('output').height;

  console.log(mapxmin);
  console.log(mapymin);
  console.log(mapxmax);
  console.log(mapymax);

  t_mapabswidth = Math.abs(mapxmin) + Math.abs(mapxmax);
  t_mapabsheight = Math.abs(mapymin) + Math.abs(mapymax);
  t_mapbiggest = Math.max(t_mapabsheight, t_mapabswidth);
  window.size = t_mapwidth / (t_mapbiggest + 1);

  //following if then statement is for centering the map on smallest axis
  if (t_mapabsheight > t_mapabswidth) {
    o_x = Math.abs((mapxmin * size) - ((t_mapwidth - (t_mapabswidth * size)) / 2)) - (size / 2);
    o_y = Math.abs(mapymin * size);
  } else {
    o_x = Math.abs(mapxmin * size);
    o_y = Math.abs((mapymin * size) - ((t_mapheight - (t_mapabsheight * size)) / 2)) - (size / 2);
  }
  c = document.getElementById('output');
  ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
  for (z = 0; z <= window.maptiles; z++) {
    ctx.beginPath();
    ctx.lineWidth = '1';
    x = (map[z].x * size) + o_x;
    y = (map[z].y * size) + o_y;
    ctx.fillRect(x, y, size, size);
    ctx.stroke();
  }
  //console.log(JSON.stringify(map).length);
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function checkmaptile(t_input) {
  for (c = 0; c < window.map.length; c++) {
    if (map[c]['x'] == t_input['x'] && map[c]['y'] == t_input['y'])
      return false;
  }
  return true;
}

function write(input,filepath)
{
  var fs = require('fs');
  fs.writeFile(filepath,input,function(err)
  {
    if(err)
    {
      return console.log(err);
    }
    else
    {
      console.log("The file was saved!");
    }
  });
}

function open(filepath)
{
  var fs = require('fs');
  fs.readFile(filepath,'utf8',function(err,data)
  {
    if(err)
    {
      return console.log(err);
    }
    else
    {
      console.log(data);
    }
  });
}
