(function()
{
  //write('Hi','./engine/data/1.json');
  //open('./engine/data/1.json');
  //set default variables
  initialize();
  //create map object
  create_map();
  //draw map object
  draw_map();
})();

function initialize()
{
  canvas = document.getElementById('output');
  ctx = canvas.getContext('2d');
  //apply changes by attrib
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //apply changes by css
  canvas.style.width = window.innerWidth;
  canvas.style.height = window.innerHeight;
  //map cord vars
  window.map = {};
  window.current_x = 0;
  window.current_y = 0;
  //map vars to determine width + height
  window.min_x = 0;
  window.min_y = 0;
  window.max_x = 0;
  window.max_y = 0;
  //map vars to store w + h
  window.map_w = 0;
  window.map_h = 0;
  //map vars to store w + h padding
  //10 = 5 on each side
  window.map_w_padding = 10;
  window.map_h_padding = 10;
  //map vars to store calculated w + h w/ padding
  window.map_w_calculated = 0;
  window.map_h_calculated = 0;
  //map tile size var
  window.tile_size = 0;
  //draw map origin vars
  window.map_draw_origin_x = 0;
  window.map_draw_origin_y = 0;
}

function calculate_size()
{
  window.map_w = Math.abs(max_x - min_x);
  window.map_h = Math.abs(max_y - min_y);

  window.map_w_calculated =

  window.map_w_calculated = canvas.width - map_w_padding;
  window.map_h_calculated = canvas.height - map_h_padding;

  temp_tile_w_size = map_w_calculated / map_w;
  temp_tile_h_size = map_h_calculated / map_h;

  //picks the smallest size
  if (temp_tile_w_size > temp_tile_h_size)
  {
    window.tile_size = temp_tile_h_size;
  }
  else
  {
    window.tile_size = temp_tile_w_size;
  }

  //
  if (window.map_w_calculated > window.map_h_calculated)
  {
    window.map_draw_origin_x = canvas.width / 2;
    window.map_draw_origin_y = canvas.height / 2;
  }
  else
  {
    window.map_draw_origin_x = canvas.width / 2;
    window.map_draw_origin_y = canvas.height / 2;
  }
}

function draw_map()
{
  calculate_size();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var id in window.map)
  {
    ctx.beginPath();
    ctx.lineWidth = '1';
    x = (map[id].x * tile_size) + map_draw_origin_x;
    y = (map[id].y * tile_size) + map_draw_origin_y;
    ctx.fillRect(x, y, tile_size, tile_size);
    ctx.stroke();
  }

  console.log('Completed');

  console.log(map);
}

function create_map()
{
  for (z = 0;z < 100;z++)
  {
    //initialize
    temp_x = current_x;
    temp_y = current_y;
    //overwrite restart
    restart = false;
    //allow while loop
    exit = false;
    //while exit false
    while (!exit)
    {
      if (choose_tile(z,temp_x,temp_y))
      {
        if(current_x < min_x)
          min_x = current_x;
        if(current_x > max_x)
          max_x = current_x;
        if(current_y < min_y)
          min_y = current_y;
        if(current_y > max_y)
          max_y = current_y;

        //exit while loop
        exit = true;
      }
      else
      {
        console.log('[Fail] - Restarting');
        //exit while loop
        exit = true;
        //restart for loop
        restart = true;
      }
    }

    if(restart)
    {
      z = 0;
      initialize();
    }
  }
}

function choose_tile(tile_id,input_x,input_y)
{
  directions = ['u','r','d','l'];

  //iterate through all map tiles
  for (var id in window.map)
  {
    //test tiles around input_x + input_y
    if (window.map[id].x == input_x && window.map[id].y == (input_y + 1))
    {
      directions.splice('u',1);
    }
    else if (window.map[id].x == (input_x + 1) && window.map[id].y == input_y)
    {
      directions.splice('r',1);
    }
    else if (window.map[id].x == input_x && window.map[id].y == (input_y - 1))
    {
      directions.splice('d',1);
    }
    else if (window.map[id].x == (input_x - 1) && window.map[id].y == input_y)
    {
      directions.splice('l',1);
    }
  }

  if(directions.length == 0)
  {
    return false;
  }

  rand = directions[Math.floor(Math.random() * directions.length)];

  if (rand == 'u')
  {
    window.current_y++;

    map[tile_id] = {
      x: current_x,
      y: current_y
    }

    return true;
  }
  else if (rand == 'r')
  {
    window.current_x++;

    map[tile_id] = {
      x: current_x,
      y: current_y
    }

    return true;
  }
  else if (rand == 'd')
  {
    window.current_x;
    window.current_y--;

    map[tile_id] = {
      x: current_x,
      y: current_y
    }

    return true;
  }
  else if (rand == 'l')
  {
    window.current_x--;

    map[tile_id] = {
      x: current_x,
      y: current_y
    }

    return true;
  }
  else
    return false;
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
