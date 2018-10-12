function buttonEvent (id, func) {
    const open = document.getElementById(id)
    open.addEventListener('click', func)
  }
  
  function buttonQueryClass(cls,func){
    const open = document.querySelectorAll(cls)
    Object.keys(open).forEach(function(key){ 
      console.log(open[key].id)
      let dt = document.getElementById(open[key].id)
      dt.addEventListener('click',function(){
        func(dt.dataset.jsonactor)
        //console.log()
      })
    })

  }

  module.exports={
    buttonEvent:buttonEvent,
    buttonQueryClass:buttonQueryClass
  }