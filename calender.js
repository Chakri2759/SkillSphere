const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

const scheduleCard = document.getElementById('scheduleCard');

daysTag.addEventListener('mouseover', (e) => {
  if (e.target.tagName === 'LI' && !e.target.classList.contains('inactive')) {
    const day = e.target.textContent;
    const month = months[currMonth];
    const year = currYear;

    // You can customize the content based on the day, month, and year.
    // Here, we'll just show a placeholder schedule
    const scheduleContent = `
      <h4>Schedule for ${month} ${day}, ${year}</h4>
      <p>9:00 AM - Introduction</p>
      <p>11:00 AM - Workshop</p>
      <p>2:00 PM - Project Discussion</p>
    `;

            scheduleCard.innerHTML = scheduleContent;
            scheduleCard.style.display = 'block';
            // Get the card's dimensions and the viewport width
            const cardWidth = scheduleCard.offsetWidth;
            const cardHeight = scheduleCard.offsetHeight;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Calculate the position based on mouse coordinates
            let leftPosition = e.pageX + 15;
            let topPosition = e.pageY + 15;

            // Adjust the position if the card would overflow the viewport
            if (leftPosition + cardWidth > viewportWidth) {
                leftPosition = e.pageX - cardWidth - 15;
            }
            if (topPosition + cardHeight > viewportHeight) {
                topPosition = e.pageY - cardHeight - 15;
            }

            // Apply the calculated positions
            scheduleCard.style.left = `${leftPosition}px`;
            scheduleCard.style.top = `${topPosition}px`;
  }
});

daysTag.addEventListener('mouseout', () => {
  scheduleCard.style.display = 'none';
});