
function tabs (tabsSelector, tabsContent, tabsItems, tabsActiveClass) {
const tabs = document.querySelectorAll(tabsSelector),
          content = document.querySelectorAll(tabsContent),
          tabsWrap = document.querySelector(tabsItems);


    function hideContent () {
        content.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove(tabsActiveClass);
        });
    }
    function showContent (i) {
        content[i].classList.add('show', 'fade');
        content[i].classList.remove('hide');
        tabs[i].classList.add(tabsActiveClass);
    }

    hideContent();
    showContent(0);

    tabsWrap.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target && event.target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((item, i) => {
                if (event.target == item) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });
}
export default tabs;