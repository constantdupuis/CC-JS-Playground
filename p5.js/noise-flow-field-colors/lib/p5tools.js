

function saveCanvasEx(canvas, filename_prefix) {
    if ((key == 'S') || (key == 's')) {
      console.log('Save canvas');
      const date = new Date();
      let month = (date.getMonth() + 1).toString();
      month = month.padStart(2,'0');
      let day = date.getDate().toString();
      day = day.padStart(2, '0');
      let hours = date.getHours().toString().padStart(2, '0');
      let minutes = date.getMinutes().toString().padStart(2, '0');
      let seconds = date.getSeconds().toString().padStart(2, '0');
  
      const formattedDate = `${date.getFullYear()}${month}${day}${hours}${minutes}${seconds}`;
      console.log(formattedDate);
      saveCanvas(canvas, `${filename_prefix}-${formattedDate}-${width}x${height}.jpg`);
    }
  }

  function saveCurrentCanvas(filename_prefix) {
    if ((key == 'S') || (key == 's')) {
      console.log('Save canvas');
      const date = new Date();
      let month = (date.getMonth() + 1).toString();
      month = month.padStart(2,'0');
      let day = date.getDate().toString();
      day = day.padStart(2, '0');
      let hours = date.getHours().toString().padStart(2, '0');
      let minutes = date.getMinutes().toString().padStart(2, '0');
      let seconds = date.getSeconds().toString().padStart(2, '0');
  
      const formattedDate = `${date.getFullYear()}${month}${day}${hours}${minutes}${seconds}`;
      console.log(formattedDate);
      saveCanvas(`${filename_prefix}-${formattedDate}-${width}x${height}.jpg`);
    }
  }