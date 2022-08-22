const tabLinks = document.querySelectorAll(".tab-links");
const tabContent = document.querySelectorAll(".tab-content");


tabLinks.forEach(function(el) {
   el.addEventListener("click", openTabs);
});


function openTabs(element) {
  const btnTarget = element.currentTarget;
  const task = btnTarget.dataset.task;

  tabContent.forEach(function(iteml) {
    iteml.classList.remove("active");
  });

  tabLinks.forEach(function(iteml) {
    iteml.classList.remove("active");
  });

  document.querySelector("#" + task).classList.add("active");
   
  btnTarget.classList.add("active");
}