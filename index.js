///////  Building the Menu   //////////////////////////////////////////
const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');
const topMenuEl = document.querySelector('#top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

var menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog', href: '#', subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ]
  },
  {
    text: 'orders', href: '#', subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ]
  },
  {
    text: 'account', href: '#', subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ]
  },
];

menuLinks.forEach(function (link) {
  const linkEl = document.createElement('a');
  linkEl.href = link.href;
  linkEl.textContent = link.text;
  topMenuEl.appendChild(linkEl);
});


// 1. Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.querySelector('#sub-menu');

// 2. Set the height subMenuEl element to be 100%.
subMenuEl.style.height = '100%';

// 3. Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

// 4. Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add('flex-around');

// 5. Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = 'absolute';

// 6. Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = '0';

// 8. Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
const topMenuLinks = topMenuEl.querySelectorAll('a');

// 9. Declare a global showingSubMenu variable and initialize it to false;
let showingSubMenu = false;

// 10. Attach a delegated 'click' event listener to topMenuEl.
//The first line of code of the event listener function should call the event object's preventDefault() method.
// The second line of code of the function should immediately return if the element clicked was not an <a> element.
// console.log the content of the <a> to verify the handler is working.
topMenuEl.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') {
    return;
  }

  console.log(event.target.textContent);

  // 11. In the event listener, if the clicked <a> link has a class of active:
  //Remove the active class from the clicked <a> element.
  //Set the showingSubMenu to false.
  //Set the CSS top property of subMenuEl to 0.
  //return to exit the handler.
  // 12. The event listener should remove a class name of active from each <a> element in topMenuLinks - whether the active class exists or not.
  topMenuLinks.forEach(function (link) {
    link.classList.remove('active');
  });
  if (event.target.classList.contains('active')) {
    event.target.classList.remove('active');
    showingSubMenu = false;
    subMenuEl.style.top = '0';
    return;
  }

  // 13. The event listener should add a class name of active to the <a> element that was clicked.
  // 14. Set showingSubMenu to true if the clicked <a> element's "link" object within menuLinks has a subLinks property 
  //(all do, except for the "link" object for ABOUT); otherwise, set it to false.
  // 15. In the event listener:
  //If showingSubMenu is true:
  //Call a buildSubMenu function passing to it the subLinks array for the clicked <a> element.
  //Set the CSS top property of subMenuEl to 100%.
  //Otherwise (showingSubMenu is false):
  //Set the CSS top property of subMenuEl to 0.
  event.target.classList.add('active');
  const linkObject = menuLinks.find(function (link) {
    return link.text === event.target.textContent;
  });
  if (linkObject && linkObject.subLinks) {
    showingSubMenu = true;
    buildSubMenu(linkObject.subLinks);
    subMenuEl.style.top = '100%';
  } else {
    showingSubMenu = false;
    subMenuEl.style.top = '0';
  }
});

// 16. Code the buildSubMenu function so that it:
//Clears the contents of subMenuEl.
//Iterates over the subLinks array passed as an argument, and for each "link" object:
//Create an <a> element.
//On the new element, add an href attribute with its value set to the href property of the "link" object.
//Set the new element's content to the value of the text property of the "link" object.
//Append the new element to the subMenuEl element.
function buildSubMenu(subLinks) {
  subMenuEl.innerHTML = '';
  subLinks.forEach(function (link) {
    const linkEl = document.createElement('a');
    linkEl.href = link.href;
    linkEl.textContent = link.text;
    subMenuEl.appendChild(linkEl);
  });
}

// 17. Attach a delegated 'click' event listener to subMenuEl.
//The first line of code of the event listener function should call the event object's preventDefault() method.
//The second line of code function should immediately return if the element clicked was not an <a> element.
//console.log the content of the <a> to verify the handler is working.
subMenuEl.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') {
    return;
  }
  console.log(event.target.textContent);

  // 18. Next, the event listener should:
  //Set showingSubMenu to false.
  //Set the CSS top property of subMenuEl to 0.
  showingSubMenu = false;
  subMenuEl.style.top = '0';

  // 19. Remove the class name of active from each <a> element in topMenuLinks - whether the active class exists or not.
  topMenuLinks.forEach(function (link) {
    link.classList.remove('active');
  });

  // 20. Update the contents of mainEl to the contents of the <a> element, within an <h1>, clicked within subMenuEl.
  // 21. If the ABOUT link is clicked, an <h1>About</h1> should be displayed.
  if (event.target.textContent === 'ABOUT') {
    mainEl.innerHTML = '<h1>About</h1>';
  } else {
    mainEl.innerHTML = '<h1>' + event.target.textContent + '</h1>';
  }
});



