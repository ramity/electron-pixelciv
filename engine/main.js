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

  draw_map();
})();

function draw_map()
{

}

function create_map()
{
  window.map = [];

  //initialize
  window.current_x = 0;
  window.current_y = 0;

  for (z = 0;z < 5000;z++)
  {
    //initialize
    temp_x = current_x;
    temp_y = current_y;

    created = false;

    while(!created)
    {
      if(choose_tile(temp_x,temp_y))
      {
        created = true;

        console.log('[F] - ' + z);
      }
      else
      {
        z--;

        console.log('[B]');

        map.splice(z,1);
      }
    }
  }

  console.log(map);
}

function choose_tile(input_x,input_y)
{
  directions = ['u','r','d','l'];

  //iterate through all map tiles
  for (var id in window.map)
  {
    //test tiles around input_x + input_y
    if (window.map[id].x == input_x && window.map[id].y == (input_y + 1))
    {
      directions.splice(0,1);
    }
    else if (window.map[id].x == (input_x + 1) && window.map[id].y == input_y)
    {
      directions.splice(1,1);
    }
    else if (window.map[id].x == input_x && window.map[id].y == (input_y - 1))
    {
      directions.splice(2,1);
    }
    else if (window.map[id].x == (input_x - 1) && window.map[id].y == input_y)
    {
      directions.splice(3,1);
    }
  }

  rand = directions[Math.floor(Math.random() * directions.length)];

  if (rand == 'u')
  {
    window.current_x = input_x;
    window.current_y = input_y + 1;

    map[z] = {
      x: current_x,
      y: current_y
    }

    return true;
  }
  else if (rand == 'r')
  {
    window.current_x = input_x + 1;
    window.current_y = input_y;

    map[z] = {
      x: current_x,
      y: current_y
    }

    return true;
  }
  else if (rand == 'd')
  {
    window.current_x = input_x;
    window.current_y = input_y - 1;

    map[z] = {
      x: current_x,
      y: current_y
    }

    return true;
  }
  else if (rand == 'l')
  {
    window.current_x = input_x - 1;
    window.current_y = input_y;

    map[z] = {
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
