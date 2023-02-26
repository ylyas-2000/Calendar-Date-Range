// 1-st section
const currenDate = document.querySelector('.current-date'),
currentYear = document.querySelector('.current-year'),
daysTag = document.querySelector('.days'),
prevNextIcon = document.querySelectorAll('.icons span');


// 2-nd section
const currenDate2 = document.querySelector('.current-date-2'),
currentYear2 = document.querySelector('.current-year-2'),
daysTag2 = document.querySelector('.days-2');


// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();



const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 
                    'October', 'November', 'December'];


                    

const renderCalendar = () => {

    // 1-st section
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = '';


    for (let i = firstDayofMonth; i > 0; i --) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth == new Date().getMonth() && currYear === new Date().getFullYear() ?
         "active": "";

        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }


    currenDate.innerText = `${months[currMonth]}`;
    currentYear.innerText = `${currYear}`;
    daysTag.innerHTML = liTag;




    // 2-nd section
    let firstDayofMonth2 = new Date(currYear, currMonth + 1, 1).getDay(),
    lastDateofMonth2 = new Date(currYear, currMonth + 2, 0).getDate(),
    lastDayofMonth2 = new Date(currYear, currMonth, lastDateofMonth2).getDay(),
    lastDateofLastMonth2 = new Date(currYear, currMonth + 1, 0).getDate();
    let liTag2 = '';


    for (let i = firstDayofMonth2; i > 0; i --) {
        liTag2 += `<li class="inactive">${lastDateofLastMonth2 - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth2; i++) {
        liTag2 += `<li>${i}</li>`;
    }

    for (let i = lastDayofMonth2; i < 6; i++) {
        liTag2 += `<li class="inactive">${i - lastDayofMonth2 + 1}</li>`;
    }


    currenDate2.innerText = `${months[currMonth + 1]}`;
    currentYear2.innerText = `${currYear}`;
    daysTag2.innerHTML = liTag2;


}

renderCalendar();




prevNextIcon.forEach(icon => {
    icon.addEventListener('click', () => {
        currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }

        renderCalendar();




        // date range

        let daysLi = document.querySelectorAll('.calendar .days li');

        for (let i = 0; i < daysLi.length; i++) {
            daysLi[i].addEventListener('click', () => toggleSelection(i));
            daysLi[i].addEventListener('mousemove', () => updateSelection(i));
        }



        let selecting, start, end;

        let toggleSelection = i => {
            if (selecting)
                endSelection(i);
            else
                beginSelection(i);
        };

        let beginSelection = i => {
            selecting = true;
            start = i;
            updateSelection(i);
        };

        let endSelection = (i = end) => {
            updateSelection(i);
            selecting = false;
        };

        let updateSelection = i => {
            if (selecting)
                end = i;
            [...document.querySelectorAll('.calendar .days li')].forEach((daysLi, i) => {
                daysLi.classList.toggle('suppress', i >= start && i<= end || i >= end && i <= start);
            });
        };





    });
});







// date range

let daysLi = document.querySelectorAll('.calendar .days li');

for (let i = 0; i < daysLi.length; i++) {
    daysLi[i].addEventListener('click', () => toggleSelection(i));
    daysLi[i].addEventListener('mousemove', () => updateSelection(i));
}



let selecting, start, end;

let toggleSelection = i => {
    if (selecting)
        endSelection(i);
    else
        beginSelection(i);
};

let beginSelection = i => {
    selecting = true;
    start = i;
    updateSelection(i);
};

let endSelection = (i = end) => {
    updateSelection(i);
    selecting = false;
};

let updateSelection = i => {
    if (selecting)
        end = i;
    [...document.querySelectorAll('.calendar .days li')].forEach((daysLi, i) => {
        daysLi.classList.toggle('suppress', i >= start && i<= end || i >= end && i <= start);
    });
};

