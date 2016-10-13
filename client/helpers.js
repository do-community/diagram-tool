const helpers = {
  findUpTag: function (el, tag) {
      while (el.parentNode) {
          el = el.parentNode;
          if (el.tagName === tag)
              return el;
      }
      return null;
  },
  findUpClass: function (el, cla) {
      while (el.parentNode) {
          el = el.parentNode;
          console.log(el.className);
          if (el.className.indexOf(cla) > -1)
              return el;
      }
      return null;
  }
}

export default helpers;
