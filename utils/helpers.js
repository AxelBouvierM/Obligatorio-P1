function isEmpty(txt) {
    if (txt == "") {
      return true;
    }
    return false;
  }

  function qs(id) {
    const element = document.querySelector(`#${id}`);
    return element;
  }
  
  function qsValue(id) {
    return qs(id).value;
  }
  
  function qsValueAsNumber(id) {
    return Number(qsValue(id));
  }