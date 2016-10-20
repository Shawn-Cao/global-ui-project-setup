class Loader {
  constructor(containerElement) {
    this.containerElement = containerElement;  //container element passed in as html element
    this.transclude = undefined;  //no template transclusion supported yet;
    this.xmlHttp = new XMLHttpRequest();
    this.xmlHttp.onreadystatechange = () => {
      if (this.xmlHttp.readyState == 4 && this.xmlHttp.status == 200) {
        let template = this.parseData(this.xmlHttp.responseText);
        this.setDom(template);
      }
    };

  }
  load(fileName, basePath) {
    let path = basePath || '/partials';
    let url = `${path}/${fileName}`;
    this.xmlHttp.open('GET', url, true); // true for asynchronous
    this.xmlHttp.send(null);
  }
  parseData(response) {
    return response;
    //response.replace(toBeTransclued, transclude)
  }
  setDom(htmlPartial) {
    this.containerElement.innerHTML = htmlPartial;
  }
}
