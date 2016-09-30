(function()
{
  //write('Hi','./engine/data/1.json');
  //open('./engine/data/1.json');
  window.canvas = document.getElementById('output');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
  tile_size = 30;

  window.map_gen = [
    {
      style:'rect',
      x:0,
      w:20,
      y:0,
      h:20,
      tid:1
    },
  ];

  window.collision_map = [];

  player_x = 2;
  player_y = 2;

  window.onkeypress = function(event)
  {
    if(event.keyCode == 119)//w
      test_move(player_x,player_y-1);
    if(event.keyCode == 97)//a
      test_move(player_x-1,player_y);
    if(event.keyCode == 115)//s
      test_move(player_x,player_y+1);
    if(event.keyCode == 100)//d
      test_move(player_x+1,player_y);
  };

  render();
})();

function test_move(testx,testy)
{
  console.log(testx,testy);

  empty = true;

  for(id in collision_map)
  {
    if(collision_map[id].x == testx && collision_map[id].y == testy)
    {
      empty = false;
    }
  }

  if(empty)
  {
    move(testx,testy);
  }
  else
    console.log();
}

function move(x,y)
{
  player_x = x;
  player_y = y;

  render();
}

function render()
{
  ctx.clearRect(0,0,canvas.width,canvas.height);

  map_dx = (canvas.width / 2) - (tile_size / 2) - (player_x * tile_size) - 0.5;
  map_dy = (canvas.height / 2) - (tile_size / 2) - (player_y * tile_size) - 0.5;

  static_character_x = (canvas.width / 2) - (tile_size / 2) - 0.5;
  static_character_y = (canvas.height / 2) - (tile_size / 2) - 0.5;

  ctx.beginPath();
  ctx.strokeStyle = '#000';
  ctx.rect(static_character_x,static_character_y,tile_size,tile_size);
  ctx.stroke();

  for(id in map_gen)
  {
    if(map_gen.hasOwnProperty('style'))
    {
      if(map_gen.shape == 'rect')
      {
        for(x=map_gen[id].x;x<map_gen[id].x + map_gen[id].w;x++)
        {
          for(y=map_gen[id].y;y<map_gen[id].y + map_gen[id].h;y++)
          {
            if(map_gen[id].tid == 1)
            {
              
            }
          }
        }
      }
      if(map_gen.shape == 'fillRect')
      {

      }
    }
    else
    {
      for(x=map_gen[id].x;x<map_gen[id].x + map_gen[id].w;x++)
      {
        for(y=map_gen[id].y;y<map_gen[id].y + map_gen[id].h;y++)
        {
          if(map_gen[id].tid == 1)
          {
            ctx.beginPath();
            ctx.strokeStyle = '#000';
            ctx.fillSTyle = '#000';
            ctx.fillRect((x * tile_size) + map_dx,(y * tile_size) + map_dy,tile_size,tile_size);
            ctx.stroke();

            map_item = {
              x:x,
              y:y,
              tid:1
            }

            collision_map.push(map_item);
          }
        }
      }
    }
  }
}

function rand(min,max)
{
  return Math.floor(Math.random() * (max - min + 1) + min);
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
