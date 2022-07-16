export const isEqual = (object1 = {}, object2 = {}) => {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);

  if (props1.length !== props2.length) {
    return false;
  }

  for (let i = 0; i < props1.length; i += 1) {
    const prop = props1[i];
    const bothAreObjects =
      typeof object1[prop] === "object" && typeof object2[prop] === "object";

    if (
      (!bothAreObjects && object1[prop] !== object2[prop]) ||
      (bothAreObjects && !isEqual(object1[prop], object2[prop]))
    ) {
      return false;
    }
  }

  return true;
};

export const getScrollWidth = () => {
  //получаем ширину скроллбара
  const div = document.createElement("div");
  div.style.overflowY = "scroll";
  div.style.width = "50px";
  div.style.height = "50px";
  // мы должны вставить элемент в документ, иначе размеры будут равны 0
  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};

export const compensateScroll = (refElement) => {
  const element = refElement.current;

  const winHeight = element.clientHeight;
  const allDocHeight = element.scrollHeight;

  if (allDocHeight > winHeight) {
    element.style.paddingRight = 0;
  } else {
    element.style.paddingRight = getScrollWidth() + "px";
  }
};

export const timeForAnimation = (leadTime) => {
  //this function counts how much time is left before the timing animation completes. animation run time 2 seconds
  let timeAnimation = 2000;
  while (leadTime > timeAnimation) {
    timeAnimation = timeAnimation + 2000;
  }

  return timeAnimation - leadTime;
};

export const ifEmptyServerData = (server) => {
  if (!server.todoList) {
    server.todoList = [];
  }

  if (!server.deletedTodoList) {
    server.deletedTodoList = [];
  }

  if (!server.categoryList) {
    server.categoryList = [];
  }

  if (!server.deletedCategoryList) {
    server.deletedCategoryList = [];
  }
  if (server === null) {
    server.todoList = [];
    server.deletedTodoList = [];
    server.categoryList = [];
    server.deletedCategoryList = [];
  }
  return server;
};
