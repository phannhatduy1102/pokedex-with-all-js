function MyElement(props) {
  const {
    type,
    element,
    text,
    className = [],
    children = [],
    events = [],
    ...rest
  } = props;
  const myElement = type === "element" ? element : document.createElement(type);

  if (text) {
    myElement.textContent = text;
  }

  if (className.length) {
    const classNames = className.split(" ");
    classNames.forEach((className) => {
      myElement.classList.add(className);
    });
  }

  if (children.length) {
    const childrenElements = children.map((child) => createElement(child));
    childrenElements.forEach((element) => {
      myElement.appendChild(element);
    });
  }

  if (events.length) {
    events.forEach((event) => {
      myElement.addEventListener(event.type, event.listener);
    });
  }

  if (rest) {
    Object.keys(rest).forEach((key) => {
      myElement.setAttribute(key, rest[key]);
    });
  }

  return myElement;
}

export const createElement = (props) => MyElement(props);

export const addEventListenerForJsonDom = (vDom, listener = []) => {
  if (!listener?.length || !vDom) return;

  if (vDom?.events?.length) {
    vDom.events.forEach((event) => {
      event.listener = listener?.[event.key] || event.listener;
    });
  }
  if (vDom?.children?.length) {
    vDom.children.forEach((child) => {
      addEventListenerForJsonDom(child, listener);
    });
  }
};

export function withComponent(Component, props, listener) {
  const { jsonDom, ...rest } = new Component(props);

  (() => {
    if (listener?.length) {
      addListener(listener);
    }
  })();

  function createJsonDom() {
    return createElement(jsonDom);
  }

  function addListener(listener) {
    if (!listener.length) return;
    addEventListenerForJsonDom(jsonDom, listener);
    return this;
  }

  return {
    getJsonDom: () => jsonDom,
    createJsonDom,
    addListener,
    ...rest,
  };
}

export const appendManyChild = (parent, children) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};
